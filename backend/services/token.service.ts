import jwt from "jsonwebtoken";
import { IUser } from "../interfaces/user.interface";

class TokenService {
  generateAccessToken(user: IUser) {
    return jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_ACCESS_SECRET!,
      { expiresIn: "15m" }
    );
  }

  generateRefreshToken(user: IUser) {
    return jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: "7d" }
    );
  }

  verifyAccessToken(token: string) {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
  }

  verifyRefreshToken(token: string) {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
  }
}

export const tokenService = new TokenService();
