import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState, useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, Feather } from "@expo/vector-icons";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import AddExpenses from "../screens/AddExpenses";
import Settings from "../screens/Settings";
import Currency_Context from "../context/LoginInfo/Currency_Context";

const Route = ({ navigation }) => {
  const [screen, setScreen] = useState<string>("Home");
  const { currency } = useContext(Currency_Context);

  return (
    <>
      {screen == "Home" ? (
        <Home navigation={navigation} />
      ) : screen == "Profile" ? (
        <Profile />
      ) : screen == "AddExpenses" ? (
        <AddExpenses />
      ) : screen == "Settings" ? (
        <Settings navigation={navigation} />
      ) : (
        <View />
      )}

      <LinearGradient
        colors={["#59C7BA", "#59C7BA"]}
        style={styles.tabcontainer}
        start={{ x: 0, y: 0 }} // Gradient starts from the left
        end={{ x: 1, y: 0 }} // Gradient ends at the right
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TouchableOpacity
            style={styles.dollarBtn}
            onPress={() => setScreen("Home")}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 30,
                marginBottom: 2,
              }}
            >
              {currency == "dollar" ? "$" : "₹"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileBtn}
            onPress={() => setScreen("Profile")}
          >
            <FontAwesome name="user-o" size={27} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingsBtn}
            onPress={() => setScreen("Settings")}
          >
            <Feather name="settings" size={27} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.AddBtn}
            onPress={() => setScreen("AddExpenses")}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 38,
                marginBottom: 10,
              }}
            >
              +
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </>
  );
};

export default Route;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  tabcontainer: {
    backgroundColor: "#59C5B6",
    elevation: 12,
    width: "100%",
    height: 70,
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  dollarBtn: {
    position: "absolute",
    left: 50,
    // backgroundColor: "#fafa",
    padding: 13,
  },
  profileBtn: {
    position: "absolute",
    left: 127,
    padding: 13,
    // backgroundColor: "#fafa",
  },
  settingsBtn: {
    position: "absolute",
    left: 210,
    padding: 13,
    // backgroundColor: "#fafa",
  },
  AddBtn: {
    width: 62,
    height: 62,
    backgroundColor: "#E9C33E",
    position: "absolute",
    right: 25,
    bottom: 20,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },
});
