import React, { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    userId: null,
    username: null,
    role: null,
    token: null,
  });

  const login = (token) => {
    try {
      const decoded = jwtDecode(token);
      setAuthState({
        userId: decoded.ID,
        username: decoded.Username,
        role: decoded.Role,
        token: token,
      });
      localStorage.setItem("authToken", token);
    } catch (error) {
      console.error("Invalid token", error);
    }
  };
  const logout = () => {
    setAuthState({
      userId: null,
      username: null,
      role: null,
      token: null,
    });
    localStorage.removeItem("authToken");
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      login(token); // Log in with the saved token
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
