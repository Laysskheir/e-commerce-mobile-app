import { Wishlist } from "../models/wishlist.model";
import ProductSchema from "../models/product.model";

export const wishlistService = {
  async addToWishlist(userId: string, productId: string) {
    const existingWishlistItem = await Wishlist.findOne({
      user: userId,
      product: productId,
    });

    if (existingWishlistItem) {
      throw new Error("Product already in wishlist");
    }

    const product = await ProductSchema.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    const wishlistItem = new Wishlist({
      user: userId,
      product: productId,
    });

    await wishlistItem.save();
    return this.getWishlist(userId);
  },

  async removeFromWishlist(userId: string, productId: string) {
    await Wishlist.findOneAndDelete({
      user: userId,
      product: productId,
    });

    return this.getWishlist(userId);
  },

  async getWishlist(userId: string) {
    const wishlist = await Wishlist.find({ user: userId })
      .populate("product")
      .sort({ createdAt: -1 });

    return wishlist.map((item) => item.product);
  },
};
