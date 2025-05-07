import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET as string;

export const generateToken = (payload: object): string => {
    return jwt.sign(payload, secret, { expiresIn: '1h' });
};
