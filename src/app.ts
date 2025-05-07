import express, { Request, Response } from 'express';
import config from './config';
import fileRoutes from './routes/fileRoutes';
import userRoutes from './routes/userRoutes';
import todoRoutes from "./routes/todoRoutes";
import weatherRoutes from "./routes/weatherRoutes";
import cors from 'cors';
// import { logger } from './middlewares/logger';
import morgan from 'morgan';
// import csurf from 'csurf';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { errorHandler } from './middlewares/errorMiddleware';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';
import path from 'path';
import hourlyJob from './utils/scheduler';
import { registerEmailListeners } from './events/emailListeners';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    })
);

app.use(morgan('common'));


// app.use(logger)

app.use(cookieParser());
// app.use(csurf({ cookie: true }));

// app.get('/csrf-token', (req, res) => {
//     console.log('Generated CSRF Token:', req.csrfToken());
//     res.json({ csrfToken: req.csrfToken() });
// });

app.use(helmet());
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            objectSrc: ["'none'"],
            upgradeInsecureRequests: [],
        }
    }
}));

app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ limit: '100kb', extended: true }));

app.use('/uploads', express.static('uploads'));
app.use('/api/files', fileRoutes);
app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/3rdParty', weatherRoutes)



app.get('/', (req: Request, res: Response) => {
    const protocol = req.protocol.toUpperCase();
    res.send(`Hello from ${protocol} server! Running in ${config.env} mode on port ${config.port} and url is ${config.dbUrl}`);
});

app.use(errorHandler);

hourlyJob()

registerEmailListeners()

const swaggerDocument = yaml.load(path.join(__dirname, 'swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
