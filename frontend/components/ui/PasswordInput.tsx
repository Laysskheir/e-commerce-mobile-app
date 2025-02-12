import React from "react";
import { TouchableOpacity, View } from "react-native";
import { CustomInput } from "./CustomInput";
import Icons from "@/components/icons";

interface PasswordInputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  isPasswordVisible?: boolean;
  togglePasswordVisibility?: () => void;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder = "Enter your password",
  error,
  isPasswordVisible = false,
  togglePasswordVisibility,
}) => {
  return (
    <View>
      <View className="relative">
        <CustomInput
          label={label}
          placeholder={placeholder}
          secureTextEntry={!isPasswordVisible}
          value={value}
          onChangeText={onChangeText}
          error={error}
          className="pr-12"
        />
        {togglePasswordVisibility && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            {isPasswordVisible ? (
              <Icons.EyeOff size={22} color="gray" />
            ) : (
              <Icons.Eye size={22} color="gray" />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
