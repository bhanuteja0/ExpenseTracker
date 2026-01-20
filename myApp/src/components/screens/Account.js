import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import tailwind from "twrnc";
import { getuser } from "../../../sevices/Appservice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EditProfile from "./EditProfile";

export default function Account({ navigation }) {
  const [userid, setuserid] = useState(null);
  const [user, setuser] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("user_id").then(id => {
      if (id) setuserid(id);
    });
  }, []);

  useEffect(() => {
    if (userid) fetchuser();
  }, [userid]);

  const fetchuser = async () => {
    try {
      // const res = await getuser(userid);
      // setuser(res.data);
    } catch (error) {
      // console.log("ERROR FETCHING USER:", error.response?.data || error.message);
    }
  };

  const handlelogout = async () => {
    await AsyncStorage.clear();
    navigation.replace("Loginscreen");
  };

  const Item = ({ title, onPress, danger }) => (
    <Pressable
      onPress={onPress}
      style={tailwind`py-4 border-b border-gray-200`}
    >
      <Text
        style={tailwind`${danger ? "text-red-500" : "text-black"} text-base`}
      >
        {title}
      </Text>
    </Pressable>
  );

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

      {/* Profile Card */}
      <View style={tailwind`bg-gray-100 rounded-2xl p-5 mb-8`}>
        <View style={tailwind`flex-row items-center`}>
          <View style={tailwind`w-14 h-14 rounded-full bg-black items-center justify-center`}>
            <Text style={tailwind`text-white text-xl font-bold`}>
              {user?.name?.[0] || "U"}
            </Text>
          </View>

          <View style={tailwind`ml-4`}>
            <Text style={tailwind`text-lg font-semibold text-black`}>
              {user?.name || "User"}
            </Text>
            <Text style={tailwind`text-gray-500`}>
              {user?.email || "email@example.com"}
            </Text>
          </View>
        </View>
      </View>

      {/* Account Settings */}
      <View style={tailwind`mb-8`}>
        <Text style={tailwind`text-xs uppercase tracking-wider text-gray-400 mb-3`}>
          Account Settings
        </Text>

        <Item title="Edit Profile" onPress={() => navigation.navigate("Accountstack",{screen:"EditProfile"})} />
        <Item title="Change Profile Photo" onPress={() => navigation.navigate("Accountstack",{screen:"EditProfile"})} />
        <Item title="Change Password" onPress={() => navigation.navigate("Accountstack",{screen:"ChangePassword"})} />
        <Item title="Security" onPress={() => navigation.navigate("Accountstack",{screen:"Security"})} />
        <Item title="Dark Mode" onPress={() => navigation.navigate("Accountstack",{screen:"Theme"})} />
        <Item title="Language" onPress={() => navigation.navigate("Accountstack",{screen:"Language"})} />
        <Item title="Export Data" onPress={() => navigation.navigate("Accountstack",{screen:"EditProfile"})} />
        <Item title="Delete Account" danger onPress={() => navigation.navigate("Accountstack",{screen:"DeleteAccount"})} />
      </View>

      {/* Session */}
      <View>
        <Text style={tailwind`text-xs uppercase tracking-wider text-gray-400 mb-3`}>
          Session
        </Text>

        <Item title="Logout" danger onPress={handlelogout} />
      </View>
    </View>
  );
}
