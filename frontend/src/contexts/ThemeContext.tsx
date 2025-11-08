import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // Always default to light mode on first visit, then use saved preference
  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('themeMode');
    // Only use saved preference if it exists, otherwise default to light
    return (saved === 'dark' ? 'dark' : 'light') as ThemeMode;
  });

  // Apply theme to document root and ensure clean state
  // This runs on mount and whenever mode changes
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    
    // Always remove dark class first to ensure clean state
    root.classList.remove('dark');
    
    if (mode === 'dark') {
      root.classList.add('dark');
      // Let CSS handle dark mode background
      body.style.backgroundColor = '';
      body.style.color = '';
    } else {
      // Ensure all dark mode classes are removed when switching to light
      root.classList.remove('dark');
      // Reset body to default light mode
      body.style.backgroundColor = '#ffffff';
      body.style.color = '#000000';
    }
    
    // Save preference (only after initial mount to avoid overwriting on first load)
    // The initial state already comes from localStorage, so we save on changes
    if (localStorage.getItem('themeMode') !== null || mode !== 'light') {
      localStorage.setItem('themeMode', mode);
    }
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

