import React from "react"; 
import { View, Text, ScrollView, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { useEffect } from "react";
import tailwind from "twrnc";
import { Alert } from "react-native";




export default function Create({navigation,route}) {

  const [amount,setAmount]=useState(null);
  const [title,setTitle]=useState("");
  const [Category,setCategory]=useState("");

  useEffect(()=>{
    if(route.params?.category){
      console.log("category selected:",route.params.category);
      setCategory(route.params.category);
    }


  },[route.params?.category]);

  const handleexpense=()=>{
    if(!amount || !title){
      Alert.alert("Please fill all the fields");
      return;
    }

    navigation.navigate("bottomtabs")


  }

  const handlecategory=()=>{
    navigation.navigate("Category",{amount,title});

  }




  return (
  <View style={tailwind`flex-1 bg-white px-4 pt-6`}>
  <ScrollView contentContainerStyle={tailwind`pb-10`}>

    {/* Heading */}
    <View style={tailwind`mb-6`}>
      <Text style={tailwind`text-2xl font-bold text-black`}>
        Add New Expense
      </Text>
      <Text style={tailwind`text-gray-500 mt-1`}>
        Enter expense details for tracking
      </Text>
    </View>

    {/* Amount */}
    <View style={tailwind`mb-5`}>
      <Text style={tailwind`text-sm text-gray-500 mb-2`}>
        Amount
      </Text>
      <TextInput
        placeholder="₹ 0.00"
        placeholderTextColor="#9CA3AF"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={tailwind`border border-gray-300 rounded-xl px-4 py-3 text-black`}
      />
    </View>

    {/* Title */}
    <View style={tailwind`mb-5`}>
      <Text style={tailwind`text-sm text-gray-500 mb-2`}>
        Title
      </Text>
      <TextInput
        placeholder="Enter title"
        placeholderTextColor="#9CA3AF"
        value={title}
        onChangeText={setTitle}
        style={tailwind`border border-gray-300 rounded-xl px-4 py-3 text-black`}
      />
    </View>

    {/* Category */}
    <View style={tailwind`mb-6`}>
      <Text style={tailwind`text-sm text-gray-500 mb-2`}>
        Category
      </Text>

      <Pressable onPress={handlecategory}>
        <View style={tailwind`border border-gray-300 rounded-xl px-4 py-3 bg-gray-100`}>
          <Text style={tailwind`text-black`}>
            {Category || "Select Category"}
          </Text>
        </View>
      </Pressable>
    </View>

    {/* Save Button */}
    <Pressable onPress={handleexpense}>
      <View style={tailwind`bg-black rounded-xl py-4`}>
        <Text style={tailwind`text-white text-center font-semibold`}>
          Save Expense
        </Text>
      </View>
    </Pressable>

  </ScrollView>
</View>
  );   
  
  

}