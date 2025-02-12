import React from "react";
import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  View,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { type ReactNode } from "react";

interface ButtonProps extends TouchableOpacityProps {
  text?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
  textSize?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outline" | "destructive";
  gradientColors?: [string, string, ...string[]];
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  leftIcon,
  rightIcon,
  children,
  textSize = "md",
  variant = "primary",
  gradientColors,
  fullWidth = true,
  ...props
}) => {
  const getGradientColors = (
    variant: "primary" | "secondary" | "outline" | "destructive"
  ) => {
    const config = require("../../tailwind.config.js");
    const themeColors = config.theme.extend.colors;

    switch (variant) {
      case "primary":
        return [themeColors.gradient.start, themeColors.gradient.end];
      case "secondary":
        return ["#f4f4f5", "#f4f4f5"];
      case "outline":
        return ["#ffffff", "#ffffff"];
      case "destructive":
        return ["#dc2626", "#dc2626"];
      default:
        return [themeColors.gradient.start, themeColors.gradient.end];
    }
  };

  const isOutline = variant === "outline";
  const defaultColors = getGradientColors(variant);
  const hasText = Boolean(text);
  const hasIconOnly = !hasText && (leftIcon || rightIcon || children);

  const getTextStyle = () => {
    switch (variant) {
      case "primary":
        return { color: "#ffffff" };
      case "outline":
        return { color: "#000" };
      case "destructive":
        return { color: "#ffffff" };
      default:
        return { color: "#000" };
    }
  };

  const getTextSizeStyle = () => {
    switch (textSize) {
      case "sm":
        return { fontSize: 12 };
      case "md":
        return { fontSize: 16 };
      case "lg":
        return { fontSize: 20 };
      default:
        return { fontSize: 16 };
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        fullWidth && styles.fullWidth,
        isOutline && styles.outlineBorder,
      ]}
      {...props}
    >
      <LinearGradient
        colors={gradientColors || defaultColors}
        style={[
          styles.gradient,
          hasIconOnly ? styles.iconOnlyPadding : styles.textPadding,
        ]}
      >
        {leftIcon && (
          <View style={hasIconOnly ? {} : styles.iconMargin}>{leftIcon}</View>
        )}
        {hasText && (
          <Text
            style={[getTextStyle(), getTextSizeStyle(), { fontWeight: "600" }]}
          >
            {text}
          </Text>
        )}
        {children}
        {rightIcon && (
          <View style={hasIconOnly ? {} : styles.iconMargin}>{rightIcon}</View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "relative",
    overflow: "hidden",
    borderRadius: 12,
  },
  fullWidth: {
    width: "100%",
  },
  outlineBorder: {
    borderWidth: 1,
    borderColor: "#ccc",
  },
  gradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  textPadding: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  iconOnlyPadding: {
    padding: 8,
  },
  iconMargin: {
    marginHorizontal: 8,
  },
});

export default Button;
