import { boolean, pgTable, varchar } from "drizzle-orm/pg-core"
import { createdAt, updatedAt } from "../schemaHelper"
import { User } from "./user-schema"
import { relations } from "drizzle-orm"

export const UserNotificationSettings = pgTable(
  "user_notification_settings",
  {
    userId: varchar()
      .primaryKey()
      .references(() => User.id),
    newJobEmailNotifications: boolean().notNull().default(false),
    aiPrompt: varchar(),
    createdAt,
    updatedAt,
  }
)

export const UserNotificationSettingsRelations = relations(
  UserNotificationSettings, ({ one }) => ({
    user: one(User, {
      fields: [UserNotificationSettings.userId],
      references: [User.id]
    })
  })
)

