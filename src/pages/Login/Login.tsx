import { Box, Container, Stack, TextField, useTheme } from "@mui/material";
import CustomText from "../../components/CustomText/CustomText";
import { relationship } from "../../assets/svgs";
import CustomButton from "../../components/CustomButton/CustomButton";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";

const Login = () => {
  const theme = useTheme();

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
            src={relationship} // Add image URL here
            alt={"Login Illustration"}
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
            text={"Welcome back old friend!"}
            style={{
              fontWeight: "bold",
              fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" }, // Responsive font size
              color: theme.palette.text.primary, // Use theme color for text
              marginBottom: { xs: "16px", sm: "24px" }, // Responsive margin
            }}
          />

          {/* Subheading */}
          <CustomText
            text={"It's been a long while"}
            style={{
              color: theme.palette.text.secondary, // Use theme color for text
              fontSize: { xs: "0.875rem", sm: "1rem", md: "1.125rem" }, // Responsive font size
              marginBottom: { xs: "16px", sm: "24px", md: "32px" }, // Responsive margin
            }}
          />

          {/* Email Input Field */}
          <TextField
            id="email"
            label="Enter your email here"
            fullWidth
            sx={{
              marginBottom: { xs: "16px", sm: "24px", md: "32px" }, // Responsive margin
            }}
          />

          {/* Password Input Field */}
          <TextField
            id="password"
            label="Enter your password here"
            type="password"
            fullWidth
            sx={{
              marginBottom: { xs: "16px", sm: "24px", md: "32px" }, // Responsive margin
            }}
          />

          {/* Log In Button */}
          <Box
            sx={{
              width: "100%",
              maxWidth: { xs: "300px", sm: "250px", md: "300px" }, // Responsive button width
              margin: "0 auto", // Center the button
              marginBottom: { xs: "16px", sm: "24px", md: "32px" }, // Responsive margin
            }}
          >
            <CustomButton
              text={"Log in"}
              sx={{
                width: "100%",
                padding: { xs: "8px 16px", sm: "12px 24px" }, // Responsive padding
                fontSize: { xs: "0.875rem", sm: "1rem" }, // Responsive font size
              }}
            />
          </Box>

          {/* Social Sign-In Buttons */}
          <Stack
            direction={{ xs: "column", sm: "row" }} // Stack vertically on small screens, horizontally on larger screens
            spacing={{ xs: 2, sm: 3 }} // Responsive spacing
            justifyContent="center" // Center buttons
            alignItems="center" // Align buttons vertically
          >
            <CustomButton
              text={"Sign in with Google"}
              sx={{
                width: { xs: "100%", sm: "auto" }, // Full width on small screens, auto on larger screens
                padding: { xs: "8px 16px", sm: "12px 24px" }, // Responsive padding
                fontSize: { xs: "0.875rem", sm: "1rem" }, // Responsive font size
              }}
              startIcon={<GoogleIcon />}
            />
            <CustomButton
              text={"Sign in with Apple"}
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

export default Login;
