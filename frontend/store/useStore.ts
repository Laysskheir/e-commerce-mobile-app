// frontend/store/useStore.ts
import { create } from "zustand";
import { ProductSlice, createProductSlice } from "./slices/productSlice";
import { CartSlice, createCartSlice } from "./slices/cartSlice";
import {
  RecentSearchesSlice,
  createRecentSearchesSlice,
} from "./slices/recentSearchesSlice";
import { createJSONStorage, persist } from "zustand/middleware";
import { createWishlistSlice, WishlistSlice } from "./slices/wishlistSlice";
import { createAuthSlice, AuthSlice } from "./slices/authSlice";
import { CategorySlice, createCategorySlice } from "./slices/categorySlice";

// Combine all slices into a single store type
export type Store = ProductSlice & CategorySlice & CartSlice & RecentSearchesSlice & AuthSlice & WishlistSlice;

// frontend/store/useStore.ts
const useStore = create<Store>()(
  persist(
    (set, get, api) => ({
      ...createProductSlice(set, get, api),
      ...createCategorySlice(set, get, api),
      ...createCartSlice(set, get, api),
      ...createRecentSearchesSlice(set, get, api),
      ...createWishlistSlice(set, get, api),
      ...createAuthSlice(set, get, api),
    }),
    {
      name: "store-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
        recentSearches: state.recentSearches,
      }),
    }
  )
);

export default useStore;