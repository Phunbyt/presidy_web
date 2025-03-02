import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Button } from "@mui/material";
import { useContext } from "react";
import NavBar from "./components/NavBar/NavBar";
import { GlobalContext } from "./context/GlobalContext";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import { BrowserRouter, Route, Routes } from "react-router";
import Subscriptions from "./pages/Subscriptions/Subscriptions";
import Support from "./pages/Support/Support";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";


export default function App() {
  const { darkTheme, theme, toggleTheme } = useContext(GlobalContext);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/subscriptions" Component={Subscriptions} />
          <Route path="/support" Component={Support} />
          <Route path="/login" Component={Login} />
          <Route path="/signup" Component={SignUp} />
        </Routes>

        <Footer />
      </BrowserRouter>

      <Box
        sx={{
          position: "sticky",
          bottom: 0,
        }}
      >
        <main>This app is using the {darkTheme ? "dark" : "light"} mode</main>
        <Button sx={{ background: "orange" }} onClick={toggleTheme}>
          Toggle theme
        </Button>
      </Box>
    </ThemeProvider>
  );
}
