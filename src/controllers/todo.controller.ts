import { db } from '../db/drizzle';
import {
	createTodo,
	deleteTodo,
	getTodoById,
	getTodos,
	updateTodo,
} from '../repositories/todo.repository';
import {
	deleteTodoRoute,
	getListTodoRoute,
	getTodoRoute,
	postTodoRoute,
	putTodoRoute,
} from '../routes/todo.route';
import { createRouter } from '../utils/router-factory';

export const todoRouter = createRouter();

todoRouter.openapi(getTodoRoute, async (c) => {
	const todo = await getTodoById(db, c.req.valid('param').id);
	if (todo.length > 0) return c.json(todo, 200); // Check apakah ada todo dengan ID tersebut
	return c.json({ error: `No todo with id ${c.req.valid('param').id}` }, 400);
});

todoRouter.openapi(getListTodoRoute, async (c) => {
	const todo = await getTodos(db, c.req.valid('query'));
	return c.json(todo, 200);
});

todoRouter.openapi(postTodoRoute, async (c) => {
	const todo = await createTodo(db, c.req.valid('json'));
	return c.json(todo, 201);
});

todoRouter.openapi(putTodoRoute, async (c) => {
	const todo = await updateTodo(
		db,
		c.req.valid('param').id,
		c.req.valid('json'),
	);
	if (todo.length > 0) return c.json(todo, 200); // Check apakah ada update ID tersebut berhasil di-update
	return c.json({ error: `No todo with id ${c.req.valid('param').id}` }, 400);
});

todoRouter.openapi(deleteTodoRoute, async (c) => {
	const todo = await deleteTodo(db, c.req.valid('param').id);
	if (todo.length > 0) return c.json(todo, 200); // Check apakah ada update ID tersebut di-delete
	return c.json({ error: `No todo with id ${c.req.valid('param').id}` }, 400);
});
