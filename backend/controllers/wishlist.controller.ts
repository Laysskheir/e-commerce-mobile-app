import { Request, Response } from 'express';
import { wishlistService } from '../services/wishlist.service';
import { asyncHandler } from '../middleware/asyncHandler';

export const wishlistController = {
  
  addToWishlist: asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?._id as string;
    const { productId } = req.body;

    const wishlist = await wishlistService.addToWishlist(userId, productId);
    res.status(200).json({ wishlist });
  }),

  removeFromWishlist: asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?._id as string;
    const { productId } = req.params;

    const wishlist = await wishlistService.removeFromWishlist(userId, productId);
    res.status(200).json({ wishlist });
  }),

  getWishlist: asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?._id as string;

    const wishlist = await wishlistService.getWishlist(userId);
    res.status(200).json({ wishlist });
  })
};