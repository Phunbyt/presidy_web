import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useTheme } from "@mui/material";
import CustomText from "../CustomText/CustomText";
import CustomButton from "../CustomButton/CustomButton";
import CustomInputField from "../CustomInputField/CustomInputField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface BasicModalProps {
  handleEmail: (email: string) => void;
  email: string;
  handleJoinPlan: () => void;
  isLoading: boolean;
  open: boolean;
  handleClose: () => void;
  planName: string;
}

export default function BasicModal({
  handleEmail,
  email,
  handleJoinPlan,
  isLoading,
  open,
  handleClose,
  planName,
}: BasicModalProps) {
  const theme = useTheme();

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* Heading */}
          <CustomText
            text={"Something Special"}
            style={{
              fontWeight: "bold",
              fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" }, // Responsive font size
              color: theme.palette.text.primary, // Use theme color for text
              marginBottom: { xs: "16px", sm: "24px" }, // Responsive margin
            }}
          />

          {/* Subheading */}
          <CustomText
            text={"This subscription requires a special email."}
            style={{
              color: theme.palette.text.secondary, // Use theme color for text
              fontSize: { xs: "0.875rem", sm: "1rem", md: "1.125rem" }, // Responsive font size
              marginBottom: { xs: "16px", sm: "24px", md: "32px" }, // Responsive margin
            }}
          />

          {/* Password Input Field */}
          <CustomInputField
            id="email"
            label={`Enter your ${planName.toUpperCase()} email here`}
            type="email"
            fullWidth
            sx={{
              marginBottom: { xs: "16px", sm: "24px", md: "32px" }, // Responsive margin
            }}
            value={email}
            onChange={(e) => handleEmail(e.target.value)}
          />

          <Box
            sx={{
              width: "100%",
              cursor: "pointer",
              maxWidth: { xs: "300px", sm: "250px", md: "300px" }, // Responsive button width
              margin: "0 auto", // Center the button
              marginBottom: { xs: "16px", sm: "24px", md: "32px" }, // Responsive margin
            }}
            onClick={() => handleJoinPlan()}
          >
            {/* <Link to={"/subscriptions"}> */}
            <CustomButton
              text={"Join now"}
              sx={{
                width: "100%",
                padding: { xs: "8px 16px", sm: "12px 24px" }, // Responsive padding
                fontSize: { xs: "0.875rem", sm: "1rem" }, // Responsive font size
              }}
              isLoading={isLoading}
            />
            {/* </Link> */}
          </Box>
        </Box>
      </Modal>
    </>
  );
}
