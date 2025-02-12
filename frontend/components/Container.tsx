import React from "react";
import { View } from "react-native";

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <View className={`flex-1 py-4 pt-8 bg-white text-black ${className}`}>
      {children}
    </View>
  );
};

export default Container;
