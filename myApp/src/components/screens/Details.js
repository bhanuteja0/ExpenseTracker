import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Calendar, Tag, FileText, IndianRupee } from "lucide-react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import tailwind from "twrnc";
import { delexpense, editexpense } from "../../../sevices/Appservice";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Details() {
  const navigation = useNavigation();
  const route = useRoute();
  const { expense } = route.params;
  const [showDatePicker, setShowDatePicker] = useState(false);

  // console.log(expense.expense_id);

  const [editableExpense, setEditableExpense] = useState(expense);
  const [isEditing, setIsEditing] = useState(false);
  console.log(editableExpense);

  const handleedit = () => {
    setIsEditing(true);
  };

  const handlesave = async () => {
  try {
    const payload = {
      amount: Number(editableExpense.amount),
      expense_date: editableExpense.expense_date.split("T")[0],
      descriptions:editableExpense.descriptions
    };

    await editexpense(editableExpense.expense_id, payload);

    setIsEditing(false);
    navigation.goBack();
  } catch (error) {
    console.log("Update failed:", error.response?.data || error.message);
  }
};

  const handledelete = async () => {
    try {
      await delexpense(editableExpense.expense_id);
      navigation.goBack();
    } catch (error) {
      console.log("Delete failed:", error);
    }
  };

  return (
    <SafeAreaView style={tailwind`flex-1 bg-white`}>
      {/* Header */}
      <View style={tailwind`px-4 py-4 flex-row items-center border-b border-gray-100`}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tailwind`mr-4`}>
          <ArrowLeft color="black" size={24} />
        </TouchableOpacity>
        <Text style={tailwind`text-black text-xl font-bold`}>Expense Details</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Amount */}
      <View style={tailwind`mx-4 mt-6 p-8 rounded-2xl bg-black items-center justify-center`}>
  <View style={tailwind`bg-blue-50 rounded-full p-4 mb-4`}>
    <IndianRupee color="#2563eb" size={32} />
  </View>

  <Text style={tailwind`text-gray-400 text-sm`}>Amount Spent</Text>

  {isEditing ? (
    <View style={tailwind`flex-row items-center mt-2`}>
      <Text style={tailwind`text-white text-3xl font-bold mr-2`}>₹</Text>
      <TextInput
        value={String(editableExpense.amount)}
        onChangeText={(text) =>
          setEditableExpense({ ...editableExpense, amount: text })
        }
        keyboardType="numeric"
        style={tailwind`text-white text-3xl font-bold border-b border-white px-2 min-w-[100px]`}
        placeholder="0"
        placeholderTextColor="#ccc"
      />
    </View>
  ) : (
    <Text style={tailwind`text-white text-4xl font-bold mt-2`}>
      ₹ {parseFloat(editableExpense.amount).toFixed(2)}
    </Text>
  )}
</View>


        {/* Details */}
        <View style={tailwind`mx-4 mt-6`}>
          <Text style={tailwind`text-black text-sm uppercase tracking-wider mb-4`}>
            Details
          </Text>

          {/* Date */}
          <View style={tailwind`bg-white rounded-2xl p-4 mb-3 flex-row items-center border border-gray-100`}>
  <View style={tailwind`bg-blue-50 rounded-full p-3`}>
    <Calendar color="#2563eb" size={20} />
  </View>

  <View style={tailwind`ml-4 flex-1`}>
    <Text style={tailwind`text-gray-400 text-xs`}>Date</Text>

    {isEditing ? (
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text style={tailwind`text-black text-base font-semibold mt-1`}>
          {editableExpense.expense_date.split("T")[0]}
        </Text>
      </TouchableOpacity>
    ) : (
      <Text style={tailwind`text-black text-base font-semibold mt-1`}>
        {editableExpense.expense_date.split("T")[0]}
      </Text>
    )}
  </View>

  {showDatePicker && (
  <DateTimePicker
    value={new Date(editableExpense.expense_date)}
    mode="date"
    display="calendar"
    onChange={(event, selectedDate) => {
      setShowDatePicker(false);

      if (selectedDate) {
        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
        const day = String(selectedDate.getDate()).padStart(2, "0");

        const formatted = `${year}-${month}-${day}`;

        setEditableExpense({
          ...editableExpense,
          expense_date: formatted,
        });
      }
    }}
  />
)}

</View>


          {/* Category */}
         {/* Category */}
<View style={tailwind`bg-white rounded-2xl p-4 mb-3 flex-row items-center border border-gray-100`}>
  <View style={tailwind`bg-blue-50 rounded-full p-3`}>
    <Tag color="#2563eb" size={20} />
  </View>

  <View style={tailwind`ml-4 flex-1`}>
    <Text style={tailwind`text-gray-400 text-xs`}>Category</Text>

    <Text style={tailwind`text-black text-base font-semibold mt-1`}>
      {editableExpense.category_name || editableExpense.category}
    </Text>
  </View>
</View>


          {/* Description */}
          <View style={tailwind`bg-white rounded-2xl p-4 mb-3 border border-gray-100`}>
            <View style={tailwind`flex-row items-center mb-3`}>
              <View style={tailwind`bg-blue-50 rounded-full p-3`}>
                <FileText color="#2563eb" size={20} />
              </View>
              <Text style={tailwind`text-gray-400 text-xs ml-4`}>Description</Text>
            </View>

            {isEditing ? (
              <TextInput
                value={editableExpense.descriptions}
                onChangeText={(text) =>
                  setEditableExpense({ ...editableExpense, descriptions: text })
                }
                multiline
                numberOfLines={4}
                style={tailwind`border border-gray-300 rounded-lg px-3 py-2`}
              />
            ) : (
              <Text style={tailwind`text-black text-base leading-6`}>
                {editableExpense.descriptions}
              </Text>
            )}
          </View>
        </View>

        {/* Buttons */}
        <View style={tailwind`mx-4 mt-6`}>
          {isEditing ? (
            <TouchableOpacity
              style={tailwind`bg-green-600 rounded-2xl p-4 items-center mb-3`}
              onPress={handlesave}
            >
              <Text style={tailwind`text-white text-base font-semibold`}>
                Save Changes
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={tailwind`bg-blue-600 rounded-2xl p-4 items-center mb-3`}
              onPress={handleedit}
            >
              <Text style={tailwind`text-white text-base font-semibold`}>
                Edit Expense
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={tailwind`bg-white border border-red-200 rounded-2xl p-4 items-center`}
            onPress={handledelete}
          >
            <Text style={tailwind`text-red-500 text-base font-semibold`}>
              Delete Expense
            </Text>
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
