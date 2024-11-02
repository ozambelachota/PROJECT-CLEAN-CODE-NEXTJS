import { relations } from "drizzle-orm";
import { int, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
  id: int("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
});
export const tasksTable = sqliteTable("tasks", {
  id: int("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  completed: integer("completed", { mode: "boolean" }).notNull().default(false),
  userId: int("user_id")
    .notNull()
    .references(() => usersTable.id),
});
export const user_relation = relations(usersTable, ({ many }) => ({
  tasks: many(tasksTable, {
    relationName: "tasks",
  }),
}));
