import { db } from "@/drizzle/db";
import { User } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function insertUserToDb(user: typeof User.$inferInsert) {
  await db.insert(User).values(user).onConflictDoNothing();
}

export const updateUserInDb = async (userId: string, user: Partial<typeof User.$inferInsert>) => {
  await db.update(User).set(user).where(eq(User.id, userId));
};

export const deleteUserFromDb = async (userId: string) => {
  await db.delete(User).where(eq(User.id, userId)).returning();
};

