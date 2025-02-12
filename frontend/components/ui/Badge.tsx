import React from "react";
import { View, Text } from "react-native";

interface BadgeProps {
  label: string;
}

const Badge = ({ label }: BadgeProps) => {
  return (
    <View className="p-1 bg-primary inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold">
      <Text className="text-white">{label}</Text>
    </View>
  );
};

export default Badge;
