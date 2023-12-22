import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Easing, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import Splash from "./screens/Splash";
import Login from "./screens/Login";
import Register from "./screens/Register";
import FlashMessage from "react-native-flash-message";
import Home from "./screens/Home";
import Route from "./router/Route";
import Settings from "./screens/Settings";
import LoginInfo_State from "./context/LoginInfo/LoginInfo_State";
import Currency_State from "./context/LoginInfo/Currency_State";
import Graph from "./screens/Graph";

export default function App() {
  const config = {
    animation: "spring",
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

  const closeConfig = {
    animation: "timing",
    config: {
      duration: 300,
      easing: Easing.linear,
    },
  };

  const Stack = createStackNavigator();

  return (
    <>
      <LoginInfo_State>
        <Currency_State>
          <StatusBar style="auto" />
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerTitleAlign: "center",
                gestureEnabled: true,
                gestureDirection: "horizontal",
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                transitionSpec: {
                  open: config,
                  close: closeConfig,
                  headerMode: "float",
                },
              }}
              animation="fade"
            >
              <Stack.Screen
                name="Splash"
                component={Splash}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Login"
                component={Login}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Register"
                component={Register}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Route"
                component={Route}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Home"
                component={Home}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Settings"
                component={Settings}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Graph"
                component={Graph}
                options={{
                  headerShown: true,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
          <FlashMessage position={"bottom"} />
        </Currency_State>
      </LoginInfo_State>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
