import { db } from "@/drizzle/db";
import { UserNotificationSettings } from "@/drizzle/schema";

export async function createUserNotificationSettings
  (settings: typeof UserNotificationSettings.$inferInsert) {
  await db.insert(UserNotificationSettings).values(settings).onConflictDoNothing();
}