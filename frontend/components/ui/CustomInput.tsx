import React, { useState } from "react";
import {
  TextInput,
  Text,
  View,
  TextInputProps,
  StyleSheet,
} from "react-native";

interface CustomInputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  error,
  className,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          isFocused && styles.inputFocused,
          error && styles.inputError,
        ]}
        placeholderTextColor="#A9A9A9"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#4B5563",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "white",
    borderColor: "#D1D5DB",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 18,
    fontSize: 16,
  },
  inputFocused: {
    borderColor: "#3B82F6",
    borderWidth: 2,
  },
  inputError: {
    borderColor: "#F87171",
  },
  error: {
    color: "#F87171",
    fontSize: 12,
    marginTop: 4,
  },
});
