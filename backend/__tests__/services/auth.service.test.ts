import { AuthService } from '../../services/auth.service';
import UserSchema from '../../models/user.model';

jest.mock('../../models/user.model');

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
  });

  test('should register a user', async () => {
    const userData = { email: 'test@example.com', password: 'password123' };
    UserSchema.prototype.save = jest.fn().mockResolvedValue(userData);

    const user = await authService.register(userData);
    expect(user).toEqual(userData);``
  });

  // Add more tests for other methods
});