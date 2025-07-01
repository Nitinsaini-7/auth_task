import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [username, setUsername] = useState(() => localStorage.getItem("username") || null);

  // Axios instance inside context
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
  });

  api.interceptors.request.use((req) => {
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  });

  // Optional: Handle 401 globally (auto logout)
  api.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response?.status === 401) logout();
      return Promise.reject(err);
    }
  );

  const login = (newToken, newUsername) => {
    setToken(newToken);
    setUsername(newUsername);
    localStorage.setItem("token", newToken);
    localStorage.setItem("username", newUsername);
  };

  const logout = () => {
    setToken(null);
    setUsername(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ token, username, login, logout, api }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
