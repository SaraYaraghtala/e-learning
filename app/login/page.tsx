"use client";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { type } from "os";
import React, { useState, useEffect } from "react";
import scss from "./login.module.scss";

type UserData = {
  authToken: string;
  userName: string;
  isLoggedIn: boolean;
};

const LoginPage = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [userData, setUserData] = useState<UserData | null>(null);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
        console.log({identifier, password})
      const response = await fetch("http://localhost:1337/api/auth/local", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ identifier, password }),
      });
      const data = await response.json();
      if (response.ok) {
        const userData = {
          authToken: data.jwt,
          userName: data.user.username,
          isLoggedIn: data.user.confirmed,
        };
        setUserData(userData);
        console.log(userData);
      } else {
        setLoginError(data.message[0].message[0].message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("an error occurred during login .please try again ");
    }
  };
  const handleSignOut = () => {
    setUserData(null);
    console.log(userData);
  };

  return (
    <div className={scss.login}>
      <Typography>Login</Typography>
      {!userData?.isLoggedIn && (
        <form onSubmit={handleLogin}>
          <TextField
            label="Username or Email"
            variant="outlined"
            onChange={(e) => setIdentifier(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          {loginError && <Typography style={{ color: "red" }}>{loginError}</Typography>}
          <Button
            type="submit"
            variant="contained"
            color="success"
            onClick={handleLogin}
            style={{ marginRight: "0.5rem" }}
          >
            Login
          </Button>
          <Button variant="contained" color={"info"} href={"/register"}>
            Register
          </Button>
        </form>
      )}
      {userData?.isLoggedIn && (
        <div>
          <p>logged in as:{userData.userName}</p>
          <p>Is logged in :{userData.isLoggedIn ? "Yes" : "No"}</p>
          <Button variant="contained" color={"error"} onClick={handleSignOut}>
            sign out
          </Button>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
