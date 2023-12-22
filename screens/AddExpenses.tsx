import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import LottieView from "lottie-react-native";
import { Dropdown } from "react-native-element-dropdown";
import { ScrollView } from "react-native-gesture-handler";
import { showMessage } from "react-native-flash-message";
import queryString from "query-string";
import LoginInfo_Context from "../context/LoginInfo/LoginInfo_Context";
import Currency_Context from "../context/LoginInfo/Currency_Context";

interface Data {
  label: string;
  value: string;
}

const data: Data[] = [
  { label: "Groceries", value: "Groceries" },
  { label: "Health", value: "Health" },
  { label: "Food", value: "Food" },
  { label: "Vehicle service", value: "Vehicle service" },
  { label: "Education ", value: "Education" },
  { label: "Clothing", value: "Clothing" },
  { label: "Income Taxes", value: "Income Taxes" },
  { label: "Emergency Fund", value: "Emergency Fund" },
  { label: "Entertainment", value: "Entertainment" },
  { label: "Loan Repayments", value: "Loan Repayments" },
  { label: "UBER", value: "UBER" },
];

const AddExpenses = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(null);
  const { token } = useContext(LoginInfo_Context);
  const { currency } = useContext(Currency_Context);

  const saveUserExpensesHandler = async (amount: number, category: string) => {
    const apiUrl =
      "https://money-minder-lndt.onrender.com/api/users/addExpense";

    const expenseData = {
      userId: token._id,
      amount: amount,
      category: category,
    };

    const formDataString = queryString.stringify(expenseData);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          // Add any additional headers if needed
        },
        body: formDataString,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("POST request successful:", responseData.msg);

      if (responseData.msg == "success") {
        showMessage({
          message: "Added expense successfully!",
          type: "success",
          duration: 1500,
          floating: true, // This allows the message to be displayed even if the user scrolls
          icon: "success",
        });
      } else {
        showMessage({
          message: "Please enter your valid details!",
          type: "danger",
          duration: 1500,
          floating: true, // This allows the message to be displayed even if the user scrolls
          icon: "danger",
        });
      }
    } catch (error) {
      console.error("Error during POST request:", error);
      showMessage({
        message: "Please enter your valid details!",
        type: "danger",
        duration: 1500,
        floating: true, // This allows the message to be displayed even if the user scrolls
        icon: "danger",
      });
    }
  };

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
        Add Expenses
      </Text>
      <LottieView
        source={require("../assets/animations/bill.json")}
        autoPlay
        loop
        style={styles.bill}
      />
      <View style={styles.Amount}>
        <TextInput
          style={{
            padding: 20,
            fontSize: 16,
            paddingRight: 32,
          }}
          placeholder="Amount"
          keyboardType="numeric"
          onChangeText={(text: string) => setAmount(Number(text))}
        />
        <Text
          style={{
            color: "#C4C7C6",
            fontSize: 22,
            position: "absolute",
            right: 17,
            top: 15,
          }}
        >
          {currency == "dollar" ? "$" : "₹"}
        </Text>
      </View>

      <Dropdown
        style={[styles.Category]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "    Category" : "..."}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />

      <TouchableOpacity
        style={styles.saveExpenses}
        onPress={() => saveUserExpensesHandler(amount, value)}
      >
        <Text
          style={{
            color: "white",
            fontSize: 18,
            fontFamily: "sans-serif-medium",
            fontWeight: "bold",
          }}
        >
          + Save Expenses
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddExpenses;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("screen").height,
  },
  bill: {
    width: 250,
    height: 250,
    position: "absolute",
    top: 60,
  },
  Amount: {
    width: 287,
    height: 60,
    backgroundColor: "#EBF5F4",
    marginTop: 140,
    borderRadius: 10,
  },
  Category: {
    width: 287,
    height: 60,
    backgroundColor: "#EBF5F4",
    marginTop: 20,
    borderRadius: 10,
    paddingRight: 12,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 7,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#6A5A56",
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 17,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  saveExpenses: {
    backgroundColor: "#E9C33E",
    width: 280,
    height: 55,
    marginTop: 45,
    borderRadius: 15,
    elevation: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
