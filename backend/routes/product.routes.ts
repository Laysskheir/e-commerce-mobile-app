import { Router, Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";
import { ProductService } from "../services/product.service";
import { asyncHandler } from "../middleware/asyncHandler";
import redisClient from "../utils/redisClient";

export const router = Router();

const productService = new ProductService();

router.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    try {
      const {
        categoryId,
        searchQuery,
        categories,
        minPrice,
        maxPrice,
        sizes,
        colors,
        brand,
        sortBy,
      } = req.query;

      console.log("Query Parameters:", req.query); // Log incoming query params

      // Create a unique cache key based on query parameters
      const cacheKey = `products:${JSON.stringify(req.query)}`;

      try {
        const cachedProducts = await redisClient.get(cacheKey);

        if (cachedProducts) {
          console.log("Serving from cache");
          return res.json(JSON.parse(cachedProducts));
        }
      } catch (error) {
        console.error("Error accessing cache for products:", error);
      }

      const products = await productService.getAllProducts({
        categoryId: categoryId as string,
        searchQuery: searchQuery as string,
        categories: Array.isArray(categories)
          ? (categories as string[])
          : categories
          ? [categories as string]
          : undefined,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        sizes: Array.isArray(sizes)
          ? (sizes as string[])
          : sizes
          ? [sizes as string]
          : undefined,
        colors: Array.isArray(colors)
          ? (colors as string[])
          : colors
          ? [colors as string]
          : undefined,
        brand: brand as string,
        sortBy: sortBy as "newest" | "price_asc" | "price_desc",
      });

      console.log("Serving from database");
      res.json(products);

      // Cache the result with an expiration time (e.g., 3600 seconds)
      try {
        await redisClient.setEx(cacheKey, 3600, JSON.stringify(products));
      } catch (error) {
        console.error("Error setting cache in Redis:", error);
      }
    } catch (error) {
      console.error("Error in product route:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  })
);

router.get(
  "/:slug",
  asyncHandler(async (req: Request, res: Response) => {
    const cachekey = `products:${req.params.slug}`;
    try {
      const cachedProduct = await redisClient.get(cachekey);
      if (cachedProduct) {
        console.log("Serving product from cache");
        return res.json(JSON.parse(cachedProduct));
      }
    } catch (error) {
      console.error("Error accessing cache for product detail:", error);
    }

    try {
      const product = await getProductBySlug(req, res);
      await redisClient.setEx(cachekey, 3600, JSON.stringify(product));
      console.log("Serving product detail from database");
      res.json(product);
    } catch (error) {
      console.error("Error fetching product detail:", error);
      res.status(500).json({ message: "Failed to fetch product detail" });
    }
  })
);

router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("price").isNumeric().withMessage("Price must be a number"),
    body("countInStock")
      .isNumeric()
      .withMessage("Count in stock must be a number"),
    body("category").notEmpty().withMessage("Category is required"),
  ],
  asyncHandler(createProduct)
);
router.put("/:id", asyncHandler(updateProduct));
router.delete("/:id", asyncHandler(deleteProduct));

export default router;
