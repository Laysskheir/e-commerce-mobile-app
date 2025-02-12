// routes/product.routes.ts
import { Router, Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";
import { ProductService } from "../services/product.service";

export const router = Router();

// Middleware to wrap async route handlers
export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => 
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

const productService = new ProductService();

router.get('/', async (req, res) => {
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
      sortBy 
    } = req.query;

    console.log('Query Parameters:', req.query);  // Log incoming query params

    const products = await productService.getAllProducts({
      categoryId: categoryId as string,
      searchQuery: searchQuery as string,
      categories: Array.isArray(categories) 
        ? categories as string[] 
        : (categories ? [categories as string] : undefined),
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      sizes: Array.isArray(sizes) 
        ? sizes as string[] 
        : (sizes ? [sizes as string] : undefined),
      colors: Array.isArray(colors) 
        ? colors as string[] 
        : (colors ? [colors as string] : undefined),
      brand: brand as string,
      sortBy: sortBy as 'newest' | 'price_asc' | 'price_desc'
    });

    res.json(products);
  } catch (error) {
    console.error('Error in product route:', error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

router.get('/:slug', asyncHandler(getProduct));
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