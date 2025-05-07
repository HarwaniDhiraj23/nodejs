import * as userRepo from '../repositories/userRepositories';
import User from '../models/User';
import { jest } from "@jest/globals";

jest.mock('../models/User', () => ({
  __esModule: true,
  default: {
    create: jest.fn(),
    findOne: jest.fn(),
  },
}));

type JestMock<T extends (...args: any[]) => any = (...args: any[]) => any> = jest.Mock<T>;

describe('User Repositories', () => {
  const mockUserInput = {
    email: 'test@example.com',
    name: 'Test User',
    password: 'hashedpass123',
  };

  const mockedUser = {
    id: 1,
    email: 'test@example.com',
    get: jest.fn().mockReturnValue({
      id: 1,
      email: 'test@example.com',
    }),
  };

  it('should find user by email', async () => {
    (User.findOne as JestMock).mockResolvedValue(mockedUser);

    const result = await userRepo.findUserByEmail('test@example.com');
    expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
    expect(result).toEqual(mockedUser);
  });

  it('should create a user', async () => {
    (User.create as JestMock).mockResolvedValue(mockedUser);

    const result = await userRepo.createUser(mockUserInput);
    expect(User.create).toHaveBeenCalledWith(mockUserInput);
    expect(result).toEqual(mockedUser);
  });
});
