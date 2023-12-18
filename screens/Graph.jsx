import React, { useEffect, useState, useRef, useContext } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import LottieView from "lottie-react-native";
import * as Speech from "expo-speech";
import Currency_Context from "../context/LoginInfo/Currency_Context";

const Graph = ({ route, navigation }) => {
  const { userId, category } = route.params;
  const { title } = route.params;
  const { currency } = useContext(Currency_Context);
  const [data, setData] = useState({
    weekly: null,
    monthly: null,
    yearly: null,
  });
  const [AI_data, setAI_data] = useState();
  const actionSheetRef = useRef(null);

  const [timeRange, setTimeRange] = useState("weekly");
  const [loading, setLoading] = useState(true);
  const [selectDateActive, setSelectDateActive] = useState(false);
  const [date, setDate] = useState("");
  const [displayVal, setDisplayVal] = useState();
  const [showPredictedVal, setShowPredictedVal] = useState(false);
  const [expense, setExpense] = useState();

  const speak = (msg) => {
    options = {
      voice: "en-US-SMTf00",
    };
    Speech.speak(msg, options);
  };

  const openActionSheet = () => {
    actionSheetRef.current?.show();
  };

  const closeActionSheet = () => {
    actionSheetRef.current?.hide();
  };

  const toggle = () => {
    setTimeout(() => {
      setShowPredictedVal(true);
      if (expense == null) {
        speak("Please select a date");
      } else {
        speak(
          `Your expense on ${title} will be ${Number(expense).toFixed(2)} ${
            currency == "dollar" ? "$" : "₹"
          }`
        );
      }
    }, 2000);
  };

  const monthsObject = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };

  const getCategoryExpenses = async (timeRange) => {
    const url = `https://money-minder-lndt.onrender.com/api/users/getExpense/${userId}/${category}?timeRange=${timeRange}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const dataResponse = await response.json();
      return dataResponse.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  const getCategoryExpensesForAI = async () => {
    const url = `https://money-minder-lndt.onrender.com/api/users/getExpenseAI/${userId}/${category}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const dataResponse = await response.json();
      // console.log("THIS IS A DATA : ", dataResponse);
      return dataResponse;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  const getExpensePrediction = async () => {
    const url = "https://money-minder-ai.onrender.com/";
    const data = { ...AI_data, time: displayVal };

    console.log(data);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Adjust the content type based on your API requirements
          // Add any additional headers if needed
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData = await response.json();
      setExpense(responseData.result.predicted_amount);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);

      const weeklyData = await getCategoryExpenses("weekly");
      const monthlyData = await getCategoryExpenses("monthly");
      const yearlyData = await getCategoryExpenses("yearly");
      const AI_Data = await getCategoryExpensesForAI();

      setData({
        weekly: weeklyData,
        monthly: monthlyData,
        yearly: yearlyData,
      });

      setAI_data(AI_Data);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: title,
    });
  }, [title, navigation]);

  useEffect(() => {
    fetchData();
  }, []);

  const processedData = data[timeRange]
    ? Object.keys(data[timeRange]).map((year) => ({
        year,
        amount: data[timeRange][year],
      }))
    : [];
  const chartConfig = {
    backgroundGradientFrom: "white",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "white",
    color: (opacity = 1) => `#4424A9`,
    fillShadowGradientOpacity: 1,
    labelColor: (opacity = 1) => `#4424A9`,
    barPercentage: 0.3,
    barRadius: 5,
    propsForBackgroundLines: {
      strokeWidth: 1,
      strokeDasharray: null,
      stroke: "#F0F0F0",
    },
  };

  const { width, height } = Dimensions.get("window");

  const handleTimeRangeChange = (newTimeRange) => {
    setTimeRange(newTimeRange);
  };

  useEffect(() => {
    console.log(date);
  }, [date]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.barGraph}>
        <BarChart
          data={{
            labels: processedData.map((item) =>
              timeRange == "monthly"
                ? monthsObject[item.year]
                : item.year.toString()
            ),
            datasets: [
              {
                data: processedData.map((item) => item.amount),
              },
            ],
          }}
          width={width - 20}
          height={height * 0.3}
          chartConfig={chartConfig}
          showBarTops={false}
          yAxisLabel={""}
          fromZero={true}
          segments={2}
        />
      </View>

      <View style={styles.options}>
        <TouchableOpacity
          style={[
            styles.timeRangeButton,
            timeRange === "weekly" && styles.activeButton,
          ]}
          onPress={() => handleTimeRangeChange("weekly")}
        >
          <Text
            style={[
              styles.buttonText,
              timeRange === "weekly" && styles.activeButtonText,
            ]}
          >
            Weekly
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.timeRangeButton,
            timeRange === "monthly" && styles.activeButton,
          ]}
          onPress={() => handleTimeRangeChange("monthly")}
        >
          <Text
            style={[
              styles.buttonText,
              timeRange === "monthly" && styles.activeButtonText,
            ]}
          >
            Monthly
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.timeRangeButton,
            timeRange === "yearly" && styles.activeButton,
          ]}
          onPress={() => handleTimeRangeChange("yearly")}
        >
          <Text
            style={[
              styles.buttonText,
              timeRange === "yearly" && styles.activeButtonText,
            ]}
          >
            Yearly
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.forecastingBackground}>
        <Text
          style={{
            color: "#fff",
            fontFamily: "sans-serif-medium",
            fontSize: 22,
            fontWeight: "bold",
            position: "absolute",
            top: 40,
            padding: 10,
          }}
        >
          {title} expense forecasting
        </Text>
        <TouchableOpacity
          style={styles.dateInput}
          onPress={() => setSelectDateActive(true)}
        >
          <Text
            style={{
              color: "#000",
              left: 0,
            }}
          >
            {date.length > 0 ? date : "Select a date"}
          </Text>
          {selectDateActive ? (
            <View
              style={{
                opacity: 0,
              }}
            >
              <DateTimePicker
                testID="dateTimePicker"
                value={displayVal || new Date()}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={(event, selectedDate) => {
                  if (selectedDate !== undefined) {
                    const formattedDate = `${selectedDate.getUTCFullYear()}-${
                      selectedDate.getUTCMonth() + 1
                    }-${selectedDate.getUTCDate()}`;
                    setDisplayVal(selectedDate);
                    setSelectDateActive(false);
                    setDate(formattedDate);
                    getExpensePrediction();
                  }
                }}
              />
            </View>
          ) : (
            <View />
          )}
        </TouchableOpacity>

        {/* Predict Btn */}

        <TouchableOpacity
          style={styles.predictBtn}
          onPress={() => {
            openActionSheet();
            toggle();
          }}
        >
          <Text
            style={{
              fontFamily: "sans-serif-medium",
            }}
          >
            Predict
          </Text>
        </TouchableOpacity>
      </View>
      <ActionSheet ref={actionSheetRef}>
        <View style={styles.ActionSheet}>
          {!showPredictedVal ? (
            <>
              <LottieView
                source={require("../assets/animations/robot.json")}
                style={{
                  width: 267,
                  height: 267,
                  alignSelf: "center",
                }}
                autoPlay={true}
                loop={true}
              />
              <View style={styles.batch}>
                <Text
                  style={{
                    color: "#fff",
                    fontFamily: "sans-serif-medium",
                    fontSize: 17,
                    alignSelf: "center",
                  }}
                >
                  Processing...
                </Text>
              </View>
            </>
          ) : (
            <>
              <Text
                style={{
                  color: "#2C61DB",
                  fontFamily: "sans-serif-medium",
                  fontSize: 22,
                  padding: 10,
                }}
              >
                {expense == null
                  ? "Please select a date"
                  : `Your expense on ${title} will be ${Number(expense).toFixed(
                      2
                    )} ${currency == "dollar" ? "$" : "₹"}`}
              </Text>
              <TouchableOpacity
                style={styles.goBack}
                onPress={() => closeActionSheet()}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontFamily: "sans-serif-medium",
                    fontSize: 17,
                  }}
                >
                  Go Back
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ActionSheet>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("window").height,
  },
  barGraph: {
    position: "absolute",
    top: 40,
  },
  options: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: Dimensions.get("window").width - 20,
    height: 50,
    backgroundColor: "#fafafa",
    borderRadius: 30,
    position: "absolute",
    top: Dimensions.get("window").height * 0.36,
  },
  timeRangeButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  activeButton: {
    backgroundColor: "#4424A9",
    borderRadius: 30,
  },
  buttonText: {
    color: "#4424A9",
  },
  activeButtonText: {
    color: "#fff",
  },
  circle1: {
    backgroundColor: "#fff",
    width: 22,
    height: 22,
    borderRadius: 20,
    opacity: 0.3,
    position: "absolute",
    bottom: 20,
    left: 57,
  },
  circle2: {
    backgroundColor: "#fff",
    width: 22,
    height: 22,
    borderRadius: 20,
    opacity: 0.3,
    position: "absolute",
    top: 20,
    right: 57,
  },
  forecastingBackground: {
    width: Dimensions.get("window").width,
    height: 350,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4424A9",
    borderTopRightRadius: 70,
    borderTopLeftRadius: 70,
    position: "absolute",
    bottom: 0,
  },
  dateInput: {
    backgroundColor: "#fff",
    width: Dimensions.get("window").width - 150,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60,
    elevation: 20,
  },
  predictBtn: {
    width: 160,
    height: 45,
    position: "absolute",
    top: 200,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    elevation: 20,
  },
  ActionSheet: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    top: -190,
  },
  batch: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2C61DB",
    top: 25,
    alignSelf: "center",
    left: 10,
    height: 40,
    width: 150,
    borderRadius: 30,
  },
  goBack: {
    width: 150,
    height: 40,
    backgroundColor: "#C2D9FF",
    justifyContent: "center",
    alignItems: "center",
    top: 45,
    borderRadius: 30,
  },
});

export default Graph;
