import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2"; // Keep the Grid import as is
import CustomText from "../../components/CustomText/CustomText";
import { welcome } from "../../assets/svgs";
import CustomButton from "../../components/CustomButton/CustomButton";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import countryList from "react-select-country-list";
import { SetStateAction, useContext, useMemo, useState } from "react";

import { googleSignUp, signup } from "../../api/lib/auth";
import { toast } from "react-toastify";
import validator from "validator";
import { GlobalContext } from "../../context/GlobalContext";
import { useNavigate } from "react-router";
import { useGoogleLogin } from "@react-oauth/google";
import CustomInputField from "../../components/CustomInputField/CustomInputField";

const SignUp = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [countryValue, setCountryValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);
  const { handleUser, handleToken, handleTokenRoute } =
    useContext(GlobalContext);

  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleSignUpData = (key: string, value: string) => {
    setSignUpData((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleSignUp = async () => {
    setIsLoading(true);
    if (
      !signUpData.email ||
      !signUpData.password ||
      !signUpData.firstName ||
      !signUpData.lastName ||
      !signUpData.username ||
      !countryValue
    ) {
      toast.error("Please enter all fields, they're compulsory!");
      setIsLoading(false);

      return;
    }

    if (!validator.isEmail(signUpData.email)) {
      toast.error("Please enter a valid email");
      setIsLoading(false);

      return;
    }

    if (signUpData.password !== signUpData.confirmPassword) {
      toast.error("Password mismatch");
      setIsLoading(false);

      return;
    }

    const user = await signup({ ...signUpData, country: countryValue });

    handleUser(user.data.newUser);
    handleToken(user.data.accessToken);
    handleTokenRoute("signup");
    setIsLoading(false);

    navigate("/verify");
  };

  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setCountryValue(event.target.value);
  };

  const googleResponseMessage = async (response: any) => {
    const { access_token } = response;

    const data = await googleSignUp(access_token);
    if (data.error) {
      return;
    }

    handleUser(data.data.newUser);
    handleToken(data.data.accessToken);
    setIsLoading(false);
    navigate("/subscriptions");
  };

  const signUp = useGoogleLogin({
    onSuccess: (codeResponse) => googleResponseMessage(codeResponse),
    onError: () => toast.info("Login Failed:"),
  });

  const comingSoon = () => {
    toast.info("Coming Soon!... wanna try google?");
    return;
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
          <Grid container spacing={2}>
            {" "}
            {/* Use Grid for paired inputs */}
            {/* First Name */}
            <Grid size={6}>
              <CustomInputField
                id="firstName"
                label="First Name"
                type="text"
                fullWidth
                value={signUpData.firstName}
                onChange={(e) => handleSignUpData(e.target.id, e.target.value)}
              />
            </Grid>
            {/* Last Name */}
            <Grid size={6}>
              <CustomInputField
                id="lastName"
                label="Last Name"
                type="text"
                fullWidth
                value={signUpData.lastName}
                onChange={(e) => handleSignUpData(e.target.id, e.target.value)}
              />
            </Grid>
            {/* Username */}
            <Grid size={6}>
              <CustomInputField
                id="username"
                label="Username"
                type="text"
                fullWidth
                value={signUpData.username}
                onChange={(e) => handleSignUpData(e.target.id, e.target.value)}
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
              <CustomInputField
                id="email"
                label="Email"
                type="email"
                fullWidth
                value={signUpData.email}
                onChange={(e) => handleSignUpData(e.target.id, e.target.value)}
              />
            </Grid>
            {/* Password */}
            <Grid size={6}>
              <CustomInputField
                id="password"
                label="Password"
                type="password"
                fullWidth
                value={signUpData.password}
                onChange={(e) => handleSignUpData(e.target.id, e.target.value)}
              />
            </Grid>
            {/* Confirm Password */}
            <Grid size={6}>
              <CustomInputField
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                fullWidth
                value={signUpData.confirmPassword}
                onChange={(e) => handleSignUpData(e.target.id, e.target.value)}
              />
            </Grid>
          </Grid>

          {/* Sign Up Button */}
          <Box
            sx={{
              width: "100%",
              cursor: "pointer",
              maxWidth: { xs: "300px", sm: "250px", md: "300px" }, // Responsive button width
              margin: "0 auto", // Center the button
              marginTop: { xs: "16px", sm: "24px", md: "32px" }, // Responsive margin
            }}
            onClick={handleSignUp}
          >
            {/* <Link to={"/verify"}> */}
            <CustomButton
              text={"Sign Up"}
              sx={{
                width: "100%",
                padding: { xs: "8px 16px", sm: "12px 24px" }, // Responsive padding
                fontSize: { xs: "0.875rem", sm: "1rem" }, // Responsive font size
              }}
              isLoading={isLoading}
            />
            {/* </Link> */}
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
              onClick={signUp}
              startIcon={<GoogleIcon />}
            />
            <CustomButton
              text={"Sign up with Apple"}
              sx={{
                width: { xs: "100%", sm: "auto" }, // Full width on small screens, auto on larger screens
                padding: { xs: "8px 16px", sm: "12px 24px" }, // Responsive padding
                fontSize: { xs: "0.875rem", sm: "1rem" }, // Responsive font size
              }}
              onClick={comingSoon}
              startIcon={<AppleIcon />}
            />
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default SignUp;
