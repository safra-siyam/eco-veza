import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Define the context interface
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
  addSeller: (
    username: string,
    email: string,
    password: string,
    storeName: string,
    address: string,
    phone: string
  ) => Promise<void>;
  logout: () => Promise<void>;
}

// Create the context with default values
const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  login: async () => {},
  signup: async () => {},
  addSeller: async () => {}, 
  logout: async () => {},
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap your app
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated when the component mounts
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

  // Login function
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

  // Signup function for buyers
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

  // Add Seller function for the admin
  const addSeller = async (
    username: string,
    email: string,
    password: string,
    storeName: string,
    address: string,
    phone: string
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/sellers/add", 
        { username, email, password, storeName, address, phone },
        { withCredentials: true }
      );

      if (response.status === 201 || response.status === 200) {
        toast.success("Seller added successfully");
        navigate("/admin/sellers"); 
      }
    } catch (error) {
      console.error("Error adding seller:", error);
      toast.error("Failed to add seller. Please try again.");
    }
  };

  // Logout function
  const logout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/logout",
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

  // Provide the context values
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, signup, addSeller, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
