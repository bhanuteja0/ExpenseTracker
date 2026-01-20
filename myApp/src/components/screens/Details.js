import React, { useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Calendar, Tag, CreditCard, FileText, IndianRupee } from "lucide-react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import tailwind from "twrnc";
import { delexpense } from "../../../sevices/Appservice";
import { editexpense } from "../../../sevices/Appservice";
import { getExpenses } from "../../../sevices/Appservice";
import { useState } from "react";

// import { useEffect } from "react";

export default function Details() {
  const navigation = useNavigation();
  const route = useRoute();
  const { expense } = route.params;
  const [editableExpense, setEditableExpense] = useState(expense);
  const [isEditing, setIsEditing] = useState(false);






  useEffect(()=>{},[] ) // get expenses and show on fields to edit
 


 const handleedit = () => {
  
  setIsEditing(true);
};




  const handledelete=()=>{

  }

  return (
    <SafeAreaView style={tailwind`flex-1 bg-white`}>
      
      <View style={tailwind`px-4 py-4 flex-row items-center border-b border-gray-100`}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tailwind`mr-4`}>
          <ArrowLeft color="black" size={24} />
        </TouchableOpacity>
        <Text style={tailwind`text-black text-xl font-bold`}>Expense Details</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
       
        <View style={tailwind`mx-4 mt-6 p-8 rounded-2xl bg-black items-center justify-center border border-gray-800`}>
          <View style={tailwind`bg-blue-50 rounded-full p-4 mb-4`}>
            <IndianRupee color="#2563eb" size={32} />
          </View>
          <Text style={tailwind`text-gray-400 text-sm`}>Amount Spent</Text>
          <Text style={tailwind`text-white text-4xl font-bold mt-2`}>
            ₹ {parseFloat(expense.amount).toFixed(2)}
          </Text>
        </View>

        
        <View style={tailwind`mx-4 mt-6`}>
          <Text style={tailwind`text-black text-sm uppercase tracking-wider mb-4`}>
            Details
          </Text>

          {infoRow("Date", expense.expense_date.split("T")[0], <Calendar color="#2563eb" size={20} />)}
          {infoRow("Category", expense.category, <Tag color="#2563eb" size={20} />)}
          {infoRow("Payment Method", expense.payment_method, <CreditCard color="#2563eb" size={20} />)}

          {/* Description */}
          <View style={tailwind`bg-white rounded-2xl p-4 mb-3 border border-gray-100`}>
            <View style={tailwind`flex-row items-center mb-3`}>
              <View style={tailwind`bg-blue-50 rounded-full p-3`}>
                <FileText color="#2563eb" size={20} />
              </View>
              <Text style={tailwind`text-gray-400 text-xs ml-4`}>Description</Text>
            </View>
            <Text style={tailwind`text-black text-base leading-6`}>
              {expense.description}
            </Text>
          </View>
        </View>

        {/* Buttons */}
        <View style={tailwind`mx-4 mt-6`}>
          <TouchableOpacity style={tailwind`bg-blue-600 rounded-2xl p-4 items-center mb-3`} onPress={handleedit}>
            <Text style={tailwind`text-white text-base font-semibold`}>Edit Expense</Text>
          </TouchableOpacity>

          <TouchableOpacity style={tailwind`bg-white border border-red-200 rounded-2xl p-4 items-center`} onPress={handledelete} >
            <Text style={tailwind`text-red-500 text-base font-semibold`}>Delete Expense</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const infoRow = (label, value, icon) => (
  <View style={tailwind`bg-white rounded-2xl p-4 mb-3 flex-row items-center border border-gray-100`}>
    <View style={tailwind`bg-blue-50 rounded-full p-3`}>{icon}</View>
    <View style={tailwind`ml-4 flex-1`}>
      <Text style={tailwind`text-gray-400 text-xs`}>{label}</Text>
      <Text style={tailwind`text-black text-base font-semibold mt-1`}>
        {value}
      </Text>
    </View>
  </View>
);
