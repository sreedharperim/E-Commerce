import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUserProfile();
    }
  }, [token]);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/auth/profile");
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user profile", error);
      logout();
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5001/api/auth/login", { email, password });
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
      axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
      console.log("Success", response);
      return true;
      
    } catch (error) {
      console.error("Login failed", error);
      throw new Error(error.response?.data?.error || "Login failed");
    }
  };

  const register = async (name, email, password) => {
    try {
      await axios.post("http://localhost:5001/api/auth/register", { name, email, password });
    } catch (error) {
      console.error("Registration failed", error);
      throw new Error(error.response?.data?.error || "Registration failed");
    }
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

