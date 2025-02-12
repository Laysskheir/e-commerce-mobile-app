// frontend/components/filters/MultiSelectList.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface Option {
  label: string;
  value: string;
}

interface MultiSelectListProps {
  title: string;
  options: Option[];
  selected: string[];
  onSelect: (selected: string[]) => void;
  maxSelections?: number;
}

const MultiSelectList: React.FC<MultiSelectListProps> = ({
  title,
  options,
  selected,
  onSelect,
  maxSelections = 5
}) => {
  const toggleSelection = (value: string) => {
    const isSelected = selected.includes(value);
    let newSelected: string[];

    if (isSelected) {
      // Remove if already selected
      newSelected = selected.filter(item => item !== value);
    } else {
      // Add if not at max selections
      newSelected = selected.length < maxSelections 
        ? [...selected, value] 
        : selected;
    }

    onSelect(newSelected);
  };

  return (
    <View className="mb-4">
      <Text className="text-lg font-semibold mb-2">{title}</Text>
      <View className="flex-row flex-wrap">
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            className={`
              px-3 py-2 m-1 rounded-full
              ${selected.includes(option.value) 
                ? 'bg-primary-500 text-white' 
                : 'bg-neutral-200'}
            `}
            onPress={() => toggleSelection(option.value)}
          >
            <Text className={
              selected.includes(option.value) 
                ? 'text-white' 
                : 'text-neutral-800'
            }>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {selected.length >= maxSelections && (
        <Text className="text-xs text-red-500 mt-1">
          Maximum {maxSelections} selections allowed
        </Text>
      )}
    </View>
  );
};

export default MultiSelectList;


