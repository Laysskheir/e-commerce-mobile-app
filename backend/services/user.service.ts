import User from '../models/user.model';

export const userService = {
  async findById(id: string) {
    try {
      const user = await User.findById(id);
      return user;
    } catch (error) {
      console.error('Error finding user by ID:', error);
      throw error;
    }
  },

  // Add more user-related service methods as needed
};
