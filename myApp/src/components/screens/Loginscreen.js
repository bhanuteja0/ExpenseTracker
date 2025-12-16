import { useState } from "react";
import { View, Text, ImageBackground, TextInput, Button,StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";

export default function Loginscreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlelogin = ({navigation}) => {
    if (email === "borabhanuteja02@gmail.com" && password === "BHANUteja@2207") {
      navigation.navigate("Homescreen");
      
      
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    
      <View>
        <ImageBackground
          source={require("../../../assets/expenseloginimage.jpg")}
          style={{ height: "70%", width: "100%" }}
        >
          <Text>Welcome</Text>
        </ImageBackground>

        <Text
          style={{
            textAlign: "center",
            fontSize: 50,
            fontWeight: "bold",
          }}
        >
          Login
        </Text>

        <Text>Email</Text>
        <TextInput
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 8,
            marginBottom: 12,
          }}
          value={email}
          onChangeText={setEmail}
          keyboardType="default"
          autoCapitalize="none"
        />

        <Text>Password</Text>
        <TextInput
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 8,
            marginBottom: 12,
          }}
          value={password}
          onChangeText={setPassword}
          keyboardType="default"
          autoCapitalize="none"
          secureTextEntry={true}
        />

        <TouchableOpacity onPress={handlelogin}>
          <Button title="Login" />
        </TouchableOpacity>
      </View>
    
  );


  const styles=StyleSheet.create({})
}
