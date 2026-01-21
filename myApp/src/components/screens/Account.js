import React, { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import tailwind from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import { getuser } from "../../../sevices/Appservice";

export default function Account({ navigation }) {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);

  // Get user ID
  useEffect(() => {
    AsyncStorage.getItem("user_id").then(id => {
      if (id) setUserId(id);
    });
  }, []);

  // Fetch user from backend
  useEffect(() => {
    if (userId) {
      loadUser();
    }
  }, [userId]);

  const loadUser = async () => {
    try {
      const res = await getuser(userId);
      // console.log(res.data);
      setUser(res.data[0]); // change if your API returns { data: {...} }
    } catch (error) {
      console.log("Load user error:", error.response?.data || error.message);
    }
  };
  // console.log();

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.replace("Loginscreen");
  };

  const Item = ({ title, icon, onPress, danger }) => (
    <Pressable
      onPress={onPress}
      style={tailwind`flex-row items-center py-4 border-b border-gray-200`}
    >
      <Icon
        name={icon}
        size={20}
        color={danger ? "red" : "#111"}
        style={tailwind`mr-4`}
      />
      <Text
        style={tailwind`${danger ? "text-red-500" : "text-black"} text-base`}
      >
        {title}
      </Text>
    </Pressable>
  );

  return (
    <View style={tailwind`flex-1 bg-white px-5 pt-8`}>
      {/* HEADER */}
      <Text style={tailwind`text-3xl font-bold`}>Account</Text>
      <Text style={tailwind`text-gray-500 mb-6`}>
        Manage your preferences
      </Text>

      {/* PROFILE CARD */}
      <View style={tailwind`bg-gray-100 rounded-2xl p-5 mb-8`}>
        <View style={tailwind`flex-row items-center`}>
          <View style={tailwind`w-14 h-14 rounded-full bg-black items-center justify-center`}>
            <Text style={tailwind`text-white text-xl font-bold`}>
              {user?.name?.[0] || "U"}
            </Text>
          </View>

          <View style={tailwind`ml-4`}>
            <Text style={tailwind`text-lg font-semibold`}>
              {user?.user_name || "User"}
            </Text>
            <Text style={tailwind`text-gray-500`}>
              {user?.email || "email@example.com"}
            </Text>
          </View>
        </View>
      </View>

      {/* MENU */}
      <Item
        title="Edit Profile"
        icon="person-circle-outline"
        onPress={() => navigation.navigate("EditProfile")}
      />

      {/* <Item
        title="Change Password"
        icon="lock-closed-outline"
        onPress={() => navigation.navigate("ChangePassword")}
      />

      <Item
        title="Security"
        icon="shield-checkmark-outline"
        onPress={() => navigation.navigate("Security")}
      />

      <Item
        title="Theme"
        icon="color-palette-outline"
        onPress={() => navigation.navigate("Theme")}
      />

      <Item
        title="Language"
        icon="language-outline"
        onPress={() => navigation.navigate("Language")}
      /> */}

      <Item
        title="Delete Account"
        icon="trash-outline"
        danger
        onPress={() => navigation.navigate("DeleteAccount")}
      />

      <Item
        title="Logout"
        icon="log-out-outline"
        danger
        onPress={handleLogout}
      />
    </View>
  );
}
