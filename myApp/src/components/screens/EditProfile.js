import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import tailwind from "twrnc";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function EditProfile() {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSave = () => {
    console.log(name, email, phone);
    // API CALL HERE
  };

  return (
    <View style={tailwind`flex-1 bg-white px-5 pt-6`}>
      {/* Header */}
      <View style={tailwind`mb-8`}>
        <Text style={tailwind`text-2xl font-bold text-black`}>
          Edit Profile
        </Text>
        <Text style={tailwind`text-gray-500 mt-2`}>
          Update your personal information
        </Text>
      </View>

      {/* Inputs */}
      <View style={tailwind`mb-6`}>
        <Text style={tailwind`text-gray-400 mb-2`}>Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter name"
          style={tailwind`border border-gray-200 rounded-xl p-4`}
        />
      </View>

      <View style={tailwind`mb-6`}>
        <Text style={tailwind`text-gray-400 mb-2`}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter email"
          style={tailwind`border border-gray-200 rounded-xl p-4`}
        />
      </View>

      <View style={tailwind`mb-6`}>
        <Text style={tailwind`text-gray-400 mb-2`}>Phone</Text>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter phone"
          keyboardType="numeric"
          style={tailwind`border border-gray-200 rounded-xl p-4`}
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity
        onPress={handleSave}
        style={tailwind`bg-blue-600 rounded-xl p-4 items-center mt-4`}
      >
        <Text style={tailwind`text-white font-semibold`}>
          Save Changes
        </Text>
      </TouchableOpacity>
    </View>
  );
}
