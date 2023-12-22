import React, { useState, useEffect } from "react";
import LoginInfo_Context from "./LoginInfo_Context";
import { getItemAsync } from "expo-secure-store";
import { decode as atob } from "base-64";

const LoginInfo_State = (props) => {
  const [token, setToken] = useState("");

  async function setMyToken(token) {
    setToken(token);
  }

  return (
    <LoginInfo_Context.Provider value={{ token, setMyToken }}>
      {props.children}
    </LoginInfo_Context.Provider>
  );
};

export default LoginInfo_State;
