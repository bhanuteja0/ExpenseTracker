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
      <View style={tailwind`p-4 bg-blue-500`}>
        <Text style={tailwind`text-white text-lg font-bold`}>Home Screen</Text>
      </View>
      <Text>Expenses</Text>
      <View>
        <View style={tailwind`p-4 bg-black flex-row justify-between items-center`}>
          <Text style={tailwind`text-white text-lg`}>Total Expense</Text>
          <Text style={tailwind`text-white text-lg font-bold`}>₹ {TotalExpense.toFixed(2)}</Text>
          



      </View>

        <FlatList 
          data={expensedata}
         // sample data array real data come from expenses table
          keyExtractor={(item) => item.id.toString()}
 // unique key for each item
          renderItem={({item})=><Expenseitemcard item={item}/>}
          ListEmptyComponent={<Emptylist/>}

        
        
        
        />
          




        
      
    </View>
    </View>
  );
}

export default Homescreen;

const styles=StyleSheet.create({})
