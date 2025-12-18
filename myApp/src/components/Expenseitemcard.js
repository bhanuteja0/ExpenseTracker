import tailwind from "twrnc";
import { Text, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native";

const ExpenseitemCard = ({ item }) => {
  return (
    <View
      style={tailwind`bg-white rounded-2xl px-4 py-3 mx-5 mb-4 flex-row items-center justify-between shadow`}
    >
      {/* Left Section: Icon + Details */}
      <View style={tailwind`flex-row items-center`}>
        {/* Icon */}
        <View style={tailwind`bg-blue-100 p-3 rounded-full mr-4`}>
          <Text style={tailwind`text-blue-600 font-bold text-lg`}>₹</Text>
        </View>

        {/* Expense Details */}
        <View>
          <Text style={tailwind`text-base font-semibold text-gray-800`}>
            {item.title}
          </Text>
          <Text style={tailwind`text-sm text-gray-500`}>
            {item.category} • {item.date}
          </Text>
        </View>
      </View>

      {/* Right Section: Amount */}
      <Text style={tailwind`text-lg font-bold text-red-500`}>
        ₹{item.amount}
      </Text>
    </View>
  );
};

export default ExpenseitemCard;
