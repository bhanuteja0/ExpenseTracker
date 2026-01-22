import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import tailwind from "twrnc";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getuser } from "../../../sevices/Appservice";

export default function EditProfile({navigation}) {
  // const navigation = useNavigation();

  const [userId, setUserId] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("user_id").then(id => {
      if (id) setUserId(id);
    });
  }, []);

  useEffect(() => {
    if (userId) loadUser();
  }, [userId]);

  const loadUser = async () => {
    try {
      const res = await getuser(userId);
      if (res.data && res.data.length > 0) {
        const u = res.data[0];
        setName(u.user_name);
        setEmail(u.email);
        setPhone(u.phone);
        console.log(u.user_name);
        console.log(u.email);
      }
    } catch (error) {
      console.log("Load user error:", error.response?.data || error.message);
    }
  };

  const handleSave = () => {
    console.log("Saving name only:", name);
    // Later: API call to update only name
    navigation.goBack();
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

      {/* Name (Editable) */}
      <View style={tailwind`mb-6`}>
        <Text style={tailwind`text-gray-400 mb-2`}>Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter name"
          style={tailwind`border border-gray-200 rounded-xl p-4`}
        />
      </View>

      {/* Email (Locked) */}
      <View style={tailwind`mb-6`}>
        <Text style={tailwind`text-gray-400 mb-2`}>Email</Text>
        <TextInput
          value={email}
          editable={false}
          style={tailwind`border border-gray-200 rounded-xl p-4 bg-gray-100 text-gray-500`}
        />
        <Text style={tailwind`text-xs text-orange-500 mt-1`}>
          Verification coming soon
        </Text>
      </View>

      {/* Phone (Locked) */}
      <View style={tailwind`mb-6`}>
        <Text style={tailwind`text-gray-400 mb-2`}>Phone</Text>
        <TextInput
          value={phone}
          editable={false}
          style={tailwind`border border-gray-200 rounded-xl p-4 bg-gray-100 text-gray-500`}
        />
        <Text style={tailwind`text-xs text-orange-500 mt-1`}>
          Verification coming soon
        </Text>
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
