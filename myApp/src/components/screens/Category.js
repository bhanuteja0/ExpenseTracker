import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'
import { FlatList } from 'react-native';
import { setCategory } from '../../../sevices/Appservice';
import { useState } from 'react';

import {Utensils,Cable, ShoppingBag,FileText,Film, Heart,MoreHorizontal, Merge,} from "lucide-react-native";

const categories = [
  { name: "Food", icon: Utensils },
  { name: "Transport", icon: Cable },
  { name: "Shopping", icon: ShoppingBag },
  { name: "Bills", icon: FileText },
  { name: "Entertainment", icon: Film },
  { name: "Health", icon: Heart },
  {name:"Education",icon:FileText},
  {name:"Travel",icon:Film},
  {name:"Groceries",icon:ShoppingBag},
  {name:"fuel",icon:Cable},
  {name:"phone/Internet",icon:Utensils},
  { name: "Other", icon: MoreHorizontal },
];


const Category = ({ navigation }) => {

  const [showDropdown, setShowDropdown] = useState(false);
  const [categorytype, setCategorytype] = useState("personal");
  const handleselectedcategory = async(category) => {

    const selectedCategory = {category_name: category.name, category_type: categorytype};
    try {
      await setCategory(selectedCategory);
    } catch (error) {
      console.log("SET CATEGORY ERROR:", error.response?.data || error.message);
    }



    console.log("selected category:", category);

    navigation.popTo("bottomtabs", {
      screen: "Create",
      params: { category: category.name },merge: true
    });
  };

 
const renderItem = ({ item }) => {
  const Icon = item.icon;

  return (
    <View>





    
    <Pressable
      onPress={() => handleselectedcategory(item)}
      style={({ pressed }) => [
        tailwind`bg-white rounded-2xl p-4 mb-3 flex-row items-center`,
        pressed && tailwind`opacity-80`,
        {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.15,
          shadowRadius: 4,
          elevation: 3, // Android shadow
        },
      ]}
    >
      {/* Icon Container */}
      <View style={tailwind`bg-gray-100 p-3 rounded-full mr-4`}>
        <Icon size={22} color="#111827" />
      </View>

      {/* Text */}
      <Text style={tailwind`text-base font-semibold text-gray-900`}>
        {item.name}
      </Text>
    </Pressable>
    </View>
  );
};






 return (
  




  <View style={{ flex: 1 }}>
    <View style={tailwind`flex-row justify-between items-center mb-4`}>

  <Text style={tailwind`text-2xl font-bold text-black`}>
    Add New Expense
  </Text>

  {/* Dropdown Button */}
  <Pressable
    onPress={() => setShowDropdown(!showDropdown)}
    style={tailwind`bg-gray-200 px-3 py-2 rounded-xl`}
  >
    <Text style={tailwind`text-black`}>
      {setCategorytype === "personal" ? "Personal" : "Shared"}
    </Text>
  </Pressable>

</View>




    <Pressable onPress={() => navigation.goBack()}>
      <Text style={tailwind``}>X</Text>
    </Pressable>

    <Text style={tailwind`text-3xl font-bold text-black mt-4`}>
      Select Category
    </Text>

    <Text>Select</Text>

    <FlatList
      data={categories}
      renderItem={renderItem}
      keyExtractor={(item) => item.name}
      contentContainerStyle={tailwind`px-4 pt-2 pb-6`}
      showsVerticalScrollIndicator={false}
    />
  </View>
);

}

export default Category

const styles = StyleSheet.create({})