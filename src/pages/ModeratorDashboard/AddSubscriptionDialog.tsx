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
import CustomText from "../../components/CustomText/CustomText";
import CustomButton from "../../components/CustomButton/CustomButton";

interface Subscription {
  planId: string;
  familyLink: string;
  moderatorDetails: boolean;
  moderatorAvailability: string;
  webDetails: boolean;
  webDetailsData: string;
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

          {newSubscription.planId && (
            <Stack spacing={2}>
              {newSubscription.moderatorDetails ? (
                <>
                  <CustomText
                    text="By proceeding, you agree to be available whenever needed to add new users to the family plan."
                    style={{ textTransform: "capitalize" }}
                  />

                  <FormControl fullWidth required>
                    <InputLabel id="moderator-agreement">
                      Moderator Agreement
                    </InputLabel>
                    <Select
                      labelId="moderator-agreement"
                      label="Moderator Agreement"
                      name="moderatorAvailability"
                      value={newSubscription.moderatorAvailability || ""}
                      onChange={handleSubscriptionChange}
                    >
                      <MenuItem value="yes">Yes</MenuItem>
                      <MenuItem value="no">No</MenuItem>
                    </Select>
                  </FormControl>
                </>
              ) : newSubscription.webDetails ? (
                <>
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
                  <CustomInputField
                    fullWidth
                    label="Service Provider Details e.g address"
                    id="webDetailsData"
                    type="text"
                    value={newSubscription.webDetailsData}
                    onChange={handleSubscriptionChange}
                    required
                    helperText="Additional information required by your service provider"
                  />
                </>
              ) : (
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
              )}
            </Stack>
          )}
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
