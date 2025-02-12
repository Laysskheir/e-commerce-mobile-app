// ProductColorSelector.tsx
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  AccessibilityInfo,
} from "react-native";
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";
import { ProductColor } from "@/store/types";

// Define the interface for ProductColorSelectorProps with more precise typing
interface ProductColorSelectorProps {
  colors: ProductColor[];
  selectedColor: ProductColor | null;
  onColorSelect: (color: ProductColor) => void;
  className?: string; // Optional additional styling
}

// Enhanced color normalization with more robust handling
const normalizeColor = (color: ProductColor): string => {
  // Predefined color map with more comprehensive color support
  const colorMap: { [key: string]: string } = {
    red: "#FF0000",
    blue: "#0000FF",
    green: "#00FF00",
    black: "#000000",
    white: "#FFFFFF",
    gray: "#808080",
    yellow: "#FFFF00",
    purple: "#800080",
    orange: "#FFA500",
    pink: "#FFC0CB",
    navy: "#000080",
    teal: "#008080",
    maroon: "#800000",
    olive: "#808000",
  };

  // Convert color to string to handle potential type variations
  const colorString = color.toString().toLowerCase();

  // If it's already a valid hex color, return it
  if (/^#([0-9A-F]{3}){1,2}$/i.test(colorString)) {
    return colorString;
  }

  // Try to get color from map, default to a neutral gray if not found
  return colorMap[colorString] || "#A9A9A9";
};

export const ProductColorSelector: React.FC<ProductColorSelectorProps> = ({
  colors,
  selectedColor,
  onColorSelect,
  className = "",
}) => {
  const handleColorSelect = (color: ProductColor) => {
    // Provide haptic feedback on mobile platforms
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    // Announce color selection for screen readers
    AccessibilityInfo.announceForAccessibility(`Selected color ${color}`);

    onColorSelect(color);
  };

  return (
    <View className={`mt-4 ${className}`}>
      <Text className="text-lg font-semibold mb-2">Select Color</Text>
      <View
        className="flex-row flex-wrap gap-2"
        accessibilityLabel="Color selection options"
        accessibilityRole="radiogroup"
      >
        {colors.map((color) => {
          const normalizedColor = normalizeColor(color);
          const isSelected = selectedColor === color;

          return (
            <View key={color.toString()} className="relative">
              <TouchableOpacity
                onPress={() => handleColorSelect(color)}
                accessibilityLabel={`Select ${color} color`}
                accessibilityRole="radio"
                accessibilityState={{ selected: isSelected }}
                className={`
                  w-10 h-10 rounded-full
                  ${isSelected ? "border-2 border-gray-300" : ""}
                `}
                style={{
                  backgroundColor: normalizedColor,
                  // Add subtle elevation for better visual hierarchy
                  elevation: isSelected ? 3 : 1,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 1,
                }}
              />
              {isSelected && (
                <View
                  className="absolute -top-1 -right-1 bg-primary rounded-full p-0.5"
                  style={{
                    elevation: 2,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.2,
                    shadowRadius: 1,
                  }}
                >
                  <Ionicons name="checkmark" size={12} color="white" />
                </View>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};
