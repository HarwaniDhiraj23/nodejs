import Joi from 'joi';

export const createUserSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .min(8)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
        .required()
        .messages({
            'string.pattern.base':
                'Password must be 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
        })
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
        .min(8)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
        .required()
        .messages({
            'string.pattern.base':
                'Password must be 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
        })
});

export const getUserByIdSchema = Joi.object({
    id: Joi.number().required()
});

export const updateUserSchema = Joi.object({
    name: Joi.string().min(3).max(30).optional(),
    email: Joi.string().email().optional(),
});

export const verifyOtpSchema = Joi.object({
    id: Joi.number().required(),
    otp: Joi.number().required(),
});
