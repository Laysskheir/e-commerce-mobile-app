import { Router, Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import {
  createCategory,
  getCategories,
  getCategoryByID,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller";
import { asyncHandler } from "../middleware/asyncHandler";
import redisClient from "../utils/redisClient";

const router = Router();

// Get all categories
router.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const cacheKey = "categories";

    try {
      const cachedCategories = await redisClient.get(cacheKey);
      if (cachedCategories) {
        console.log("Serving categories from cache");
        return res.status(200).json(JSON.parse(cachedCategories));
      }
    } catch (error) {
      console.error("Error accessing cache for categories:", error);
    }

    try {
      const categories = await getCategories(req, res);
      await redisClient.setEx(cacheKey, 3600, JSON.stringify(categories));
      console.log("Serving categories from database");
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  })
);

// Get a single category by ID
router.get(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const cacheKey = `category:${req.params.id}`;
    try {
      const cachedCategory = await redisClient.get(cacheKey);
      if (cachedCategory) {
        console.log("Serving category from cache");
        return res.status(200).json(JSON.parse(cachedCategory));
      }
    } catch (error) {
      console.error("Error accessing cache for category detail:", error);
    }

    try {
      const category = await getCategoryByID(req, res);
      await redisClient.setEx(cacheKey, 3600, JSON.stringify(category));
      console.log("Serving category from database");
      res.json(category);
    } catch (error) {
      console.error("Error fetching category detail:", error);
      res.status(500).json({ message: "Failed to fetch category detail" });
    }
  })
);

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
  [body("title").optional(), body("description").optional()],
  asyncHandler(async (req: Request, res: Response) => {
    await updateCategory(req, res);
  })
);

// Delete a category
router.delete(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    await deleteCategory(req, res);
  })
);

export default router;
