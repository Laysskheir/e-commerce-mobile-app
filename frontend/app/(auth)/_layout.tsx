import useStore from "@/store/useStore";
import { Stack, Redirect } from "expo-router";
import React from "react";

const AuthLayout = () => {
  const { isAuthenticated } = useStore();

  // If user is already authenticated, redirect to home
  if (isAuthenticated) {
    return <Redirect href="/(root)/(tabs)/home" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
};

export default AuthLayout;
