import axios from 'axios';
import { Request, Response } from "express";
import { HttpStatus } from '../utils/httpStatus';
import { successResponse } from '../utils/responseHelper';
import { COMMON_MESSAGES } from '../constants/messages';

const WEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const NEWS_API_KEY = process.env.NEWS_API_KEY


export const getCurrentWeather = async (req: Request, res: Response) => {
    const city = req.body.city;

    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_API_KEY}`);

    const weatherData = response.data;

    const weather = {
        city: city,
        temperature: `${weatherData.main.temp} °C`,
        condition: weatherData.weather[0].description,
        windSpeed: weatherData.wind.speed,
    };

    successResponse(res, HttpStatus.OK, true, COMMON_MESSAGES.SUCCESS, weather);
};

export const getCurrentNews = async (req: Request, res: Response) => {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines?q=india&apiKey=${NEWS_API_KEY}`);
    successResponse(res, HttpStatus.OK, true, COMMON_MESSAGES.SUCCESS, response.data.articles);
};