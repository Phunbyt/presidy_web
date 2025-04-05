import { Box, Container, Stack, useTheme } from "@mui/material";
import CustomText from "../../components/CustomText/CustomText";
import { work } from "../../assets/svgs";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { toast } from "react-toastify";
import { resetPassword } from "../../api/lib/auth";
import { useNavigate } from "react-router";
import CustomInputField from "../../components/CustomInputField/CustomInputField";

const ChangePassword = () => {
  const theme = useTheme();
  const { handleUser, handleToken, forgotPasswordToken } =
    useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    confirmPassword: "",
    password: "",
  });
  const handleLoginData = (key: string, value: string) => {
    setLoginData((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleLogin = async () => {
    setIsLoading(true);

    if (!loginData.confirmPassword || !loginData.password) {
      toast.error("Please enter your passwords");
      setIsLoading(false);

      return;
    }
    if (loginData.confirmPassword !== loginData.password) {
      toast.error("Passwords mismatch");
      setIsLoading(false);

      return;
    }

    const { data } = await resetPassword(
      { password: loginData.password },
      forgotPasswordToken
    );

    if (data?.error || !data) {
      setIsLoading(false);
      return;
    }
    handleUser(data.existingUser);
    handleToken(data.accessToken);
    setIsLoading(false);
    toast.success("Password reset successfully");

    setIsLoading(false);
    navigate("/subscriptions");
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
            src={work} // Add image URL here
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
            text={"Here you go!"}
            style={{
              fontWeight: "bold",
              fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" }, // Responsive font size
              color: theme.palette.text.primary, // Use theme color for text
              marginBottom: { xs: "16px", sm: "24px" }, // Responsive margin
            }}
          />

          {/* Subheading */}
          <CustomText
            text={"Hope you won't forget this password too"}
            style={{
              color: theme.palette.text.secondary, // Use theme color for text
              fontSize: { xs: "0.875rem", sm: "1rem", md: "1.125rem" }, // Responsive font size
              marginBottom: { xs: "16px", sm: "24px", md: "32px" }, // Responsive margin
            }}
          />

          {/* Email Input Field */}
          <CustomInputField
            id="confirmPassword"
            label="Enter your password here"
            type="text"
            fullWidth
            sx={{
              marginBottom: { xs: "16px", sm: "24px", md: "32px" }, // Responsive margin
            }}
            value={loginData.confirmPassword}
            onChange={(e) => handleLoginData(e.target.id, e.target.value)}
          />

          {/* Password Input Field */}
          <CustomInputField
            id="password"
            type="text"
            label="Confirm your password here"
            fullWidth
            sx={{
              marginBottom: { xs: "16px", sm: "24px", md: "32px" }, // Responsive margin
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
              text={"Change Password"}
              sx={{
                width: "100%",
                padding: { xs: "8px 16px", sm: "12px 24px" }, // Responsive padding
                fontSize: { xs: "0.875rem", sm: "1rem" }, // Responsive font size
              }}
              isLoading={isLoading}
            />
            {/* </Link> */}
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default ChangePassword;
