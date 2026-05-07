import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  async function handleLogin() {
    if (!username || !password) {
      setError("Please enter username and password");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        (import.meta.env.VITE_API_URL || "http://localhost:3001/api") +
          "/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Login failed");
        return;
      }
      login(data.token, data.username);
    } catch (err) {
      setError("Could not connect to server");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleLogin();
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "#f5f5f3",
      }}
    >
      <div
        style={{
          background: "#fff",
          border: "1px solid #e8e8e6",
          borderRadius: "12px",
          padding: "2.5rem",
          width: "360px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{ fontSize: "20px", fontWeight: 500, marginBottom: "0.25rem" }}
        >
          Telecom CRM
        </h1>
        <p style={{ fontSize: "13px", color: "#888", marginBottom: "2rem" }}>
          Sign in to your account
        </p>

        {error && (
          <div
            style={{
              background: "#fff0f0",
              border: "1px solid #f0c0c0",
              borderRadius: "7px",
              padding: "10px 12px",
              fontSize: "13px",
              color: "#A32D2D",
              marginBottom: "1rem",
            }}
          >
            {error}
          </div>
        )}

        <div className="form-group">
          <label>Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="admin"
            autoFocus
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="••••••••"
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={handleLogin}
          disabled={loading}
          style={{ width: "100%", padding: "10px", marginTop: "0.5rem" }}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </div>
    </div>
  );
}
