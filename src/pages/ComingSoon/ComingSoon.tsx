import { Box, Container, Stack, useTheme } from "@mui/material";
import { bored } from "../../assets/svgs";
import CustomText from "../../components/CustomText/CustomText";
import CustomButton from "../../components/CustomButton/CustomButton";
import { Link } from "react-router";
import { GlobalContext } from "../../context/GlobalContext";
import { useContext } from "react";

const ComingSoon = () => {
  const theme = useTheme();
  const { token } = useContext(GlobalContext);

  return (
    <Container>
      <Stack
        direction={{ xs: "column", md: "row" }} // Stack vertically on small screens, horizontally on medium and larger screens
        spacing={{ xs: 3, sm: 4, md: 6 }} // Responsive spacing between sections
        sx={{
          padding: { xs: "16px", sm: "24px", md: "32px" }, // Responsive padding
          alignItems: "center", // Center content vertically
        }}
        id={"#coming"}
      >
        {/* Left Section (Text Content) */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: { xs: "center", md: "flex-start" }, // Center text on small screens, align left on larger screens
            textAlign: { xs: "center", md: "left" }, // Center text on small screens, align left on larger screens
            gap: { xs: 2, sm: 3, md: 4 }, // Responsive gap between text and button
          }}
        >
          <CustomText
            text={"Ooooohh!,  not again!"}
            style={{
              fontSize: { xs: "2rem", sm: "3rem", md: "4rem", lg: "5rem" }, // Responsive font size
              fontWeight: "bold",
              lineHeight: 1.2,
              color: theme.palette.text.primary, // Use theme color for consistency
            }}
          />
          <CustomText
            text={
              "This page is currently unavailable... you can explore other pages"
            }
            style={{
              fontSize: { xs: "0.875rem", sm: "1rem", md: "1.25rem" }, // Responsive font size
              marginTop: { xs: "4px", sm: "6px", md: "12px" }, // Responsive margin
              maxWidth: "600px", // Limit text width for better readability
              color: theme.palette.text.secondary, // Use theme color for consistency
            }}
          />

          {/* Get Started Button */}
          <Box
            sx={{
              width: "100%",
              maxWidth: { xs: "200px", sm: "250px", md: "300px" }, // Responsive button width
              marginTop: { xs: "8px", sm: "12px", md: "16px" }, // Responsive margin
            }}
          >
            <Link to={`${token ? "/subscriptions" : "/login"}`}>
              <CustomButton
                text={"Get Started"}
                sx={{
                  width: "100%",
                  padding: { xs: "8px 16px", sm: "12px 24px" }, // Responsive padding
                  fontSize: { xs: "0.875rem", sm: "1rem" }, // Responsive font size
                }}
              />
            </Link>
          </Box>
        </Box>

        {/* Right Section (Image) */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: { xs: "center", md: "flex-end" }, // Center image on small screens, align right on larger screens
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            alt="Business Plan Illustration"
            src={bored}
            sx={{
              width: "100%",
              maxWidth: { xs: "250px", sm: "350px", md: "500px", lg: "600px" }, // Responsive image size
              height: "auto",
              borderRadius: "8px", // Optional: Add rounded corners
            }}
          />
        </Box>
      </Stack>
    </Container>
  );
};

export default ComingSoon;
