import { Box, useTheme } from "@mui/material";

import CustomText from "../../components/CustomText/CustomText";
import Loader from "../../components/Loader/Loader";
import { money } from "../../assets/animations";
import { Link } from "react-router";
import CustomButton from "../../components/CustomButton/CustomButton";

const Success = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        padding: {
          xs: "0 16px",
          sm: "0 24px",
          md: "0 32px",
          lg: "0 48px",
          xl: "0 64px",
        },
        position: "relative",
        minHeight: "calc(50vh - 64px)", // Adjust based on your header height
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          // height: "50vh",
        }}
      >
        <CustomText
          text={"Odogwu Paranra!!!!!"}
          style={{
            color: theme.palette.text.secondary,
            fontSize: {
              xs: "1rem",
              sm: "1.125rem",
              md: "1.25rem",
              lg: "1.375rem",
            },
            lineHeight: 1.5,
            maxWidth: { md: "90%", lg: "80%" },
            marginBottom: { xs: "24px", md: "32px" },
          }}
        />
        <Loader animationData={money} />
      </Box>
      <Box
        sx={{
          width: "100%",
          cursor: "pointer",
          maxWidth: { xs: "300px", sm: "250px", md: "300px" }, // Responsive button width
          margin: "0 auto", // Center the button
          marginBottom: { xs: "16px", sm: "24px", md: "32px" }, // Responsive margin
        }}
      >
        <Link to={"/subscriptions"}>
          <CustomButton
            text={"Close"}
            sx={{
              width: "100%",
              padding: { xs: "8px 16px", sm: "12px 24px" }, // Responsive padding
              fontSize: { xs: "0.875rem", sm: "1rem" }, // Responsive font size
            }}
          />
        </Link>
      </Box>
    </Box>
  );
};

export default Success;
