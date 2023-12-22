import { StyleSheet, Text, View, Image, Animated } from "react-native";
import { getItemAsync } from "expo-secure-store";
import LoginInfo_Context from "../context/LoginInfo/LoginInfo_Context";
import React, { useEffect, useContext, useState } from "react";
import { decode as atob } from "base-64";

const Splash = ({ navigation }) => {
  const opacity = new Animated.Value(0);
  const { token, setMyToken } = useContext(LoginInfo_Context);
  const [token2, setToken2] = useState("");

  function Token_Decoder() {
    try {
      console.log(token2);
      if (!token2) {
        console.error("Token is empty");
        return;
      }

      const [header, payload, signature] = token2.split(".");
      // Decode the payload
      const decodedToken = JSON.parse(atob(payload));
      // console.log("dfdgdfg ", decodedToken);
      setMyToken(decodedToken);
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  // Retrieve the authentication token
  async function getAuthToken() {
    try {
      const token = await getItemAsync("token");
      if (token !== null) {
        console.log("Token retrieved successfully:", token);
        setToken2(token);
      } else {
        console.log("Token not found");
        navigation.replace("Login");
      }
    } catch (error) {
      console.error("Error retrieving token:", error);
      navigation.replace("Login");
    }
  }

  const Animation_Handler = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    Animation_Handler();
    setTimeout(() => {
      getAuthToken();
    }, 2000);
  }, []);

  useEffect(() => {
    // Run Token_Decoder when token2 changes
    if (token2) {
      Token_Decoder();
      console.log(token);
      // Navigate to the desired route
      navigation.replace("Route");
    }
  }, [token2]);

  return (
    <Animated.View
      style={{
        ...styles.container,
        opacity: opacity,
      }}
    >
      <Image style={styles.logo} source={require("../assets/splash.png")} />
    </Animated.View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 400,
    height: 400,
    left: 0,
  },
});
