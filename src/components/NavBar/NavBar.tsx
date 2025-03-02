import {
  Stack,
  Link,
  Toolbar,
  Container,
  AppBar,
  Box,
  Drawer,
  FormGroup,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NavList from "./NavList";
import { useContext, useState } from "react";
import CustomButton from "../CustomButton/CustomButton";
import { presidyLogo } from "../../assets/images";
import { GlobalContext } from "../../context/GlobalContext";
import { MaterialUISwitch } from "./MuiSwitch";

const pages = [
  { name: "About", id: "/#about" },
  { name: "Subscriptions", id: "subscriptions" },
  { name: "Support", id: "support" },
];

const NavBar = () => {
  const { darkTheme, toggleTheme } = useContext(GlobalContext);

  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="static" // Ensure the AppBar is positioned correctly
      sx={{
        boxShadow: "none", // Remove elevation
        backgroundColor: darkTheme ? "#121212" : "#ffffff", // Dynamic background color based on theme
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: { xs: "0.5em", sm: "1em" }, // Responsive padding
          }}
        >
          {/* Logo */}
          <Link href={"/"}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src={presidyLogo}
                alt="Presidy Logo"
                sx={{
                  height: { xs: "40px", sm: "50px", md: "60px" }, // Responsive logo size
                  width: "auto",
                }}
              />
            </Box>
          </Link>

          {/* Mobile Menu Icon */}
          <IconButton
            onClick={toggleDrawer(true)}
            sx={{
              display: { xs: "flex", sm: "none" }, // Show only on small screens
              color: darkTheme ? "#ffffff" : "#000000", // Dynamic icon color based on theme
            }}
          >
            <MenuIcon sx={{ fontSize: "2rem" }} /> {/* Responsive icon size */}
          </IconButton>
          {/* Mobile Drawer */}
          <Drawer
            open={open}
            onClose={toggleDrawer(false)}
            anchor="right"
            sx={{
              display: { xs: "block", sm: "none" }, // Show only on small screens
              "& .MuiDrawer-paper": {
                width: { xs: "70%", sm: "300px" }, // Responsive drawer width
                backgroundColor: darkTheme ? "#121212" : "#ffffff", // Dynamic background color based on theme
              },
            }}
          >
            <Box
              sx={{
                marginLeft: "20px",
                marginTop: "30px",
              }}
            >
              <FormGroup>
                <FormControlLabel
                  control={
                    <MaterialUISwitch
                      sx={{ m: 1 }}
                      checked={darkTheme}
                      onChange={toggleTheme}
                    />
                  }
                  label={""}
                />
              </FormGroup>
            </Box>

            <NavList />
          </Drawer>
          {/* Desktop Navigation Links */}
          <Stack
            direction="row"
            gap={{ xs: 2, sm: 3, md: 4 }} // Responsive gap
            sx={{
              display: { xs: "none", sm: "flex" }, // Hide on small screens
              alignItems: "center",
            }}
          >
            {pages.map((page) => (
              <Link
                key={page.id}
                href={`${page.id}`} // Add href for navigation
                sx={{
                  textDecoration: "none",
                  color: darkTheme ? "#ffffff" : "#000000", // Dynamic text color based on theme
                  fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" }, // Responsive font size
                  "&:hover": {
                    color: darkTheme ? "#90caf9" : "#1976d2", // Hover effect
                  },
                }}
              >
                {page.name}
              </Link>
            ))}
          </Stack>
          {/* Desktop Login and Sign Up */}
          <Stack
            direction="row"
            gap={{ xs: 2, sm: 3, md: 4 }} // Responsive gap
            sx={{
              display: { xs: "none", sm: "flex" }, // Hide on small screens
              alignItems: "center",
            }}
          >
            <FormGroup>
              <FormControlLabel
                control={
                  <MaterialUISwitch
                    sx={{ m: 1 }}
                    checked={darkTheme}
                    onChange={toggleTheme}
                  />
                }
                label={""}
              />
            </FormGroup>

            <Link
              href="/login" // Add href for navigation
              sx={{
                color: darkTheme ? "#ffffff" : "#000000", // Dynamic text color based on theme
                textDecoration: "none",
                fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" }, // Responsive font size
                "&:hover": {
                  color: darkTheme ? "#90caf9" : "#1976d2", // Hover effect
                },
              }}
            >
              Login
            </Link>
            <CustomButton
              text="Sign Up"
              sx={{
                padding: { xs: "0.5em 1em", sm: "0.8em 1.5em" }, // Responsive padding
                fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" }, // Responsive font size
              }}
            />
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
