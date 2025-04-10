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
import Verify from "./pages/Verify/Verify";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import { ToastPopup } from "./components/Toast/Toast";
import Transactions from "./pages/Transactions/Transactions";
import TransactionsList from "./pages/Transactions/TransactionsList";
import ProfilePage from "./pages/Profile/Profile";
import ComingSoon from "./pages/ComingSoon/ComingSoon";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import Moderator from "./pages/Moderator/Moderator";
import ModeratorDashboard from "./pages/ModeratorDashboard/ModeratorDashboard";

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
          <Route path="/verify" Component={Verify} />
          <Route path="/profile" Component={ProfilePage} />
          <Route path="/moderator" Component={Moderator} />
          <Route path="/moderator-dashboard" Component={ModeratorDashboard} />
          <Route path="/transactions">
            <Route index element={<TransactionsList />} />
            <Route path="validate" element={<Transactions />} />
          </Route>

          <Route path="/forgot-password" Component={ForgotPassword} />
          <Route path="/change-password" Component={ChangePassword} />
          <Route path="/coming" Component={ComingSoon} />
          <Route path="*" Component={ComingSoon} />
        </Routes>

        <Footer />
      </BrowserRouter>
      <ToastPopup />

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
