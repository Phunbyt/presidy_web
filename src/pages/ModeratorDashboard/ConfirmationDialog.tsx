import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CustomText from "../../components/CustomText/CustomText";
import CustomButton from "../../components/CustomButton/CustomButton";

interface ConfirmationDialogProps {
  confirmDialogOpen: boolean;
  handleConfirmDialogOpen: (open: boolean) => void;
  dialogAction: "delete" | "setPrimary";
  handleConfirmAction: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  confirmDialogOpen,
  handleConfirmDialogOpen,
  dialogAction,
  handleConfirmAction,
}) => {
  return (
    <Dialog
      open={confirmDialogOpen}
      onClose={() => handleConfirmDialogOpen(false)}
    >
      <DialogTitle>
        {dialogAction === "delete" ? "Confirm Deletion" : "Set as Primary"}
      </DialogTitle>
      <DialogContent>
        <CustomText
          text={
            dialogAction === "delete"
              ? "Are you sure you want to delete this item? This action cannot be undone."
              : "Are you sure you want to set this account as your primary payout method?"
          }
        />
      </DialogContent>
      <DialogActions>
        <CustomButton
          text="Cancel"
          onClick={() => handleConfirmDialogOpen(false)}
        />
        <CustomButton
          text="Confirm"
          // color={dialogAction === "delete" ? "error" : "primary"}
          onClick={handleConfirmAction}
        />
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
