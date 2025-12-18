import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tailwind from 'twrnc';

    const Emptylist=({
        title="No expenses added yet!",
        message="Start adding some expenses to see them here."

    })=>{
  return (
    <View style={tailwind`p-4 items-center justify-center`}>
        <Text>{title}</Text>
        <Text>{message}</Text>
    </View>
  );
};

export default Emptylist;
