"use client";

import { createContext, useContext, useMemo, useSyncExternalStore } from "react";

const ThemeContext = createContext(null);
const THEME_STORAGE_KEY = "tema-sinatex-glasses";
const LEGACY_THEME_STORAGE_KEY = "signa-theme";

function readStoredTheme() {
  if (typeof window === "undefined") {
    return "dark";
  }

  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === "claro" || savedTheme === "oscuro") {
    return savedTheme === "claro" ? "light" : "dark";
  }

  return localStorage.getItem(LEGACY_THEME_STORAGE_KEY) === "light" ? "light" : "dark";
}

function subscribeToThemeChanges(callback) {
  window.addEventListener("storage", callback);
  window.addEventListener("signa-theme-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("signa-theme-change", callback);
  };
}

function getServerTheme() {
  return "dark";
}

export function ThemeProvider({ children }) {
  const theme = useSyncExternalStore(subscribeToThemeChanges, readStoredTheme, getServerTheme);

  const changeTheme = (nextTheme) => {
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme === "light" ? "claro" : "oscuro");
    localStorage.setItem(LEGACY_THEME_STORAGE_KEY, nextTheme);
    window.dispatchEvent(new Event("signa-theme-change"));
  };

  const value = useMemo(
    () => ({ theme, setTheme: changeTheme, toggleTheme: () => changeTheme(theme === "dark" ? "light" : "dark") }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={value}>
      <div className="theme-shell" data-theme={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme debe utilizarse dentro de ThemeProvider.");
  }
  return context;
}
