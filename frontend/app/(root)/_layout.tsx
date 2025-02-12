import { Stack } from "expo-router";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

const RootLayout = () => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen
            name="products/[slug]"
            options={{
              headerShown: false,
              // animation: "slide_from_bottom",
              animation: "default",
            }}
          />
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
              animation: "default",
            }}
          />
          <Stack.Screen
            name="filters"
            options={{
              presentation: "formSheet",
              sheetAllowedDetents: [0.5],
              sheetCornerRadius: 24,
              headerShown: false,
              animation: "slide_from_bottom",
              gestureEnabled: true,
              gestureDirection: "vertical",
              contentStyle: {
                backgroundColor: "white",
              },
              freezeOnBlur: true,
            }}
          />
          <Stack.Screen
            name="notifications"
            options={{
              headerShown: false,
              animation: "slide_from_bottom",
            }}
          />
        </Stack>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default RootLayout;
