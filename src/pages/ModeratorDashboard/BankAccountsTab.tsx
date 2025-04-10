import CustomText from "../../components/CustomText/CustomText";
import { Box, Stack, useTheme, Paper, Divider } from "@mui/material";
import { Add } from "@mui/icons-material";
import CustomButton from "../../components/CustomButton/CustomButton";
import { work } from "../../assets/svgs";
import Grid from "@mui/material/Grid2";

interface BankAccount {
  id: string;
  bankName: string;
  firstName: string;
  lastName: string;
  accountNumber: string;
}

interface BankAccountsTabProps {
  handleBankDialog: (open: boolean, account?: BankAccount) => void;
  bankAccounts?: BankAccount[];
}

const BankAccountsTab: React.FC<BankAccountsTabProps> = ({ handleBankDialog, bankAccounts = [] }) => {
  const theme = useTheme();

  const renderEmptyState = () => (
    <Paper sx={{ p: 4, textAlign: "center" }}>
      <Box
        component="img"
        src={work}
        alt="No bank accounts"
        sx={{ width: { xs: 150, sm: 200 }, mb: 2 }}
      />
      <CustomText text="No Bank Accounts Yet" style={{ mb: 1 }} />
      <CustomText
        text="You haven't added any bank accounts yet. Add one to receive payouts!"
        style={{ mb: 3, color: theme.palette.text.secondary }}
      />
      <CustomButton
        text="Add Bank Account"
        startIcon={<Add />}
        onClick={() => handleBankDialog(true)}
      />
    </Paper>
  );

  const renderBankAccountCard = (account: BankAccount) => (
    <Paper sx={{ p: 3, position: "relative", height: "100%", width: "100%" }}>
      <Stack spacing={2}>
        <CustomText text={account.bankName} style={{ fontWeight: 600 }} />
        <Divider />
        <Box>
          <CustomText
            text="Account Name"
            style={{ color: theme.palette.text.secondary }}
          />
          <CustomText text={`${account.firstName} ${account.lastName}`} />
        </Box>
        <Box>
          <CustomText
            text="Account Number"
            style={{ color: theme.palette.text.secondary }}
          />
          <CustomText text={account.accountNumber} />
        </Box>

        {/* <Stack
          direction="row"
          spacing={1}
          pt={2}
          sx={{ flexWrap: "wrap", gap: 1 }}
        >
          <Tooltip title="Edit">
            <IconButton onClick={() => handleBankDialog(true, account)}>
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              onClick={() => handleConfirmDialog("delete", account.id)}
            >
              <Delete color="error" />
            </IconButton>
          </Tooltip>
        </Stack> */}
      </Stack>
    </Paper>
  );

  return (
    <Box>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        mb={3}
        gap={2}
      >
        <CustomText text="Your Bank Accounts" style={{ fontWeight: 600 }} />
        <CustomButton
          text="Add Bank Account"
          startIcon={<Add />}
          onClick={() => handleBankDialog(true)}
        />
      </Stack>

      {bankAccounts.length === 0 ? (
        renderEmptyState()
      ) : (
        <Grid container spacing={3}>
          {bankAccounts.map((account) => (
            <Grid
              key={account.id}
              sx={{
                xs: 12,
                sm: 6,
                md: 4,

                width: { xs: "100%", md: "25%" }, // Responsive widths
              }}
            >
              {renderBankAccountCard(account)}
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default BankAccountsTab;
