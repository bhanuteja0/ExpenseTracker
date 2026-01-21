import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import tailwind from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { deleteuser } from "../../../sevices/Appservice";

export default function DeleteAccount({ navigation }) {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("user_id").then(id => {
      if (id) setUserId(id);
    });
  }, []);

  const handleDelete = async () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: confirmDelete,
        },
      ]
    );
  };

  const confirmDelete = async () => {
    try {
      await deleteuser(userId);
      await AsyncStorage.clear();
      Alert.alert("Account Deleted", "Your account has been deleted.");
      navigation.replace("Loginscreen");
    } catch (error) {
      console.log("Delete error:", error.response?.data || error.message);
      Alert.alert("Error", "Failed to delete account");
    }
  };

  return (
    <View style={tailwind`flex-1 bg-white px-5 pt-8`}>
      <Text style={tailwind`text-2xl font-bold text-red-600 mb-4`}>
        Delete Account
      </Text>

      <Text style={tailwind`text-gray-600 mb-8`}>
        Deleting your account will deactivate your profile and remove access permanently.
      </Text>

      <Pressable
        onPress={handleDelete}
        style={tailwind`bg-red-600 rounded-xl py-4 items-center`}
      >
        <Text style={tailwind`text-white font-semibold`}>
          Permanently Delete Account
        </Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.goBack()}
        style={tailwind`mt-4 items-center`}
      >
        <Text style={tailwind`text-gray-500`}>
          Cancel
        </Text>
      </Pressable>
    </View>
  );
}
