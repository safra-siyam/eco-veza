// AuthContext.tsx

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    username: string,
    email: string,
    password: string,
    address: string,
    phone: string
  ) => Promise<void>;
  logout: () => Promise<void>; // Added logout to the interface
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  login: async () => {},
  signup: async () => {},
  logout: async () => {}, // Provide a default empty function
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for the existence of the JWT cookie when the component mounts
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/auth/check", {
          withCredentials: true,
        });
        if (response.data.authenticated) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/login",
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Sign in successful");
        setIsAuthenticated(true);
        navigate("/products");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const signup = async (
    username: string,
    email: string,
    password: string,
    address: string,
    phone: string
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users",
        { username, email, password, address, phone },
        { withCredentials: true }
      );

      if (response.status === 201 || response.status === 200) {
        toast.success("Sign up successful");
        setIsAuthenticated(true);
        navigate("/products");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error("Sign up failed. Please try again.");
    }
  };

  const logout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/logout", // Ensure this endpoint exists on your backend
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Logged out successfully");
        setIsAuthenticated(false);
        navigate("/signin");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
