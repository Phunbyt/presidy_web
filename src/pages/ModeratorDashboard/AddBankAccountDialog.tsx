import {
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CustomInputField from "../../components/CustomInputField/CustomInputField";
import CustomButton from "../../components/CustomButton/CustomButton";

interface AddBankAccountDialogProps {
  openBankDialog: boolean;
  handleBankDialog: (open: boolean) => void;
  newBankAccount: {
    firstName: string;
    lastName: string;
    accountNumber: string;
    bankName: string;
  };
  handleBankAccountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddBankAccount: () => void;
  isLoading: boolean;
}

const AddBankAccountDialog: React.FC<AddBankAccountDialogProps> = ({
  openBankDialog,
  handleBankDialog,
  newBankAccount,
  handleBankAccountChange,
  handleAddBankAccount,
  isLoading,
}) => {
  return (
    <Dialog
      open={openBankDialog}
      onClose={() => handleBankDialog(false)}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Add Bank Account</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 2 }}>
          <CustomInputField
            fullWidth
            label="Account Holder First Name"
            id="firstName"
            value={newBankAccount.firstName}
            onChange={handleBankAccountChange}
            required
          />
          <CustomInputField
            fullWidth
            label="Account Holder Last Name"
            id="lastName"
            value={newBankAccount.lastName}
            onChange={handleBankAccountChange}
            required
          />

          <CustomInputField
            fullWidth
            label="Account Number"
            id="accountNumber"
            value={newBankAccount.accountNumber}
            onChange={handleBankAccountChange}
            required
          />
          <CustomInputField
            fullWidth
            label="Bank Name"
            id="bankName"
            value={newBankAccount.bankName}
            onChange={handleBankAccountChange}
            required
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <CustomButton
          text="Cancel"
          // variant="outlined"
          onClick={() => handleBankDialog(false)}
        />
        <CustomButton
          text="Add Bank Account"
          isLoading={isLoading}
          onClick={handleAddBankAccount}
        />
      </DialogActions>
    </Dialog>
  );
};

export default AddBankAccountDialog;
