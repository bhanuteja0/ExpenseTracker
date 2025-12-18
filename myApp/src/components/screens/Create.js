import React from "react"; 
import { View, Text, ScrollView, TextInput, Pressable } from "react-native";
import { useState } from "react";
import tailwind from "twrnc";
import { Alert } from "react-native";



export default function Create() {

  const [amount,setAmount]=useState(null);
  const [title,setTitle]=useState("");

  const handleexpense=()=>{
    if(!amount || !title){
      Alert.alert("Please fill all the fields");
      return;
    }


  }




  return (
    <View style={tailwind`p-4 bg-white h-full`}>
      <ScrollView contentContainerStyle={tailwind`flex-grow`}>
        <Text>Add new Expense</Text>

        <Text>Enter details of your Expense to help in your tracking</Text>


        <View>
          <Text>Enter your amount</Text>
          <TextInput  placeholder="$0.00" value={amount} onChangeText={setAmount} keyboardType="numeric" />

          <Text>Title</Text>
          <TextInput  placeholder="Enter title" value={title} onChangeText={setTitle} keyboardType="text" />
          <View>

          <Pressable>
            <Text style={tailwind`bg-gray-200 text-black text-center p-3 rounded-lg mt-4`}>category</Text>
            </Pressable>
            </View>



          

          <Pressable>
            <Text style={tailwind`bg-blue-500 text-white text-center p-3 rounded-lg mt-4`} onPress={handleexpense}>Save Expense</Text>
          </Pressable>




        </View>



      </ScrollView>
    </View>
  );   
  
  

}