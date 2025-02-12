// ProductHeader.tsx
import React from "react";
import { View, Text } from "react-native";

interface ProductHeaderProps {
  name: string;
  brand?: string;
  material?: string;
}

export const ProductHeader: React.FC<ProductHeaderProps> = ({
  name,
  brand,
  material,
}) => (
  <>
    <Text className="text-2xl font-bold" accessibilityRole="header">
      {name}
    </Text>
    <View className="mt-2">
      <Text className="text-sm text-gray-600">
        {brand} | {material}
      </Text>
    </View>
  </>
);
