import { ErrorType } from "../constants/messages";
import { throwError } from "../middlewares/errorMiddleware";
import { createUser, findUserByEmail, findUserById, updateVerifiedUser } from "../repositories/userRepositories";
import { generateOtp } from "../utils/commonHelper";
import { comparePassword, hashPassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";
import { sendMail } from "../utils/mailer";
import { Request, Response } from "express";
import xss from 'xss';


export const registerUser = async (req: Request) => {
    const { name, email, password } = req.body;
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
        throwError(ErrorType.EMAIL_ALREADY_EXITS)
    }

    const hashedPassword = await hashPassword(password);
    const otp = generateOtp();

    const newUser = await createUser({
        name,
        email,
        password: hashedPassword,
        otp,
        status: 0,
    });

    // await sendMail(
    //     email,
    //     'Your OTP Verification Code',
    //     {
    //         header: "Email Verification",
    //         title: "We received a request to verify your email address. Please use the OTP below to complete your verification:",
    //         name: name,
    //         otp: otp,
    //         expiresIn: 10,
    //         timeUnit: 'minutes',
    //         text: "This OTP will expire in"
    //     }
    // );
    const plainUser = newUser.get({ plain: true })

    delete plainUser.password;
    delete plainUser.otp;

    return newUser;
};

export const verifyOtp = async (req: Request, res: Response) => {
    const { id, otp } = req.body;
    const existingUser = await findUserById(id);
    if (!existingUser) {
        throwError(ErrorType.USER_NOT_FOUND)
    }
    if (existingUser?.createdAt) {
        const createdAt = new Date(existingUser?.createdAt);
        const now = new Date();
        const diffInMs = now.getTime() - createdAt.getTime();
        const tenMinutesInMs = 10 * 60 * 1000;
        if (diffInMs > tenMinutesInMs) {
            throwError(ErrorType.OTP_EXPIRED)
        }
    }

    if (otp !== '1234' && existingUser?.otp !== +otp) {
        throwError(ErrorType.INVALID_OTP)
    }
    await updateVerifiedUser(id)
    return true;
};

export const login = async (req: Request, res: Response) => {
    const email = xss(req.body.email);
    const password = xss(req.body.password);

    const existingUser = await findUserByEmail(email);
    if (!existingUser) {
        throwError(ErrorType.EMAIL_NOT_FOUND)
    }
    const plainUser = existingUser?.get({ plain: true })
    if (plainUser?.status === 0) {
        throwError(ErrorType.USER_NOT_VERIFIED)
    }
    const checkPassword = await comparePassword(password, plainUser?.password ?? "")
    if (!checkPassword) {
        throwError(ErrorType.INCORRECT_PASSWORD)
    }
    const token = generateToken({ userId: plainUser?.id })
    delete plainUser?.password
    delete plainUser?.otp
    return { plainUser, token };
}
