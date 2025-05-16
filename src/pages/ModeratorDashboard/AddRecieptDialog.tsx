/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";

import CustomButton from "../../components/CustomButton/CustomButton";
import CustomText from "../../components/CustomText/CustomText";

const AddRecieptDialog = ({
  openAddPaymentRecieptDialog,
  handleAddPaymentRecieptDialog,
  subscriptions,
  handlePaymentReceiptPlan,
  newPaymentRecieptPlan,
  handleFileChange,
  handleUploadPayment,
  isLoading,
}: any) => {
  return (
    <Dialog
      open={openAddPaymentRecieptDialog}
      onClose={() => handleAddPaymentRecieptDialog(false)}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Add Payment Receipt for Family Subscription <br />
        <sub> Please note, we only accept image files</sub>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3} sx={{ mt: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="plan-label">Select Service</InputLabel>
            <Select
              labelId="plan-label"
              id="planId"
              name={"paymentPlanId"}
              value={newPaymentRecieptPlan}
              label="plan-label"
              onChange={handlePaymentReceiptPlan}
            >
              {subscriptions.map((item: any) => (
                <MenuItem
                  sx={{ textTransform: "capitalize" }}
                  key={item.id}
                  value={item.id}
                >
                  <CustomText
                    text={item.name}
                    style={{
                      textTransform: "capitalize",
                    }}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            type="file"
            onChange={handleFileChange}
            slotProps={{
              input: {
                inputProps: {
                  accept: "image/*",
                }, // Accept only images
              },
            }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <CustomButton
          text="Cancel"
          onClick={() => handleAddPaymentRecieptDialog(false)}
        />

        <CustomButton
          text="Add Receipt"
          isLoading={isLoading}
          onClick={handleUploadPayment}
        />
      </DialogActions>
    </Dialog>
  );
};

export default AddRecieptDialog;
