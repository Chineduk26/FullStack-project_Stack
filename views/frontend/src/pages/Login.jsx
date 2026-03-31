import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

export default function Login() {
  const { setUser } = useAuth();
  const nav = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); 

    try {
      const res = await axios.post("http://localhost:3000/api/users/login", {
        username,
        password,
      });

      console.log("Login response:", res.data);

      const { token, user } = res.data;

      if (!user || !user.role) {
        setError("Invalid login response");
        return;
      }

      // ✅ Save token + user in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);

      // ✅ Navigate based on role
      if (user.role === "admin") nav("/admin");
      else if (user.role === "doctor") nav("/doctor");
      else if (user.role === "patient") nav("/chat"); // go to chat
      else nav("/HomePage"); // fallback
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid credentials or server error");
    }
  };

  return (
    <div className="auth-modal">
      <div className="auth-toggle">
        <button className="active">Sign in</button>
        <button>Sign up</button>
      </div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="submit">Login</button>
      </form>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      <div className="auth-footer">
        Don’t have an account? <a href="/signup">Create one</a>
      </div>
    </div>
  );
}
