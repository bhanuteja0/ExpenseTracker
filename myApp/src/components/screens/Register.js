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
    const [password, setPassword] = useState("");


    const handleRegister = async () => {
    if (!user_name || !phone || !email || !password) {
      Alert.alert("All fields are required");
      return;
    }

    try {
      const res = await registerUser({
        user_name,
        phone,
        email,
        password,
      });

      Alert.alert("User Registered Successfully");
      navigation.navigate("Loginscreen");
    } catch (error) {
      console.log("REGISTER ERROR:", error.response?.data || error.message);
      Alert.alert(error.response?.data?.message || "Registration failed");
    }
  };
       












    return (
        <View style={tailwind`p-4 bg-black h-full justify-center`}>
          <Text style={tailwind`text-white text-2xl font-bold mb-6 text-center`}>Register</Text>
              <TextInput
                         
                         placeholder="user name"
                         placeholderTextColor="#666"
                         value={user_name}
                         onChangeText={setUsername}
                         autoCapitalize="none"
                         style={tailwind`bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-gray-200 mb-4`}
                       />


                        <TextInput
                      
                         placeholder="phone number"
                         placeholderTextColor="#666"
                         value={phone}
                         onChangeText={setPhonenumber}
                         autoCapitalize="none"
                         style={tailwind`bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-gray-200 mb-4`}
                       />

                        <TextInput
                        
                         placeholder="email"
                         placeholderTextColor="#666"
                         value={email}
                         onChangeText={setEmail}
                         autoCapitalize="none"
                         style={tailwind`bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-gray-200 mb-4`}
                       />



                        <TextInput
                        
                         placeholder="password"
                         placeholderTextColor="#666"
                         value={password}
                         onChangeText={setPassword}
                         autoCapitalize="none"
                         secureTextEntry
                         style={tailwind`bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-gray-200 mb-4`}
                       />

                       <Pressable>
                        <Text onPress={handleRegister} style={tailwind`bg-blue-500 text-white text-center p-3 rounded-lg mt-4`}>Register</Text>


                       </Pressable>


                       




        </View>



    )


}
export default Register;