import React from "react";
import { View, Text } from "react-native";
import tailwind from "twrnc";

const ExpenseitemCard = ({ item }) => {
  return (
    <View
      style={[
        tailwind`bg-white rounded-2xl px-4 py-4 mx-4 mb-3 flex-row items-center justify-between`,
        {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 6,
          elevation: 3, // Android
        },
      ]}
    >
      {/* Left Section */}
      <View style={tailwind`flex-row items-center flex-1`}>
        {/* Icon */}
        <View style={tailwind`bg-blue-50 p-3 rounded-full mr-4`}>
          <Text style={tailwind`text-blue-600 font-bold text-base`}>
            ₹
          </Text>
        </View>

        {/* Title + Meta */}
        <View>
          <Text
            style={tailwind`text-base font-semibold text-gray-900`}
            numberOfLines={1}
          >
            {item.title}
          </Text>

          <Text style={tailwind`text-xs text-gray-500 mt-1`}>
            {item.category} • {item.date}
          </Text>
        </View>
      </View>

      {/* Amount */}
      <Text style={tailwind`text-base font-bold text-red-600`}>
        ₹{item.amount}
      </Text>
    </View>
  );
};

export default ExpenseitemCard;
