import { db } from "@/drizzle/db";
import { User } from "@/drizzle/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function getCurrentUser({ allData = false } = {}) {
  const { userId } = await auth()
  if (!userId) return null;

  if (allData) {
    const user = await db.query.User.findFirst({
      where: eq(User.id, userId),
    });
    return {
      user,
      id: userId,
    };
  }

  return { user: undefined, id: userId };
}