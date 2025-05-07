import Joi from 'joi';

export const getWeather = Joi.object({
    city: Joi.string().required(),
});