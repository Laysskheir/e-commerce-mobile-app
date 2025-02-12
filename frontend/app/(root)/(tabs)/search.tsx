import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useStore from "@/store/useStore";
import { Product } from "@/store/types";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

type RecentSearch = {
  id: string;
  term: string;
};

const SearchPage = () => {
  const router = useRouter();
  const {
    products,
    fetchProducts,
    loading,
    error,
    // Recent searches slice state and actions
    recentSearches,
    addRecentSearch,
    removeRecentSearch,
    clearRecentSearches,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle search
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim()) {
      setIsSearching(true);
      const filtered = products.filter(
        (product) =>
          product.name?.toLowerCase().includes(text.toLowerCase()) ||
          product.description?.toLowerCase().includes(text.toLowerCase()) ||
          product.category?.title?.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setIsSearching(false);
      setFilteredProducts([]);
    }
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      addRecentSearch(searchQuery.trim());
    }
  };

 
  const clearSearch = (id: string) => {
    setRecentSearches((prev) => prev.filter((search) => search.id !== id));
  };

  

  const handleSearchItemPress = (term: string) => {
    setSearchQuery(term);
    handleSearch(term);
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      onPress={() => router.push(`products/${item.slug}`)}
      className="flex-row items-center px-4 py-2 border-b border-gray-200"
    >
      {item.images && item.images.length > 0 ? (
        <Image source={{ uri: item.images[0] }} className="w-16 h-16 rounded" />
      ) : (
        <View className="w-16 h-16 rounded bg-gray-200 justify-center items-center">
          <Ionicons name="image-outline" size={24} color="#666" />
        </View>
      )}
      <View className="flex-1 ml-4">
        <Text className="text-base font-medium">{item.name}</Text>
        <View className="flex-row items-center mt-1">
          <Text className="text-base">${item.price.toFixed(2)}</Text>
          {item.discount && (
            <Text className="ml-2 text-red-500">-{item.discount}%</Text>
          )}
        </View>
        <Text className="text-sm text-gray-500 mt-1">
          {item.category.title}
        </Text>
      </View>
      <Ionicons name="chevron-forward-outline" size={24} color="#666" />
    </TouchableOpacity>
  );

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">Error loading products</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Search Input */}
      <View className="px-4 py-2">
        <View className="flex-row items-center bg-gray-100 rounded-lg px-4 py-2">
          <Ionicons name="search-outline" size={20} color="#666" />
          <TextInput
            className="flex-1 ml-2 text-base"
            placeholder="Search for clothes..."
            value={searchQuery}
            onChangeText={handleSearch}
            onSubmitEditing={handleSearchSubmit}
            returnKeyType="search"
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => handleSearch("")}>
              <Ionicons name="close-outline" size={20} color="#666" />
            </TouchableOpacity>
          ) : (
            <Ionicons name="mic-outline" size={20} color="#666" />
          )}
        </View>
      </View>

      {/* Content Section */}
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <Text>Loading...</Text>
        </View>
      ) : !isSearching ? (
        // Show Recent Searches when not searching
        recentSearches.length > 0 && (
          <View className="px-4 mt-4">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-lg font-semibold">Recent Searches</Text>
              <TouchableOpacity onPress={clearAllSearches}>
                <Text className="text-blue-500">Clear all</Text>
              </TouchableOpacity>
            </View>
            {recentSearches.map((search) => (
              <TouchableOpacity
                key={search.id}
                onPress={() => handleSearchItemPress(search.term)}
                className="flex-row justify-between items-center py-3 border-b border-gray-200"
              >
                <Text className="text-base">{search.term}</Text>
                <TouchableOpacity onPress={() => clearSearch(search.id)}>
                  <Ionicons name="close-outline" size={24} color="#666" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        )
      ) : (
        // Show Search Results or No Results message
        <View className="flex-1">
          {filteredProducts.length > 0 ? (
            <FlatList
              data={filteredProducts}
              renderItem={renderProductItem}
              keyExtractor={(item) => item._id}
              className="mt-4"
            />
          ) : (
            <View className="flex-1 justify-center items-center px-4">
              <Ionicons name="search-outline" size={48} color="#ccc" />
              <Text className="mt-4 text-lg text-gray-500">
                No results found
              </Text>
              <Text className="mt-2 text-center text-gray-400">
                We couldn't find any matches for "{searchQuery}"
              </Text>
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchPage;
