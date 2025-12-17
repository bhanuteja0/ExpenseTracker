import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

    const Emptylist=({
        title="No expenses added yet!",
        message="Start adding some expenses to see them here."

    })=>{
  return (
    <View>
        <Text>{title}</Text>
        <Text>{message}</Text>
    </View>
  );
};

export default Emptylist;
