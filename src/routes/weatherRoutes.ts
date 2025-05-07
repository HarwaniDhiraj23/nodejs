import express from 'express';
import { validateRequest } from '../middlewares/validateRequest';
import { authenticate } from '../middlewares/authentication';
import { getCurrentWeather,getCurrentNews } from '../controller/weatherApiController';
import { getWeather } from '../validators/weather.validator';

const router = express.Router();

router.get("/getWeather", authenticate,validateRequest({ body: getWeather }), getCurrentWeather)
router.get("/getNews",authenticate,getCurrentNews)

export default router;