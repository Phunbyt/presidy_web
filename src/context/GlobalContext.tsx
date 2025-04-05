import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { createContext, SetStateAction, useEffect, useState } from "react";
import { ReactNode } from "react";

const COLORS = {
  BLACK: "#101010",
  WHITE: "#f0f0f0",
  RED: "#abcde3",
};

// Define the user type for better type safety
type User = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  country: string;
  isVerified: boolean;
  createdAt: string;
};

const GlobalContext = createContext({
  darkTheme: true,
  theme: createTheme(),
  toggleTheme: () => {},
  handleUser: (_e: any) => {},
  handleToken: (_e: any) => {},
  handleTokenRoute: (_e: any) => {},
  logout: () => {},
  handleForgotPasswordToken: (_e: any) => {},
  user: {
    firstName: "",
    lastName: "",
    username: "",
    country: "",
    email: "",
    isVerified: false,
    createdAt: "",
  } as User,
  token: "",
  tokenRoute: "",
  forgotPasswordToken: "",
  forgotPasswordEmail: "",
});

const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [forgotPasswordToken, setForgotPasswordToken] = useState("");
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [isInitialized, setIsInitialized] = useState(false); // Track initialization

  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    username: "",
    country: "",
    email: "",
    isVerified: false,
    createdAt: "",
  });
  const [token, setToken] = useState("");
  const [tokenRoute, setTokenRoute] = useState("");

  // Initialize state from localStorage before first render
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedUser !== "undefined") {
      setUser(JSON.parse(storedUser));
    }
    if (storedToken && storedToken !== "undefined") {
      setToken(storedToken);
    }

    setIsInitialized(true); // Mark initialization as complete
  }, []);

  const handleUser = (user: SetStateAction<User>) => {
    const newUser = user;
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
  };

  const handleToken = (token: SetStateAction<string>) => {
    const newToken = token;
    localStorage.setItem("token", JSON.stringify(newToken));
    setToken(newToken);
  };

  const handleForgotPasswordToken = ({
    token,
    email,
  }: {
    token: string;
    email: string;
  }) => {
    setForgotPasswordToken(token);
    setForgotPasswordEmail(email);
  };
  const handleTokenRoute = (tokenRoute: SetStateAction<string>) => {
    setTokenRoute(tokenRoute);
  };

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
              color: darkTheme ? COLORS.WHITE : COLORS.BLACK,
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
              color: darkTheme ? COLORS.WHITE : COLORS.BLACK,
              outlineColor: darkTheme ? COLORS.WHITE : COLORS.BLACK,
              borderColor: darkTheme ? COLORS.WHITE : COLORS.BLACK,
            },
          },
        },
        MuiAppBar: {
          styleOverrides: {
            root: {
              background: darkTheme ? COLORS.BLACK : COLORS.WHITE,
            },
          },
        },
        MuiFormControlLabel: {
          styleOverrides: {
            root: {
              color: darkTheme ? COLORS.WHITE : COLORS.BLACK,
            },
          },
        },
      },
    })
  );

  const toggleTheme = () => setDarkTheme((darkTheme) => !darkTheme);

  const logout = () => {
    setUser({
      firstName: "",
      lastName: "",
      username: "",
      country: "",
      email: "",
      isVerified: false,
      createdAt: "",
    });
    setToken("");
    setTokenRoute("");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };
  // Don't render children until initialization is complete
  if (!isInitialized) {
    return null; // or a loading spinner
  }

  return (
    <GlobalContext.Provider
      value={{
        darkTheme,
        theme,
        toggleTheme,
        handleUser,
        handleToken,
        handleTokenRoute,
        user,
        token,
        tokenRoute,
        logout,
        handleForgotPasswordToken,
        forgotPasswordToken,
        forgotPasswordEmail,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalContextProvider };
