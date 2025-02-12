// ProductSizeSelector.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import { ProductSize } from '@/store/types';

interface ProductSizeSelectorProps {
  sizes: ProductSize[];
  selectedSize: ProductSize | null;
  onSizeSelect: (size: ProductSize) => void;
}

export const ProductSizeSelector: React.FC<ProductSizeSelectorProps> = ({
  sizes,
  selectedSize,
  onSizeSelect
}) => {
  const handleSizeSelect = (size: ProductSize) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onSizeSelect(size);
  };

  return (
    <View className="mt-4">
      <Text className="text-lg font-semibold mb-2">Select Size</Text>
      <View className="flex-row flex-wrap gap-2">
        {sizes.map((size) => (
          <TouchableOpacity
            key={size}
            onPress={() => handleSizeSelect(size)}
            className={
              `px-4 py-2 rounded-lg border 
              ${selectedSize === size 
                ? 'bg-primary border-primary' 
                : 'bg-white border-gray-300'}
            `}
          >
            <Text
              className={
                `text-base 
                ${selectedSize === size 
                  ? 'text-white' 
                  : 'text-black'}
              `}
            >
              {size}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};