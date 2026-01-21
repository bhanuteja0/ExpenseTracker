import React from "react";
import { useState } from "react";
import { View, Text ,Button,Pressable,StyleSheet, TouchableOpacity} from "react-native";
import { FlatList } from "react-native";
import tailwind from "twrnc";
import Emptylist from "../Emptylist";
import Expenseitemcard from "../Expenseitemcard";
import { getExpenses } from "../../../sevices/Appservice";
import { useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { totalExpense } from "../../../sevices/Appservice";


// export const expensedata=[{
//   id:1, title:"Grocery", amount:50, date:"2023-10-01"
// },{
//   id:2, title:"Transport", amount:20, date:"2023-10-02" },{
//   id:3, title:"Utilities", amount:100, date:"2023-10-03"},
// {
//   id:4, title:"Dining", amount:75, date:"2023-10-04"
// },{id:5, title:"Entertainment", amount:40, date:"2023-10-05"}




// ];


const Homescreen=({navigation})=> {
 const [userid,setuserid]=useState(0);
 const [expdata,setdata]=useState([]);
 const [total,settotal]=useState(0);
//  const [TotalExpense,setTotalExpense]=useState(0);



 

  
  useEffect(() => {
  AsyncStorage.getItem("user_id").then(id => setuserid(id));
}, []);
// console.log(userid);

 const ShowExpense = async () => {
  try {
    const res = await getExpenses(userid);
    const Total=await totalExpense(userid);
    setdata(res.data);
    // console.log(Total.data[0].total_amount);
    settotal(Total.data[0].total_amount);
    // console.log(total);
    
    // console.log(Total.data.total_amount);
    // console.log(res.data);
  } catch (error) {
    console.log("Fetch error:", error.response?.data || error.message);
  }
};

  useFocusEffect(
  React.useCallback(() => {
    if (userid) {
      ShowExpense();
    }
  }, [userid])
);


 

  return (
    <View style={tailwind`flex-1 bg-white`}>
  
  <View style={tailwind`px-4 mt-6 mb-4`}>
    <Text style={tailwind`text-black text-sm uppercase`}>Overview</Text>
    <Text style={tailwind`text-black text-3xl font-bold mt-1`}>
      Expense Dashboard
    </Text>
  </View>

  <View
    style={[
      tailwind`mx-4 mt-4 p-5 rounded-2xl bg-black`,
      { alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#222" },
    ]}
  >
    <Text style={tailwind`text-gray-400 text-sm`}>Total Expense</Text>
    <Text style={tailwind`text-white text-2xl font-bold mt-2`}>
      ₹  {Number(total || 0).toFixed(2)}

    </Text>
  </View>

    

  <View style={tailwind`flex-1 mt-4`}>


    
    <FlatList
      data={expdata}
      keyExtractor={(item) => item.expense_id.toString()}
      renderItem={({ item }) => <Expenseitemcard item={item} navigation={navigation} />}
      ListEmptyComponent={<Emptylist />}
      showsVerticalScrollIndicator={false}
    />
    
  </View>


</View>

    
  );
}

export default Homescreen;

const styles=StyleSheet.create({})
