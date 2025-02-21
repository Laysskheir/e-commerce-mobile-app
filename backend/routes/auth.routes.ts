import express, { Request, Response, NextFunction } from "express";
import { RegisterSchema, LoginSchema } from "../schemas/auth.schema";
import {
  register,
  login,
  refreshToken,
  getCurrentUser,
  authController,
} from "../controllers/auth.controller";
import { googleAuth, requireAuth } from "../middleware/auth.middleware";
import passport from "passport";

const router = express.Router();

// More robust asyncHandler that explicitly handles different route scenarios
const asyncHandler =
  (
    fn: (
      req: Request,
      res: Response,
      next: NextFunction
    ) => Promise<Response | void>
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

// Health check route
router.get("/", (req, res) => {
  res.status(200).json({
    message: "Auth API is running",
    status: "healthy",
  });
});

router.post(
  "/register",
  asyncHandler(async (req: Request, res: Response) => {
    const result = RegisterSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json(result.error);
    }
    return register(req, res);
  })
);

router.post(
  "/login",
  asyncHandler(async (req: Request, res: Response) => {
    const result = LoginSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json(result.error);
    }
    return login(req, res);
  })
);

router.post(
  "/refresh-token",
  asyncHandler(async (req: Request, res: Response) => {
    return refreshToken(req, res);
  })
);

// router.get('/google', googleAuth as express.RequestHandler);

// router.get('/profile',
//   requireAuth as express.RequestHandler,
//   asyncHandler(async (req: Request, res: Response) => {
//     return getCurrentUser(req, res);
//   })
// );

// router.get('/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   authController.googleCallback
// );

export default router;
