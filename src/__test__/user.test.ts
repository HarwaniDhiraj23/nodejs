// import request from 'supertest';
// import app from '../app';

// describe('API Routes', () => {
//     it('user register with existing email', async () => {
//         const res = await request(app).post('/api/users/register').send({
//             "name": "dhiraj",
//             "email": "dhiraj@gmail.com",
//             "password": "Dhiraj@123"
//         });
//         expect(res.statusCode).toBe(409);
//     });
//     it('user should register POST /api/auth/account_register', async () => {
//         const res = await request(app).post('/api/users/register').send({
//             "name": "dhiraj",
//             "email": "deepasdfasdf@gmail.com",
//             "password": "Dhiraj@1233"
//         });
//         expect(res.statusCode).toBe(200);
//     });
// });


// import { Request, Response } from "express";
// import { register } from "../controller/userController";
// import { successResponse } from "../utils/responseHelper";
// import { HttpStatus } from "../utils/httpStatus";
// import { COMMON_MESSAGES } from "../constants/messages";
// import * as userServices from "../services/userServices";
// import { jest } from "@jest/globals";
// import User from "../models/User";

// // Mock the dependencies
// jest.mock("../services/userServices");
// jest.mock("../utils/responseHelper");

// describe("User Controller", () => {
//     let mockRequest: Partial<Request>;
//     let mockResponse: Partial<Response>;
//     let responseObject: any;

//     beforeEach(() => {
//         mockRequest = {};
//         mockResponse = {
//             status: jest.fn().mockReturnThis() as jest.MockedFunction<(code: number) => Response>,
//             json: jest.fn().mockImplementation((result) => {
//                 responseObject = result;
//                 return mockResponse;
//             }) as jest.MockedFunction<(body?: any) => Response>,
//         };
//         responseObject = {};
//     });

//     afterEach(() => {
//         jest.clearAllMocks();
//     });

//     describe("register", () => {
//         it("should register a new user successfully", async () => {
//             // Arrange
//             const mockUser = User.build({
//                 id: 1,
//                 name: 'John Doe',
//                 email: 'john@example.com',
//                 password: 'hashedPassword',
//                 status: 1,
//                 createdAt: new Date(),
//                 updatedAt: new Date(),
//             });
//             (userServices.registerUser as jest.MockedFunction<typeof userServices.registerUser>).mockResolvedValue(mockUser);
//             (successResponse as jest.MockedFunction<typeof successResponse>).mockImplementation(
//                 (res, status, success, message, data) => {
//                     return res.status(status).json({ success, message, data });
//                 }
//             );

//             mockRequest.body = {
//                 name: "Test User",
//                 email: "test@example.com",
//                 password: "password123",
//             };

//             // Act
//             await register(mockRequest as Request, mockResponse as Response);

//             // Assert
//             expect(userServices.registerUser).toHaveBeenCalledWith(mockRequest);
//             expect(successResponse).toHaveBeenCalledWith(
//                 mockResponse,
//                 HttpStatus.OK,
//                 true,
//                 COMMON_MESSAGES.SUCCESS,
//                 mockUser
//             );
//             expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
//             expect(responseObject).toEqual({
//                 success: true,
//                 message: COMMON_MESSAGES.SUCCESS,
//                 data: mockUser,
//             });
//         });

//         it("should handle errors from registerUser", async () => {
//             // Arrange
//             const error = new Error("Email already exists");
//             (userServices.registerUser as jest.MockedFunction<typeof userServices.registerUser>).mockRejectedValue(error);
//             mockRequest.body = {
//                 name: "Test User",
//                 email: "test@example.com",
//                 password: "password123",
//             };

//             // Act & Assert
//             await expect(
//                 register(mockRequest as Request, mockResponse as Response)
//             ).rejects.toThrow(error);
//             expect(userServices.registerUser).toHaveBeenCalledWith(mockRequest);
//             expect(successResponse).not.toHaveBeenCalled();
//         });
//     });
// });