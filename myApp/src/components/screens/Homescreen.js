import React from "react";
import { View, Text ,Button,Pressable,StyleSheet} from "react-native";

const Homescreen=({navigation})=> {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to Home</Text>
      <Button onPress={()=>navigation.navigate("Profile")} title="profile"/>
      
    </View>
  );
}

export default Homescreen;

const styles=StyleSheet.create({})
