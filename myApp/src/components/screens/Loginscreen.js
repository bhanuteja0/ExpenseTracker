import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser } from "../../../sevices/Appservice";
import tailwind from "twrnc";

export default function Loginscreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [user_pwd, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const validate = () => {
    let newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!user_pwd.trim()) {
      newErrors.password = "Password is required";
    } else if (user_pwd.length < 6) {
      newErrors.password = "Minimum 6 characters required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlelogin = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      setErrors({});

      const res = await loginUser({
        email,
        user_pwd,
      });

      await AsyncStorage.setItem("token", res.data.token);
      await AsyncStorage.setItem("user_id", res.data.user_id.toString());
      await AsyncStorage.setItem("user_name", JSON.stringify(res.data.user_name));

      navigation.replace("bottomtabs");
    } catch (error) {
      console.log("Login error:", error.response?.data || error.message);
      setErrors({ general: "Invalid email or password" });
    } finally {
      setLoading(false);
    }
  };

  const handleregister = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={tailwind`flex-1 bg-white px-6 justify-center`}>
      {/* App Title */}
      <View style={tailwind`mb-10`}>
        <Text style={tailwind`text-3xl font-bold text-black text-center`}>
          ExpensyWise
        </Text>
        <Text style={tailwind`text-gray-500 text-center mt-2`}>
          Manage your expenses Wisely
        </Text>
      </View>

      {/* Email */}
      <View style={tailwind`mb-5`}>
        <Text style={tailwind`text-sm text-gray-500 mb-2`}>Email</Text>
        <TextInput
          placeholder="Enter email address"
          placeholderTextColor="#9CA3AF"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          style={tailwind`border border-gray-300 rounded-xl px-4 py-3 text-black`}
        />
        {errors.email && (
          <Text style={tailwind`text-red-500 text-sm mt-1`}>
            {errors.email}
          </Text>
        )}
      </View>

      {/* Password */}
      <View style={tailwind`mb-6`}>
        <Text style={tailwind`text-sm text-gray-500 mb-2`}>Password</Text>
        <TextInput
          placeholder="Enter password"
          placeholderTextColor="#9CA3AF"
          value={user_pwd}
          onChangeText={setPassword}
          secureTextEntry
          style={tailwind`border border-gray-300 rounded-xl px-4 py-3 text-black`}
        />
        {errors.password && (
          <Text style={tailwind`text-red-500 text-sm mt-1`}>
            {errors.password}
          </Text>
        )}
      </View>

      {/* General Error */}
      {errors.general && (
        <Text style={tailwind`text-red-600 text-center mb-4`}>
          {errors.general}
        </Text>
      )}

      {/* Login Button */}
      <Pressable onPress={handlelogin} disabled={loading}>
        <View
          style={tailwind`bg-black rounded-xl py-4 mb-4 ${
            loading ? "opacity-50" : ""
          }`}
        >
          <Text style={tailwind`text-white text-center font-semibold`}>
            {loading ? "Logging in..." : "Login"}
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
