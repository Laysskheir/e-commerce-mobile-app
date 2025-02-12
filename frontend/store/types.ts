// frontend/store/types.ts

// Existing enums
export enum ProductSize {
  XS = "XS",
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
  XXL = "XXL",
}

export enum ProductColor {
  BLACK = "Black",
  WHITE = "White",
  BLUE = "Blue",
  RED = "Red",
  GREEN = "Green",
  GRAY = "Gray",
}

export interface Filters {
  categoryId?: string;
  searchQuery?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  sortBy?: 'newest' | 'price_asc' | 'price_desc';
}

// Enhanced ProductFilters interface
export interface ProductFilters {
  categories: string[]; // Category IDs
  priceRange: {
    min: number;
    max: number;
  };
  sortBy: "newest" | "price_asc" | "price_desc";

  // Optional additional filters
  sizes?: ProductSize[];
  colors?: ProductColor[];
  brand?: string;
}

// Comprehensive ProductFilter for API requests
export interface ProductFilterOptions {
  categories?: string[];
  minPrice?: number;
  maxPrice?: number;
  priceRange?: {
    min: number;
    max: number;
  };
  sizes?: ProductSize[];
  colors?: ProductColor[];
  brand?: string;
  sortBy?: "newest" | "price_asc" | "price_desc";
}

// Existing interfaces remain the same
export interface Category {
  _id: string;
  title: string;
  description?: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discount?: number;
  countInStock: number;
  category: Category;
  images?: string[];
  sizes: ProductSize[];
  colors: ProductColor[];
  brand?: string;
  material?: string;
  ratings?: number;
  numReviews?: number;
  selectedSize?: ProductSize;
  selectedColor?: ProductColor;
}

export interface Category {
  _id: string;
  title: string;
  description?: string;
}

export interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
  selectedSize?: ProductSize;
  selectedColor?: ProductColor;
}

// Utility type for API responses
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// Utility type for filtering and sorting
export interface ProductFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sizes?: ProductSize[];
  colors?: ProductColor[];
  brand?: string;
  sortBy?: "price" | "ratings" | "newest";
  sortOrder?: "asc" | "desc";
}

export interface WishlistSlice {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  fetchWishlist: () => Promise<void>;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}
