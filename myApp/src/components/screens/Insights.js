import { View, Text, Pressable, ActivityIndicator, ScrollView } from "react-native";
import { PieChart, BarChart } from "react-native-gifted-charts";
import tailwind from "twrnc";
import { useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Insights() {
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("total");
  const [open, setOpen] = useState(false);
  const [userid, setuserid] = useState(null);

  const currentYear = new Date().getFullYear();
  const startYear = 2020;

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [yearlyTotal, setYearlyTotal] = useState(0);
  const [yearOpen, setYearOpen] = useState(false);
  const [allYearsData, setAllYearsData] = useState([]);
  const [overallTotal, setOverallTotal] = useState(0);

  useEffect(() => {
    AsyncStorage.getItem("user_id").then(id => setuserid(id));
  }, []);

  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => startYear + i
  ).reverse();

  // ---------------- TOTAL PIE (STATIC SAMPLE) ----------------
  const expenses = [
    { id: 1, amount: 1200, category: "Food" },
    { id: 2, amount: 300, category: "Transport" },
    { id: 3, amount: 800, category: "Food" },
    { id: 4, amount: 500, category: "Entertainment" },
    { id: 5, amount: 1500, category: "Utilities" },
  ];

  const COLORS = ["#3B82F6", "#22C55E", "#EF4444", "#F59E0B", "#8B5CF6"];

  const pieChartData = useMemo(() => {
    const grouped = {};
    expenses.forEach(item => {
      grouped[item.category] = (grouped[item.category] || 0) + item.amount;
    });

    return Object.keys(grouped).map((cat, index) => ({
      value: grouped[cat],
      text: cat,
      color: COLORS[index % COLORS.length],
    }));
  }, []);

  const totalExpense = useMemo(() => {
    return expenses.reduce((sum, item) => sum + item.amount, 0);
  }, []);

  // ---------------- FETCH YEARLY DATA ----------------
  useEffect(() => {
    if (!userid || filter !== "yearly") return;

    const fetchYearlyExpense = async () => {
      try {
        setLoading(true);
        // Fetch all years data (no year parameter)
        const res = await fetch(
          `http://10.85.245.66:5050/expense_track/expense/byyear/${userid}`
        );
        const data = await res.json();
        
        // Set all years data
        setAllYearsData(data.expenses_by_year || []);
        setOverallTotal(data.overall_total || 0);
      } catch (error) {
        console.error("Error fetching yearly expense:", error);
        setAllYearsData([]);
        setYearlyTotal(0);
        setOverallTotal(0);
      } finally {
        setLoading(false);
      }
    };

    fetchYearlyExpense();
  }, [userid, filter]);

  // Update yearly total when selected year changes
  useEffect(() => {
    if (allYearsData.length > 0) {
      const selectedYearData = allYearsData.find(
        (yearData) => yearData.year === selectedYear
      );
      setYearlyTotal(selectedYearData?.total_amount || 0);
    }
  }, [selectedYear, allYearsData]);

  // ---------------- BAR CHART DATA ----------------
  const yearlyBarData = useMemo(() => {
    if (allYearsData.length === 0) {
      // Fallback to single year if no data
      return [
        {
          value: yearlyTotal,
          label: selectedYear.toString(),
          frontColor: "#3B82F6",
        },
      ];
    }

    // Create bar chart data for all years
    return allYearsData.map((yearData, index) => ({
      value: parseFloat(yearData.total_amount) || 0,
      label: yearData.year.toString(),
      frontColor: COLORS[index % COLORS.length],
      topLabelComponent: () => (
        <Text style={{ fontSize: 10, color: "#666" }}>
          ₹{Math.round(yearData.total_amount || 0)}
        </Text>
      ),
    }));
  }, [allYearsData, yearlyTotal, selectedYear]);

  if (loading) {
    return (
      <View style={tailwind`flex-1 justify-center items-center bg-white`}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={tailwind`flex-1 bg-white px-6`}>

      {/* HEADER */}
      <View style={tailwind`mt-14 mb-6`}>
        <Text style={tailwind`text-2xl font-semibold text-gray-900`}>
          Insights
        </Text>
        <Text style={tailwind`text-sm text-gray-500 mt-1`}>
          Expense analysis
        </Text>
      </View>

      {/* FILTER DROPDOWN */}
      <View style={tailwind`mb-4`}>
        <Pressable
          onPress={() => setOpen(!open)}
          style={tailwind`border border-gray-300 rounded-xl px-4 py-3 flex-row justify-between`}
        >
          <Text style={tailwind`capitalize font-medium`}>{filter}</Text>
          <Text>▼</Text>
        </Pressable>

        {open && (
          <View style={tailwind`border border-gray-200 rounded-xl mt-2`}>
            {["total", "yearly"].map(item => (
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

      {/* YEAR DROPDOWN */}
      

      {/* CHART CARD */}
      <View style={tailwind`bg-gray-50 rounded-2xl p-6 items-center`}>

        {filter === "total" && (
          <PieChart
            donut
            radius={110}
            innerRadius={70}
            data={pieChartData}
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
        )}

        {filter === "yearly" && (
          <>
            {allYearsData.length > 0 ? (
              <>
                <BarChart
                  data={yearlyBarData}
                  barWidth={allYearsData.length > 3 ? 40 : 60}
                  spacing={allYearsData.length > 3 ? 20 : 40}
                  hideRules
                  yAxisThickness={0}
                  xAxisThickness={0}
                  noOfSections={4}
                  width={allYearsData.length > 3 ? allYearsData.length * 60 : 300}
                />

                <View style={tailwind`mt-4 items-center`}>
                  <Text style={tailwind`text-lg font-semibold`}>
                    Overall Total: ₹{Math.round(overallTotal)}
                  </Text>
                  {allYearsData.find((y) => y.year === selectedYear) && (
                    <Text style={tailwind`text-sm text-gray-600 mt-1`}>
                      {selectedYear} Total: ₹{Math.round(
                        allYearsData.find((y) => y.year === selectedYear)?.total_amount || 0
                      )}
                    </Text>
                  )}
                </View>
              </>
            ) : (
              <View style={tailwind`items-center py-8`}>
                <Text style={tailwind`text-gray-500`}>
                  No expense data available
                </Text>
              </View>
            )}
          </>
        )}

      </View>

    </ScrollView>
  );
}
