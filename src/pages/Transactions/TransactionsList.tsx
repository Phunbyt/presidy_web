import {
  Box,
  Card,
  CardContent,
  Stack,
  useTheme,
  useMediaQuery,
  Container,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import CustomText from "../../components/CustomText/CustomText";
import { getUserTransactions } from "../../api/lib/transactions";
import { GlobalContext } from "../../context/GlobalContext";
import { useNavigate } from "react-router";
import { format } from "date-fns";
import { currencyFormatter } from "../../helpers/currency-formatter.helper";

const TransactionsList = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const formattedDate = (dateString: string) =>
    format(new Date(dateString), "yyyy-MM-dd");

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { token } = useContext(GlobalContext);

  const [transactions, setTransactions] = useState<
    {
      _id: string;
      createdAt: string;
      amount: string;
      currency: string;
      planId: Record<string, string | number>;
      status: string;
      txRef: string;
    }[]
  >([]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return theme.palette.success.main;
      case "failed":
        return theme.palette.error.main;
      case "pending":
        return theme.palette.warning.main;
      default:
        return theme.palette.text.primary;
    }
  };

  const handleGetUserTransactions = async () => {
    if (!token) {
      navigate("/login");
    } else {
      const { data } = await getUserTransactions({ token });

      setTransactions(data);
    }
  };

  useEffect(() => {
    handleGetUserTransactions();
  }, []);

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: { xs: 2, sm: 3, md: 4 },
        px: { xs: 2, sm: 3 },
      }}
    >
      <CustomText
        text="Your Transactions"
        variant="h1"
        component="h1"
        style={{
          fontWeight: 700,
          fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
          mb: { xs: 2, sm: 3 },
          color: theme.palette.text.primary,
        }}
      />

      {transactions.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            // maxHeight: { xs: "70vh", sm: "75vh" },
            overflowY: "auto",
            pr: 1,
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              background: theme.palette.grey[100],
              borderRadius: "3px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: theme.palette.primary.main,
              borderRadius: "3px",
              "&:hover": {
                background: theme.palette.primary.dark,
              },
            },
          }}
        >
          {transactions.map((transaction) => (
            <Card
              key={transaction._id}
              sx={{
                borderRadius: { xs: "8px", sm: "12px" },
                boxShadow: theme.shadows[1],
                transition: "all 0.2s ease-out",
                "&:hover": {
                  transform: !isSmallScreen ? "translateY(-2px)" : "none",
                  boxShadow: !isSmallScreen
                    ? theme.shadows[4]
                    : theme.shadows[1],
                },
              }}
            >
              <CardContent
                sx={{
                  p: { xs: "12px 16px", sm: "16px 20px" },
                  "&:last-child": {
                    pb: { xs: "12px", sm: "16px" },
                  },
                }}
              >
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  justifyContent="space-between"
                  alignItems={{ xs: "flex-start", sm: "center" }}
                  spacing={{ xs: 1, sm: 2 }}
                >
                  <Box sx={{ flex: 1 }}>
                    <CustomText
                      text={transaction.planId.name as string}
                      variant="body1"
                      component="p"
                      style={{
                        fontWeight: 600,
                        fontSize: {
                          xs: "0.95rem",
                          sm: "1.05rem",
                          md: "1.1rem",
                        },
                        lineHeight: 1.3,
                        mb: 0.5,
                        textTransform: "capitalize",
                      }}
                    />
                    <CustomText
                      text={formattedDate(transaction.createdAt)}
                      variant="body1"
                      component="p"
                      style={{
                        color: theme.palette.text.secondary,
                        fontSize: "0.8125rem",
                        mt: 0.5,
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "row", sm: "column" },
                      justifyContent: { xs: "space-between", sm: "flex-end" },
                      alignItems: { xs: "center", sm: "flex-end" },
                      width: { xs: "100%", sm: "auto" },
                      mt: { xs: 1, sm: 0 },
                      gap: { xs: 1, sm: 0.5 },
                    }}
                  >
                    <CustomText
                      text={`${currencyFormatter(transaction.amount)} ${
                        transaction.currency
                      }`}
                      variant="body1"
                      component="p"
                      style={{
                        fontWeight: 600,
                        fontSize: {
                          xs: "0.95rem",
                          sm: "1.05rem",
                          md: "1.1rem",
                        },
                        color: getStatusColor(transaction.status),
                      }}
                    />

                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={1}
                      divider={
                        <CustomText
                          text="•"
                          variant="body1"
                          component="p"
                          style={{
                            color: theme.palette.text.secondary,
                            display: { xs: "none", sm: "block" },
                          }}
                        />
                      }
                      sx={{
                        alignItems: "center",
                      }}
                    >
                      <CustomText
                        text={transaction.txRef}
                        variant="body1"
                        component="p"
                        style={{
                          color: theme.palette.text.secondary,
                          fontSize: { xs: "0.75rem", sm: "0.8125rem" },
                          order: { xs: 1, sm: 0 },
                        }}
                      />
                      <CustomText
                        text={transaction.status}
                        variant="body1"
                        component="p"
                        style={{
                          color: getStatusColor(transaction.status),
                          fontSize: { xs: "0.75rem", sm: "0.8125rem" },
                          fontWeight: { xs: 500, sm: 400 },
                        }}
                      />
                    </Stack>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: { xs: "50vh", sm: "60vh" },
            textAlign: "center",
            p: 3,
            border: `1px dashed ${theme.palette.divider}`,
            borderRadius: "12px",
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <CustomText
            text="No transactions found"
            variant="h1"
            component="h1"
            style={{
              fontSize: { xs: "1.125rem", sm: "1.25rem", md: "1.5rem" },
              color: theme.palette.text.secondary,
              mb: 1,
            }}
          />
          <CustomText
            text="Your transactions will appear here"
            variant="body1"
            component="p"
            style={{
              fontSize: { xs: "0.9375rem", sm: "1.0625rem", md: "1.125rem" },
              color: theme.palette.text.disabled,
            }}
          />
        </Box>
      )}
    </Container>
  );
};

export default TransactionsList;
