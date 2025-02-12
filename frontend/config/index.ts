import { Platform } from "react-native";

// Function to get the correct IP for your development machine
export const getApiUrl = () => {
  const localIp = "192.168.1.2";

  return Platform.select({
    ios: `http://${localIp}:5000`,
    android: "http://10.0.2.2:5000",
    default: "http://localhost:5000",
  });
};
