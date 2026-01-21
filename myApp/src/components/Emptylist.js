import { Text, View, Pressable } from 'react-native';
import React from 'react';
import tailwind from 'twrnc';
import { useNavigation } from '@react-navigation/native';

const Emptylist = ({
  title = "No expenses yet",
  message = "Start tracking your spending by adding your first expense."
}) => {
  const navigation = useNavigation();

  const onAddPress = () => {
    navigation.navigate("Create"); // change if your screen name is different
  };

  return (
    <View style={tailwind`flex-1 justify-center items-center px-6 bg-white`}>

      {/* Icon Bubble */}
      <View style={tailwind`bg-blue-100 p-8 rounded-full mb-6 shadow-sm`}>
        <Text style={tailwind`text-blue-500 text-3xl font-bold`}>₹</Text>
      </View>

      {/* Title */}
      <Text style={tailwind`text-xl font-bold text-gray-800 mb-2 text-center`}>
        {title}
      </Text>

      {/* Message */}
      <Text style={tailwind`text-base text-gray-500 text-center mb-8 leading-6`}>
        {message}
      </Text>

      {/* Add Button */}
      <Pressable
        onPress={onAddPress}
        style={({ pressed }) => [
          tailwind`bg-blue-500 px-8 py-4 rounded-2xl`,
          pressed && tailwind`opacity-80`
        ]}
      >
        <Text style={tailwind`text-white font-bold text-base`}>
          + Add Your First Expense
        </Text>
      </Pressable>

    </View>
  );
};

export default Emptylist;
