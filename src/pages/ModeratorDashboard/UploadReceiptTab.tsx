/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomText from "../../components/CustomText/CustomText";
import {
  Box,
  Stack,
  useTheme,
  Paper,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Link,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import CustomButton from "../../components/CustomButton/CustomButton";
import { sittingLady } from "../../assets/svgs";

import { convertISOToDDMMYYYY } from "../../helpers/date-formatter.helper";

const UploadReceiptTab = ({
  handleAddPaymentRecieptDialog,
  paymentReceipts,
}: any) => {
  const theme = useTheme();

  return (
    <Box>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        mb={3}
        gap={2}
      >
        <CustomText
          text="Add debit receipt of each subscription you have paid for"
          style={{ fontWeight: 600 }}
        />
        <CustomButton
          text="Add Payment receipt"
          startIcon={<Add />}
          onClick={() => handleAddPaymentRecieptDialog(true)}
        />
      </Stack>

      {paymentReceipts.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Box
            component="img"
            src={sittingLady}
            alt="No Payment reciept"
            sx={{ width: 200, mb: 2 }}
          />
          <CustomText text="No Payment reciept Yet" />
          <CustomText text="Get paid on Presidy. Add evidence of debit from service provider and get your money back" />
          <CustomButton
            text="Add Payment receipt"
            startIcon={<Add />}
            onClick={() => handleAddPaymentRecieptDialog(true)}
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
                  Service
                </TableCell>

                <TableCell
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                    color: theme.palette.text.primary,
                    fontWeight: 600,
                  }}
                >
                  Payment Receipt
                </TableCell>

                <TableCell
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                    color: theme.palette.text.primary,
                    fontWeight: 600,
                  }}
                >
                  Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paymentReceipts.map((receipt: any) => (
                <TableRow key={receipt._id}>
                  <TableCell>
                    <CustomText
                      text={receipt.planId.planId.name}
                      style={{
                        fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                        color: theme.palette.text.primary,
                        fontWeight: 600,
                        textTransform: "capitalize",
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={
                        <Link target="_blank" href={receipt.receiptLink}>
                          View Receipt
                        </Link>
                      }
                      color={"success"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <CustomText
                      text={convertISOToDDMMYYYY(receipt.createdAt)}
                      style={{
                        fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" },
                        color: theme.palette.text.primary,
                      }}
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

export default UploadReceiptTab;
