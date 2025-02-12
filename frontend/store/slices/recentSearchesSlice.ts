// store/slices/recentSearchesSlice.ts
import { StateCreator } from "zustand";

export interface RecentSearch {
  id: string;
  term: string;
  timestamp: number;
}

export interface RecentSearchesSlice {
  recentSearches: RecentSearch[];
  addRecentSearch: (term: string) => void;
  removeRecentSearch: (id: string) => void;
  clearRecentSearches: () => void;
}

export const createRecentSearchesSlice: StateCreator<RecentSearchesSlice> = (
  set
) => ({
  recentSearches: [],

  addRecentSearch: (term: string) =>
    set((state) => {
      const newSearch = {
        id: Date.now().toString(),
        term: term.trim(),
        timestamp: Date.now(),
      };

      // Remove duplicate if exists and add new search to beginning
      const filteredSearches = state.recentSearches.filter(
        (search) => search.term.toLowerCase() !== term.toLowerCase()
      );

      return {
        recentSearches: [newSearch, ...filteredSearches].slice(0, 10), // Keep only last 10 searches
      };
    }),

  removeRecentSearch: (id: string) =>
    set((state) => ({
      recentSearches: state.recentSearches.filter((search) => search.id !== id),
    })),

  clearRecentSearches: () => set({ recentSearches: [] }),
});
