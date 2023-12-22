import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import Currency_Context from "./Currency_Context";

type Currency = string;
type DollarValue = number;

const Currency_State = (props: any) => {
  const [currency, setCurrency] = useState<Currency>("INR");
  const [dollarValueInRupees, setDollarValueInRupees] =
    useState<DollarValue>(null);
  const [totalExpense, setTotalExpense] = useState<number>(0);

  useEffect(() => {
    const fetchExchangeRate = async (): Promise<void> => {
      const apiUrl: string = "https://api.exchangerate-api.com/v4/latest/USD";

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Assuming the API response has a 'rates' object with currency exchange rates
        const dollarValueInRupees: number = data.rates.INR;
        setDollarValueInRupees(dollarValueInRupees);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };

    fetchExchangeRate();
  }, []); // useEffect will run only once on component mount

  const convertToDollar = (val: number): number => {
    if (dollarValueInRupees !== null) {
      const value: number = val / dollarValueInRupees;
      return Number(Number(value).toFixed(2));
    }
  };

  const convertToINR = (val: number): number => {
    if (dollarValueInRupees !== null) {
      const value = val * dollarValueInRupees;
      return Number(Number(value).toFixed(2));
    }
  };

  const changeCurrency = (val: string): void => {
    setCurrency(val === "dollar" ? "dollar" : "INR");
  };

  const getAmount = (val: number): number => {
    if (currency === "dollar") {
      return convertToDollar(val);
    } else {
      return val;
    }
  };

  const changeTotalExpenses = (val: number): void => {
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
