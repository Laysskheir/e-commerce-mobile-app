import { StateCreator } from 'zustand';
import axios from 'axios';
import { Category } from '../types';
import { getApiUrl } from '@/config';

export interface CategorySlice {
  categories: Category[];
  fetchCategories: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const createCategorySlice: StateCreator<CategorySlice> = (set) => ({
  categories: [],
  loading: false,
  error: null,
  
  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const apiUrl = process.env.API_URL || getApiUrl();
      const response = await axios.get<Category[]>(`${apiUrl}/api/categories`);
      
      set({ 
        categories: response.data,
        loading: false,
        error: null
      });
    } catch (error: any) {
      console.error('Error fetching categories:', error);
      set({ 
        categories: [],
        loading: false,
        error: error.message || 'Failed to fetch categories'
      });
    }
  }
});