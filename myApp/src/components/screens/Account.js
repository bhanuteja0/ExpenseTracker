import { View, Text, Pressable } from "react-native";
import React, { use, useEffect, useState } from "react";
import tailwind from "twrnc";
import { getuser } from "../../../sevices/Appservice";

export default function Account({navigation}) {

//  const [user,setuser]=useState({
  
//  });

//  useEffect(()=>{fetchuser},[]);

//  const fetchuser=async()=>{
//   try{
//     const res=await getuser();
//     setuser(res.data);
//     console.log("USER DATA:",res.data); 
//   }
//   catch(error){
//     console.log("ERROR FETCHING USER DATA:",error.response?.data|| error.message);
//   }
//  }
  const handlelogout=()=>{
    navigation.replace("Loginscreen");

  }

  return (
    <View style={tailwind`flex-1 bg-white px-5 pt-8`}>
      
      {/* Header */}
      <View style={tailwind`mb-8`}>
        <Text style={tailwind`text-3xl font-bold text-black`}>
          Account
        </Text>
        <Text style={tailwind`text-gray-500 mt-2`}>
          Manage your preferences
        </Text>
      </View>

      {/* Appearance Section */}
      <View style={tailwind`mb-8`}>
        <Text style={tailwind`text-xs uppercase tracking-wider text-gray-400 mb-3`}>
          Appearance
        </Text>

        <View style={tailwind`py-4 border-b border-gray-200`}>
          <Text style={tailwind`text-base text-black`}>
            Theme
          </Text>
          <Text style={tailwind`text-sm text-gray-500 mt-1`}>
            Light / Dark
          </Text>
        </View>
      </View>

      {/* Profile Section */}
      <View>
        <Text style={tailwind`text-xs uppercase tracking-wider text-gray-400 mb-3`}>
          Profile
        </Text>

        <View style={tailwind`py-4 border-b border-gray-200`}>
          <Text style={tailwind`text-base text-black`}>
            Account Settings
          </Text>
        </View>

        <View style={tailwind`py-4 border-b border-gray-200`}>
          <Text style={tailwind`text-base text-black`}>
            Privacy
          </Text>
        </View>


        <View style={tailwind`py-4 border-b border-gray-200`}>
          <Pressable onPress={()=>handlelogout()}>
          <Text style={tailwind`text-base text-black`}>
            Logout
          </Text>
          </Pressable>
        </View>


      </View>
      

    </View>
  );
}