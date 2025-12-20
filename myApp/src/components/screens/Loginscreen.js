import { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  Button,
  StyleSheet,Pressable
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import Appservice from "../../../sevices/Appservice";
import Homescreen from "./Homescreen";
//import Register from "./Register";
import { loginUser } from "../../../sevices/Appservice";
import { Alert } from "react-native";
import tailwind from "twrnc";

export default function Loginscreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

const handlelogin = async () => {
  try {
    const res = await loginUser({
      email,
      password,
    });

    await AsyncStorage.setItem("token", res.data.token);
    await AsyncStorage.setItem("user", JSON.stringify(res.data.user));


    navigation.replace("bottomtabs");
  } catch (error) {
    console.log("LOGIN ERROR:", error.response?.data || error.message);
    Alert.alert(error.response?.data?.message || "Login failed");
  }
};

  const handleregister=()=>{
    navigation.navigate("Register");
  }




 return (
   <View style={tailwind`flex-1 bg-white px-6 justify-center`}>

      {/* App Title */}
      <View style={tailwind`mb-10`}>
        <Text style={tailwind`text-3xl font-bold text-black text-center`}>
          Expense Tracker
        </Text>
        <Text style={tailwind`text-gray-500 text-center mt-2`}>
          Manage your expenses easily
        </Text>
      </View>

      {/* Email */}
      <View style={tailwind`mb-5`}>
        <Text style={tailwind`text-sm text-gray-500 mb-2`}>
          Email
        </Text>
        <TextInput
          placeholder="Enter email address"
          placeholderTextColor="#9CA3AF"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          style={tailwind`border border-gray-300 rounded-xl px-4 py-3 text-black`}
        />
      </View>

      {/* Password */}
      <View style={tailwind`mb-6`}>
        <Text style={tailwind`text-sm text-gray-500 mb-2`}>
          Password
        </Text>
        <TextInput
          placeholder="Enter password"
          placeholderTextColor="#9CA3AF"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={tailwind`border border-gray-300 rounded-xl px-4 py-3 text-black`}
        />
      </View>

      {/* Message */}
      {message !== "" && (
        <Text
          style={tailwind`text-sm mb-4 ${
            message.includes("Successful")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {message}
        </Text>
      )}

      {/* Login Button */}
      <Pressable onPress={handlelogin}>
        <View style={tailwind`bg-black rounded-xl py-4 mb-4`}>
          <Text style={tailwind`text-white text-center font-semibold`}>
            Login
          </Text>
        </View>
      </Pressable>

      {/* Register Button */}
      <Pressable onPress={handleregister}>
        <View style={tailwind`border border-black rounded-xl py-4`}>
          <Text style={tailwind`text-black text-center font-semibold`}>
            Register
          </Text>
        </View>
      </Pressable>

    </View>
  );
}

