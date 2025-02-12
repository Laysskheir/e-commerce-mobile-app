// frontend/components/filters/RangeSlider.tsx
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';

interface RangeSliderProps {
  title: string;
  min: number;
  max: number;
  value: { min: number; max: number };
  onValueChange: (value: { min: number; max: number }) => void;
  step?: number;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  title,
  min,
  max,
  value,
  onValueChange,
  step = 10
}) => {
  const handleMinChange = (newMin: number) => {
    onValueChange({ 
      min: Math.min(newMin, value.max), 
      max: value.max 
    });
  };

  const handleMaxChange = (newMax: number) => {
    onValueChange({ 
      min: value.min, 
      max: Math.max(newMax, value.min) 
    });
  };

  return (
    <View className="mb-4">
      <Text className="text-lg font-semibold mb-2">{title}</Text>
      <View className="flex-row items-center">
        <Text className="mr-2">Min: ${value.min}</Text>
        <Slider
          style={{ flex: 1 }}
          minimumValue={min}
          maximumValue={max}
          value={value.min}
          onValueChange={handleMinChange}
          step={step}
          minimumTrackTintColor="black"
          maximumTrackTintColor="secondary"
        />
      </View>
      <View className="flex-row items-center">
        <Text className="mr-2">Max: ${value.max}</Text>
        <Slider
          style={{ flex: 1 }}
          minimumValue={min}
          maximumValue={max}
          value={value.max}
          onValueChange={handleMaxChange}
          step={step}
          minimumTrackTintColor="black"
          maximumTrackTintColor="secondary"
        />
      </View>
    </View>
  );
};

export default RangeSlider;