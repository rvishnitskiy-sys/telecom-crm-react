import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("crm_token"));
  const [username, setUsername] = useState(
    localStorage.getItem("crm_username"),
  );

  function login(token, username) {
    localStorage.setItem("crm_token", token);
    localStorage.setItem("crm_username", username);
    setToken(token);
    setUsername(username);
  }

  function logout() {
    localStorage.removeItem("crm_token");
    localStorage.removeItem("crm_username");
    setToken(null);
    setUsername(null);
  }

  return (
    <AuthContext.Provider value={{ token, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
