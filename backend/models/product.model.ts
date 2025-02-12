import mongoose, { Schema } from "mongoose";
import slugify from "slugify";
import {
  IProduct,
  ProductSize,
  ProductColor,
} from "../interfaces/product.interface";

const productSchema: Schema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [100, "Product name cannot exceed 100 characters"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },
    discount: {
      type: Number,
      min: [0, "Discount cannot be negative"],
      max: [100, "Discount cannot exceed 100%"],
    },
    countInStock: {
      type: Number,
      default: 0,
      min: [0, "Stock cannot be negative"],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Product category is required"],
    },
    images: [
      {
        type: String,
        required: [true, "At least one product image is required"],
      },
    ],
    sizes: [
      {
        type: String,
        enum: Object.values(ProductSize),
      },
    ],
    colors: [
      {
        type: String,
        enum: Object.values(ProductColor),
      },
    ],
    brand: {
      type: String,
      trim: true,
    },
    material: {
      type: String,
      trim: true,
    },
    ratings: {
      type: Number,
      default: 0,
      min: [0, "Ratings cannot be negative"],
      max: [5, "Ratings cannot exceed 5"],
    },
    numReviews: {
      type: Number,
      default: 0,
      min: [0, "Number of reviews cannot be negative"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Pre-save hook to automatically generate slug
productSchema.pre("save", function (next) {
  if (this.isModified("name") || this.isNew) {
    this.slug = slugify(this.name as string, { lower: true, strict: true });
  }
  next();
});

// Virtual for discounted price
productSchema.virtual("discountedPrice").get(function () {
  return this.discount
    ? (this.price as number) * (1 - (this.discount as number) / 100)
    : this.price;
});

export default mongoose.model<IProduct>("Product", productSchema, "products");
