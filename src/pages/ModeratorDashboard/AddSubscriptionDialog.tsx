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
} from "@mui/material";
import CustomInputField from "../../components/CustomInputField/CustomInputField";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomText from "../../components/CustomText/CustomText";

interface Subscription {
  planId: string;
  familyLink: string;
}

// interface SubscriptionData {
//   id: string;
//   planId: string;
//   name: string;
//   specialEmail: boolean;
//   status: string;
//   familyLink: string;
//   familyActiveMembers: number;
//   familyMembersLimit: number;
// }


interface AddSubscriptionDialogProps {
  openSubscriptionDialog: boolean;
  handleSubscriptionDialog: (open: boolean) => void;
  newSubscription: Subscription;
  handleSubscriptionChange: (event: any) => void;
  handleAddSubscription: () => void;
  availableSubscriptions: { _id: string; name: string; value: string }[];
  isLoading: boolean;
}

const AddSubscriptionDialog: React.FC<AddSubscriptionDialogProps> = ({
  openSubscriptionDialog,
  handleSubscriptionDialog,
  newSubscription,
  handleSubscriptionChange,
  handleAddSubscription,
  availableSubscriptions,
  isLoading,
}) => {
  return (
    <Dialog
      open={openSubscriptionDialog}
      onClose={() => handleSubscriptionDialog(false)}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Add New Family Subscription</DialogTitle>

      <DialogContent>
        <Stack spacing={3} sx={{ mt: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="country-label">Select Service</InputLabel>
            <Select
              labelId="country-label"
              id="planId"
              name={"planId"}
              value={newSubscription.planId}
              label="Select Service"
              onChange={handleSubscriptionChange}
            >
              {availableSubscriptions.map((item) => (
                <MenuItem
                  sx={{ textTransform: "capitalize" }}
                  key={item.value}
                  value={item._id}
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

          <CustomInputField
            fullWidth
            label="Family Link URL"
            id="familyLink"
            type="text"
            value={newSubscription.familyLink}
            onChange={handleSubscriptionChange}
            required
            helperText="The invitation link to join your family plan"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <CustomButton
          text="Cancel"
          onClick={() => handleSubscriptionDialog(false)}
        />

        <CustomButton
          text="Add Subscription"
          isLoading={isLoading}
          onClick={handleAddSubscription}
        />
      </DialogActions>
    </Dialog>
  );
};

export default AddSubscriptionDialog;
