"use client";

import React, { useState, SyntheticEvent } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Image from "next/image";
import mypic from "../assets/register.png";

const RegistrationForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      console.log({ username, email, password });
      const response = await fetch(
        "http://localhost:1337/api/auth/local/register",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        }
      );
      const data = await response.json();
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        border: "2px solid #000",
        margin: "30px",
        marginRight:"20px"
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          margin: "80px",
        }}
      >
        <h1> Welcom to CSPath</h1>
        <form onSubmit={handleRegister}>
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
          />

          <Button type="submit" variant="contained" color="inherit" sx={{backgroundColor:"#099197"}}>
            Register
          </Button>
        </form>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: "#FAD05A",
        }}
      >
        <Image
          style={{
            backgroundColor: "#FAD05A",
            width: "585px",
            margin: "20px",
            height: "585px",
          
          }}
          src={mypic}
          alt="Register Image"
          width={800} // Set the desired width
          height={800} // Set the desired height
        />
      </Box>
    </Box>
  );
};

export default RegistrationForm;
