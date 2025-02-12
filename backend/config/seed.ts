import mongoose from "mongoose";
import dotenv from "dotenv";
import Product  from "../models/product.model";
import Category from "../models/category.model";
import slugify from "slugify";
import { ProductColor, ProductSize } from "../interfaces/product.interface";

dotenv.config();

// Sample categories
const categories = [
  { title: "Men's Fashion", description: "Shop online for latest men's fashion trends" },
  { title: "Women's Fashion", description: "Shop online for latest women's fashion trends" },
  { title: "Kids' Fashion", description: "Shop online for latest kids' fashion trends" },
  { title: "Sportswear", description: "Shop online for latest sportswear" },
  { title: "Shoes", description: "Shop online for latest shoes trends" },
  { title: "Accessories", description: "Shop online for latest accessories trends" },
  { title: "Watches", description: "Shop online for latest watches trends" },
  { title: "Handbags", description: "Shop online for latest handbags trends" },
];

// Sample products with enhanced details
const products = [
  {
    name: "Classic Cotton T-Shirt",
    description: "A comfortable 100% cotton t-shirt perfect for everyday wear",
    price: 25,
    discount: 10,
    countInStock: 50,
    images: ["images/p1.jpg", "images/p1-1.jpg"],
    sizes: [ProductSize.S, ProductSize.M, ProductSize.L, ProductSize.XL],
    colors: [ProductColor.BLACK, ProductColor.WHITE, ProductColor.GRAY],
    brand: "ComfortWear",
    material: "100% Cotton",
    ratings: 4.5,
    numReviews: 120
  },
  {
    name: "Slim Fit Denim Jeans",
    description: "Stylish and comfortable slim-fit blue denim jeans",
    price: 55,
    discount: 15,
    countInStock: 30,
    images: ["images/p2.jpg", "images/p2-1.jpg", "images/p2-2.jpg"],
    sizes: [ProductSize.S, ProductSize.M, ProductSize.L],
    colors: [ProductColor.BLUE, ProductColor.BLACK],
    brand: "DenimPro",
    material: "Stretch Denim",
    ratings: 4.7,
    numReviews: 85
  },
  {
    name: "Running Performance Sneakers",
    description: "High-performance running shoes with advanced cushioning",
    price: 75,
    discount: 20,
    countInStock: 20,
    images: ["images/p3.jpg", "images/p3-1.jpg", "images/p3-2.jpg"],
    sizes: [ProductSize.S, ProductSize.M, ProductSize.L, ProductSize.XL],
    colors: [ProductColor.WHITE, ProductColor.RED, ProductColor.BLACK],
    brand: "SpeedRun",
    material: "Breathable Mesh",
    ratings: 4.9,
    numReviews: 200
  },
  {
    name: "Leather Biker Jacket",
    description: "Stylish leather jacket for a bold and edgy look",
    price: 150,
    discount: 5,
    countInStock: 15,
    images: ["images/p4.jpg", "images/p4-1.jpg", "images/p4-2.jpg"],
    sizes: [ProductSize.M, ProductSize.L, ProductSize.XL],
    colors: [ProductColor.BLACK],
    brand: "UrbanEdge",
    material: "Genuine Leather",
    ratings: 4.6,
    numReviews: 45
  },
  {
    name: "Wool Winter Sweater",
    description: "Warm and cozy wool sweater for cold winter days",
    price: 65,
    discount: 12,
    countInStock: 25,
    images: ["images/p5.jpg", "images/p5-1.jpg", "images/p5-2.jpg"],
    sizes: [ProductSize.S, ProductSize.M, ProductSize.L, ProductSize.XL],
    colors: [ProductColor.GRAY, ProductColor.GREEN, ProductColor.WHITE],
    brand: "WinterComfort",
    material: "100% Merino Wool",
    ratings: 4.8,
    numReviews: 90
  },
  {
    name: "Athletic Training Shorts",
    description: "Lightweight and breathable shorts for intense workouts",
    price: 35,
    discount: 8,
    countInStock: 40,
    images: ["images/p6.jpg", "images/p6-1.jpg"],
    sizes: [ProductSize.S, ProductSize.M, ProductSize.L],
    colors: [ProductColor.BLACK, ProductColor.BLUE, ProductColor.RED],
    brand: "FitGear",
    material: "Quick-Dry Polyester",
    ratings: 4.4,
    numReviews: 75
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string, {
      dbName: "fashion_store",
    });

    console.log("Connected to MongoDB");

    // Clear existing data
    await Product.deleteMany();
    await Category.deleteMany();

    console.log("Database cleared");

    // Insert categories and store their IDs
    const createdCategories = await Category.insertMany(categories);
    console.log("Categories seeded");

    // Assign random categories to products
    const productsWithCategories = products.map((product) => ({
      ...product,
      category:
        createdCategories[Math.floor(Math.random() * createdCategories.length)]
          ._id,
      slug: slugify(product.name, { lower: true, strict: true }),
    }));

    // Insert products
    await Product.insertMany(productsWithCategories);
    console.log("Products seeded");

    console.log("Seeding completed!");
    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedDatabase();
