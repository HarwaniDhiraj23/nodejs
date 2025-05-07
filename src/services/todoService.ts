import { ErrorType } from "../constants/messages";
import { throwError } from "../middlewares/errorMiddleware";
import { findTodoById, addNewTodo, editTodo, deleteTodo, completeTodo } from "../repositories/todoRepositories";
import { Request, Response } from "express";

export const getTodosService = async (req: any, res: Response) => {
    const userId = req.user?.userId;
    if (!userId) {
        throwError(ErrorType.UNAUTHORIZED)
    }
    const todos = await findTodoById(userId);
    return todos;
};

export const addTodoService = async (req: any, res: Response) => {
    const userId = req.user?.userId;
    const { title, description } = req.body
    const todos = await addNewTodo({ title, description, userId });
    return todos

}


export const editTodoService = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const todoId = parseInt(id);
    if (isNaN(todoId)) {
        throwError(ErrorType.UNAUTHORIZED)
    }
    const updatedTodo = await editTodo(todoId, { title, description });
    return updatedTodo
};

export const deleteTodoService = async (req: Request, res: Response) => {
    const { id } = req.params;
    const todoId = parseInt(id);
    if (isNaN(todoId)) {
        throwError(ErrorType.INVALID_TODO)
    }
    const deletedCount = await deleteTodo(todoId);
    if (deletedCount === 0) {
        throwError(ErrorType.TODO_ALREADY_DELETED)
    }
    return true
};

export const compleatTodoService = async (req: Request, res: Response) => {
    const { id } = req.params;
    const todoId = parseInt(id);
    if (isNaN(todoId)) {
        throwError(ErrorType.INVALID_TODO)
    }
    const completedTodo = await completeTodo(todoId);
    return completedTodo
};