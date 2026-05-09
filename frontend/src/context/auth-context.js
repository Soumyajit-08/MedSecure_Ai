"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authApi } from "@/services/api";

const AuthContext = createContext(null);
const TOKEN_KEY = "medsecure_access_token";
const USER_KEY = "medsecure_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    const { data } = await authApi.login({ email, password });
    localStorage.setItem(TOKEN_KEY, data.data.accessToken);
    localStorage.setItem(USER_KEY, JSON.stringify(data.data.user));
    setUser(data.data.user);
    return data.data.user;
  };

  const signup = async (payload) => {
    const { data } = await authApi.signup(payload);
    // Signup only returns { email } — tokens are issued after email verification
    return data;
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
  };

  useEffect(() => {
    const hydrate = async () => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token || token === "null" || token === "undefined") {
        localStorage.removeItem(TOKEN_KEY);
        setLoading(false);
        return;
      }
      const cachedUser = localStorage.getItem(USER_KEY);
      if (cachedUser) {
        try {
          setUser(JSON.parse(cachedUser));
        } catch {
          localStorage.removeItem(USER_KEY);
        }
      }
      try {
        const { data } = await authApi.me();
        setUser(data.data);
        localStorage.setItem(USER_KEY, JSON.stringify(data.data));
      } catch (err) {
        const status = err?.response?.status;
        if (status === 401 || status === 403) {
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem(USER_KEY);
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };
    hydrate();
  }, []);

  const value = useMemo(
    () => ({ user, loading, login, signup, logout }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuthContext must be used inside AuthProvider");
  return context;
};
