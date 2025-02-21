import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Product description is required"),
  price: z.number().min(1, "Product price is required"),
  countInStock: z.number().min(0, "Product stock count is required"),
  category: z.string().min(1, "Product category is required"),
  images: z.array(z.string()).optional(),
  sizes: z.array(z.string()).optional(),
  colors: z.array(z.string()).optional(),
  discount: z.number().optional(),
  brand: z.string().optional(),
  material: z.string().optional(),
});

export default productSchema;
