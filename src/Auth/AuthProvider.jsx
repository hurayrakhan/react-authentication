// context/AuthContext.jsx
import React, { createContext, useEffect, useState, useCallback } from "react";
import { decodeToken, getExpiryTime, isTokenExpired } from "../Utils/jwtUtils";
import LoadingSpinner from "../Components/Loading";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [tokens, setTokens] = useState(() => {
    const stored = localStorage.getItem("authTokens");
    return stored ? JSON.parse(stored) : null;
  });

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Save tokens to localStorage
  const saveTokens = (newTokens) => {
    localStorage.setItem("authTokens", JSON.stringify(newTokens));
    setTokens(newTokens);
  };

  const logout = () => {
    setTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    setLoading(false);
  };

  const refreshAccessToken = useCallback(async () => {
    try {
      const res = await fetch("https://dummyjson.com/auth/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          refreshToken: tokens?.refreshToken,
          expiresInMins: 30,
        }),
      });
      const data = await res.json();
      if (data?.accessToken) {
        const updatedTokens = {
          accessToken: data.accessToken,
          refreshToken: data.refreshToken || tokens.refreshToken,
        };
        saveTokens(updatedTokens);
      } else {
        logout();
      }
    } catch (err) {
      logout();
    }
  }, [tokens?.refreshToken]);

  const login = async (username, password) => {
    const res = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, expiresInMins: 30 }),
    });

    const data = await res.json();
    if (data?.accessToken) {
      const newTokens = {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      };
      saveTokens(newTokens);
      setUser(data);
    }
  };

  // Auto-refresh before token expires
  useEffect(() => {
    if (tokens?.accessToken) {
      const expiry = getExpiryTime(tokens.accessToken);
      const timeLeft = expiry - Date.now() - 10000; // 10s before expiry
      if (timeLeft > 0) {
        const timeout = setTimeout(() => {
          refreshAccessToken();
        }, timeLeft);
        return () => clearTimeout(timeout);
      } else {
        refreshAccessToken();
      }
    }
  }, [tokens, refreshAccessToken]);

  // Fetch current user on app load or token change
  useEffect(() => {
    const observe = async () => {
      if (tokens?.accessToken && !isTokenExpired(tokens.accessToken)) {
        const res = await fetch("https://dummyjson.com/auth/me", {
          headers: {
            Authorization: `Bearer ${tokens.accessToken}`,
          },
        });
        const data = await res.json();
        setUser(data);
      } else {
        logout();
      }
      setLoading(false);
    };
    observe();
  }, [tokens]);

  // Loading fallback
  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, tokens, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
