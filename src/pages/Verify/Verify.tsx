import { Box, Container, Stack, TextField, useTheme } from "@mui/material";
import CustomText from "../../components/CustomText/CustomText";
import { noResults } from "../../assets/svgs";
import CustomButton from "../../components/CustomButton/CustomButton";

import { SetStateAction, useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { toast } from "react-toastify";
import validator from "validator";

import { verifyOtp } from "../../api/lib/auth";
import { useNavigate } from "react-router";

const Verify = () => {
  const theme = useTheme();
  const { user, token, tokenRoute, forgotPasswordToken, forgotPasswordEmail } =
    useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");

  const handleOtp = (otp: SetStateAction<string>) => {
    setOtp(otp);
  };

  const handleVerifyOtp = async () => {
    setIsLoading(true);

    if (forgotPasswordToken !== "") {
      if (otp.length < 6 || otp.length > 6) {
        toast.error("Please enter a valid otp");
        setIsLoading(false);

        return;
      }

      if (!validator.isEmail(forgotPasswordEmail)) {
        toast.error("Please enter a valid email");
        setIsLoading(false);

        return;
      }

      const { data } = await verifyOtp(
        {
          email: forgotPasswordEmail,
          otp,
          route: tokenRoute,
        },
        forgotPasswordToken
      );

      if (!data.verified) {
        toast.error("Your verification failed, kindly try again");
        setIsLoading(false);

        return;
      }
      setIsLoading(false);
      navigate("/change-password");

      return;
    }

    if (!user.email || !tokenRoute) {
      toast.error("Oops, you're not supposed to this this!");
      setIsLoading(false);
      navigate("/login");

      return;
    }

    if (otp.length < 6 || otp.length > 6) {
      toast.error("Please enter a valid otp");
      setIsLoading(false);

      return;
    }

    if (!validator.isEmail(user.email)) {
      toast.error("Please enter a valid email");
      setIsLoading(false);

      return;
    }

    const { data } = await verifyOtp(
      {
        email: user.email,
        otp,
        route: tokenRoute,
      },
      token
    );

    if (!data.verified) {
      toast.error("Your verification failed, kindly try again");
      setIsLoading(false);

      return;
    }
    setIsLoading(false);
    navigate("/subscriptions");
  };

  useEffect(() => {
    if (forgotPasswordToken !== "") {
      return;
    }

    if (!user.email || !tokenRoute) {
      toast.error("Oops, you're not supposed to this this!");
      setIsLoading(false);
      navigate("/login");

      return;
    }
  }, [user, token, tokenRoute, otp, navigate]);

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
            src={noResults} // Add image URL here
            alt={"Verify Illustration"}
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
            text={"Is it you or someone else?"}
            style={{
              fontWeight: "bold",
              fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" }, // Responsive font size
              color: theme.palette.text.primary, // Use theme color for text
              marginBottom: { xs: "16px", sm: "24px" }, // Responsive margin
            }}
          />

          {/* Subheading */}
          <CustomText
            text={"Kindly enter the OTP sent to the email you provided"}
            style={{
              color: theme.palette.text.secondary, // Use theme color for text
              fontSize: { xs: "0.875rem", sm: "1rem", md: "1.125rem" }, // Responsive font size
              marginBottom: { xs: "16px", sm: "24px", md: "32px" }, // Responsive margin
            }}
          />

          {/* Password Input Field */}
          <TextField
            id="otp"
            label="Enter your OTP here"
            type="text"
            fullWidth
            sx={{
              marginBottom: { xs: "16px", sm: "24px", md: "32px" }, // Responsive margin
            }}
            value={otp}
            onChange={(e) => handleOtp(e.target.value)}
          />

          <Box
            sx={{
              width: "100%",
              cursor: "pointer",
              maxWidth: { xs: "300px", sm: "250px", md: "300px" }, // Responsive button width
              margin: "0 auto", // Center the button
              marginBottom: { xs: "16px", sm: "24px", md: "32px" }, // Responsive margin
            }}
            onClick={handleVerifyOtp}
          >
            {/* <Link to={"/subscriptions"}> */}
            <CustomButton
              text={"Verify Me"}
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

export default Verify;
