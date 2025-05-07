// import { AddUserRequestBody, UpdateUserRequestBody } from '../Interface/user';
// import { COMMON_MESSAGES } from '../constants/messages';
// import dbHelper from '../utils/dbHelper';
// import { comparePassword, hashPassword } from '../utils/hash';
// import { HttpStatus } from '../utils/httpStatus';
// import { generateToken } from '../utils/jwt';
// import { sendMail } from '../utils/mailer';
// import { successResponse, errorResponse } from '../utils/responseHelper';
// import { Request, Response } from 'express';
//
// export const getUserById = async (req: Request<{ id: string }, {}, {}>,
//     res: Response) => {
//     const { id } = req.params;
//     try {
//         const userFound = await dbHelper.select('users', 'id,name,email,created_at', `id = '${id}'`);
//         if (userFound.length === 0) {
//             errorResponse(res, HttpStatus.NOT_FOUND, COMMON_MESSAGES.USER_NOT_FOUND, null);
//         }
//         return userFound
//     } catch (error) {
//         console.error('error', error);
//         errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, COMMON_MESSAGES.FETCH_ERROR, error);
//     }
// };
//
// export const getUsers = async (
//     req: any,
//     res: Response
// ): Promise<void> => {
//     try {
//         const users = await dbHelper.select('users', 'id,name,email,created_at', `id = '${req.user.userId}'`);
//         successResponse(res, HttpStatus.OK, true, COMMON_MESSAGES.SUCCESS, users);
//     } catch (error) {
//         console.error('error', error);
//         errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, COMMON_MESSAGES.FETCH_ERROR, error);
//     }
// };
//
// export const addUser = async (
//     req: Request<{}, {}, AddUserRequestBody>,
//     res: Response
// ): Promise<void> => {
//     try {
//         const { name, email, password } = req.body;
//         const where = `email = '${email}'`
//         const emailFound = await dbHelper.select('users', '*', where);
//         if (emailFound.length > 0) {
//             errorResponse(
//                 res, HttpStatus.BAD_REQUEST, COMMON_MESSAGES.EMAIL_ALREADY_EXITS, null
//             );
//         }
//         const users = await dbHelper.insert('users', { name, email, password: await hashPassword(password) });
//         delete users.password
//         successResponse(res, HttpStatus.OK, true, COMMON_MESSAGES.USER_ADDED, users);
//     } catch (error) {
//         console.error('error', error);
//         errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, COMMON_MESSAGES.FETCH_ERROR, error);
//     }
// };
//
// export const deleteUserById = async (
//     req: Request<{ id: string }, {}, {}>,
//     res: Response
// ): Promise<void> => {
//     const { id } = req.params;
//     try {
//         await getUserById(req, res)
//         await dbHelper.delete('users', `id = '${id}'`);
//         successResponse(res, HttpStatus.OK, true, COMMON_MESSAGES.USER_DELETED, null);
//     } catch (error) {
//         console.error('Error while deleting user:', error);
//         errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, COMMON_MESSAGES.FETCH_ERROR, error);
//     }
// };
//
// export const updateUserById = async (
//     req: Request<{ id: string }, {}, UpdateUserRequestBody>,
//     res: Response
// ): Promise<void> => {
//     const { id } = req.params;
//     const { name, email } = req.body;
//     try {
//         await getUserById(req, res)
//         const payload: UpdateUserRequestBody = {};
//         if (name) payload.name = name;
//         if (email) payload.email = email;
//
//         await dbHelper.update('users', `id = '${id}'`, payload);
//         const users = await getUserById(req, res)
//         successResponse(res, HttpStatus.OK, true, COMMON_MESSAGES.USER_UPDATED, users);
//     } catch (error) {
//         console.error('Error while deleting user:', error);
//         errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, COMMON_MESSAGES.FETCH_ERROR, error);
//     }
// };
//
// export const loginUser = async (
//     req: Request<{}, {}, { email: string, password: string }>,
//     res: Response
// ): Promise<void> => {
//     try {
//         const { email, password } = req.body;
//         const where = `email = '${email}'`
//         const emailFound = await dbHelper.select('users', '*', where);
//         if (emailFound.length === 0) {
//             errorResponse(
//                 res, HttpStatus.NOT_FOUND, COMMON_MESSAGES.EMAIL_NOT_FOUND, null
//             );
//         }
//         const comparePass = await comparePassword(password, emailFound[0].password)
//         console.log("emailFound =>", comparePass)
//         if (!comparePass) {
//             errorResponse(
//                 res, HttpStatus.UNAUTHORIZED, COMMON_MESSAGES.INCORRECT_PASSWORD, null
//             );
//         }
//         delete emailFound[0].password
//         await sendMail(
//             'k7855453@gmail.com',
//             'Your OTP Verification Code',
//             {
//                 header: "Email Verification",
//                 title: "We received a request to verify your email address. Please use the OTP below to complete your verification:",
//                 name: 'Dhiraj',
//                 otp: 483729,
//                 expiresIn: 10,
//                 timeUnit: 'minutes',
//                 text: "This OTP will expire in"
//             }
//         );
//         successResponse(res, HttpStatus.OK, true, COMMON_MESSAGES.USER_LOGIN, emailFound, { token: generateToken({ userId: emailFound[0].id }) });
//     } catch (error) {
//         console.error('Error while deleting user:', error);
//         errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, COMMON_MESSAGES.FETCH_ERROR, error);
//     }
// };
//

import { Request, Response } from "express";
import { successResponse } from "../utils/responseHelper";
import { HttpStatus } from "../utils/httpStatus";
import { COMMON_MESSAGES } from "../constants/messages";
import { login, registerUser, verifyOtp } from "../services/userServices";
// import xss from "xss";

export const register = async (req: Request, res: Response) => {
    const newUser = await registerUser(req);
    successResponse(res, HttpStatus.OK, true, COMMON_MESSAGES.SUCCESS, newUser);
};

export const verifyUser = async (req: Request, res: Response) => {
    const newUser = await verifyOtp(req, res);
    successResponse(res, HttpStatus.OK, true, COMMON_MESSAGES.USER_VERIFIED, newUser);
};

export const loginUser = async (req: Request, res: Response) => {
    const newUser = await login(req, res);
    successResponse(res, HttpStatus.OK, true, COMMON_MESSAGES.USER_VERIFIED, newUser?.plainUser, { token: newUser?.token });
};
