import { StateCreator } from "zustand";
import axios from "axios";
import { Product, Filters } from "../types";
import { getApiUrl } from "@/config";

export interface ProductSlice {
  products: Product[];
  filters: Filters;
  fetchProducts: (filters?: Filters) => Promise<void>;
  setFilters: (filters: Filters) => void;
  resetFilters: () => void;
  fetchSingleProduct: (slug: string) => Promise<Product | null>;
  loading: boolean;
  error: string | null;
  product: Product | null;
}

export const createProductSlice: StateCreator<ProductSlice> = (set, get) => ({
  products: [],
  filters: {},
  loading: false,
  error: null,
  product: null,

  fetchProducts: async (filters = {}) => {
    set({ loading: true, error: null });
    try {
      const apiUrl = process.env.API_URL || getApiUrl();
      const response = await axios.get<Product[]>(`${apiUrl}/api/products`, {
        params: filters,
      });

      set({
        products: response.data,
        loading: false,
        error: null,
      });
    } catch (error: any) {
      console.error("Error fetching products:", error);
      set({
        products: [],
        loading: false,
        error: error.message || "Failed to fetch products",
      });
    }
  },

  setFilters: (filters) => {
    set({ filters });
  },

  resetFilters: () => {
    set({ filters: {} });
  },

  fetchSingleProduct: async (slug) => {
    set({ loading: true, error: null, product: null });
    try {
      const apiUrl = process.env.API_URL || getApiUrl();
      const response = await axios.get<Product>(`${apiUrl}/api/products/${slug}`);
  
      const fetchedProduct = {
        ...response.data,
        selectedSize: response.data.sizes?.[0],
        selectedColor: response.data.colors?.[0],
      };
  
      set({
        product: fetchedProduct,
        loading: false,
        error: null,
      });

      return fetchedProduct;
    } catch (error: any) {
      console.error("Error fetching single product:", error);
      set({
        product: null,
        loading: false,
        error: error.message || "Failed to fetch product",
      });

      return null;
    }
  },
});
