import { boolean, integer, pgTable, primaryKey, varchar } from "drizzle-orm/pg-core";
import { User } from "./user-schema";
import { Organization } from "./organization-schema";
import { createdAt, updatedAt } from "../schemaHelper";
import { relations } from "drizzle-orm";


export const OrganizationUserSettings = pgTable(
  "organization_user_settings",
  {
    userId: varchar()
      .notNull()
      .references(() => User.id),
    organizationId: varchar()
      .notNull()
      .references(() => Organization.id),
    newApplicationEmailNotifications: boolean().notNull().default(false),
    minimumRating: integer(),
    createdAt,
    updatedAt,
  },
  table => [primaryKey({ columns: [table.userId, table.organizationId] })]
)

export const OrganizationUserSettingsRelations = relations(
  OrganizationUserSettings, ({ one }) => ({
    user: one(User, {
      fields: [OrganizationUserSettings.userId],
      references: [User.id]
    }),
    organization: one(Organization, {
      fields: [OrganizationUserSettings.organizationId],
      references: [Organization.id]
    })
  })
)

