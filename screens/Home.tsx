import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import LoginInfo_Context from "../context/LoginInfo/LoginInfo_Context";
import Currency_Context from "../context/LoginInfo/Currency_Context";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Ionicons,
  AntDesign,
  Feather,
  MaterialIcons,
  Fontisto,
} from "@expo/vector-icons";

const Home = ({ navigation }) => {
  const { token } = useContext(LoginInfo_Context);
  const { currency, getAmount } = useContext(Currency_Context);
  const [response, setResponse] = useState([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [viewAll, setViewAll] = useState<boolean>(false);

  const getAllExpenses = async () => {
    const url = `https://money-minder-lndt.onrender.com/api/users/getAllExpenses/${token._id}/`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        getAllExpenses();
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data.expenses || [];
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  const getCategoryAmount = (category: string) => {
    const categoryData = response.find((item) => item.category === category);
    return categoryData ? categoryData.totalAmount : 0;
  };

  const totalExpenseAmount = () => {
    return response.reduce((total, item) => total + item.totalAmount, 0);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await getAllExpenses();
        setResponse(resp);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setTotalAmount(totalExpenseAmount());
  }, [response]);

  const graphScreenNavigator = (category: string) => {
    const userId = token._id;
    const title = category;
    navigation.navigate("Graph", { userId, category, title });
  };

  return (
    <ScrollView
      contentContainerStyle={{
        ...styles.container,
        height: !viewAll
          ? Dimensions.get("window").height * 1.1
          : Dimensions.get("screen").height * 1.75,
      }}
    >
      <Text
        style={{
          fontFamily: "sans-serif-medium",
          fontSize: 30,
          color: "#3F2A26",
          position: "absolute",
          top: 82,
          left: 40,
        }}
      >
        Total Expense
      </Text>

      <LinearGradient colors={["#59C7BA", "#59C7BA"]} style={styles.card}>
        <Text
          style={{
            color: "#fff",
            fontSize: 35,
            position: "absolute",
            left: 30,
            fontFamily: "sans-serif-medium",
          }}
          selectable={true}
        >
          {currency == "dollar" ? "$" : "₹"} {getAmount(totalAmount)}
        </Text>
        <View style={styles.circle1} />
        <View style={styles.circle2} />
      </LinearGradient>
      <Text
        style={{
          fontSize: 23,
          position: "absolute",
          left: 39,
          fontWeight: "400",
          top: Dimensions.get("window").height * 0.44,
        }}
      >
        Latest spendings
      </Text>

      <TouchableOpacity
        style={styles.viewAllBtn}
        onPress={() => setViewAll(true)}
      >
        <Text
          style={{
            fontSize: 15,
          }}
        >
          View All
        </Text>
      </TouchableOpacity>

      {/* Spending List */}
      <View style={styles.spendingContainer}>
        <TouchableOpacity
          style={styles.spendingItem}
          onPress={() => graphScreenNavigator("Groceries")}
        >
          <MaterialCommunityIcons
            name="shopping-outline"
            size={25}
            color="#87807C"
            style={{
              position: "absolute",
              left: 0,
              padding: 20,
            }}
          />
          <Text style={styles.itemTextStyle}>Groceries</Text>
          <Text style={styles.amountTextStyle}>
            {currency == "dollar" ? "$" : "₹"}
            {getAmount(getCategoryAmount("Groceries"))}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.spendingItem}
          onPress={() => graphScreenNavigator("Health")}
        >
          <FontAwesome5
            name="hospital"
            size={25}
            color="#87807C"
            style={{
              position: "absolute",
              left: 0,
              padding: 20,
            }}
          />
          <Text style={styles.itemTextStyle}>Health</Text>
          <Text style={styles.amountTextStyle}>
            {currency == "dollar" ? "$" : "₹"}
            {getAmount(getCategoryAmount("Health"))}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.spendingItem}
          onPress={() => graphScreenNavigator("Food")}
        >
          <Ionicons
            name="fast-food-outline"
            size={25}
            color="#87807C"
            style={{
              position: "absolute",
              left: 0,
              padding: 20,
            }}
          />
          <Text style={styles.itemTextStyle}>Food</Text>
          <Text style={styles.amountTextStyle}>
            {currency == "dollar" ? "$" : "₹"}
            {getAmount(getCategoryAmount("Food"))}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.spendingItem}
          onPress={() => graphScreenNavigator("Vehicle service")}
        >
          <AntDesign
            name="setting"
            size={25}
            color="#87807C"
            style={{
              position: "absolute",
              left: 0,
              padding: 20,
            }}
          />
          <Text style={styles.itemTextStyle}>Vehicle service</Text>
          <Text style={styles.amountTextStyle}>
            {currency == "dollar" ? "$" : "₹"}
            {getAmount(getCategoryAmount("Vehicle service"))}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.spendingItem}
          onPress={() => graphScreenNavigator("UBER")}
        >
          <Fontisto
            name="taxi"
            size={19}
            color="#87807C"
            style={{
              position: "absolute",
              left: 0,
              padding: 20,
            }}
          />
          <Text style={styles.itemTextStyle}>UBER</Text>
          <Text style={styles.amountTextStyle}>
            {currency == "dollar" ? "$" : "₹"}
            {getAmount(getCategoryAmount("UBER"))}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.spendingItem}
          onPress={() => graphScreenNavigator("Clothing")}
        >
          <Feather
            name="shopping-bag"
            size={25}
            color="#87807C"
            style={{
              position: "absolute",
              left: 0,
              padding: 20,
            }}
          />
          <Text style={styles.itemTextStyle}>Clothing</Text>
          <Text style={styles.amountTextStyle}>
            {currency == "dollar" ? "$" : "₹"}
            {getAmount(getCategoryAmount("Clothing"))}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.spendingItem}
          onPress={() => graphScreenNavigator("Income Taxes")}
        >
          <MaterialIcons
            name="payments"
            size={25}
            color="#87807C"
            style={{
              position: "absolute",
              left: 0,
              padding: 20,
            }}
          />
          <Text style={styles.itemTextStyle}>Income Taxes</Text>
          <Text style={styles.amountTextStyle}>
            {currency == "dollar" ? "$" : "₹"}
            {getAmount(getCategoryAmount("Income Taxes"))}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.spendingItem}
          onPress={() => graphScreenNavigator("Education")}
        >
          <MaterialCommunityIcons
            name="book-education-outline"
            size={25}
            color="#87807C"
            style={{
              position: "absolute",
              left: 0,
              padding: 20,
            }}
          />
          <Text style={styles.itemTextStyle}>Education</Text>
          <Text style={styles.amountTextStyle}>
            {currency == "dollar" ? "$" : "₹"}
            {getAmount(getCategoryAmount("Education"))}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.spendingItem}
          onPress={() => graphScreenNavigator("Emergency Fund")}
        >
          <MaterialIcons
            name="payments"
            size={25}
            color="#87807C"
            style={{
              position: "absolute",
              left: 0,
              padding: 20,
            }}
          />
          <Text style={styles.itemTextStyle}>Emergency Fund</Text>
          <Text style={styles.amountTextStyle}>
            {currency == "dollar" ? "$" : "₹"}
            {getAmount(getCategoryAmount("Emergency Fund"))}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.spendingItem}
          onPress={() => graphScreenNavigator("Entertainment")}
        >
          <Ionicons
            name="tv-outline"
            size={25}
            color="#87807C"
            style={{
              position: "absolute",
              left: 0,
              padding: 20,
            }}
          />
          <Text style={styles.itemTextStyle}>Entertainment</Text>
          <Text style={styles.amountTextStyle}>
            {currency == "dollar" ? "$" : "₹"}
            {getAmount(getCategoryAmount("Entertainment"))}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.spendingItem}
          onPress={() => graphScreenNavigator("Loan Repayments")}
        >
          <MaterialIcons
            name="payment"
            size={25}
            color="#87807C"
            style={{
              position: "absolute",
              left: 0,
              padding: 20,
            }}
          />
          <Text style={styles.itemTextStyle}>Loan Repayments</Text>
          <Text style={styles.amountTextStyle}>
            {currency == "dollar" ? "$" : "₹"}
            {getAmount(getCategoryAmount("Loan Repayments"))}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: 288,
    height: 145,
    borderRadius: 17,
    elevation: 12,
    position: "absolute",
    top: 140,
    justifyContent: "center",
    alignItems: "center",
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
  spendingContainer: {
    backgroundColor: "#fff",
    width: 288,
    height: Dimensions.get("window").height * 0.7,
    position: "absolute",
    top: Dimensions.get("window").height * 0.5,
  },
  spendingItem: {
    width: 290,
    height: 65,
    backgroundColor: "#ECF8F8",
    marginTop: 20,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  itemTextStyle: {
    color: "#87807C",
    fontSize: 17,
    position: "absolute",
    left: 57,
    fontFamily: "sans-serif-medium",
    fontWeight: "600",
  },
  amountTextStyle: {
    color: "#7CD3C7",
    fontFamily: "sans-serif-medium",
    fontSize: 17,
    position: "absolute",
    right: 20,
  },
  viewAllBtn: {
    width: 60,
    height: 20,
    position: "absolute",
    top: Dimensions.get("window").height * 0.45,
    right: 37,
  },
});
