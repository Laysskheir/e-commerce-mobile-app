import { Request, Response } from 'express';
import { authController } from '../../controllers/auth.controller';
import { AuthService } from '../../services/auth.service';

jest.mock('../../services/auth.service');

describe('Auth Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    req = {};
    res = { status: statusMock };
  });

  test('should register a user', async () => {
    req.body = { email: 'test@example.com', password: 'password123' };
    const mockUser = { email: 'test@example.com' };
    AuthService.prototype.register = jest.fn().mockResolvedValue(mockUser);

    await authController.register(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith({ user: mockUser });
  });

  // Add more tests for login and other auth methods
});