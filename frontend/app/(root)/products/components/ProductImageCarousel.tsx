// ProductImageCarousel.tsx
import React, { useState, useCallback, useMemo } from "react";
import { View, Image, Dimensions, TouchableOpacity } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { AntDesign } from "@expo/vector-icons";

interface ProductImageCarouselProps {
  images: (string | undefined)[];
  productName: string;
  onFavoriteToggle: () => void;
  isFavorite: boolean;
}

export const ProductImageCarousel: React.FC<ProductImageCarouselProps> = ({
  images,
  productName,
  onFavoriteToggle,
  isFavorite,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { width: screenWidth } = Dimensions.get("window");

  // Memoize the onSnapToItem handler
  const handleSnapToItem = useCallback((index: number) => {
    setCurrentImageIndex(index);
  }, []);

  // Filter out undefined images
  const validImages = useMemo(
    () =>
      (images || []).filter((image): image is string => image !== undefined),
    [images]
  );

  // Early return if no valid images
  if (validImages.length === 0) {
    return null;
  }

  return (
    <View className="items-center relative">
      <Carousel
        loop={false}
        width={screenWidth}
        height={screenWidth}
        data={validImages}
        scrollAnimationDuration={300}
        onSnapToItem={handleSnapToItem}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            className="w-full h-96 rounded-none"
            resizeMode="cover"
            accessibilityLabel={`Image of ${productName}`}
            accessible={true}
          />
        )}
      />

      {/* Image Pagination Dots */}
      {validImages.length > 1 && (
        <View
          className="flex-row absolute bottom-16"
          accessibilityLabel={`Image ${currentImageIndex + 1} of ${
            validImages.length
          }`}
        >
          {validImages.map((_, index) => (
            <View
              key={index}
              className={`h-2 w-2 rounded-full mx-1 ${
                index === currentImageIndex ? "bg-black" : "bg-gray-300"
              }`}
              accessibilityLabel={`Image ${index + 1}`}
            />
          ))}
        </View>
      )}

      <TouchableOpacity
        onPress={onFavoriteToggle}
        className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-sm"
        accessibilityLabel={
          isFavorite ? "Remove from favorites" : "Add to favorites"
        }
        accessibilityRole="button"
      >
        <AntDesign
          name={isFavorite ? "heart" : "hearto"}
          size={20}
          color={isFavorite ? "red" : "#000"}
        />
      </TouchableOpacity>
    </View>
  );
};
