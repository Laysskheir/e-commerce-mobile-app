import { Document, Types } from 'mongoose';

export enum ProductSize {
  XS = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  XXL = 'XXL'
}

export enum ProductColor {
  BLACK = 'Black',
  WHITE = 'White',
  BLUE = 'Blue',
  RED = 'Red',
  GREEN = 'Green',
  GRAY = 'Gray'
}

export interface IProduct extends Document {
  // Basic Product Information
  name: string;
  slug: string;
  description: string;
  
  // Pricing and Inventory
  price: number;
  discount?: number;
  countInStock: number;
  
  // Categorization
  category: Types.ObjectId;
  brand?: string;
  material?: string;
  
  // Media and Variants
  images: string[];
  sizes: ProductSize[];
  colors: ProductColor[];
  
  // Reviews and Ratings
  ratings?: number;
  numReviews?: number;
}

export interface IProductInput {
  name: string;
  description: string;
  price: number;
  category: Types.ObjectId;
  images: string[];
  sizes: ProductSize[];
  colors: ProductColor[];
  
  discount?: number;
  countInStock?: number;
  brand?: string;
  material?: string;
}

export interface IProductResponse extends Omit<IProduct, 'slug'> {
  createdAt: Date;
  updatedAt: Date;
}