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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";

import CustomText from "../../components/CustomText/CustomText";
import CustomButton from "../../components/CustomButton/CustomButton";
import { sittingLady } from "../../assets/svgs";

interface SubscriptionsTabProps {
  handleSubscriptionDialog: (open: boolean) => void;
  subscriptions: {
    id: string;
    name: string;
    familyLink: string;
    status: "active" | "pending" | "inactive";
    familyActiveMembers: number;
    familyMembersLimit: number;
  }[];
}

const SubscriptionsTab: React.FC<SubscriptionsTabProps> = ({ handleSubscriptionDialog, subscriptions }) => {
  const theme = useTheme();

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <CustomText text="Your Family Subscriptions" />
        <CustomButton
          text="Add Subscription"
          startIcon={<AddIcon />}
          onClick={() => handleSubscriptionDialog(true)}
        />
      </Stack>

      {subscriptions.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Box
            component="img"
            src={sittingLady}
            alt="No subscriptions"
            sx={{ width: 200, mb: 2 }}
          />
          <CustomText text="No Subscriptions Yet" />
          <CustomText
            text=" You haven't added any family subscriptions yet. Add your first one
            to get started!"
          />
          <CustomButton
            text="Add Subscription"
            startIcon={<AddIcon />}
            onClick={() => handleSubscriptionDialog(true)}
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
                  Status
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                    color: theme.palette.text.primary,
                    fontWeight: 600,
                  }}
                >
                  Members
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subscriptions.map((sub) => (
                <TableRow key={sub.id}>
                  <TableCell>
                    <CustomText
                      text={sub.name}
                      style={{
                        fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                        color: theme.palette.text.primary,
                        fontWeight: 600,
                        textTransform: "capitalize",
                      }}
                    />
                    <CustomText
                      text={sub.familyLink}
                      style={{
                        fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
                        color: theme.palette.text.secondary,
                        mb: 0.5,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={sub.status}
                      color={
                        sub.status === "active"
                          ? "success"
                          : sub.status === "pending"
                          ? "warning"
                          : "error"
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {sub.familyActiveMembers}/{sub.familyMembersLimit}
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

export default SubscriptionsTab;
