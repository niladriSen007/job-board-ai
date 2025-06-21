import { integer, pgTable, primaryKey, text, uuid, varchar } from "drizzle-orm/pg-core";

import { User } from "./user-schema";
import { applicationStageEnum } from "./types";
import { createdAt, updatedAt } from "../schemaHelper";
import { JobListing } from "./joblisting-schema";
import { relations } from "drizzle-orm";

export const JobListingApplication = pgTable(
  "job_listing_applications",
  {
    jobListingId: uuid()
      .references(() => JobListing.id, { onDelete: "cascade" })
      .notNull(),
    userId: varchar()
      .references(() => User.id, { onDelete: "cascade" })
      .notNull(),
    coverLetter: text(),
    rating: integer(),
    stage: applicationStageEnum().notNull().default("applied"),
    createdAt,
    updatedAt,
  },
  table => [primaryKey({ columns: [table.jobListingId, table.userId] })]
)

export const JobListingApplicationRelations = relations(
  JobListingApplication, ({ one }) => ({
    jobListing: one(JobListing, {
      fields: [JobListingApplication.jobListingId],
      references: [JobListing.id]
    }),
    user: one(User, {
      fields: [JobListingApplication.userId],
      references: [User.id]
    })
  })
)
