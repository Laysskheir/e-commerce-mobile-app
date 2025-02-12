import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import useStore from "@/store/useStore";
import { CustomInput } from "@/components/ui/CustomInput";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/Button";
import { checkPasswordStrength } from "@/lib/passwordStrength";
import Icons from "@/components/icons";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function RegisterScreen() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [passwordStrength, setPasswordStrength] = useState<ReturnType<
    typeof checkPasswordStrength
  > | null>(null);

  // Access auth methods from the store
  const { register, loading, errors, clearErrors } = useStore();

  // Clear errors when component mounts
  useEffect(() => {
    clearErrors();
  }, []);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  // Check password strength on password change
  useEffect(() => {
    if (password) {
      const strength = checkPasswordStrength(password);
      setPasswordStrength(strength);
    } else {
      setPasswordStrength(null);
    }
  }, [password]);

  const validateForm = () => {
    if (!firstName || !lastName || !email || !password) {
      return false;
    }
    if (password !== confirmPassword) {
      return false;
    }
    // Ensure password meets minimum strength
    return passwordStrength && passwordStrength.score > 2;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await register({
        firstName,
        lastName,
        email,
        password,
      });

      // Navigate to home or onboarding screen after successful registration
      router.replace("/(root)/(tabs)/home");
    } catch (err) {
      // Error handling is already managed in the slice
      console.log(err);
    }
  };

  // Helper to get error message for a specific field
  const getFieldError = (fieldName: string) => {
    const fieldError = errors.find((err: any) => err.field === fieldName);
    return fieldError ? fieldError.message : undefined;
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
              Create Account
            </Text>
            <Text className="text-base text-gray-500 mt-2">
              Join our community and start your shopping experience
            </Text>
          </View>

          {/* Error Handling */}
          {errors.some((err: any) => !err.field) && (
            <View className="bg-red-100 p-4 rounded-xl border border-red-300 flex-row items-center space-x-3">
              <Text className="text-red-600 flex-1 text-sm">
                {errors.find((err: any) => !err.field)?.message}
              </Text>
            </View>
          )}

          {/* Input Fields */}
          <View className="space-y-4">
            <View className="flex-row gap-4 w-full">
              <View className="flex-1">
                <CustomInput
                  label="First Name"
                  placeholder="First Name"
                  value={firstName}
                  onChangeText={setFirstName}
                  autoCapitalize="words"
                  error={getFieldError("firstName")}
                />
              </View>
              <View className="flex-1">
                <CustomInput
                  label="Last Name"
                  placeholder="Last Name"
                  value={lastName}
                  onChangeText={setLastName}
                  autoCapitalize="words"
                  error={getFieldError("lastName")}
                />
              </View>
            </View>
            <CustomInput
              label="Email Address"
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              error={getFieldError("email")}
            />

            <PasswordInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              isPasswordVisible={isPasswordVisible}
              togglePasswordVisibility={togglePasswordVisibility}
              error={getFieldError("password")}
            />

            {/* Password Strength Indicator */}
            {passwordStrength && (
              <View className="mb-3">
                {passwordStrength.feedback.warning && (
                  <Text className="text-orange-500 text-md">
                    {passwordStrength.feedback.warning}
                  </Text>
                )}
                {passwordStrength.feedback.suggestions.map(
                  (suggestion, index) => (
                    <Text key={index} className="text-gray-500 text-sm">
                      • {suggestion}
                    </Text>
                  )
                )}
              </View>
            )}

            <PasswordInput
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              isPasswordVisible={isConfirmPasswordVisible}
              togglePasswordVisibility={toggleConfirmPasswordVisibility}
              error={
                password !== confirmPassword
                  ? "Passwords do not match"
                  : undefined
              }
            />

            {/* Register Button */}
            <Button
              text={loading ? "Creating Account..." : "Register"}
              variant="primary"
              onPress={handleRegister}
              disabled={loading || !validateForm()}
              className="mt-4 active:scale-[0.98] transition-transform duration-100"
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

          {/* Login Link */}
          <View className="flex-row justify-center mt-6 items-center">
            <Text className="text-gray-500 text-sm">
              Already have an account?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/(auth)/login")}
              className="ml-1"
            >
              <Text className="text-primary font-bold text-sm">Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
