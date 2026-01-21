import React from "react"; 
import { View, Text, ScrollView, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { useEffect } from "react";
import tailwind from "twrnc";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addExpense } from "../../../sevices/Appservice";
import DateTimePicker from "@react-native-community/datetimepicker";





export default function Create({navigation,route}) {

  const [amount,setAmount]=useState(null);
  const [title,setTitle]=useState("");
  const [Category,setCategory]=useState("");
  const [userid,setUserId]=useState(null);
  const [categoryId, setCategoryId] = useState(0);//as of now hardcoded as id is not comming from category screen 
  const [expenseType, setExpenseType] = useState("personal");
  const [expenseDate, setExpenseDate] = useState(new Date().toISOString().slice(0,10));

  const [showPicker, setShowPicker] = useState(false);


  // const [showDatePicker, setShowDatePicker] = useState(false);

  

  useEffect(() => {
  AsyncStorage.getItem("user_id").then(id => setUserId(id));
}, []);


  useEffect(()=>{
    if(route.params?.category){
      console.log("category selected:",route.params);
      setCategory(route.params.category); // id is not comming once add same details that are there in database
      setCategoryId(route.params.category_id);
    }


  },[route.params?.category]);



  const payload = {
    paid_by: userid,
    amount: Number(amount),
    category_id: categoryId,
    descriptions: title,
    expense_type: "personal",
    group_id: null,
    expense_date: expenseDate,
    split_users: []   // empty for personal
  };







  const handleexpense=async()=>{
    if(!amount || !title){
      Alert.alert("Please fill all the fields");
      return;
    }
     try {
    const res = await addExpense(payload);

    Alert.alert(res.data?.message || "Expense Added");
    navigation.navigate("bottomtabs");

  } catch (err) {
    console.log("ADD EXPENSE ERROR:", err.response?.data || err.message);
    Alert.alert(err.response?.data?.message || "Failed to add expense");
  }









  }

  const handlecategory=()=>{
    navigation.navigate("Category",{amount,title});

  }




  return (
  <View style={tailwind`flex-1 bg-white px-4 pt-6`}>
  <ScrollView contentContainerStyle={tailwind`pb-10`}>

    {/* Heading */}
    <View style={tailwind`mb-6`}>
      <Text style={tailwind`text-2xl font-bold text-black`}>
        Add New Expense
      </Text>
      <Text style={tailwind`text-gray-500 mt-1`}>
        Enter expense details for tracking
      </Text>
    </View>

    {/* Amount */}
    <View style={tailwind`mb-5`}>
      <Text style={tailwind`text-sm text-gray-500 mb-2`}>
        Amount
      </Text>
      <TextInput
        placeholder="₹ 0.00"
        placeholderTextColor="#9CA3AF"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={tailwind`border border-gray-300 rounded-xl px-4 py-3 text-black`}
      />
    </View>

    {/* Title */}
    <View style={tailwind`mb-5`}>
      <Text style={tailwind`text-sm text-gray-500 mb-2`}>
        Description
      </Text>
      <TextInput
        placeholder="Enter Description"
        placeholderTextColor="#9CA3AF"
        value={title}
        onChangeText={setTitle}
        style={tailwind`border border-gray-300 rounded-xl px-4 py-3 text-black`}
      />
    </View>
    <View>
  <Text style={tailwind`text-sm text-gray-500 mb-2`}>
    Expense Date
  </Text>

  <Pressable
    onPress={() => setShowPicker(true)}
    style={tailwind`border border-gray-300 rounded-xl px-4 py-3`}
  >
    <Text style={tailwind`text-black`}>
      {expenseDate || "Select date"}
    </Text>
  </Pressable>

  {showPicker && (
    <DateTimePicker
      value={expenseDate ? new Date(expenseDate) : new Date()}
      mode="date"
      display="calendar"
      onChange={(event, selectedDate) => {
        setShowPicker(false);
        if (selectedDate) {
          const formatted = selectedDate.toISOString().split("T")[0];
          setExpenseDate(formatted);
        }
      }}
    />
  )}
</View>


    {/* Category */}
    <View style={tailwind`mb-6`}>
      <Text style={tailwind`text-sm text-gray-500 mb-2`}>
        Category
      </Text>

      <Pressable onPress={handlecategory}>
        <View style={tailwind`border border-gray-300 rounded-xl px-4 py-3 bg-gray-100`}>
          <Text style={tailwind`text-black`}>
            {Category || "Select Category"}
          </Text>
        </View>
      </Pressable>
    </View>

    {/* Save Button */}
    <Pressable onPress={handleexpense}>
      <View style={tailwind`bg-black rounded-xl py-4`}>
        <Text style={tailwind`text-white text-center font-semibold`}>
          Save Expense
        </Text>
      </View>
    </Pressable>

  </ScrollView>
</View>
  );   
  
  

}