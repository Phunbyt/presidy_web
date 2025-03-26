import { Box, Stack, useTheme, keyframes } from "@mui/material";
import { businessPlan } from "../../assets/svgs";
import CustomText from "../../components/CustomText/CustomText";
import CustomButton from "../../components/CustomButton/CustomButton";
import { Link } from "react-router";
import { GlobalContext } from "../../context/GlobalContext";
import { useContext } from "react";

// Define the rotation animation
const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(5deg);
  }
  50% {
    transform: rotate(0deg);
  }
  75% {
    transform: rotate(-5deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

const Hero = () => {
  const theme = useTheme();
  const { token } = useContext(GlobalContext);

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={{ xs: 3, sm: 4, md: 6 }}
      sx={{
        padding: { xs: "16px", sm: "24px", md: "32px" },
        alignItems: "center",
      }}
    >
      {/* Left Section (Text Content) - unchanged */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: { xs: "center", md: "flex-start" },
          textAlign: { xs: "center", md: "left" },
          gap: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <CustomText
          text={"Save BIG on subscriptions"}
          style={{
            fontSize: { xs: "2rem", sm: "3rem", md: "4rem", lg: "5rem" },
            fontWeight: "bold",
            lineHeight: 1.2,
            color: theme.palette.text.primary,
          }}
        />
        <CustomText
          text={
            "Presidy is your ultimate solution to shared subscriptions across multiple domains, entertainment, edutech, creator tools, and more"
          }
          style={{
            fontSize: { xs: "0.875rem", sm: "1rem", md: "1.25rem" },
            marginTop: { xs: "4px", sm: "6px", md: "12px" },
            maxWidth: "600px",
            color: theme.palette.text.secondary,
          }}
        />

        <Box
          sx={{
            width: "100%",
            maxWidth: { xs: "200px", sm: "250px", md: "300px" },
            marginTop: { xs: "8px", sm: "12px", md: "16px" },
          }}
        >
          <Link to={`${token ? "/subscriptions" : "/login"}`}>
            <CustomButton
              text={"Get Started"}
              sx={{
                width: "100%",
                padding: { xs: "8px 16px", sm: "12px 24px" },
                fontSize: { xs: "0.875rem", sm: "1rem" },
              }}
            />
          </Link>
        </Box>
      </Box>

      {/* Right Section (Image) with rotation animation */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: { xs: "center", md: "flex-end" },
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          alt="Business Plan Illustration"
          src={businessPlan}
          sx={{
            width: "100%",
            maxWidth: { xs: "250px", sm: "350px", md: "500px", lg: "600px" },
            height: "auto",
            borderRadius: "8px",
            animation: `${rotate} 4s ease-in-out infinite`,
            transformOrigin: "center center",
            transition: "transform 0.3s ease",
            "&:hover": {
              animation: `${rotate} 2s ease-in-out infinite`,
            },
          }}
        />
      </Box>
    </Stack>
  );
};

export default Hero;
