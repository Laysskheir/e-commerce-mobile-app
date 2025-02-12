import { Router, Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { 
  createCategory, 
  getCategories, 
  getCategoryByID,
  updateCategory,
  deleteCategory 
} from "../controllers/category.controller";

const router = Router();

// Wrap route handlers to ensure correct typing
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => 
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

// Get all categories
router.get("/", asyncHandler(async (req: Request, res: Response) => {
  await getCategories(req, res);
}));

// Get a single category by ID
router.get("/:id", asyncHandler(async (req: Request, res: Response) => {
  await getCategoryByID(req, res);
}));

// Create a new category
router.post(
  "/",
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").optional(),
  ],
  asyncHandler(async (req: Request, res: Response) => {
    await createCategory(req, res);
  })
);

// Update a category
router.put(
  "/:id",
  [
    body("title").optional(),
    body("description").optional(),
  ],
  asyncHandler(async (req: Request, res: Response) => {
    await updateCategory(req, res);
  })
);

// Delete a category
router.delete("/:id", asyncHandler(async (req: Request, res: Response) => {
  await deleteCategory(req, res);
}));

export default router;