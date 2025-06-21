import { pgEnum } from "drizzle-orm/pg-core";

export const salaryIntervals = ["monthly", "yearly","hourly"] as const;
export type SalaryIntervalType = (typeof salaryIntervals)[number];
export const salaryIntervalsEnum= pgEnum("salary_intervals", salaryIntervals);


export const locationRequirements = ["in-office", "hybrid", "remote"] as const
export type LocationRequirement = (typeof locationRequirements)[number]
export const locationRequirementEnum = pgEnum(
  "job_listings_location_requirement",
  locationRequirements
)

export const experienceLevels = ["junior", "mid-level", "senior"] as const
export type ExperienceLevel = (typeof experienceLevels)[number]
export const experienceLevelEnum = pgEnum(
  "job_listings_experience_level",
  experienceLevels
)

export const jobListingStatuses = ["draft", "published", "delisted"] as const
export type JobListingStatus = (typeof jobListingStatuses)[number]
export const jobListingStatusEnum = pgEnum(
  "job_listings_status",
  jobListingStatuses
)

export const jobListingTypes = ["internship", "part-time", "full-time"] as const
export type JobListingType = (typeof jobListingTypes)[number]
export const jobListingTypeEnum = pgEnum("job_listings_type", jobListingTypes)

export const applicationStages = [
  "denied",
  "applied",
  "interested",
  "interviewed",
  "hired",
] as const
export type ApplicationStage = (typeof applicationStages)[number]
export const applicationStageEnum = pgEnum(
  "job_listing_applications_stage",
  applicationStages
)