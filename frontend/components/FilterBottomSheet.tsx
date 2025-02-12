import React, { useRef, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import BottomSheet, { 
  BottomSheetModal, 
  BottomSheetModalProvider, 
  BottomSheetBackdrop,
  BottomSheetBackdropProps
} from '@gorhom/bottom-sheet';

interface FilterBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
}

const FilterBottomSheet: React.FC<FilterBottomSheetProps> = ({ 
  isVisible, 
  onClose 
}) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  const snapPoints = useMemo(() => ['50%'], []);

  // Render method for backdrop
  const renderBackdrop = React.useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop 
        {...props} 
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.5}
      />
    ),
    []
  );

  // Open/close effect
  React.useEffect(() => {
    if (isVisible) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [isVisible]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleApplyFilters = () => {
    console.log('Selected Categories:', selectedCategories);
    onClose();
  };

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      onDismiss={onClose}
      enableContentPanningGesture
      enablePanDownToClose
    >
      <View className="p-4 flex-1">
        <Text className="text-2xl font-bold mb-4">Filters</Text>
        
        <View>
          <Text className="text-lg mb-2">Category</Text>
          <View className="flex-row flex-wrap">
            {['Shirts', 'Pants', 'Shoes', 'Accessories'].map((category) => (
              <TouchableOpacity 
                key={category} 
                className={`p-2 rounded-md m-1 ${
                  selectedCategories.includes(category) 
                    ? 'bg-black' 
                    : 'bg-gray-200'
                }`}
                onPress={() => toggleCategory(category)}
              >
                <Text className={
                  selectedCategories.includes(category) 
                    ? 'text-white' 
                    : 'text-black'
                }>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity 
          className="bg-black p-3 rounded-xl mt-4"
          onPress={handleApplyFilters}
        >
          <Text className="text-white text-center">Apply Filters</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetModal>
  );
};

export default FilterBottomSheet;