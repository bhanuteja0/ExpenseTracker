
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Api = axios.create({
  baseURL: "http://10.172.129.20:3001", // Android emulator
  // baseURL: "http:// 192.168.56.1:3001", // iOS simulator
  headers: {
    "Content-Type": "application/json",
  },
});

Api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default Api;
