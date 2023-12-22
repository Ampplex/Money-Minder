import React, { useState, useEffect } from "react";
import LoginInfo_Context from "./LoginInfo_Context";

const LoginInfo_State = (props: any) => {
  const [token, setToken] = useState<string>("");

  async function setMyToken(token: string) {
    setToken(token);
  }

  return (
    <LoginInfo_Context.Provider value={{ token, setMyToken }}>
      {props.children}
    </LoginInfo_Context.Provider>
  );
};

export default LoginInfo_State;
