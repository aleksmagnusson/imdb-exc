import React, { useEffect, useState } from "react";
import axios from "axios";
import { redirect } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [error, setError] = useState(" ");
  const [token, setToken] = useState(" ");

  const login = async () => {
    try {
      const response = await axios.post("http://localhost:8080/auth", {
        email: email,
        password: password,
      });

      return response.data.token;
    } catch (axiosError) {
      const status = axiosError.response.data.status;
      const message = axiosError.response.data.status;

      if (status === "error") {
        setError(message);
      }
    }
  };

  const handleSubmit = async () => {
    const token = await login();
    setToken(token);
    // Navigera till Home
  };
  if (token) {
    return redirect("home");
  }
  return (
    <div>
      <h1>Login with your account</h1>
      <form>
        <input
          text="Email"
          type="email"
          placeholder="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          text="password"
          type="password"
          placeholder="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button onClick={handleSubmit}>Login</button>
      </form>
    </div>
  );
}

export default Login;

/*
const axios = require("axios");

let token;

async function login(email, password) {
    const response = await axios.post("http://localhost:8080/auth", {
        email: email,
        password: password,
    });

    token = response.data.token;
}

async function getUserData(token) {
    const response = await axios.get("http://localhost:8080/me", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    console.log(response.data);
}

async function doEverything() {
    await login("alice@example.com", "alice123");
    await getUserData(token);
}

doEverything();

function handleSubmit(event) {
    event.preventDefault();
}
*/

/**
 * Inloggningar:
 * bob@example.com:bob123
 * alice@example.com:alice123
 * eve@example.com:eve123
 */
