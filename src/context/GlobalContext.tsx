import { ThemeProvider, createTheme, responsiveFontSizes } from "@mui/material/styles";
import { createContext, useState } from "react";

const GlobalContext = createContext({
  darkTheme: true,
  theme: createTheme(),
  toggleTheme: () => {},
});

const COLORS = {
  BLACK: "#101010",
  WHITE: "#f0f0f0",
  RED: "#abcde3",
};

const GlobalContextProvider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(true);

  const theme = responsiveFontSizes(
    createTheme({
      palette: {
        mode: darkTheme ? "dark" : "light",
        background: {
          paper: darkTheme ? COLORS.BLACK : COLORS.WHITE,
        },
        primary: {
          main: darkTheme ? COLORS.WHITE : COLORS.BLACK,
        },
      },

      components: {
        MuiLink: {
          styleOverrides: {
            root: {
              color: darkTheme ? COLORS.WHITE : COLORS.BLACK, // Example colors
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              color: darkTheme ? COLORS.WHITE : COLORS.BLACK, // Example colors
              outlineColor: darkTheme ? COLORS.WHITE : COLORS.BLACK,
              borderColor: darkTheme ? COLORS.WHITE : COLORS.BLACK,
            },
          },
        },
        MuiAppBar: {
          styleOverrides: {
            root: {
              background: darkTheme ? COLORS.BLACK : COLORS.WHITE, // Example colors
            },
          },
        },

        MuiFormControlLabel: {
          styleOverrides: {
            root: {
              color: darkTheme ? COLORS.WHITE : COLORS.BLACK, // Example colors
            },
          },
        },
      },
    })
  );

  const toggleTheme = () => setDarkTheme((darkTheme) => !darkTheme);

  return (
    <GlobalContext.Provider
      value={{
        darkTheme,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalContextProvider };
