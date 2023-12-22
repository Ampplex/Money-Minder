import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import Currency_Context from "./Currency_Context";

const Currency_State = (props) => {
  const [currency, setCurrency] = useState("INR");
  const [dollarValueInRupees, setDollarValueInRupees] = useState(null);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      const apiUrl = "https://api.exchangerate-api.com/v4/latest/USD";

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Assuming the API response has a 'rates' object with currency exchange rates
        const dollarValueInRupees = data.rates.INR;
        setDollarValueInRupees(dollarValueInRupees);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };

    fetchExchangeRate();
  }, []); // useEffect will run only once on component mount

  const convertToDollar = (val) => {
    if (dollarValueInRupees !== null) {
      const value = val / dollarValueInRupees;
      return Number(value).toFixed(2);
    }
  };

  const convertToINR = (val) => {
    if (dollarValueInRupees !== null) {
      const value = val * dollarValueInRupees;
      return Number(value).toFixed(2);
    }
  };

  const changeCurrency = (val) => {
    setCurrency(val === "dollar" ? "dollar" : "INR");
  };

  const getAmount = (val) => {
    if (currency === "dollar") {
      return convertToDollar(val);
    } else {
      return val;
    }
  };

  const changeTotalExpenses = (val) => {
    setTotalExpense(val);
  };

  return (
    <Currency_Context.Provider
      value={{
        currency,
        convertToDollar,
        convertToINR,
        getAmount,
        changeCurrency,
        changeTotalExpenses,
        totalExpense,
      }}
    >
      {props.children}
    </Currency_Context.Provider>
  );
};

export default Currency_State;
