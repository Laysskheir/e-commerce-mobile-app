import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import useStore from '@/store/useStore';
import { useRouter } from 'expo-router';
import { Product } from '@/store/types';

const Saved = () => {
  const router = useRouter();
  const { wishlist, fetchWishlist, removeFromWishlist } = useStore();

  useEffect(() => {
    fetchWishlist();
  }, []);

  const renderWishlistItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      onPress={() => router.push(`/products/${item.slug}`)}
      className="flex-row bg-white p-4 mb-2 rounded-lg"
    >
      <Image
        source={{ uri: item.images?.[0] || '' }}
        className="w-20 h-20 rounded-md mr-4"
      />
      <View className="flex-1 justify-center">
        <Text className="text-lg font-bold">{item.name}</Text>
        <Text className="text-gray-500">${item.price}</Text>
      </View>
      <TouchableOpacity 
        onPress={() => removeFromWishlist(item._id)}
        className="justify-center"
      >
        <Text className="text-red-500">Remove</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold mb-4">Saved Items</Text>
      {wishlist.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-500">No items in wishlist</Text>
        </View>
      ) : (
        <FlatList
          data={wishlist}
          renderItem={renderWishlistItem}
          keyExtractor={(item) => item._id}
        />
      )}
    </View>
  );
};

export default Saved;