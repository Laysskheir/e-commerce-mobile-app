import { Document } from 'mongoose';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin'
}

export interface IUser extends Document {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar?: string;

  // Authentication Details
  role: UserRole;
  isActive: boolean;
  isVerified: boolean;
  googleId?: string;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;

  // Methods
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IUserInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: UserRole;
}

export interface IUserResponse {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  avatar?: string;
  isVerified: boolean;
  createdAt: Date;
}

export interface IGoogleUserData {
  googleId: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}