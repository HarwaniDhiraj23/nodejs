import Joi from 'joi';

export const createTodoSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required()
});

export const editTodoSchema = Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional()
});