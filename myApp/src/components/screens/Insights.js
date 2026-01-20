import { View,Text } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import tailwind from "twrnc";
import { useMemo } from "react";
import { ActivityIndicator } from "react-native";
import { useState } from "react";
import { Pressable } from "react-native";

export default function Insights(){


    // const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("total");
const [open, setOpen] = useState(false);


//  
//   useEffect(() => {
//     fetchExpenses();
//   }, []);

//   const fetchExpenses = async () => {
//     try {
//       const res = await api.get("/expenses");
//       setExpenses(res.data); // backend array
//     } catch (error) {
//       console.log("Failed to fetch expenses", error);
//     } finally {
//       setLoading(false);
//     }
//   };


const COLORS = [
  "#3B82F6",
  "#22C55E",
  "#EF4444",
  "#F59E0B",
  "#8B5CF6",
];

    const expenses=[
       { "id": 1, "title": "Groceries", "amount": 1200, "category": "Food" },
  { "id": 2, "title": "Bus", "amount": 300, "category": "Transport" },
  { "id": 3, "title": "Dinner", "amount": 800, "category": "Food" },
  { "id": 4, "title": "Movie", "amount": 500, "category": "Entertainment" },
  { "id": 5, "title": "Electricity Bill", "amount": 1500, "category": "Utilities" },
  { "id": 6, "title": "Gym", "amount": 700, "category": "Health" },
    ];


 const chartData = useMemo(() => {
    if (expenses.length === 0) return [];

    const grouped = {};

    expenses.forEach(item => {
      if (!grouped[item.category]) {
        grouped[item.category] = 0;
      }
      grouped[item.category] += Number(item.amount);
    });

    return Object.keys(grouped).map((category, index) => ({
      value: grouped[category],
      text: category,
      color: COLORS[index % COLORS.length],
    }));
  }, [expenses]);




  const totalExpense = useMemo(() => {
    return expenses.reduce((sum, item) => sum + Number(item.amount), 0);
  }, [expenses]);





   if (loading) {
    return (
      <View style={tailwind`flex-1 justify-center items-center bg-white`}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (chartData.length === 0) {
    return (
      <View style={tailwind`flex-1 justify-center items-center bg-white`}>
        <Text style={tailwind`text-gray-400`}>
          No expense data available
        </Text>
      </View>
    );
  }







    return(
      
      <View style={tailwind`flex-1 bg-white px-6`}>

      {/* Header */}
      <View style={tailwind`mt-14 mb-6`}>
        <Text style={tailwind`text-2xl font-semibold text-gray-900`}>
          Insights
        </Text>
        <Text style={tailwind`text-sm text-gray-500 mt-1`}>
          Expense breakdown by category
        </Text>
      </View>


      {/* Filter Dropdown */}
<View style={tailwind`mt-4 mb-4`}>
  <Pressable
    onPress={() => setOpen(!open)}
    style={tailwind`border border-gray-300 rounded-xl px-4 py-3 flex-row justify-between items-center`}
  >
    <Text style={tailwind`text-gray-700 font-medium capitalize`}>
      {filter}
    </Text>
    <Text>▼</Text>
  </Pressable>

  {open && (
    <View style={tailwind`border border-gray-200 rounded-xl mt-2 bg-white overflow-hidden`}>
      {["total", "monthly", "yearly"].map((item) => (
        <Pressable
          key={item}
          onPress={() => {
            setFilter(item);
            setOpen(false);
          }}
          style={tailwind`px-4 py-3 border-b border-gray-100`}
        >
          <Text style={tailwind`capitalize`}>{item}</Text>
        </Pressable>
      ))}
    </View>
  )}
</View>










      {/* Chart Card */}
      <View style={tailwind`bg-gray-50 rounded-2xl p-6 items-center`}>
        <PieChart
          donut
          radius={110}
          innerRadius={70}
          data={chartData}
          centerLabelComponent={() => (
            <View style={tailwind`items-center`}>
              <Text style={tailwind`text-xl font-semibold`}>
                ₹{totalExpense}
              </Text>
              <Text style={tailwind`text-sm text-gray-500`}>
                Total
              </Text>
            </View>
          )}
        />
      </View>
      <View>
        <View>
        <Text style={tailwind`text-lg font-semibold mt-6 mb-2`}>

          LEGEND
        </Text>
        </View>
          <View >
          {expenses.map((item,index)=>(
            
              <Text key={index} style={tailwind`mb-6 font-medium `} >
                
               {item.id} {item.category}: {item.amount}


              </Text>
              


            



          ))}
          </View>




        


      </View>

    </View>


    );
}