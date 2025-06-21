import { relations } from 'drizzle-orm';
import { createdAt, updatedAt } from '../schemaHelper';
import { User } from './user-schema';
import { pgTable, varchar } from "drizzle-orm/pg-core";

export const UserResume = pgTable("user_resumes", {
  userId: varchar()
    .primaryKey()
    .references(() => User.id),
  resumeFileUrl: varchar().notNull(),
  resumeFileKey: varchar().notNull(),
  aiSummary: varchar(),
  createdAt,
  updatedAt,
})

export const UserResumeRelations = relations(UserResume, ({ one }) => ({
  user: one(User, {
    fields: [UserResume.userId],
    references: [User.id]
  })
}))