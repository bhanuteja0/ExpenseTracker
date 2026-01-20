import React from "react";
import { TextInput } from "react-native";
import { useState } from "react";
import { registerUser } from "../../../sevices/Appservice";
import { Alert } from "react-native";
import tailwind from "twrnc";




import { View, Text ,Button,Pressable,StyleSheet} from "react-native";


const Register=({navigation})=> {

    const [user_name, setUsername] = useState("");
    const [phone, setPhonenumber] = useState("");
    const [email, setEmail] = useState("");
    const [user_pwd, setPassword] = useState("");

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const validate = () => {
  let newErrors = {};

  if (!user_name.trim()) newErrors.user_name = "Name is required";

  if (!phone.trim()) {
    newErrors.phone = "Phone is required";
  } else if (!/^\d{10}$/.test(phone)) {
    newErrors.phone = "Enter valid 10-digit number";
  }

  if (!email.trim()) {
    newErrors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    newErrors.email = "Invalid email format";
  }

  if (!user_pwd.trim()) {
    newErrors.password = "Password is required";
  } else if (user_pwd.length < 6) {
    newErrors.password = "Minimum 6 characters";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};




    const handleRegister = async () => {
      if (!validate()) return;
    if (!user_name || !phone || !email || !user_pwd) {
      Alert.alert("All fields are required");
      return;
    }

    try {
    setLoading(true);
    setMessage("");

    await registerUser({
      user_name,
      email,
      user_pwd,
      phone,
    });

    setMessage("Registration Successful");
    navigation.navigate("Loginscreen");

      Alert.alert("User Registered Successfully");
    } catch (error) {
      console.log("REGISTER ERROR:", error.response?.data || error.message);
      Alert.alert(error.response?.data?.message || "Registration failed");
    }finally {
    setLoading(false);
  }
  };
       












    return (
       <View style={tailwind`flex-1 bg-white px-6 justify-center`}>

  <View style={tailwind`mb-10`}>
    <Text style={tailwind`text-3xl font-bold text-black text-center`}>
      Create Account
    </Text>
    <Text style={tailwind`text-gray-500 text-center mt-2`}>
      Sign up to get started
    </Text>
  </View>

  {/* Name */}
  <View style={tailwind`mb-5`}>
    <Text style={tailwind`text-sm text-gray-500 mb-2`}>Name</Text>
    <TextInput
      placeholder="Enter your name"
      placeholderTextColor="#9CA3AF"
      value={user_name}
      onChangeText={(text) => {
        setUsername(text);
        setErrors({ ...errors, user_name: null });
      }}
      style={tailwind`border ${
        errors.user_name ? "border-red-500" : "border-gray-300"
      } rounded-xl px-4 py-3 text-black`}
    />
    {errors.user_name && (
      <Text style={tailwind`text-red-500 text-xs mt-1`}>
        {errors.user_name}
      </Text>
    )}
  </View>

  {/* Phone */}
  <View style={tailwind`mb-5`}>
    <Text style={tailwind`text-sm text-gray-500 mb-2`}>Phone</Text>
    <TextInput
      placeholder="Enter phone number"
      placeholderTextColor="#9CA3AF"
      value={phone}
      onChangeText={(text) => {
        setPhonenumber(text);
        setErrors({ ...errors, phone: null });
      }}
      keyboardType="numeric"
      style={tailwind`border ${
        errors.phone ? "border-red-500" : "border-gray-300"
      } rounded-xl px-4 py-3 text-black`}
    />
    {errors.phone && (
      <Text style={tailwind`text-red-500 text-xs mt-1`}>
        {errors.phone}
      </Text>
    )}
  </View>

  {/* Email */}
  <View style={tailwind`mb-5`}>
    <Text style={tailwind`text-sm text-gray-500 mb-2`}>Email</Text>
    <TextInput
      placeholder="Enter email"
      placeholderTextColor="#9CA3AF"
      value={email}
      onChangeText={(text) => {
        setEmail(text);
        setErrors({ ...errors, email: null });
      }}
      autoCapitalize="none"
      style={tailwind`border ${
        errors.email ? "border-red-500" : "border-gray-300"
      } rounded-xl px-4 py-3 text-black`}
    />
    {errors.email && (
      <Text style={tailwind`text-red-500 text-xs mt-1`}>
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
      onChangeText={(text) => {
        setPassword(text);
        setErrors({ ...errors, password: null });
      }}
      secureTextEntry
      style={tailwind`border ${
        errors.password ? "border-red-500" : "border-gray-300"
      } rounded-xl px-4 py-3 text-black`}
    />
    {errors.password && (
      <Text style={tailwind`text-red-500 text-xs mt-1`}>
        {errors.password}
      </Text>
    )}
  </View>

  {message !== "" && (
    <Text style={tailwind`text-sm mb-4 ${
      message.includes("Successful") ? "text-green-600" : "text-red-600"
    }`}>
      {message}
    </Text>
  )}

  {/* Register Button */}
  <Pressable onPress={handleRegister} disabled={loading}>
    <View style={tailwind`${loading ? "bg-gray-400" : "bg-black"} rounded-xl py-4 mb-4`}>
      <Text style={tailwind`text-white text-center font-semibold`}>
        {loading ? "Registering..." : "Register"}
      </Text>
    </View>
  </Pressable>

</View>




    )


}
export default Register;