import { Request, Response } from "express";
import { successResponse } from "../utils/responseHelper";
import { HttpStatus } from "../utils/httpStatus";
import { COMMON_MESSAGES } from "../constants/messages";
import { getTodosService, addTodoService, editTodoService, deleteTodoService, compleatTodoService } from "../services/todoService";

export const getTodos = async (req: Request, res: Response) => {
    const todo = await getTodosService(req, res);
    successResponse(res, HttpStatus.OK, true, COMMON_MESSAGES.SUCCESS, todo);
};

export const addTodos = async (req: Request, res: Response) => {
    const newTodo = await addTodoService(req, res);
    successResponse(res, HttpStatus.OK, true, COMMON_MESSAGES.SUCCESS, newTodo);

}

export const editTodo = async (req: Request, res: Response) => {
    const newTodo = await editTodoService(req, res);
    successResponse(res, HttpStatus.OK, true, COMMON_MESSAGES.SUCCESS, newTodo);
}

export const deleteTodo = async (req: Request, res: Response) => {
    await deleteTodoService(req, res);
    successResponse(res, HttpStatus.OK, true, COMMON_MESSAGES.SUCCESS, true);
}

export const completedTodo = async (req: Request, res: Response) => {
    const completed = await compleatTodoService(req, res);
    successResponse(res, HttpStatus.OK, true, COMMON_MESSAGES.SUCCESS, completed);
}