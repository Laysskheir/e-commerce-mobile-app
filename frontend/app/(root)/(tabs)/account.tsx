import { useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import {
  MaterialIcons,
  AntDesign,
  Feather,
  FontAwesome,
} from "@expo/vector-icons";
import Header from "@/components/layout/Header";

const Account = () => {
  const navigation = useNavigation();

  const menuItems = [
    { icon: "shopping-bag", title: "My Orders", route: "MyOrders" },
    { icon: "user", title: "My Details", route: "MyDetails" },
    { icon: "book", title: "Address Book", route: "AddressBook" },
    { icon: "credit-card", title: "Payment Methods", route: "PaymentMethods" },
    { icon: "bell", title: "Notifications", route: "Notifications" },
    { icon: "help-outline", title: "FAQs", route: "FAQs" },
    { icon: "life-ring", title: "Help Center", route: "HelpCenter" },
    { icon: "logout", title: "Logout", textColor: "#EF4444" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1 px-6 pt-4"
        showsVerticalScrollIndicator={false}
      >
        <Header pageName="Account" />

        {/* User Profile */}
        <View className="bg-gray-50 p-6 rounded-xl border border-gray-200  flex-row items-center mb-6 ">
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=68" }}
            className="w-20 h-20 rounded-full border-4 border-gray-300 mr-4"
          />
          <View>
            <Text className="text-2xl font-bold text-gray-900">John Doe</Text>
            <Text className="text-gray-600">john.doe@example.com</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View className="gap-4">
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.title}
              className="flex-row items-center p-4 rounded-lg bg-white border border-gray-200  hover:bg-gray-50 active:bg-gray-100"
              onPress={() => {
                if (item.title === "Logout") {
                  console.log("Logout pressed");
                } else if (item.route) {
                  navigation.navigate(item.route);
                }
              }}
            >
              <View className="w-10 items-center">
                <Feather
                  name={item.icon}
                  size={24}
                  color={item.textColor || "#374151"}
                />
              </View>
              <Text
                className={`flex-1 text-lg font-medium text-gray-900 ${
                  item.textColor ? "text-red-500" : ""
                }`}
              >
                {item.title}
              </Text>
              {item.title !== "Logout" && (
                <Feather name="chevron-right" size={20} color="#9CA3AF" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Account;
