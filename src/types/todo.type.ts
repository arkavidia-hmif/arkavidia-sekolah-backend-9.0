import { type createRoute, z } from '@hono/zod-openapi';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { todo } from '../db/schema/todo.schema';

/** RESPONSE SCHEMAS */
export const TodoSchema = createSelectSchema(todo, {
	createdAt: z.union([z.string(), z.date()]),
}).openapi('Todo');

export const ListTodoSchema = z.array(TodoSchema);

/** RESPONSE SCHEMAS */
export const GetListTodoQuerySchema = z.object({
	isCompleted: z
		.enum(['true', 'false'])
		.optional()
		.openapi({
			param: {
				in: 'query',
				example: 'true',
				required: false,
			},
		}),
	userId: z
		.string()
		.optional()
		.openapi({
			param: {
				in: 'query',
				example: 'arpjv19i',
				required: false,
			},
		}),
});

export const IdTodoPathSchema = z.object({
	id: z.string().openapi({
		param: {
			in: 'path',
			example: 'arpjv19i',
		},
	}),
});

export const PostTodoBodySchema = createInsertSchema(todo).omit({
	id: true,
	createdAt: true,
	updatedAt: true,
	isCompleted: true,
});

export const PutTodoBodySchema = createInsertSchema(todo)
	.omit({
		id: true,
		createdAt: true,
		updatedAt: true,
	})
	.partial();
