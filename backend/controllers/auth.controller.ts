import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import { RegisterSchema, LoginSchema } from "../schemas/auth.schema";
import { tokenService } from "../services/token.service";
import User from "../models/user.model";
import { IUser } from "../interfaces/user.interface";
import { JwtPayload } from "jsonwebtoken";

// Global type augmentation for req.user
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const register = async (req: Request, res: Response) => {
  try {
    // Validate input using Zod
    const result = RegisterSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: result.error.errors[0].message,
      });
    }

    const { firstName, lastName, email, password } = result.data;

    const { user, accessToken, refreshToken } = await authService.register({
      firstName,
      lastName,
      email,
      password,
    });

    res
      .status(201)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .json({
        message: "User registered successfully",
        user,
        accessToken,
      });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    // Validate input
    const result = LoginSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: result.error.errors[0].message,
      });
    }

    const { email, password } = result.data;

    const { user, accessToken, refreshToken } = await authService.login({
      email,
      password,
    });

    res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .json({
        message: "Login successful",
        user,
        accessToken,
      });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    // Add a type guard to check if req.user exists
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const userId = req.user.id;
    const user = await authService.getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token not found" });
    }

    try {
      const decoded = tokenService.verifyRefreshToken(refreshToken);

      // Type guard for decoded
      if (typeof decoded === "string" || !("id" in decoded)) {
        return res.status(403).json({ message: "Invalid token format" });
      }

      const user = await User.findOne({ where: { id: decoded.id } });

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      const newAccessToken = tokenService.generateAccessToken(user);

      res.json({ accessToken: newAccessToken });
    } catch (error) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const googleCallback = async (req: Request, res: Response) => {
  try {
    // Assuming you want to handle the Google OAuth callback
    // This is a placeholder implementation, adjust according to your specific requirements
    if (req.user) {
      const user = req.user as IUser;
      const accessToken = await tokenService.generateAccessToken(user);
      const refreshToken = await tokenService.generateRefreshToken(user);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      res.json({
        message: "Google authentication successful",
        user,
        accessToken,
      });
    } else {
      res.status(401).json({ message: "Google authentication failed" });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const authController = {
  register,
  login,
  getCurrentUser,
  refreshToken,
  googleCallback,
};
