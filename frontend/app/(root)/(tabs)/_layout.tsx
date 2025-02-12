import Container from "@/components/Container";
import Icons from "@/components/icons";
import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Extracted tab bar styling
const TAB_BAR_STYLE = (insets: { bottom: number }) => ({
  backgroundColor: "#ffffff",
  borderTopWidth: 0,
  elevation: 5,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  height: 60 + insets.bottom,
});

// Reusable TabIcon component
const TabIcon = ({
  Icon,
  color,
  size,
  focused,
  accessibilityLabel,
}: {
  Icon: React.ComponentType<{ color: string; size: number }>;
  color: string;
  size: number;
  focused: boolean;
  accessibilityLabel: string;
}) => (
  <View
    className={`items-center justify-center ${focused ? "scale-110" : ""}`}
    accessibilityLabel={accessibilityLabel}
    accessibilityRole="button"
  >
    <Icon color={color} size={size} />
  </View>
);

const TabsLayout = () => {
  const insets = useSafeAreaInsets();

  return (
    <Container>
      <Tabs
        initialRouteName="home"
        screenOptions={{
          tabBarStyle: TAB_BAR_STYLE(insets),
          headerShown: false,
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "gray",
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <TabIcon
                Icon={Icons.Home}
                color={color}
                size={size}
                focused={focused}
                accessibilityLabel="Home"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <TabIcon
                Icon={Icons.Search}
                color={color}
                size={size}
                focused={focused}
                accessibilityLabel="Search"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="saved"
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <TabIcon
                Icon={Icons.Heart}
                color={color}
                size={size}
                focused={focused}
                accessibilityLabel="Saved Items"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <TabIcon
                Icon={Icons.ShoppingCart}
                color={color}
                size={size}
                focused={focused}
                accessibilityLabel="Shopping Cart"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <TabIcon
                Icon={Icons.User}
                color={color}
                size={size}
                focused={focused}
                accessibilityLabel="Account"
              />
            ),
          }}
        />
      </Tabs>
    </Container>
  );
};

export default TabsLayout;
