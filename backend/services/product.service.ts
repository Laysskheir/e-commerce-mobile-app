//services/product.service.ts
import ProductSchema from "../models/product.model";
import { generateFullImageUrl, generateProductSlug } from "../utils";

export class ProductService {
  // Get all products with optional filtering
  async getAllProducts(
    params: {
      categoryId?: string;
      searchQuery?: string;
      categories?: string[];
      minPrice?: number;
      maxPrice?: number;
      sizes?: string[];
      colors?: string[];
      brand?: string;
      sortBy?: "newest" | "price_asc" | "price_desc";
    } = {}
  ) {
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
    } = params;

    // Build a dynamic query object
    let query: any = {};

    // Category filtering
    if (categoryId) {
      query.category = categoryId;
    }
    if (categories && categories.length > 0) {
      query.category = { $in: categories };
    }

    // Search filtering
    if (searchQuery) {
      query.name = { $regex: searchQuery, $options: "i" };
    }

    // Price range filtering
    if (minPrice !== undefined && maxPrice !== undefined) {
      query.price = {
        $gte: minPrice,
        $lte: maxPrice,
      };
    }

    // Additional filters
    if (sizes && sizes.length > 0) {
      query.sizes = { $in: sizes };
    }

    if (colors && colors.length > 0) {
      query.colors = { $in: colors };
    }

    if (brand) {
      query.brand = brand;
    }

    // Sorting logic
    let sort: any = { createdAt: -1 }; // Default to newest
    switch (sortBy) {
      case "price_asc":
        sort = { price: 1 };
        break;
      case "price_desc":
        sort = { price: -1 };
        break;
      case "newest":
      default:
        sort = { createdAt: -1 };
    }

    try {
      // Detailed logging for query construction
      console.log("Constructed Query:", query);

      const products = await ProductSchema.find(query).sort(sort);

      // Map products to add full image URLs
      return products.map((product) => ({
        ...product.toObject(),
        images: product.images?.map(generateFullImageUrl),
      }));
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Failed to fetch products");
    }
  }

  // Get a single product by slug
  async getProductBySlug(slug: string) {
    const product = await ProductSchema.findOne({ slug });

    if (!product) {
      throw new Error("Product not found");
    }

    return {
      ...product.toObject(),
      images: product.images?.map(generateFullImageUrl),
    };
  }

  // Create a new product
  async createProduct(productData: {
    name: string;
    description: string;
    price: number;
    countInStock: number;
    category: string;
    images?: string[];
  }) {
    const slug = generateProductSlug(productData.name);

    const product = new ProductSchema({
      ...productData,
      slug,
    });

    await product.save();
    return product;
  }

  // Update a product
  async updateProduct(
    slug: string,
    productData: {
      name: string;
      description: string;
      price: number;
      countInStock: number;
      category: string;
      images?: string[];
    }
  ) {
    const newSlug = generateProductSlug(productData.name);

    const product = await ProductSchema.findOneAndUpdate(
      { slug },
      { ...productData, slug: newSlug },
      { new: true, runValidators: true }
    ).populate("category");

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  }

  // Delete a product
  async deleteProduct(slug: string) {
    const product = await ProductSchema.findOneAndDelete({ slug });

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  }
}

export const productService = new ProductService();
