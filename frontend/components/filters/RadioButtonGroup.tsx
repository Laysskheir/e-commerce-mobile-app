// frontend/components/filters/RadioButtonGroup.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface Option {
  label: string;
  value: string;
}

interface RadioButtonGroupProps {
  title: string;
  options: Option[];
  selected: string;
  onSelect: (value: string) => void;
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  title,
  options,
  selected,
  onSelect,
}) => {
  return (
    <View className="mb-4">
      <Text className="text-lg font-semibold mb-2">{title}</Text>
      <View className="flex-row flex-wrap gap-2">
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            className={`p-2 px-4 m-1 rounded
                ${
                  selected === option.value
                    ? "bg-primary"
                    : "border border-secondary"
                }
              `}
            onPress={() => onSelect(option.value)}
          >
            <Text
              className={
                selected === option.value ? "text-white" : "text-neutral-800"
              }
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default RadioButtonGroup;
