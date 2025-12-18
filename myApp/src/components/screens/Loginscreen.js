import { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  Button,
  StyleSheet,Pressable
} from "react-native";

//import Appservice from "../../../sevices/Appservice";
import Homescreen from "./Homescreen";
//import Register from "./Register";

export default function Loginscreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handlelogin = () => {
    if (
      email === "borabhanuteja02@gmail.com" &&
      password === "123456"
    ) {
      setMessage("Login Successful ✅");
      navigation.navigate("bottomtabs");
    } else {
      setMessage("Invalid Email or Password ❌");

      alert("Invalid credentials");
    }
  };


  const handleregister=()=>{
    navigation.navigate("Register");
  }




 return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1545235617-9465d2a55698",
      }}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Very light overlay */}
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.appTitle}>Expense Tracker</Text>
          <Text style={styles.loginText}>Login</Text>

          <TextInput
            style={styles.input}
            placeholder="Email address"
            placeholderTextColor="#666"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#666"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {message !== "" && (
            <Text
              style={[
                styles.message,
                { color: message.includes("Successful") ? "#2ecc71" : "#e74c3c" },
              ]}
            >
              {message}
            </Text>
          )}

          <Pressable style={styles.button} onPress={handlelogin}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={handleregister}>
            <Text style={styles.buttonText}>REGISTER</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.15)", // ✅ very light
  },

  card: {
    width: "90%",
    padding: 25,
    borderRadius: 18,

    // ✅ glass effect
    backgroundColor: "rgba(255,255,255,0.55)",

    // shadow
    elevation: 10,
  },

  appTitle: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2c3e50",
    marginBottom: 5,
  },

  loginText: {
    fontSize: 22,
    textAlign: "center",
    marginBottom: 20,
    color: "#34495e",
  },

  input: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: "rgba(255,255,255,0.85)",
  },

  button: {
    backgroundColor: "#ff7a00",
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },

  message: {
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "600",
  },
});