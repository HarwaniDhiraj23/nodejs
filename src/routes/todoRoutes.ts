import express from 'express';
import { validateRequest } from '../middlewares/validateRequest';
import { getTodos, addTodos, editTodo, deleteTodo, completedTodo } from '../controller/todoController';
import { authenticate } from '../middlewares/authentication';
import { createTodoSchema, editTodoSchema } from '../validators/todo.validator';
import { getUserByIdSchema } from '../validators/user.validator';

const router = express.Router();

router.get("/getTodos", authenticate, getTodos)
router.post("/addTodos", authenticate, validateRequest({ body: createTodoSchema }), addTodos)
router.put("/editTodo/:id", authenticate, validateRequest({ params: getUserByIdSchema, body: editTodoSchema }), editTodo)
router.delete("/deleteTodo/:id", authenticate, validateRequest({ params: getUserByIdSchema }), deleteTodo)
router.patch("/completedTodo/:id", authenticate, validateRequest({ params: getUserByIdSchema }), completedTodo)

export default router;