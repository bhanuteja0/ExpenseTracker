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


    const handleRegister=async()=>{
        await registerUser({
            user_name,phone,email,user_pwd });
             Alert.alert("User Registered Successfully");
        navigation.navigate("Loginscreen");

        }
       












    return (
        <View style={tailwind`p-4 bg-white h-full`}>
            
              <TextInput
                         
                         placeholder="user name"
                         placeholderTextColor="#666"
                         value={user_name}
                         onChangeText={setUsername}
                         autoCapitalize="none"
                       />


                        <TextInput
                      
                         placeholder="phone number"
                         placeholderTextColor="#666"
                         value={phone}
                         onChangeText={setPhonenumber}
                         autoCapitalize="none"
                       />

                        <TextInput
                        
                         placeholder="email"
                         placeholderTextColor="#666"
                         value={email}
                         onChangeText={setEmail}
                         autoCapitalize="none"
                       />



                        <TextInput
                        
                         placeholder="password"
                         placeholderTextColor="#666"
                         value={user_pwd}
                         onChangeText={setPassword}
                         autoCapitalize="none"
                         secureTextEntry
                       />

                       <Pressable>
                        <Text onPress={handleRegister} style={tailwind`bg-blue-500 text-white text-center p-3 rounded-lg mt-4`}>Register</Text>


                       </Pressable>


                       




        </View>



    )


}
export default Register;