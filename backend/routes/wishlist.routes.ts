// In wishlist.routes.ts
import express from 'express';
import { wishlistController } from '../controllers/wishlist.controller';
import { requireAuth } from '../middleware/auth.middleware';

const router = express.Router();

router.use(requireAuth);  // Ensure all routes are protected

router.post('/', wishlistController.addToWishlist);
router.delete('/:productId', wishlistController.removeFromWishlist);
router.get('/', wishlistController.getWishlist);

export default router;