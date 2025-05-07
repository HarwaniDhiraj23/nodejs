import request from 'supertest';
import app from '../app';
import * as userRepo from '../services/userServices';
import { jest } from "@jest/globals";
import User from '../models/User';

jest.mock('../services/userServices');
jest.mock('../utils/hash');
jest.mock('../utils/mailer');

const mockUser = {
    get: () => ({
        createdAt: "2025-05-01T06:51:17.816Z",
        updatedAt: "2025-05-01T06:51:17.817Z",
        id: 34,
        name: "Test User",
        email: "tes1212@example.com",
        status: 0
    }),
} as unknown as Partial<User> as User;

describe('POST /register', () => {
    it('should return 200 OK and success response for new user', async () => {
        (userRepo.registerUser as jest.MockedFunction<typeof userRepo.registerUser>).mockResolvedValue(mockUser);

        const res = await request(app)
            .post('/api/users/register')
            .send({
                name: 'Test User',
                email: 'tes1212@example.com',
                password: 'Test@123',
            });
        console.log("response =>", res.body)
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
    });
});
