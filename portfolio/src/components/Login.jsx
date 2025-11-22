/* eslint-disable */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const styles = {
  wrapper: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 380,
    background: "white",
    padding: "35px 30px",
    borderRadius: 12,
    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: {
    margin: 0,
    fontSize: 26,
    fontWeight: 700,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#6b6b6b",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    marginBottom: 15,
    borderRadius: 8,
    border: "1px solid #d5d5d5",
    fontSize: 15,
    outline: "none",
  },
  error: {
    color: "red",
    marginBottom: 10,
    fontSize: 14,
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#000",
    color: "white",
    border: "none",
    borderRadius: 8,
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
  },
};

function Login() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Login successful") {
          // Save login state
          localStorage.setItem("token", "loggedIn");
          localStorage.setItem("username", username);

          // 🔥 Trigger MainApp rerender
          window.dispatchEvent(new Event("storage"));

          // Redirect
          history.push("/dashboard");
        } else {
          setError(data.message || "Invalid credentials");
        }
      })
      .catch(() => setError("Server error. Try again."));
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Login to continue</p>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            style={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
