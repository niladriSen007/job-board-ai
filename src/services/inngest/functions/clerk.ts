import { env } from "@/data/env/server";
import { inngest } from "../client";
import { Webhook } from "svix"
import { NonRetriableError } from "inngest";
import { deleteUserFromDb, insertUserToDb, updateUserInDb } from "@/features/users/db/user";
import { createUserNotificationSettings } from "@/features/users/db/userNotificationSettings";

function verifyWebHook({ raw, headers }: {
  raw: string,
  headers: Record<string, string>
}) {
  return new Webhook(env.CLERK_WEBHOOK_SECRET).verify(raw, headers);
}


export const clerkCreateUser = inngest.createFunction({
  id: "clerk/create-db-user",
  name: "Clerk - Create DB User",
}, {
  event: "clerk/user.created"
}, async ({ event, step }) => {

  // This function is triggered when a new user is created in Clerk
  // This is to check if the webhook is valid
  await step.run("verify-webhook", () => {
    try {
      verifyWebHook(event?.data)
    } catch (error) {
      console.error("Webhook verification failed:", error);
      throw new NonRetriableError("Invalid webhook signature");
    }
  })

  // Here you can add logic to create a user in your database
  const userId = await step.run("create-db-user", async () => {
    const user = event?.data?.data;
    const email = user?.email_addresses?.find(email => email.id === user.primary_email_address_id);

    if (!email) {
      throw new NonRetriableError("Primary email address not found for user");
    }


    await insertUserToDb({
      id: user.id,
      email: email.email_address,
      name: user?.first_name + " " + user?.last_name,
      imageUrl: user?.image_url,
      createdAt: new Date(user.created_at),
      updatedAt: new Date(user.updated_at)
    })

    return user?.id;
  });

  //This function is to cretae user notification settings
  await step.run("create-user-notification-settings", async () => {
    const userNotificationSettings = {
      userId,
    };

    await createUserNotificationSettings(userNotificationSettings);
  });

})
export const clerkUpdateUser = inngest.createFunction({
  id: "clerk/update-db-user",
  name: "Clerk - Update DB User",
}, {
  event: "clerk/user.updated"
}, async ({ event, step }) => {

  // This function is triggered when a new user is created in Clerk
  // This is to check if the webhook is valid
  await step.run("verify-webhook", () => {
    try {
      verifyWebHook(event?.data)
    } catch (error) {
      console.error("Webhook verification failed:", error);
      throw new NonRetriableError("Invalid webhook signature");
    }
  })

  // Here you can add logic to create a user in your database
  await step.run("update-db-user", async () => {
    const user = event?.data?.data;
    const email = user?.email_addresses?.find(email => email.id === user.primary_email_address_id);

    if (!email) {
      throw new NonRetriableError("Primary email address not found for user");
    }


    await updateUserInDb(user?.id, {
      email: email.email_address,
      name: user?.first_name + " " + user?.last_name,
      imageUrl: user?.image_url,
      updatedAt: new Date(user.updated_at)
    })

    return user?.id;
  });

})
export const clerkDeleteUser = inngest.createFunction({
  id: "clerk/delete-db-user",
  name: "Clerk - Delete DB User",
}, {
  event: "clerk/user.deleted"
}, async ({ event, step }) => {

  // This function is triggered when a new user is created in Clerk
  // This is to check if the webhook is valid
  await step.run("verify-webhook", () => {
    try {
      verifyWebHook(event?.data)
    } catch (error) {
      console.error("Webhook verification failed:", error);
      throw new NonRetriableError("Invalid webhook signature");
    }
  })

  // Here you can add logic to create a user in your database
  await step.run("create-db-user", async () => {
    const { id } = event?.data?.data;

    if (!id) {
      throw new NonRetriableError("Primary email address not found for user");
    }

    await deleteUserFromDb(id)
  });

})