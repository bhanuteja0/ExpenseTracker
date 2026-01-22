import { View, Text, Pressable, ActivityIndicator, ScrollView } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import tailwind from "twrnc";
import { useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Insights() {
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("yearly");
  const [open, setOpen] = useState(false);
  const [userid, setuserid] = useState(null);

  const currentYear = new Date().getFullYear();
  const startYear = 2020;

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [yearlyTotal, setYearlyTotal] = useState(0);
  const [allYearsData, setAllYearsData] = useState([]);
  const [overallTotal, setOverallTotal] = useState(0);

  useEffect(() => {
    AsyncStorage.getItem("user_id").then(id => setuserid(id));
  }, []);

  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => startYear + i
  ).reverse();

  // ---------------- FETCH YEARLY DATA ----------------
  useEffect(() => {
    if (!userid || filter !== "yearly") return;

    const fetchYearlyExpense = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://10.85.245.66:5050/expense_track/expense/byyear/${userid}`
        );
        const data = await res.json();

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

  useEffect(() => {
    if (allYearsData.length > 0) {
      const selectedYearData = allYearsData.find(
        (yearData) => yearData.year === selectedYear
      );
      setYearlyTotal(selectedYearData?.total_amount || 0);
    }
  }, [selectedYear, allYearsData]);

  const COLORS = ["#3B82F6", "#22C55E", "#EF4444", "#F59E0B", "#8B5CF6"];

  const yearlyBarData = useMemo(() => {
    if (allYearsData.length === 0) {
      return [
        {
          value: yearlyTotal,
          label: selectedYear.toString(),
          frontColor: "#3B82F6",
        },
      ];
    }

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
            {["yearly"].map(item => (
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

      {/* CHART CARD */}
      <View style={tailwind`bg-gray-50 rounded-2xl p-6 items-center`}>

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
