import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { showMessage } from "react-native-flash-message";
import { setItemAsync } from "expo-secure-store";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Feather } from "@expo/vector-icons";
import queryString from "query-string";
import { deleteItemAsync } from "expo-secure-store";

interface Data {
  email: string;
  password: string;
}

const Login = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const wave_radius = new Animated.Value(0);

  const Animation_Handler = () => {
    Animated.timing(wave_radius, {
      toValue: 250,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    Animation_Handler();
  }, []);

  async function storeAuthToken(prefix_token: any, token: string) {
    try {
      await setItemAsync(prefix_token, token);
      console.log("Token stored successfully");
    } catch (error) {
      console.error("Error storing token:", error);
    }
  }

  async function deleteAuthToken() {
    try {
      await deleteItemAsync("token");
    } catch (error) {
      console.error("Error retrieving token:", error);
      navigation.replace("Login");
    }
  }

  const loginBtnHandler = async (email: string, password: string) => {
    const apiUrl = "https://money-minder-lndt.onrender.com/api/auth/login/";

    // Create form data
    const data: Data = {
      email: email,
      password: password,
    };

    // Serialize data to x-www-form-urlencoded format
    const formDataString = queryString.stringify(data);

    // Making a POST request using fetch
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
          message: "Logined successfully!",
          type: "success",
          duration: 1500,
          floating: true, // This allows the message to be displayed even if the user scrolls
          icon: "success",
        });
        storeAuthToken("token", responseData.token);
        navigation.replace("Splash");
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
    deleteAuthToken();
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.container}>
        <Animated.View
          style={{
            ...styles.wavesContainer,
            borderBottomRightRadius: wave_radius,
          }}
        >
          <View style={styles.Header}>
            <Text
              style={{
                color: "#fff",
                fontSize: 40,
                fontFamily: "sans-serif-medium",
                fontWeight: "bold",
              }}
            >
              Welcome Back
            </Text>
          </View>
        </Animated.View>

        <View style={styles.email}>
          <TextInput
            placeholder="Email"
            style={styles.input}
            onChangeText={(text: string) => setEmail(text.trim())}
          />
        </View>

        <View style={styles.password}>
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry={!showPassword} // Use the showPassword state to toggle secureTextEntry
            onChangeText={(text: string) => setPassword(text)}
          />
          <TouchableOpacity
            onPress={() => {
              setShowPassword(!showPassword);
              console.log(!showPassword);
            }} // Toggle password visibility
            style={styles.viewPasswordBtn}
          >
            {!showPassword ? (
              <Ionicons name="eye-outline" size={25} color="#908D88" />
            ) : (
              <Feather name="eye-off" size={24} color="#908D88" />
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.LoginBtn}
          onPress={() => {
            loginBtnHandler(email, password);
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontFamily: "sans-serif-medium",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "#fff",
            position: "absolute",
            bottom: 140,
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("Register")}
        >
          <Text
            style={{
              color: "#59C7BA",
              fontSize: 16,
              fontFamily: "sans-serif-medium",
              alignSelf: "center",
            }}
          >
            Don't have an account? Register
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("screen").height,
  },
  Header: {
    position: "absolute",
    top: 100,
    left: 25,
  },
  wavesContainer: {
    width: "100%",
    height: 270,
    backgroundColor: "#59C7BA",
    position: "absolute",
    top: 0,
    elevation: 12,
  },
  email: {
    backgroundColor: "#ECF8F8",
    width: 280,
    height: 55,
    borderRadius: 15,
    top: 10,
    marginTop: 60,
  },
  password: {
    backgroundColor: "#ECF8F8",
    width: 280,
    height: 55,
    borderRadius: 15,
    top: 10,
    marginTop: 30,
  },
  LoginBtn: {
    backgroundColor: "#59C7BA",
    width: 155,
    height: 60,
    top: 55,
    borderRadius: 100,
    elevation: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    alignSelf: "flex-start",
    padding: 10,
    fontSize: 15,
    width: 280,
    height: 55,
  },

  viewPasswordBtn: {
    position: "absolute",
    top: 17,
    right: 13,
  },
});
