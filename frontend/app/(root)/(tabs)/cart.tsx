import Button from "@/components/ui/Button";
import useStore from "@/store/useStore";
import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useStore();
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shippingFee = 80;
  const total = subtotal + shippingFee;

  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
        <Text className="text-2xl font-bold">My Cart</Text>
        {cart.length > 0 && (
          <TouchableOpacity onPress={clearCart}>
            <Text className="text-red-500">Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      {cart.length === 0 ? (
        <View className="flex-1 items-center justify-center space-y-4">
          <Ionicons name="cart-outline" size={100} color="gray" />
          <Text className="text-xl text-gray-500">Your cart is empty</Text>
          <Button
            text="Start Shopping"
            variant="secondary"
            className="mt-4 "
            textSize="md"
            fullWidth={false}
            onPress={() => router.push("/")} // Navigate to home/products
          />
        </View>
      ) : (
        <ScrollView>
          {cart.map((item) => {
            const { _id, images, name, price } = item.product;
            return (
              <View
                key={_id}
                className="flex-row items-center p-4 border-b border-gray-200 bg-white"
              >
                {images?.[0] && (
                  <Image
                    source={{ uri: images[0] }}
                    className="w-24 h-24 rounded-lg mr-4"
                  />
                )}
                <View className="flex-1">
                  <Text className="text-lg font-semibold">{name}</Text>
                  <View className="flex-row justify-between items-center">
                    <View>
                      <Text className="text-sm text-gray-500">
                        Size: {item.selectedSize || "N/A"} | Color:{" "}
                        {item.selectedColor || "N/A"}
                      </Text>
                      <Text className="text-base font-medium mt-1">
                        ${price.toLocaleString()}
                      </Text>
                    </View>
                    <View className="flex-row items-center gap-2">
                      <Button
                        variant="secondary"
                        fullWidth={false}
                        onPress={() =>
                          updateQuantity(_id, Math.max(0, item.quantity - 1))
                        }
                      >
                        <Text className="text-lg px-2">-</Text>
                      </Button>
                      <Text className="text-base w-6 text-center">
                        {item.quantity}
                      </Text>
                      <Button
                        variant="secondary"
                        fullWidth={false}
                        onPress={() =>
                          updateQuantity(item._id, item.quantity + 1)
                        }
                      >
                        <Text className="text-lg px-1.5">+</Text>
                      </Button>
                    </View>
                  </View>
                </View>
                <Button
                  onPress={() => removeFromCart(item._id)}
                  className="ml-2"
                  fullWidth={false}
                  variant="destructive"
                >
                  <Ionicons name="trash-outline" size={18} color="white" />
                </Button>
              </View>
            );
          })}
        </ScrollView>
      )}

      {cart.length > 0 && (
        <View className="p-4 bg-white rounded-t-2xl shadow-md">
          <View className="gap-2 mb-4">
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Sub-total</Text>
              <Text className="font-medium">${subtotal.toLocaleString()}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Shipping fee</Text>
              <Text className="font-medium">${shippingFee}</Text>
            </View>
            <View className="flex-row justify-between pt-2 border-t border-gray-200">
              <Text className="text-xl font-bold">Total</Text>
              <Text className="text-xl font-bold">
                ${total.toLocaleString()}
              </Text>
            </View>
          </View>
          <Button
            text="Proceed to Checkout"
            variant="primary"
            onPress={() => console.log("Checkout pressed")}
          />
        </View>
      )}
    </View>
  );
};

export default Cart;
