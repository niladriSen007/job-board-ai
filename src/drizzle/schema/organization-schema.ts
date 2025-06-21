import { pgTable, varchar } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { JobListing } from "./joblisting-schema"
import { OrganizationUserSettings } from "./organizationUserSettings-schema"
import { createdAt, updatedAt } from "../schemaHelper"

export const Organization = pgTable("organizations", {
  id: varchar().primaryKey(),
  name: varchar().notNull(),
  imageUrl: varchar(),
  createdAt,
  updatedAt,
})

export const organizationRelations = relations(
  Organization,
  ({ many }) => ({
    jobListings: many(JobListing),
    organizationUserSettings: many(OrganizationUserSettings),
  })
)