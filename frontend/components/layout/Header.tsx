import { AntDesign } from "@expo/vector-icons";
import Icons from "@/components/icons";
import { TouchableOpacity, View, Text } from "react-native";
import { useRouter, usePathname } from "expo-router";
import useStore from "@/store/useStore";
import Badge from "@/components/ui/Badge";
import Button from "../ui/Button";

export default function Header({ pageName }: { pageName: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const handleGoBack = () => router.back();
  const isProductPage = pathname.startsWith("/products/");

  const { cart } = useStore();
  const cartItemCount = cart.length;

  return (
    <View
      className="flex-row justify-between items-center p-4 bg-white"
      accessibilityRole="header"
    >
      <TouchableOpacity
        onPress={handleGoBack}
        accessibilityLabel="Go back"
        accessibilityHint="Navigate to previous screen"
      >
        <AntDesign name="arrowleft" size={28} color="primary" />
      </TouchableOpacity>
      <Text className="text-xl font-semibold text-gray-800">{pageName}</Text>
      <TouchableOpacity
        accessibilityLabel={isProductPage ? "Cart" : "Notifications"}
        accessibilityHint={isProductPage ? "Open cart" : "Open notifications"}
      >
        {isProductPage ? (
          <View className="relative">
            <Button variant="secondary" fullWidth={false}>
              <Icons.ShoppingCart
                size={28}
                color="black"
                accessibilityLabel="Cart"
                onPress={() => router.push("/cart")}
              />
            </Button>
            {cartItemCount > 0 && (
              <View className="absolute -top-4 -right-4">
                <Badge label={cartItemCount.toString()} />
              </View>
            )}
          </View>
        ) : (
          <Icons.Bell
            size={28}
            color="primary"
            accessibilityLabel="Notifications"
          />
        )}
      </TouchableOpacity>
    </View>
  );
}
