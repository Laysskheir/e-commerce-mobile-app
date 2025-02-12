import { StateCreator } from "zustand";
import { Product, CartItem } from "../types";

export interface CartSlice {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  updateQuantity: (productId: string, quantity: number) => void;
}

export const createCartSlice: StateCreator<CartSlice> = (set, get, api) => ({
  cart: [],

  // Function to add a product to the cart
  addToCart: (product: Product, quantity: number) => {
    // Get the current cart
    const { cart } = get();
    // Check if the product is already in the cart
    const existingItem = cart.find((item) => item.product._id === product._id);

    // If the product is already in the cart, update the quantity and details
    if (existingItem) {
      set({
        cart: cart.map((item) =>
          item.product._id === product._id
            ? {
                ...item,
                quantity: item.quantity + quantity,
                selectedSize: product.selectedSize,
                selectedColor: product.selectedColor,
              }
            : item
        ),
      });
    } else {
      // If the product is not in the cart, add it
      set({
        cart: [
          ...cart,
          {
            _id: product._id,
            product,
            quantity,
            selectedSize: product.selectedSize,
            selectedColor: product.selectedColor,
          },
        ],
      });
    }
  },

  removeFromCart: (productId: string) => {
    const { cart } = get();
    set({ cart: cart.filter((item) => item.product._id !== productId) });
  },

  clearCart: () => {
    set({ cart: [] });
  },

  updateQuantity: (productId: string, quantity: number) => {
    const { cart } = get();
    if (quantity < 0) return; // Prevent negative quantities
    set({
      cart: cart.map((item) =>
        item.product._id === productId ? { ...item, quantity } : item
      ),
    });
  },
});
