import axios from 'axios';
import { StateCreator } from 'zustand';
import { Product } from '../types';

export interface WishlistSlice {
  wishlist: Product[];
  addToWishlist: (product: Product) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  fetchWishlist: () => Promise<void>;
  isInWishlist: (productId: string) => boolean;
}

export const createWishlistSlice: StateCreator<WishlistSlice> = (set, get) => ({
  wishlist: [],

  addToWishlist: async (product: Product) => {
    try {
      const response = await axios.post('/api/wishlist', { productId: product._id });
      set({ wishlist: response.data.wishlist });
    } catch (error) {
      console.error('Failed to add to wishlist', error);
    }
  },

  removeFromWishlist: async (productId: string) => {
    try {
      const response = await axios.delete(`/api/wishlist/${productId}`);
      set({ wishlist: response.data.wishlist });
    } catch (error) {
      console.error('Failed to remove from wishlist', error);
    }
  },

  fetchWishlist: async () => {
    try {
      const response = await axios.get('/api/wishlist');
      set({ wishlist: response.data.wishlist });
    } catch (error) {
      console.error('Failed to fetch wishlist', error);
      set({ wishlist: [] });
    }
  },

  isInWishlist: (productId: string) => {
    return get().wishlist.some(product => product._id === productId);
  }
});