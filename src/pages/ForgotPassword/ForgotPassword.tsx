import { Box, Container, Stack, useTheme } from "@mui/material";
import CustomText from "../../components/CustomText/CustomText";
import { signIn } from "../../assets/svgs";
import CustomButton from "../../components/CustomButton/CustomButton";

import { useContext, useState } from "react";
import { sendResetOtp } from "../../api/lib/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { GlobalContext } from "../../context/GlobalContext";
import CustomInputField from "../../components/CustomInputField/CustomInputField";

const ForgotPassword = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { handleForgotPasswordToken, handleTokenRoute } =
    useContext(GlobalContext);

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const handleEmail = (value: string) => {
    setEmail(value);
  };

  const handleLogin = async () => {
    setIsLoading(true);

    if (!email) {
      toast.error("Please enter your email and password");
      setIsLoading(false);

      return;
    }

    const { data } = await sendResetOtp({ email });

    if (data?.status) {
      handleForgotPasswordToken({
        token: data.accessToken,
        email: data.email,
      });
      handleTokenRoute("reset");
      navigate("/verify");

      setIsLoading(false);
    }

    setIsLoading(false);

    return;
  };

  return (
    <Container
      sx={{
        padding: { xs: "16px", sm: "24px", md: "32px" }, // Responsive padding
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row-reverse" }} // Stack vertically on small screens, horizontally on larger screens
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
            src={signIn} // Add image URL here
            alt={"Forgot Password Illustration"}
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
            text={"Oops that's so uncool!"}
            style={{
              fontWeight: "bold",
              fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" }, // Responsive font size
              color: theme.palette.text.primary, // Use theme color for text
              marginBottom: { xs: "16px", sm: "24px" }, // Responsive margin
            }}
          />

          {/* Subheading */}
          <CustomText
            text={"We listen and we judge"}
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
            value={email}
            onChange={(e) => handleEmail(e.target.value)}
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
            {/* <Link to={"/verify"}> */}
            <CustomButton
              text={"Help me"}
              sx={{
                width: "100%",
                padding: { xs: "8px 16px", sm: "12px 24px" }, // Responsive padding
                fontSize: { xs: "0.875rem", sm: "1rem" }, // Responsive font size
              }}
              onClick={handleLogin}
              isLoading={isLoading}
            />
            {/* </Link> */}
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default ForgotPassword;
