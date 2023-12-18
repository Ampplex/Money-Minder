import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { showMessage } from "react-native-flash-message";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Feather } from "@expo/vector-icons";
import queryString from "query-string";

interface Data {
  name: string;
  email: string;
  password: string;
}

const Register = ({ navigation }) => {
  const [name, setName] = useState<string>("");
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

  const registerBtnHandler = async (
    name: string,
    email: string,
    password: string
  ) => {
    const apiUrl =
      "https://money-minder-lndt.onrender.com/api/auth/signup/";

    // Create form data
    const data: Data = {
      name: name,
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
        showMessage({
          message: "Some error occurred!",
          type: "danger",
          duration: 1500,
          floating: true, // This allows the message to be displayed even if the user scrolls
          icon: "danger",
        });
      }

      const responseData = await response.json();
      console.log("POST request successful:", responseData.msg);
      if (responseData.msg == "All fields are required") {
        showMessage({
          message: responseData.msg,
          type: "danger",
          duration: 1500,
          floating: true, // This allows the message to be displayed even if the user scrolls
          icon: "danger",
        });
      } else {
        showMessage({
          message: "Registered successfully!",
          type: "success",
          duration: 1500,
          floating: true, // This allows the message to be displayed even if the user scrolls
          icon: "success",
        });
        navigation.navigate("Login");
      }
    } catch (error) {
      console.error("Error during POST request:", error);
      showMessage({
        message: "Some error occurred!",
        type: "danger",
        duration: 1500,
        floating: true, // This allows the message to be displayed even if the user scrolls
        icon: "danger",
      });
    }
  };

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
              Register
            </Text>
          </View>
        </Animated.View>

        <View style={styles.name}>
          <TextInput
            placeholder="Name"
            style={{
              alignSelf: "flex-start",
              padding: 10,
              fontSize: 15,
              width: 280,
              height: 55,
            }}
            onChangeText={(text: string) => setName(text)}
          />
        </View>

        <View style={styles.email}>
          <TextInput
            placeholder="Email"
            style={{
              alignSelf: "flex-start",
              padding: 10,
              fontSize: 15,
              width: 280,
              height: 55,
            }}
            onChangeText={(text: string) => setEmail(text)}
          />
        </View>

        <View style={styles.password}>
          <TextInput
            placeholder="Password"
            style={{
              alignSelf: "flex-start",
              padding: 10,
              fontSize: 15,
              width: 280,
              height: 55,
            }}
            secureTextEntry={!showPassword} // Use the showPassword state to toggle secureTextEntry
            onChangeText={(text: string) => setPassword(text)}
          />
          <TouchableOpacity
            onPress={() => {
              setShowPassword(!showPassword);
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
          style={styles.RegisterBtn}
          onPress={() => {
            registerBtnHandler(name, email, password);
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
            Register
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

export default Register;

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
    left: 62,
  },
  wavesContainer: {
    width: "100%",
    height: 270,
    backgroundColor: "#59C7BA",
    position: "absolute",
    top: 0,
    elevation: 12,
  },
  name: {
    backgroundColor: "#ECF8F8",
    width: 280,
    height: 55,
    borderRadius: 15,
    top: 10,
    marginTop: 140,
  },
  password: {
    backgroundColor: "#ECF8F8",
    width: 280,
    height: 55,
    borderRadius: 15,
    top: 10,
    marginTop: 30,
  },
  email: {
    backgroundColor: "#ECF8F8",
    width: 280,
    height: 55,
    borderRadius: 15,
    top: 10,
    marginTop: 30,
  },
  RegisterBtn: {
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
