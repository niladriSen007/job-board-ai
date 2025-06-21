
import { boolean, index, integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelper";
import { Organization } from "./organization-schema";
import { experienceLevelEnum, jobListingStatusEnum, jobListingTypeEnum, locationRequirementEnum, salaryIntervalsEnum } from "./types";
import { relations } from 'drizzle-orm';
import { JobListingApplication } from './joblistingapplication-schema';


export const JobListing = pgTable("job_listings", {
  id,
  organizationId: varchar().references(() => Organization.id, { onDelete: "cascade" }).notNull(),
  title: varchar().notNull(),
  description: text().notNull(),
  salary: integer(),
  salaryInterval: salaryIntervalsEnum(),
  stateAbbreviation: varchar().notNull(),
  city: varchar(),
  isFeatured: boolean().notNull().default(false),
  locationRequirement: locationRequirementEnum().notNull(),
  experienceLevel: experienceLevelEnum().notNull(),
  status: jobListingStatusEnum().notNull().default("draft"),
  type: jobListingTypeEnum().notNull(),
  postedAt: timestamp({ withTimezone: true }),
  createdAt,
  updatedAt
},
  table => [index().on(table.stateAbbreviation)]
)

export const JobListingRelations = relations(
  JobListing, ({ one, many }) => ({
    organization: one(Organization, {
      fields: [JobListing.organizationId],
      references: [Organization.id]
    }),
    applications: many(JobListingApplication)
  })
)
