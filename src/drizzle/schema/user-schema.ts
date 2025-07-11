import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schemaHelper";
import { relations } from "drizzle-orm";
import { UserResume } from "./userResume-schema";
import { UserNotificationSettings } from "./userNotificationSettings-schema";
import { OrganizationUserSettings } from "./organizationUserSettings-schema";

export const User = pgTable("users", {
  id: varchar().primaryKey().notNull(),
  name: varchar().notNull(),
  email: varchar().notNull().unique(),
  imageUrl: varchar().notNull(),
  createdAt,
  updatedAt,
})

export const userRelations = relations(User, ({ one, many }) => ({
  resume: one(UserResume),
  notificationSettings: one(UserNotificationSettings),
  organizationUserSettings: many(OrganizationUserSettings)
}))