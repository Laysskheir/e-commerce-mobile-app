// frontend/app/(root)/filters.tsx
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Alert, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import useStore from "@/store/useStore";
import { ProductFilters } from "@/store/types";
import MultiSelectList from "@/components/filters/MultiSelectList";
import RangeSlider from "@/components/filters/RangeSlider";
import RadioButtonGroup from "@/components/filters/RadioButtonGroup";
import Button from "@/components/ui/Button";
import ErrorBoundary from "@/components/filters/ErrorBoundary";
import { Ionicons } from "@expo/vector-icons";

const FiltersSheet = () => {
  const router = useRouter();
  const {
    products,
    fetchProducts,
    setFilters,
    resetFilters,
    categories,
    fetchCategories,
    loading: categoriesLoading,
  } = useStore();

  // Fetch categories if not already loaded
  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, []);

  // Fallback for categories
  const categoryOptions = categories.map((cat) => ({
    label: cat.title,
    value: cat._id,
  }));

  const sortOptions = [
    { label: "Newest", value: "newest" },
    { label: "Price: Low - High", value: "price_asc" },
    { label: "Price: High - Low", value: "price_desc" },
  ];

  // Local state to track changes before applying
  const [localFilters, setLocalFilters] = useState<ProductFilters>({
    categories: [],
    priceRange: { min: 0, max: 1000 },
    sortBy: "newest",
  });

  const applyFilters = async () => {
    try {
      // Update global filters
      setFilters(localFilters);

      // Fetch products with new filters
      await fetchProducts(localFilters);

      // Navigate back
      router.back();
    } catch (error: any) {
      // Handle any errors during filter application
      Alert.alert(
        "Filter Error",
        error.message || "Failed to apply filters. Please try again.",
        [{ text: "OK" }]
      );
    }
  };

  const handleReset = () => {
    // Reset local state
    setLocalFilters({
      categories: [],
      priceRange: { min: 0, max: 1000 },
      sortBy: "newest",
    });

    // Reset global filters
    resetFilters();
  };

  // Loading state for categories
  if (categoriesLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading categories...</Text>
      </View>
    );
  }

  // No categories available
  if (categories.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>No categories available</Text>
      </View>
    );
  }

  return (
    <ErrorBoundary
      fallback={
        <View className="flex-1 justify-center items-center bg-white">
          <Text className="text-red-500 text-lg">Error loading filters</Text>
        </View>
      }
    >
      <View className="flex-1 bg-white">
        {/* Header with Close and Reset */}
        <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold">Filters</Text>
          <TouchableOpacity onPress={handleReset} className="p-2">
            <Text className="text-red-500">Reset</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          className="flex-1 px-4 pt-4"
          showsVerticalScrollIndicator={false}
        >
          {/* Categories Filter */}
          {/* <MultiSelectList
            title="Categories"
            options={categoryOptions}
            selected={localFilters.categories}
            onSelect={(categories) =>
              setLocalFilters((prev) => ({ ...prev, categories }))
            }
          /> */}

          {/* Price Range Slider */}
          <View className="mt-4">
            <RangeSlider
              title="Price Range"
              min={0}
              max={1000}
              value={localFilters.priceRange}
              onValueChange={(priceRange) =>
                setLocalFilters((prev) => ({ ...prev, priceRange }))
              }
            />
          </View>

          {/* Sort By Radio Group */}
          <View className="mt-4">
            <RadioButtonGroup
              title="Sort By"
              options={sortOptions}
              selected={localFilters.sortBy}
              onSelect={(sortBy) =>
                setLocalFilters((prev) => ({
                  ...prev,
                  sortBy: sortBy as "newest" | "price_asc" | "price_desc",
                }))
              }
            />
          </View>
        </ScrollView>

        {/* Apply Filters Button */}
        <View className="p-4">
          <Button
            text="Apply Filters"
            variant="primary"
            onPress={applyFilters}
            className="w-full"
          />
        </View>
      </View>
    </ErrorBoundary>
  );
};

export default FiltersSheet;
