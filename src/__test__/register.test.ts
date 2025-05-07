// tests/register.test.ts

import { registerUser } from '../services/userServices';
import * as userRepo from '../repositories/userRepositories';
import * as hashUtils from '../utils/hash';
import * as mailer from '../utils/mailer';
import { Request } from 'express';
import { jest } from "@jest/globals";

jest.mock('../repositories/userRepositories');
jest.mock('../repositories/userRepositories');
jest.mock('../utils/hash');
jest.mock('../utils/mailer');

describe('registerUser', () => {
    const mockReq = {
        body: {
            name: 'John Doe',
            email: 'john@example.com',
            password: 'Password123',
        },
    } as Request;

    const mockUser = {
        get: jest.fn().mockReturnValue({
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            status: 0,
        }),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should register a new user and return user without password and otp', async () => {
        const mockFindUserByEmail = userRepo.findUserByEmail as jest.MockedFunction<typeof userRepo.findUserByEmail>;
        const mockHashPassword = hashUtils.hashPassword as jest.MockedFunction<typeof hashUtils.hashPassword>;
        const mockCreateUser = userRepo.createUser as jest.MockedFunction<typeof userRepo.createUser>;
        const mockSendMail = mailer.sendMail as jest.MockedFunction<typeof mailer.sendMail>;

        mockFindUserByEmail.mockResolvedValue(null);
        mockHashPassword.mockResolvedValue('hashedpassword');
        mockCreateUser.mockResolvedValue(mockUser as any);
        mockSendMail.mockResolvedValue();

        const result = await registerUser(mockReq);

        expect(mockFindUserByEmail).toHaveBeenCalledWith('john@example.com');
        expect(mockHashPassword).toHaveBeenCalledWith('Password123');
        expect(mockCreateUser).toHaveBeenCalled();
        expect(mockSendMail).toHaveBeenCalled();
        expect(result).toBe(mockUser);
    });

    it('should throw error if email already exists', async () => {
        const mockFindUserByEmail = userRepo.findUserByEmail as jest.MockedFunction<typeof userRepo.findUserByEmail>;

        mockFindUserByEmail.mockResolvedValue({ id: 1, email: 'john@example.com' } as any);

        await expect(registerUser(mockReq)).rejects.toThrow();
    });
});
