import { StateCreator } from "zustand";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { User } from "../types";
import { getApiUrl } from "@/config";

export interface AuthError {
  field?: string;
  message: string;
}

export interface AuthSlice {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  errors: AuthError[];

  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  clearErrors: () => void;
}

const apiUrl = process.env.apiUrl || getApiUrl();

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  errors: [],

  clearErrors: () => set({ errors: [] }),

  login: async (email, password) => {
    set({ loading: true, errors: [] });
    try {
        const response = await axios.post(`${apiUrl}/api/auth/login`, { email, password });

      await SecureStore.setItemAsync("accessToken", response.data.accessToken);

      set({
        user: response.data.user,
        isAuthenticated: true,
        loading: false,
        errors: [],
      });
    } catch (error) {
      const processedErrors = processAxiosError(error);
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
        errors: processedErrors,
      });
      throw error;
    }
  },

  register: async (userData) => {
    set({ loading: true, errors: [] });
    try {
        const response = await axios.post(`${apiUrl}/api/auth/register`, userData);

      await SecureStore.setItemAsync("accessToken", response.data.accessToken);

      set({
        user: response.data.user,
        isAuthenticated: true,
        loading: false,
        errors: [],
      });
    } catch (error) {
      const processedErrors = processAxiosError(error);
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
        errors: processedErrors,
      });
      throw error;
    }
  },

  logout: async () => {
    set({ loading: true, errors: [] });
    try {
      await axios.post(`${apiUrl}/auth/logout`);

      await SecureStore.deleteItemAsync("accessToken");

      set({
        user: null,
        isAuthenticated: false,
        loading: false,
        errors: [],
      });
    } catch (error) {
      const processedErrors = processAxiosError(error);
      set({
        loading: false,
        errors: processedErrors,
      });
    }
  },
});

// Helper function to process Axios errors
function processAxiosError(error: any): AuthError[] {
  if (axios.isAxiosError(error)) {
    // Handle Zod validation errors from backend
    if (error.response?.data.errors) {
      return error.response.data.errors.map((err: any) => ({
        field: err.path[0],
        message: err.message,
      }));
    }

    // Handle general error responses
    return [
      {
        message: error.response?.data.message || "An unexpected error occurred",
      },
    ];
  }

  // Handle unexpected errors
  return [
    {
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    },
  ];
}
