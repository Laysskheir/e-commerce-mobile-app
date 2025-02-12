// frontend/app/(root)/(tabs)/home.tsx
import React, { useEffect, useCallback, useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import useStore from "../../../store/useStore";
import Button from "@/components/ui/Button";
import Container from "@/components/Container";
import Icons from "@/components/icons";
import ProductCard from "@/components/ProductCard";
import { Category, Product } from "@/store/types";

const Home = () => {
  const router = useRouter();
  const {
    products,
    fetchProducts,
    loading: productsLoading,
    categories,
    fetchCategories,
    loading: categoriesLoading,
  } = useStore();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Fetch categories and products on mount
  useEffect(() => {
    const initializeData = async () => {
      await fetchCategories();
      await fetchProducts({
        categoryId: selectedCategory || undefined,
        searchQuery,
      });
    };

    initializeData();
  }, []);

  // Refetch products when category or search query changes
  useEffect(() => {
    fetchProducts({
      categoryId: selectedCategory || undefined,
      searchQuery,
    });
  }, [selectedCategory, searchQuery]);

  // Memoized navigation handler
  const handleProductPress = useCallback(
    (slug: string) => router.push(`/products/${slug}`),
    [router]
  );

  // Memoized filtered products
  const filteredProducts = useMemo(() => {
    return products.filter((product: Product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  // Render category item
  const renderCategoryItem = useCallback(
    (category: Category) => (
      <TouchableOpacity
        key={category._id}
        className={`mr-2 p-3 px-4 rounded-xl ${
          selectedCategory === category._id
            ? "bg-primary"
            : " border border-secondary"
        }`}
        onPress={() => setSelectedCategory(category._id)}
        accessibilityLabel={`Filter by ${category.title}`}
      >
        <Text
          className={`${
            selectedCategory === category._id ? "text-white" : "text-black"
          }`}
        >
          {category.title}
        </Text>
      </TouchableOpacity>
    ),
    [selectedCategory]
  );

  // Render product item
  const renderProductItem = useCallback(
    ({ item }: { item: Product }) => (
      <ProductCard
        product={item}
        onPress={() => handleProductPress(item.slug)}
      />
    ),
    []
  );

  // Loading state
  if (categoriesLoading || productsLoading) {
    return (
      <Container className="flex-1 justify-center items-center">
        <Text>Loading...</Text>
      </Container>
    );
  }

  return (
    <Container className="flex-1 bg-white p-4 pt-8">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-4xl font-bold text-gray-900">Discover</Text>
        <Button
          variant="secondary"
          fullWidth={false}
          onPress={() => router.push("/notifications")}
          accessibilityLabel="Go to notifications"
        >
          <Icons.Bell color="black" size={24} />
        </Button>
      </View>

      {/* Search and Filter */}
      <View className="flex-row justify-between gap-4 items-center mb-4">
        <View className="relative flex-1">
          <TextInput
            placeholder="Search for clothes..."
            placeholderTextColor="#A9A9A9"
            className="border border-gray-300 pl-10 p-3 rounded-xl bg-gray-50 text-gray-800"
            value={searchQuery}
            onChangeText={setSearchQuery}
            accessibilityLabel="Search input"
          />
          <View className="absolute left-3 top-1/2 -translate-y-1/2">
            <Icons.Search size={20} color="gray" />
          </View>
        </View>

        <Button
          variant="primary"
          onPress={() => router.push("/filters")}
          fullWidth={false}
        >
          <Icons.Sliders color="white" size={24} />
        </Button>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-6 h-14"
        contentContainerStyle={{ alignItems: "center" }}
      >
        <View className="flex-row items-center h-full">
          <TouchableOpacity
            key="all-categories"
            className={`mr-2 p-3 px-5 rounded-xl ${
              selectedCategory === null ? "bg-primary" : "bg-gray-100"
            }`}
            onPress={() => setSelectedCategory(null)}
            accessibilityLabel="Show all categories"
          >
            <Text
              className={`${
                selectedCategory === null ? "text-white" : "text-black"
              }`}
            >
              All
            </Text>
          </TouchableOpacity>

          {categories.map(renderCategoryItem)}
        </View>
      </ScrollView>

      {/* Products */}
      {filteredProducts.length > 0 ? (
        <FlatList
          data={filteredProducts}
          numColumns={2}
          keyExtractor={(item) => `product-${item._id}`}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          className="h-full"
          contentContainerStyle={{ paddingBottom: 16 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }: { item: Product }) => (
            <TouchableOpacity
              className="w-[48%] mb-4 bg-gray-50 rounded-xl p-2"
              accessibilityLabel={`View ${item.name} details`}
              onPress={() => router.push(`/products/${item.slug}`)}
            >
              <View className="relative">
                <Image
                  source={item.images && { uri: item.images[0] }}
                  className="w-full h-52 rounded-lg"
                  accessibilityLabel={`Image of ${item.name}`}
                  defaultSource={require("@/assets/images/placeholder.svg")}
                />
                {item.discount ? (
                  <View className="absolute top-2 right-2 bg-red-500 px-2 py-1 rounded-md">
                    <Text className="text-white text-xs font-bold">
                      {item.discount}% OFF
                    </Text>
                  </View>
                ) : null}
              </View>
              <View className="mt-2">
                <Text
                  className="font-bold text-gray-800 text-base"
                  numberOfLines={2}
                >
                  {item.name}
                </Text>
                <Text className="text-gray-600 font-semibold mt-1">
                  ${item.price.toLocaleString()}
                </Text>
              </View>
              <TouchableOpacity
                className="absolute top-2 left-2 bg-white/70 p-2 rounded-full"
                onPress={() => {
                  /* Add to wishlist logic */
                }}
              >
                <Icons.Heart color="black" size={20} />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View className="flex-1 justify-center items-center min-h-[70%]">
          <Text className="text-gray-500">No products found</Text>
        </View>
      )}
    </Container>
  );
};

export default React.memo(Home);
