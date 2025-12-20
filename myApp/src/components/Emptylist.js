import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tailwind from 'twrnc';
import { Pressable } from 'react-native';

    const Emptylist=({
        title="No expenses added yet!",
        message="Start adding some expenses to see them here."

    })=>{
  return (
    <View style={tailwind`flex-1 justify-center items-center px-6`}>

      {/* Icon */}
      <View style={tailwind`bg-blue-100 p-6 rounded-full mb-6`}>
        <Text style={tailwind`text-blue-500 text-2xl font-bold`}>₹</Text>
      </View>

      {/* Title */}
      <Text style={tailwind`text-lg font-semibold text-gray-800 mb-2 text-center`}>
        {title}
      </Text>

      {/* Message */}
      <Text style={tailwind`text-sm text-gray-500 text-center mb-6 leading-5`}>
        {message}
      </Text>

      {/* Add Button */}
      <Pressable
        // onPress={onAddPress}
        style={tailwind`bg-blue-500 px-6 py-3 rounded-xl`}
      >
        <Text style={tailwind`text-white font-semibold text-base`}>
          + Add Expense
        </Text>
      </Pressable>

    </View>
  );
};

export default Emptylist;
