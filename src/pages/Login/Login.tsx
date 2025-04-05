import { Box, Container, Stack, useTheme } from "@mui/material";
import CustomText from "../../components/CustomText/CustomText";
import { relationship } from "../../assets/svgs";
import CustomButton from "../../components/CustomButton/CustomButton";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import { Link } from "react-router";
import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { toast } from "react-toastify";
import { googleSignIn, sendExistingUserOtp, signin } from "../../api/lib/auth";
import { useNavigate } from "react-router";
import { useGoogleLogin } from "@react-oauth/google";
import CustomInputField from "../../components/CustomInputField/CustomInputField";

const COLORS = {
  BLACK: "#101010",
  WHITE: "#f0f0f0",
  RED: "#abcde3",
};

const Login = () => {
  const theme = useTheme();
  const { darkTheme, handleUser, handleToken, handleTokenRoute } =
    useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const handleLoginData = (key: string, value: string) => {
    setLoginData((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleLogin = async () => {
    setIsLoading(true);

    if (!loginData.email || !loginData.password) {
      toast.error("Please enter your email and password");
      setIsLoading(false);

      return;
    }

    const { data } = await signin(loginData);

    handleUser(data.existingUser);
    handleToken(data.accessToken);
    handleTokenRoute("signup");
    setIsLoading(false);

    if (!data.existingUser.isVerified) {
      toast.error("Please verify your email");

      await sendExistingUserOtp(
        { email: data.existingUser.email },
        data.accessToken
      );

      navigate("/verify");
      setIsLoading(false);

      return;
    }

    setIsLoading(false);
    navigate("/subscriptions");
  };

  const googleResponseMessage = async (response: any) => {
    const { access_token } = response;

    const { data } = await googleSignIn(access_token);

    if (data.error) {
      return;
    }

    handleUser(data.existingUser);
    handleToken(data.accessToken);
    setIsLoading(false);
    navigate("/subscriptions");
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => googleResponseMessage(codeResponse),
    onError: () => toast.error("Login Failed:"),
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
          <CustomInputField
            id="email"
            label="Enter your email here"
            type={"email"}
            fullWidth
            sx={{
              marginBottom: { xs: "16px", sm: "24px", md: "32px" }, // Responsive margin
            }}
            value={loginData.email}
            onChange={(e) => handleLoginData(e.target.id, e.target.value)}
          />

          {/* Password Input Field */}
          <CustomInputField
            id="password"
            label="Enter your password here"
            type="password"
            fullWidth
            sx={{
              marginBottom: { xs: "16px", sm: "24px", md: "32px" }, // Responsive margin
              "& .MuiOutlinedInput-input": {
                "&:-webkit-autofill": {
                  "-webkit-box-shadow": `0 0 0 100px ${theme.palette.background.paper} inset`,
                  "-webkit-text-fill-color": theme.palette.text.primary,
                },
              },
            }}
            value={loginData.password}
            onChange={(e) => handleLoginData(e.target.id, e.target.value)}
          />

          {/* Log In Button */}
          <Box
            sx={{
              width: "100%",
              cursor: "pointer",
              maxWidth: { xs: "300px", sm: "250px", md: "300px" }, // Responsive button width
              margin: "0 auto", // Center the button
              marginBottom: { xs: "16px", sm: "24px", md: "32px" }, // Responsive margin
            }}
            onClick={handleLogin}
          >
            {/* <Link to={"/subscriptions"}> */}
            <CustomButton
              text={"Log in"}
              sx={{
                width: "100%",
                padding: { xs: "8px 16px", sm: "12px 24px" }, // Responsive padding
                fontSize: { xs: "0.875rem", sm: "1rem" }, // Responsive font size
              }}
              isLoading={isLoading}
            />
            {/* </Link> */}
          </Box>

          <Box>
            <Link to={"/forgot-password"}>
              <CustomText
                style={{
                  color: darkTheme ? "#90caf9" : "#1976d2",
                }}
                text={"Forgot Password?"}
              />
            </Link>
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
              onClick={login}
              startIcon={<GoogleIcon />}
            />

            <CustomButton
              text={"Sign in with Apple"}
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

export default Login;
