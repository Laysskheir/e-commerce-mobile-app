import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.model";
import { IUser } from "../interfaces/user.interface";

export class AuthService {
  // More secure token generation
  private generateAccessToken(user: IUser): string {
    return jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_ACCESS_SECRET!,
      { expiresIn: "15m" } // Shorter expiration for access token
    );
  }

  private generateRefreshToken(user: IUser): string {
    return jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: "7d",
    });
  }

  async register(userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    // Validate input
    if (!userData.email || !userData.password) {
      throw new Error("Email and password are required");
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    console.log("Hashed password during registration:", hashedPassword);

    // Create new user
    const newUser = new User({
      ...userData,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate tokens
    const accessToken = this.generateAccessToken(newUser);
    const refreshToken = this.generateRefreshToken(newUser);

    return {
      user: newUser.toObject(),
      accessToken,
      refreshToken,
    };
  }

  async login(credentials: { email: string; password: string }) {
    const user = await User.findOne({ email: credentials.email });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    try {
      const isMatch = await bcrypt.compare(credentials.password, user.password);

      if (!isMatch) {
        throw new Error("Invalid credentials: Password does not match");
      }

      const accessToken = this.generateAccessToken(user);
      const refreshToken = this.generateRefreshToken(user);

      return {
        user: user.toObject(),
        accessToken,
        refreshToken,
      };
    } catch (error) {
      console.error("Detailed Login Error:", error);
      throw new Error(
        "Login failed: " +
          (error instanceof Error ? error.message : "Unknown error")
      );
    }
  }

  async googleLogin(token: string) {
    const { OAuth2Client } = require("google-auth-library");
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    try {
      // Verify the Google token
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      if (!payload) {
        throw new Error("Invalid Google token");
      }

      const { email, given_name, family_name, sub } = payload;

      // Check if user already exists
      let user = await User.findOne({ email });

      if (!user) {
        // Create a new user if they don't exist
        user = new User({
          firstName: given_name || "",
          lastName: family_name || "",
          email: email!,
          googleId: sub,
          password: "", // No password for Google login
        });

        await user.save();
      }

      // Generate tokens
      const accessToken = this.generateAccessToken(user);
      const refreshToken = this.generateRefreshToken(user);

      return {
        user: user.toObject(),
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw new Error("Google authentication failed");
    }
  }

  async getUserById(userId: string) {
    return await User.findById(userId).select("-password");
  }
}

export const authService = new AuthService();
