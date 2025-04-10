import { Box, Stack, useTheme, Paper, Avatar } from "@mui/material";
import Grid from "@mui/material/Grid2"; // Keeping the exact Grid import
import LinkIcon from "@mui/icons-material/Link";
import PaymentIcon from "@mui/icons-material/Payment";
import CustomText from "../../components/CustomText/CustomText";
import HistoryIcon from "@mui/icons-material/History";
import InfoIcon from "@mui/icons-material/Info";
import { currencyFormatter } from "../../helpers/currency-formatter.helper";

interface Subscription {
  status?: string;
  familyActiveMembers?: number;
}

const StatsCards = ({
  subscriptions = [] as Subscription[],
  earnings = "0",
  payouts = "0",
}: {
  subscriptions?: Subscription[];
  earnings?: string;
  payouts?: string;
}) => {
  const theme = useTheme();

  const data = [
    {
      id: "subscriptions",
      headerText: "Active Subscriptions",
      subText: subscriptions.filter((s) => s?.status === "active").length,
      bgColor: theme.palette.success.light,
      icon: <LinkIcon />,
    },
    {
      id: "members",
      headerText: "Total Members",
      subText: subscriptions.reduce(
        (sum, sub) => sum + (sub?.familyActiveMembers || 0),
        0
      ),
      bgColor: theme.palette.info.light,
      icon: <PaymentIcon />,
    },
    {
      id: "earnings",
      headerText: "Total Earnings",
      subText: currencyFormatter(earnings),
      bgColor: theme.palette.warning.light,
      icon: <HistoryIcon />,
    },
    {
      id: "payouts",
      headerText: "Pending Payout",
      subText: currencyFormatter(payouts),
      bgColor: theme.palette.error.light,
      icon: <InfoIcon />,
    },
  ];

  return (
    <Grid
      container
      mb={4}
      sx={{
        border: "1px solid #E0E0E0",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {data.map((item) => (
        <Grid
          key={item.id}
          sx={{
            width: { xs: "50%", md: "25%" }, // Responsive widths
            p: 1,
            boxSizing: "border-box",
          }}
        >
          <Paper sx={{ p: 3, borderRadius: 2, height: "100%" }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <CustomText
                  text={item.headerText}
                  style={{
                    fontWeight: "bold",
                    fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
                    color: theme.palette.text.primary,
                    mb: 0.5,
                  }}
                />
                <CustomText
                  text={item.subText}
                  style={{
                    fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                    color: theme.palette.text.primary,
                    fontWeight: 600,
                  }}
                />
              </Box>
              <Box>
                <Avatar sx={{ bgcolor: item.bgColor }}>{item.icon}</Avatar>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsCards;
