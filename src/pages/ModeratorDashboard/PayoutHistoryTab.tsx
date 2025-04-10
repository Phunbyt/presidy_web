/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  useTheme,
  Paper,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import CustomText from "../../components/CustomText/CustomText";

import { noResults } from "../../assets/svgs";
import { currencyFormatter } from "../../helpers/currency-formatter.helper";
import { convertISOToDDMMYYYY } from "../../helpers/date-formatter.helper";

// interface Payout {
//   id: string;
//   createdAt: string;
//   planId: { name: string };
//   amount: number;
//   status: "success" | "pending" | "failed";
// }

const PayoutHistoryTab = ({ payouts }: any) => {
  const theme = useTheme();

  return (
    <Box>
      <CustomText text="Payout History" />

      {payouts.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Box
            component="img"
            src={noResults}
            alt="No payouts"
            sx={{ width: 200, mb: 2 }}
          />
          <CustomText text="No Payouts Yet" />
          <CustomText
            text="Your payout history will appear here once you start receiving
            payments."
          />
        </Paper>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                    color: theme.palette.text.primary,
                    fontWeight: 600,
                  }}
                >
                  Date
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                    color: theme.palette.text.primary,
                    fontWeight: 600,
                  }}
                >
                  Subscription
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                    color: theme.palette.text.primary,
                    fontWeight: 600,
                  }}
                >
                  Amount
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                    color: theme.palette.text.primary,
                    fontWeight: 600,
                  }}
                >
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payouts.map((payout: any) => (
                <TableRow key={payout.id}>
                  <TableCell>
                    {convertISOToDDMMYYYY(payout.createdAt)}
                  </TableCell>
                  <TableCell
                    sx={{
                      textTransform: "capitalize",
                    }}
                  >
                    {payout.planId.name}
                  </TableCell>
                  <TableCell>{currencyFormatter(payout.amount)}</TableCell>
                  <TableCell>
                    <Chip
                      label={payout.status}
                      color={
                        payout.status === "success"
                          ? "success"
                          : payout.status === "pending"
                          ? "warning"
                          : "error"
                      }
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default PayoutHistoryTab;
