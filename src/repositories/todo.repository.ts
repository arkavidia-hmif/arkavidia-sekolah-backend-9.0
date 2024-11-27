import type { Database } from '../db/drizzle';
import type { z } from 'zod';
import type {
	GetListTodoQuerySchema,
	PostTodoBodySchema,
	PutTodoBodySchema,
} from '~/types/todo.type';
import { and, eq } from 'drizzle-orm';
import { todo } from '../db/schema/todo.schema';

export const getTodos = async (
	db: Database,
	q: z.infer<typeof GetListTodoQuerySchema>,
) => {
	const isCompletedQ =
		q.isCompleted === 'true'
			? eq(todo.isCompleted, true)
			: q.isCompleted === 'false'
				? eq(todo.isCompleted, false)
				: undefined;
	const userIdQ = q.userId ? eq(todo.authorId, q.userId) : undefined;
	return await db.select().from(todo).where(and(isCompletedQ, userIdQ));
};

export const getTodoById = async (db: Database, id: string) => {
	return await db.select().from(todo).where(eq(todo.id, id));
};

export const createTodo = async (
	db: Database,
	body: z.infer<typeof PostTodoBodySchema>,
) => {
	return await db.insert(todo).values(body).returning();
};

export const updateTodo = async (
	db: Database,
	id: string,
	body: z.infer<typeof PutTodoBodySchema>,
) => {
	return await db.update(todo).set(body).where(eq(todo.id, id)).returning();
};

export const deleteTodo = async (db: Database, id: string) => {
	return await db.delete(todo).where(eq(todo.id, id)).returning();
};
