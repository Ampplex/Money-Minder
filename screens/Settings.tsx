import { StyleSheet, Text, View } from "react-native";
import React, { useState, useContext } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Dropdown } from "react-native-element-dropdown";
import Currency_Context from "../context/LoginInfo/Currency_Context";

interface Data {
  label: string;
  value: string;
}

const data: Data[] = [
  { label: "INR", value: "INR" },
  { label: "USD", value: "dollar" },
];

const Settings = ({ navigation }) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const { currency, getAmount, changeCurrency } = useContext(Currency_Context);
  const [value, setValue] = useState<string>(currency);

  return (
    <View style={styles.container}>
      <Text
        style={{
          position: "absolute",
          top: 245,
          fontSize: 18,
        }}
      >
        Currency
      </Text>
      <Dropdown
        style={[styles.Currency]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "    Currency" : "..."}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          changeCurrency(item.value); // Just pass the selected currency directly
          setIsFocus(false);
        }}
      />
      <TouchableOpacity
        style={styles.logOutBtn}
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <Text
          style={{
            color: "#fff",
          }}
        >
          LogOut
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logOutBtn: {
    width: 150,
    height: 50,
    backgroundColor: "#FF6969",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    elevation: 12,
  },
  Currency: {
    width: 287,
    height: 60,
    backgroundColor: "#EBF5F4",
    marginTop: 0,
    borderRadius: 10,
    paddingRight: 12,
    marginBottom: 80,
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
});
