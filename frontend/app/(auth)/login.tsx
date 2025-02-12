import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import useStore from "@/store/useStore";
import Icons from "@/components/icons";
import { CustomInput } from "@/components/ui/CustomInput";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/Button";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Access auth methods from the store
  const { login, loading, errors, clearErrors } = useStore();

  // Clear errors when component mounts
  useEffect(() => {
    clearErrors();
  }, []);

  const handleLogin = async () => {
    try {
      await login(email, password);
      // Navigation logic after successful login
      router.replace("/(root)/(tabs)/home");
    } catch (err) {
      // Error handling is already managed in the slice
      console.log(err);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
        }}
        keyboardShouldPersistTaps="handled"
        className="px-6"
      >
        <View className="space-y-6">
          {/* Header */}
          <View className="mb-6">
            <Text className="text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Welcome Back
            </Text>
            <Text className="text-base text-gray-500 mt-2">
              Sign in to continue your shopping experience
            </Text>
          </View>

          {/* Error Handling */}
          {errors.some((err: any) => !err.field) && (
            <View className="bg-red-100 p-4 rounded-xl border border-red-300 flex-row items-center space-x-3">
              {/* <Icons.AlertCircle color="#ef4444" size={24} /> */}
              <Text className="text-red-600 flex-1 text-sm">
                {errors.find((err: any) => !err.field)?.message}
              </Text>
            </View>
          )}

          {/* Input Fields */}
          <View className="space-y-4">
            <CustomInput
              label="Email Address"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.find((err: any) => err.field === "email")?.message}
            />

            <PasswordInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              isPasswordVisible={isPasswordVisible}
              togglePasswordVisibility={togglePasswordVisibility}
              error={
                errors.find((err: any) => err.field === "password")?.message
              }
            />

            {/* Forgot Password */}
            <TouchableOpacity
              className="self-end mb-4"
              onPress={() => router.push("/(auth)/forgot-password")}
            >
              <Text className="text-primary font-medium text-sm">
                Forgot Password?
              </Text>
            </TouchableOpacity>

            {/* Login Button */}
            <Button
              variant="primary"
              text={loading ? "Logging In..." : "Log In"}
              onPress={()=> router.replace("/(root)/(tabs)/home")}
              //disabled={loading || !email || !password}
              className="mt-2 active:scale-[0.98] transition-transform duration-100"
            />
          </View> 

          {/* Divider */}
          <View className="flex-row items-center my-6">
            <View className="flex-1 h-px bg-gray-300" />
            <Text className="mx-4 text-gray-500">Or continue with</Text>
            <View className="flex-1 h-px bg-gray-300" />
          </View>

          {/* Social Login Buttons */}
          <View className="space-y-3">
            <View className="flex-row items-center justify-center gap-3">
              <TouchableOpacity
                className="bg-white border border-gray-200 p-4 rounded-full shadow-sm"
                onPress={() => {
                  /* Google Login */
                }}
              >
                <Icons.Google color="#4285F4" size={24} />
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-white border border-gray-200 p-4 rounded-full shadow-sm"
                onPress={() => {
                  /* Facebook Login */
                }}
              >
                <Icons.Facebook color="#3b5998" size={24} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Sign Up Link */}
          <View className="flex-row justify-center mt-6 items-center">
            <Text className="text-gray-500 text-sm">
              Don't have an account?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/(auth)/register")}
              className="ml-1"
            >
              <Text className="text-primary font-bold text-sm">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
