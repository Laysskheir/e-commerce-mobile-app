import Header from "@/components/layout/Header";
import { Text } from "@/components/ui/text";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Notification = () => {
  return (
    <SafeAreaView className="flex-1 p-4 bg-white">
      <Header pageName="Notifications" />
      <View className="flex-1 justify-center items-center p-4">
        <Feather name="bell-off" size={48} color="gray" className="mb-4" />
        <Text className="text-lg text-gray-500 text-center font-medium">
          You don't have any notifications
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Notification;
