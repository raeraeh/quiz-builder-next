import { relations } from "drizzle-orm";
import {AnySQLiteColumn, sqliteTable, text, integer} from "drizzle-orm/sqlite-core";
import { v4 as uuidv4 } from 'uuid';

export const quizzes = sqliteTable("quizzes", {
    id: text("id").primaryKey().$default(() => uuidv4()),
    name: text("name"),
});


export const quizzesRelations = relations(quizzes, ({ many }) => ({
  steps: many(steps),
}));

export const steps = sqliteTable("steps", {
    id: text("id").primaryKey().$default(() => uuidv4()),
    name: text("name"),
    quizId: text("quizId").references((): AnySQLiteColumn => quizzes.id, { onDelete: "cascade" }),
});

export const stepsRelations = relations(steps, ({ one, many }) => ({
  quiz: one(quizzes, {
    fields: [steps.quizId],
    references: [quizzes.id],
  }),
blocks: many(blocks)
}));

export const blocks = sqliteTable("blocks", {
  id: text("id").primaryKey().$default(() => uuidv4()),
  stepId: text("stepId").references((): AnySQLiteColumn => steps.id, { onDelete: "cascade" }),
  position: integer("position"),
  type: text("type"),
  data:text('', { mode: 'json' })
});

export const blocksRelations = relations(blocks, ({ one }) => ({
  step: one(steps, {
    fields: [blocks.stepId],
    references: [steps.id],
  }),
}));