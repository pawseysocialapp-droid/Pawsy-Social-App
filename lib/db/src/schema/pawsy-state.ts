import { jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const pawsyStateTable = pgTable("pawsy_state", {
  id: text("id").primaryKey(),
  state: jsonb("state").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type PawsyStateRow = typeof pawsyStateTable.$inferSelect;