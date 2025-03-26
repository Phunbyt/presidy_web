import { Box, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

import CustomText from "../../components/CustomText/CustomText";
import Loader from "../../components/Loader/Loader";
import { GlobalContext } from "../../context/GlobalContext";
import { getOneTransaction } from "../../api/lib/transactions";
import Success from "./Success";
import { hand } from "../../assets/animations";
import Failed from "./Failed";
import Pending from "./Pending";

const Transactions = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState("");
  const theme = useTheme();
  const { token } = useContext(GlobalContext);

  const handleGetSingleTransaction = async (txRef: string ) => {
    if (!token) {
      setIsLoading(false);
      navigate("/login");
    } else {
      const { data } = await getOneTransaction({ token, txRef });
      setIsLoading(false);
      setStatus(data.status);
    }
  };

  useEffect(() => {
    const txRef = searchParams.get("trxref");

    // Set a delay of 3 seconds before making the API call
    const delayTimer = setTimeout(() => {
      handleGetSingleTransaction(txRef || "");
    }, 3000); // 3000ms = 3 seconds

    // Cleanup function to clear the timeout if component unmounts
    return () => clearTimeout(delayTimer);
  }, [searchParams, token]); // Added token to dependency array

  const renderStatusComponent = () => {
    switch (status.toLowerCase()) {
      case "success":
        return <Success />;
      case "failed":
        return <Failed />;
      case "pending":
        return <Pending />;
      default:
        return (
          <CustomText
            text={"Transaction status unknown"}
            style={{
              color: theme.palette.text.secondary,
              fontSize: {
                xs: "1rem",
                sm: "1.125rem",
                md: "1.25rem",
                lg: "1.375rem",
              },
            }}
          />
        );
    }
  };

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
        minHeight: "calc(100vh - 64px)", // Adjust based on your header height
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <CustomText
            text={"please do not leave this page...."}
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
          <Loader animationData={hand} />
        </Box>
      ) : (
        renderStatusComponent()
      )}
    </Box>
  );
};

export default Transactions;
