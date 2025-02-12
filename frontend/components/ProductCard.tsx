// frontend/components/products/ProductCard.tsx
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Product } from "@/store/types";
import Icons from "./icons";

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  const { name, price, images, discount, brand } = product;

  // Placeholder image if no images available
  const imageSource =
    images && images.length > 0
      ? { uri: images[0] }
      : require("@/assets/images/placeholder.svg");

  // Render discount badge if applicable
  const renderDiscountBadge = () => {
    if (!discount) return null;

    return (
      <View className="absolute top-2 right-2 bg-red-500 px-2 py-1 rounded-md z-10">
        <Text className="text-white text-xs font-bold">{discount}% OFF</Text>
      </View>
    );
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-[48%] mb-4 bg-gray-50 rounded-xl p-2"
      accessibilityLabel={`View ${name} details`}
    >
      <View className="relative">
        <Image
          accessibilityRole="image"
          source={imageSource}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
          accessibilityLabel={`Image of ${name}`}
          defaultSource={require("@/assets/images/placeholder.svg")}
        />
        {renderDiscountBadge()}

        {/* Wishlist/Favorite Button */}
        <TouchableOpacity
          className="absolute top-2 left-2 bg-white/70 p-2 rounded-full"
          onPress={() => {
            /* Add to wishlist logic */
          }}
        >
          <Icons.Heart color="black" size={20} />
        </TouchableOpacity>
      </View>

      <View className="mt-2">
        <Text className="font-bold text-gray-800 text-base" numberOfLines={2}>
          {name}
        </Text>

        <View className="flex-row justify-between items-center mt-1">
          <Text className="text-gray-600 font-semibold">
            ${price.toLocaleString()}
          </Text>

          {/* Rating */}
          {/* <View className="flex-row items-center">
            <Icons.Star color="#FFD700" size={16} />
            <Text className="ml-1 text-gray-600">
              {product.rating || '4.5'}
            </Text>
          </View> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(ProductCard);
