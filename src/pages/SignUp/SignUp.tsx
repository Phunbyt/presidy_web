import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2"; // Keep the Grid import as is
import CustomText from "../../components/CustomText/CustomText";
import {  welcome } from "../../assets/svgs";
import CustomButton from "../../components/CustomButton/CustomButton";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import countryList from "react-select-country-list";
import { SetStateAction, useMemo, useState } from "react";
import { Link } from "react-router";

const SignUp = () => {
  const theme = useTheme();
  const [countryValue, setCountryValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setCountryValue(event.target.value);
  };

  return (
    <Container
      sx={{
        padding: { xs: "16px", sm: "24px", md: "32px" }, // Responsive padding
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }} // Stack vertically on small screens, horizontally on larger screens
        spacing={{ xs: 3, sm: 4, md: 6 }} // Responsive spacing
        alignItems="center" // Center align items
      >
        {/* Image Section */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={welcome} // Add image URL here
            alt={"Sign Up Illustration"}
            sx={{
              width: "100%",
              maxWidth: { xs: "300px", sm: "400px", md: "500px" }, // Responsive image size
              height: "auto",
            }}
          />
        </Box>

        {/* Text and Form Section */}
        <Box
          sx={{
            flex: 1,
            width: "100%",
            textAlign: { xs: "center", md: "left" }, // Center text on small screens
          }}
        >
          {/* Heading */}
          <CustomText
            text={"Hello friend!"}
            style={{
              fontWeight: "bold",
              fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" }, // Responsive font size
              color: theme.palette.text.primary, // Use theme color for text
              marginBottom: { xs: "16px", sm: "24px" }, // Responsive margin
            }}
          />

          {/* Subheading */}
          <CustomText
            text={"Welcome to a world of limitless possibilities"}
            style={{
              color: theme.palette.text.secondary, // Use theme color for text
              fontSize: { xs: "0.875rem", sm: "1rem", md: "1.125rem" }, // Responsive font size
              marginBottom: { xs: "16px", sm: "24px", md: "32px" }, // Responsive margin
            }}
          />

          {/* Form Fields */}
          <Grid container spacing={2}> {/* Use Grid for paired inputs */}
            {/* First Name */}
            <Grid size={6}>
              <TextField
                id="firstName"
                label="First Name"
                fullWidth
              />
            </Grid>

            {/* Last Name */}
            <Grid size={6}>
              <TextField
                id="lastName"
                label="Last Name"
                fullWidth
              />
            </Grid>

            {/* Username */}
            <Grid size={6}>
              <TextField
                id="username"
                label="Username"
                fullWidth
              />
            </Grid>

            {/* Email */}
            <Grid size={6}>
            
                          
<FormControl fullWidth>
                <InputLabel id="country-label">Select Country</InputLabel>
                <Select
                  labelId="country-label"
                  value={countryValue}
                  label="Select Country"
                  onChange={handleChange}
                >
                  {options.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Country Select */}
            <Grid size={12}>
               <TextField
                id="email"
                label="Email"
                fullWidth
                          />
            </Grid>

            {/* Password */}
            <Grid size={6}>
              <TextField
                id="password"
                label="Password"
                type="password"
                fullWidth
              />
            </Grid>

            {/* Confirm Password */}
            <Grid size={6}>
              <TextField
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                fullWidth
              />
            </Grid>
          </Grid>

          {/* Sign Up Button */}
          <Box
            sx={{
              width: "100%",
              maxWidth: { xs: "300px", sm: "250px", md: "300px" }, // Responsive button width
              margin: "0 auto", // Center the button
              marginTop: { xs: "16px", sm: "24px", md: "32px" }, // Responsive margin
            }}
          >
                      <Link to={"/verify"}>
                      
                        <CustomButton
              text={"Sign Up"}
              sx={{
                width: "100%",
                padding: { xs: "8px 16px", sm: "12px 24px" }, // Responsive padding
                fontSize: { xs: "0.875rem", sm: "1rem" }, // Responsive font size
              }}
            /></Link>
          </Box>

          {/* Social Sign-Up Buttons */}
          <Stack
            direction={{ xs: "column", sm: "row" }} // Stack vertically on small screens, horizontally on larger screens
            spacing={{ xs: 2, sm: 3 }} // Responsive spacing
            justifyContent="center" // Center buttons
            alignItems="center" // Align buttons vertically
            sx={{ marginTop: { xs: "16px", sm: "24px", md: "32px" } }} // Responsive margin
          >
            <CustomButton
              text={"Sign up with Google"}
              sx={{
                width: { xs: "100%", sm: "auto" }, // Full width on small screens, auto on larger screens
                padding: { xs: "8px 16px", sm: "12px 24px" }, // Responsive padding
                fontSize: { xs: "0.875rem", sm: "1rem" }, // Responsive font size
              }}
              startIcon={<GoogleIcon />}
            />
            <CustomButton
              text={"Sign up with Apple"}
              sx={{
                width: { xs: "100%", sm: "auto" }, // Full width on small screens, auto on larger screens
                padding: { xs: "8px 16px", sm: "12px 24px" }, // Responsive padding
                fontSize: { xs: "0.875rem", sm: "1rem" }, // Responsive font size
              }}
              startIcon={<AppleIcon />}
            />
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default SignUp;