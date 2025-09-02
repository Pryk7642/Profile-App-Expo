import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

const USER_STORAGE_KEY = "@users_v1";
const SESSION_STORAGE_KEY = "@session_v1";

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    authenticated: false,
    loading: true,
  });

  useEffect(() => {
    const loadSession = async () => {
      try {
        const token = await AsyncStorage.getItem(SESSION_STORAGE_KEY);
        if (token) {
          setAuthState({ token: token, authenticated: true, loading: false });
        } else {
          setAuthState({ token: null, authenticated: false, loading: false });
        }
      } catch (e) {
        console.error("Failed to load session:", e);
        setAuthState({ token: null, authenticated: false, loading: false });
      }
    };

    loadSession();
  }, []);

  const register = async (username, password) => {
    try {
      const rawUsers = await AsyncStorage.getItem(USER_STORAGE_KEY);
      const users = rawUsers ? JSON.parse(rawUsers) : [];

      if (users.find((u) => u.username === username)) {
        alert("Username already exists.");
        return;
      }

      users.push({ username, password });
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
      
      await login(username, password);
    } catch (e) {
      console.error("Failed to register:", e);
    }
  };

  const login = async (username, password) => {
    try {
      const rawUsers = await AsyncStorage.getItem(USER_STORAGE_KEY);
      const users = rawUsers ? JSON.parse(rawUsers) : [];
      
      const user = users.find((u) => u.username === username && u.password === password);

      if (user) {
        const sessionToken = `session-token-${Date.now()}`;
        await AsyncStorage.setItem(SESSION_STORAGE_KEY, sessionToken);
        setAuthState({ token: sessionToken, authenticated: true, loading: false });
        router.replace('/books'); 
      } else {
        alert("Invalid username or password.");
      }
    } catch (e) {
      console.error("Failed to login:", e);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(SESSION_STORAGE_KEY);
      setAuthState({ token: null, authenticated: false, loading: false });

    } catch (e)
    {
      console.error("Failed to logout:", e);
    }
  };

  const value = useMemo(
    () => ({
      ...authState,
      onRegister: register,
      onLogin: login,
      onLogout: logout,
    }),
    [authState]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};