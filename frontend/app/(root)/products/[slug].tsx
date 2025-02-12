// [slug].tsx
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  Platform,
  TouchableOpacity,
} from "react-native";
import * as Haptics from "expo-haptics";
import useStore from "@/store/useStore";
import Header from "@/components/layout/Header";

// Import the new components
import { ProductImageCarousel } from "./components/ProductImageCarousel";
import { ProductHeader } from "./components/ProductHeader";
import { ProductSizeSelector } from "./components/ProductSizeSelector";
import { ProductColorSelector } from "./components/ProductColorSelector";
import { ProductColor, ProductSize } from "@/store/types";
import Icons from "@/components/icons";
import { Button } from "@/components/ui/Button";

const ProductDetail = () => {
  const router = useRouter();
  const { slug } = useLocalSearchParams<{ slug?: string }>();

  // State management
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  // Store hooks
  const {
    fetchSingleProduct,
    product,
    addToCart,
    loading,
    error,
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useStore();

  // Product loading effect
  useEffect(() => {
    if (!slug) {
      Alert.alert("Error", "No product identifier found", [
        { text: "Go Back", onPress: () => router.back() },
      ]);
      return;
    }

    const loadProduct = async () => {
      try {
        await fetchSingleProduct(slug);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        Alert.alert("Error", "Unable to load product details", [
          { text: "Retry", onPress: () => loadProduct() },
          { text: "Go Back", onPress: () => router.back() },
        ]);
      }
    };

    loadProduct();
  }, [fetchSingleProduct, slug, router]);

  // Favorite toggle handler
  const toggleFavorite = useCallback(() => {
    if (product) {
      if (isInWishlist(product._id)) {
        removeFromWishlist(product._id);
      } else {
        addToWishlist(product);
      }
      setIsFavorite(!isFavorite);
    }
  }, [product, isInWishlist, addToWishlist, removeFromWishlist]);

  // Add to cart handler
  const handleAddToCart = useCallback(() => {
    if (!selectedSize) {
      Alert.alert(
        "Size Selection",
        "Please select a size before adding to cart",
        [{ text: "OK", style: "cancel" }]
      );
      return;
    }

    if (!selectedColor) {
      Alert.alert(
        "Color Selection",
        "Please select a color before adding to cart",
        [{ text: "OK", style: "cancel" }]
      );
      return;
    }

    if (product) {
      try {
        addToCart(
          {
            ...product,
            selectedSize,
            selectedColor,
          },
          1
        );

        if (Platform.OS !== "web") {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }

        Alert.alert("Success", "Product added to cart", [
          { text: "Continue Shopping", style: "default" },
          {
            text: "View Cart",
            style: "default",
            onPress: () => router.push("/(root)/(tabs)/cart"),
          },
        ]);
      } catch (err) {
        console.error("Failed to add to cart:", err);
        Alert.alert("Error", "Unable to add product to cart");
      }
    }
  }, [product, selectedSize, selectedColor, addToCart, router]);

  // Render loading state
  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="primary" />
      </SafeAreaView>
    );
  }

  // Render error state
  if (error || !product) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <Text className="text-red-500 text-lg">
          {error ? "Failed to load product" : "No product found"}
        </Text>
        <TouchableOpacity
          onPress={() => slug && fetchSingleProduct(slug)}
          className="mt-4 bg-black rounded-lg px-4 py-2"
        >
          <Text className="text-white">Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        accessibilityLabel="Product Details"
        keyboardShouldPersistTaps="handled"
      >
        <Header pageName="Details" />

        {/* Product Image Carousel */}

        {product.images && product.images.length > 0 && (
          <ProductImageCarousel
            images={product.images as (string | undefined)[]}
            productName={product.name}
            onFavoriteToggle={toggleFavorite}
            isFavorite={isInWishlist(product?._id)}
          />
        )}

        {/* Product Info Container */}
        <View className="px-4 mt-6">
          {/* Product Header */}
          <ProductHeader
            name={product.name}
            brand={product.brand}
            material={product.material}
          />

          {/* Product Description */}
          <View className="mt-4">
            <Text
              className="text-sm text-gray-600"
              style={{ lineHeight: 20 }}
              accessibilityLabel="Product description"
            >
              {product.description}
            </Text>
          </View>

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <ProductSizeSelector
              sizes={product.sizes}
              selectedSize={selectedSize}
              onSizeSelect={setSelectedSize}
            />
          )}

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <ProductColorSelector
              colors={product.colors}
              selectedColor={selectedColor}
              onColorSelect={setSelectedColor}
            />
          )}

          {/* Pricing Section */}
          <View className="mt-4 flex-row items-center">
            <Text className="text-xl font-bold">
              $
              {product.discount
                ? (product.price * (1 - product.discount / 100)).toFixed(2)
                : product.price.toFixed(2)}
            </Text>
            {product.discount && (
              <Text className="ml-2 text-sm text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </Text>
            )}
          </View>

          {/* Add to Cart Button */}
          <Button
            text="Add to Cart"
            variant="primary"
            leftIcon={<Icons.ShoppingCart color="white" size={22} />}
            className="mt-6"
            onPress={handleAddToCart}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetail;
