import React from "react"; 
import { View, Text, ScrollView, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { useEffect } from "react";
import tailwind from "twrnc";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addExpense, addGroupExpense, getUserGroups } from "../../../sevices/Appservice";
import DateTimePicker from "@react-native-community/datetimepicker";





export default function Create({navigation,route}) {

  const [amount,setAmount]=useState(null);
  const [title,setTitle]=useState("");
  const [Category,setCategory]=useState("");
  const [userid,setUserId]=useState(null);
  const [categoryId, setCategoryId] = useState(0);//as of now hardcoded as id is not comming from category screen 
  const [expenseType, setExpenseType] = useState("personal");
  const [expenseDate, setExpenseDate] = useState(new Date().toISOString().slice(0,10));
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groups, setGroups] = useState([]);
  const [showGroupPicker, setShowGroupPicker] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [submitting, setSubmitting] = useState(false);


  // const [showDatePicker, setShowDatePicker] = useState(false);

  

  useEffect(() => {
    AsyncStorage.getItem("user_id").then(id => setUserId(id));
  }, []);

  useEffect(() => {
    if (userid && expenseType === "group") {
      fetchGroups();
    }
  }, [userid, expenseType]);

  const fetchGroups = async () => {
    if (!userid) return;
    try {
      const res = await getUserGroups(userid);
      setGroups(res.data || []);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };


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







  const handleexpense = async () => {
    if (!amount || !title || !categoryId) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    if (expenseType === "group" && !selectedGroup) {
      Alert.alert("Error", "Please select a group");
      return;
    }

    if (submitting) return; // Prevent double submission

    try {
      setSubmitting(true);
      let res;
      if (expenseType === "group") {
        // Use group expense API
        const groupPayload = {
          paid_by: userid,
          amount: Number(amount),
          category_id: categoryId,
          descriptions: title,
          group_id: selectedGroup.group_id,
          expense_date: expenseDate
        };
        res = await addGroupExpense(groupPayload);
        
        // Show detailed success message for group expenses
        const splitInfo = res.data?.split_amount 
          ? `\n\nAmount split equally:\n₹${parseFloat(res.data.split_amount).toFixed(2)} per person\n(${res.data.split_count} members)`
          : '';
        Alert.alert(
          "Success", 
          (res.data?.message || "Group expense added successfully") + splitInfo
        );
      } else {
        // Use personal expense API
        res = await addExpense(payload);
        Alert.alert("Success", res.data?.message || "Expense Added");
      }

      // Reset form
      setAmount(null);
      setTitle("");
      setCategory("");
      setCategoryId(0);
      setSelectedGroup(null);
      setExpenseType("personal");
      setShowGroupPicker(false);
      navigation.navigate("bottomtabs");
    } catch (err) {
      console.log("ADD EXPENSE ERROR:", err.response?.data || err.message);
      Alert.alert("Error", err.response?.data?.message || "Failed to add expense");
    } finally {
      setSubmitting(false);
    }
  };






  

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


    {/* Expense Type Toggle */}
    <View style={tailwind`mb-5`}>
      <Text style={tailwind`text-sm text-gray-500 mb-2`}>
        Expense Type
      </Text>
      <View style={tailwind`flex-row gap-2`}>
        <Pressable
          onPress={() => {
            setExpenseType("personal");
            setSelectedGroup(null);
          }}
          style={tailwind`flex-1 border-2 rounded-xl py-3 ${
            expenseType === "personal" ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"
          }`}
        >
          <Text style={tailwind`text-center font-semibold ${
            expenseType === "personal" ? "text-blue-600" : "text-gray-600"
          }`}>
            Personal
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setExpenseType("group")}
          style={tailwind`flex-1 border-2 rounded-xl py-3 ${
            expenseType === "group" ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"
          }`}
        >
          <Text style={tailwind`text-center font-semibold ${
            expenseType === "group" ? "text-blue-600" : "text-gray-600"
          }`}>
            Group
          </Text>
        </Pressable>
      </View>
    </View>

    {/* Group Selection (only for group expenses) */}
    {expenseType === "group" && (
      <View style={tailwind`mb-5`}>
        <Text style={tailwind`text-sm text-gray-500 mb-2`}>
          Select Group
        </Text>
        <Pressable
          onPress={() => setShowGroupPicker(!showGroupPicker)}
          style={tailwind`border border-gray-300 rounded-xl px-4 py-3 bg-gray-100`}
        >
          <Text style={tailwind`text-black`}>
            {selectedGroup ? selectedGroup.group_name : "Select Group"}
          </Text>
        </Pressable>
        {showGroupPicker && (
          <View style={tailwind`border border-gray-200 rounded-xl mt-2 bg-white max-h-60`}>
            {groups.length === 0 ? (
              <View style={tailwind`px-4 py-3`}>
                <Text style={tailwind`text-gray-500 text-center`}>
                  No groups available
                </Text>
                <Pressable
                  onPress={() => navigation.navigate("Groups")}
                  style={tailwind`mt-2 bg-blue-500 rounded-lg py-2`}
                >
                  <Text style={tailwind`text-white text-center font-semibold`}>
                    Create Group
                  </Text>
                </Pressable>
              </View>
            ) : (
              groups.map((group) => (
                <Pressable
                  key={group.group_id}
                  onPress={() => {
                    setSelectedGroup(group);
                    setShowGroupPicker(false);
                  }}
                  style={tailwind`px-4 py-3 border-b border-gray-100 ${
                    selectedGroup?.group_id === group.group_id ? "bg-blue-50" : ""
                  }`}
                >
                  <Text style={tailwind`text-black font-medium`}>
                    {group.group_name}
                  </Text>
                  <Text style={tailwind`text-xs text-gray-500`}>
                    {group.member_count} members
                  </Text>
                </Pressable>
              ))
            )}
          </View>
        )}
        {selectedGroup && (
          <View style={tailwind`mt-2 bg-blue-50 rounded-lg p-3`}>
            <Text style={tailwind`text-xs text-blue-700`}>
              💡 Amount will be split equally among {selectedGroup.member_count} members
            </Text>
            {amount && (
              <Text style={tailwind`text-xs text-blue-700 mt-1 font-semibold`}>
                Each member pays: ₹{(Number(amount) / selectedGroup.member_count).toFixed(2)}
              </Text>
            )}
          </View>
        )}
      </View>
    )}

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

    {/* Groups Button */}
    <View style={tailwind`mb-6`}>
      <Pressable 
        onPress={() => navigation.navigate("Groups")}
        style={tailwind`border-2 border-blue-500 rounded-xl px-4 py-3 bg-blue-50`}
      >
        <View style={tailwind`flex-row items-center justify-center`}>
          <Text style={tailwind`text-blue-600 font-semibold text-center`}>
            📁 Manage Groups
          </Text>
        </View>
      </Pressable>
    </View>

    {/* Save Button */}
    <Pressable 
      onPress={handleexpense}
      disabled={submitting}
      style={tailwind`${submitting ? 'opacity-50' : ''}`}
    >
      <View style={tailwind`bg-black rounded-xl py-4`}>
        <Text style={tailwind`text-white text-center font-semibold`}>
          {submitting ? "Saving..." : "Save Expense"}
        </Text>
      </View>
    </Pressable>

  </ScrollView>
</View>
  );   
  
}