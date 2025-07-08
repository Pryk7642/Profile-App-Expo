import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const theme = {
    isDarkMode,
    toggleTheme,
      colors: {
        background: isDarkMode ? "#444444" : "#ffffff",
        surface: isDarkMode ? "#1e1e1e" : "#f5f5f5",
        primary: isDarkMode ? "#90caf9" : "#1976d2",
        text: isDarkMode ? "#ffffff" : "#000000",
        textSecondary: isDarkMode ? "#e1f5fe" : "#000000",
        border: isDarkMode ? "#333333" : "#e0e0e0",
        buttext: isDarkMode ? "#000000" : "#ffffff",
        profileBorder: isDarkMode ? "#ffa726" : "#1a237e",
      },
};

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
