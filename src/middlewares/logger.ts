import { Request, Response, NextFunction } from 'express';

export const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`method : ${req.method} ${req.path}`);
    res.on('finish', () => {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
        console.log(`Status: ${res.statusCode}`);
    });
    next();
};
