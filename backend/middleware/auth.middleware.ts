import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { authService } from "../services/auth.service";
import { UserRole } from "../interfaces/user.interface";

interface JwtPayload {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role?: UserRole;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET!
    ) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const googleAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Google token is required" });
    }

    const { user, accessToken, refreshToken } = await authService.googleLogin(
      token
    );

    res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .json({
        message: "Google login successful",
        user,
        accessToken,
      });
  } catch (error) {
    next(error);
  }
};

export const authMiddleware = protect;
export const requireAuth = protect;
