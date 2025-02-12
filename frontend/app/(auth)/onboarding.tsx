import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import Icons from "@/components/icons";
import Animated, {
  SlideInRight,
  SlideOutLeft,
  Easing,
} from "react-native-reanimated";
import { Button } from "@/components/ui/Button";
import LottieView from "lottie-react-native";
import { useRef } from "react";

export default function WelcomeScreen() {
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const animationRef = useRef<LottieView>(null);

  const handleGetStarted = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push("/(auth)/login");
    }
  };

  // Returns the page step content (title and subtitle) for the current step.
  const renderPageStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <Text className="text-6xl font-extrabold text-center text-neutral-800">
              Unlock{"\n"} Your{"\n"}
              <Text className="italic text-primary">Personal Style</Text>
            </Text>
            <Text className="mt-6 text-lg text-neutral-700 text-center">
              Explore the intersection of style and individuality.
            </Text>
          </>
        );
      case 2:
        return (
          <>
            <Text className="text-6xl font-extrabold text-center text-neutral-800">
              Discover New{"\n"}
              <Text className="italic text-primary">Trends,</Text>
              {"\n"}Just for You.
            </Text>
            <Text className="mt-6 text-lg text-neutral-700 text-center">
              Explore curated trends tailored for you.
            </Text>
          </>
        );
      case 3:
        return (
          <>
            <Text className="text-6xl font-extrabold text-center text-neutral-800">
              Ready to Start{"\n"}
              <Text className="italic text-primary">Shopping?</Text>
            </Text>
            <Text className="mt-6 text-lg text-neutral-700 text-center">
              Get ready to enjoy a personalized shopping experience!
            </Text>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
      style={{ minHeight: SCREEN_HEIGHT }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          minHeight: SCREEN_HEIGHT,
          justifyContent: "space-between",
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View
          className="flex-1 p-8 pt-16 justify-between"
          style={{ minHeight: SCREEN_HEIGHT }}
        >
          <StatusBar style="dark" />

          {/* Conditional LottieView Rendering */}
          <View className="flex-1 items-center justify-center mb-8">
            {currentStep === 1 && (
              <LottieView
                ref={animationRef}
                source={require("../../assets/lottie/welcome1.json")}
                autoPlay
                loop
                style={{ width: 300, height: 300 }}
              />
            )}
            {currentStep === 2 && (
              <LottieView
                ref={animationRef}
                source={require("../../assets/lottie/welcome3.json")}
                autoPlay
                loop
                style={{ width: 350, height: 350 }}
              />
            )}
            {currentStep === 3 && (
              <LottieView
                ref={animationRef}
                source={require("../../assets/lottie/welcome2.json")}
                autoPlay
                loop
                style={{ width: 300, height: 300 }}
              />
            )}
          </View>

          {/* Animated Page Step Content - Adjusted margins */}
          <Animated.View
            key={currentStep}
            entering={SlideInRight.duration(500).easing(
              Easing.out(Easing.ease)
            )}
            exiting={SlideOutLeft.duration(300).easing(Easing.in(Easing.ease))}
            className="flex-1 justify-center items-center px-4"
          >
            {renderPageStep()}
          </Animated.View>

          {/* Next / Get Started Button - Added top margin */}
          <View className="pb-10 mt-6">
            <Button
              text={currentStep < 3 ? "Next" : "Get started"}
              onPress={handleGetStarted}
              rightIcon={<Icons.ArrowRight size={24} color="white" />}
              variant="primary"
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
