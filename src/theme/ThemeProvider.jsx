import { createContext, useContext } from "react";
import { useColorScheme } from "react-native";
import { Colors } from "./colors";

const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  return (
    <ThemeContext.Provider value={{ colors: theme, colorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
