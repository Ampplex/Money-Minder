import { StyleSheet, Text, View, Image } from "react-native";
import React, { useContext } from "react";
import LoginInfo_Context from "../context/LoginInfo/LoginInfo_Context";

const Profile = () => {
  const { token } = useContext(LoginInfo_Context);

  return (
    <View style={styles.container}>
      <View style={styles.card}></View>
      <View style={styles.dp}>
        <Image
          style={{
            width: 80,
            height: 80,
            alignSelf: "center",
            left: 5,
          }}
          source={require("../assets/user2.png")}
        />
      </View>
      <Text
        style={{
          position: "absolute",
          fontFamily: "sans-serif-medium",
          fontSize: 26,
          fontWeight: "bold",
          top: 220,
          color: "black",
        }}
      >
        {token.name}
      </Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  dp: {
    width: 100,
    height: 100,
    backgroundColor: "#fafafa",
    elevation: 12,
    borderRadius: 100,
    position: "absolute",
    top: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    width: "100%",
    height: 300,
    position: "absolute",
    top: 0,
    borderRadius: 50,
    elevation: 12,
  },
});
