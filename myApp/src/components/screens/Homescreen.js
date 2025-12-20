import React from "react";
import { useState } from "react";
import { View, Text ,Button,Pressable,StyleSheet} from "react-native";
import { FlatList } from "react-native";
import tailwind from "twrnc";
import Emptylist from "../Emptylist";
import Expenseitemcard from "../Expenseitemcard";


export const expensedata=[{
  id:1, title:"Grocery", amount:50, date:"2023-10-01"
},{
  id:2, title:"Transport", amount:20, date:"2023-10-02" },{
  id:3, title:"Utilities", amount:100, date:"2023-10-03"},
{
  id:4, title:"Dining", amount:75, date:"2023-10-04"
}




];


const Homescreen=({navigation})=> {
  const TotalExpense=expensedata.reduce((sum,expense)=>sum + expense.amount,0);


  return (
    <View>
      <View style={tailwind`px-4 mt-6 mb-4`}>
  <Text style={tailwind`text-black text-sm uppercase`}>
    Overview
  </Text>
  <Text style={tailwind`text-black text-3xl font-bold mt-1`}>
    Expense Dashboard
  </Text>
</View>
      <View style={[tailwind`mx-4 mt-4 p-5 rounded-2xl bg-black`, { alignItems: "center", justifyContent: "center",borderWidth: 1,borderColor: "#222",
    },
  ]}
>
  <Text style={tailwind`text-gray-400 text-sm`}>
    Total Expense
  </Text>

  <Text style={tailwind`text-white text-2xl font-bold mt-2`}>
    ₹ {TotalExpense.toFixed(2)}
  </Text>
</View>


        <FlatList 
          data={expensedata}
          // data={[]}
         // sample data array real data come from expenses table
          keyExtractor={(item) => item.id.toString()}
 // unique key for each item
          renderItem={({item})=><Expenseitemcard item={item}/>}
          ListEmptyComponent={<Emptylist/>}

        
        
        
        />
          




        
      
    </View>
    
  );
}

export default Homescreen;

const styles=StyleSheet.create({})
