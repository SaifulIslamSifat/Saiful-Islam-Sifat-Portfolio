import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const ThemeContext = createContext({ theme: 'dark', toggleTheme: () => {} });

const safeGet = () => {
  try {
    return localStorage.getItem('sifat-theme');
  } catch {
    return null;
  }
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => safeGet() || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('sifat-theme', theme);
    } catch {
      /* storage unavailable: ignore */
    }
  }, [theme]);

  const toggleTheme = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), []);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
