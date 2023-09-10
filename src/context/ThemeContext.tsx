import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getCookie, setCookie } from "cookies-next";

type ThemeContextProps = {
  dark: boolean;
  changeTheme: () => void;
};

const ThemeContext = createContext<ThemeContextProps>({
  dark: true,
  changeTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [dark, setDark] = useState(true);

  const changeTheme = () => {
    setDark(!dark);
    setCookie("dark", !dark);
  };
  const value = { dark, changeTheme };

  useEffect(() => {
    setDark((getCookie("dark") == "true" ? true : false) ?? true);
    // setCookie('dark', dark);
  }, [dark]);

  return (
    <>
      <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    </>
  );
}
