import { Box, useTheme } from "@mui/material";

import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInputField from "../../components/CustomInputField/CustomInputField";
import CustomText from "../../components/CustomText/CustomText";
import Grid from "@mui/material/Grid2"; // Keep the Grid import as is

import { useContext, useState } from "react";

import { toast } from "react-toastify";

import { GlobalContext } from "../../context/GlobalContext";
import { useNavigate } from "react-router";

import { registerModerator } from "../../api/lib/moderator";

const Create = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { handleUser, token, user } = useContext(GlobalContext);

  const { isModerator } = user || {};

  const [moderatorData, setModeratorData] = useState({
    firstName: "",
    lastName: "",
    accountNumber: "",
    bankName: "",
    phoneNumber: "",
  });
  const handleModeratorData = (key: string, value: string) => {
    setModeratorData((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleRegister = async () => {
    setIsLoading(true);
    if (
      !moderatorData.accountNumber ||
      !moderatorData.bankName ||
      !moderatorData.firstName ||
      !moderatorData.phoneNumber ||
      !moderatorData.lastName
    ) {
      toast.error("Please enter all fields, they're compulsory!");
      setIsLoading(false);

      return;
    }

    if (!moderatorData.phoneNumber.startsWith("234")) {
      toast.error("Please include country code in your phone number");
      setIsLoading(false);

      return;
    }
    if (moderatorData.phoneNumber.length !== 13) {
      toast.error("Invalid Phone number provided");
      setIsLoading(false);

      return;
    }

    const user = await registerModerator(
      {
        ...moderatorData,
        accountNumber: moderatorData.accountNumber,
        phoneNumber: +moderatorData.phoneNumber,
      },
      token
    );
    if (user.error) {
      setIsLoading(false);
      return;
    }

    const newUser = { ...user.data, isModerator: true };

    handleUser(newUser);

    setIsLoading(false);

    navigate("/moderator-dashboard");
  };

  return (
    <>
      {!isModerator && (
        <Box
          sx={{
            flex: 1,
            width: "100%",
            textAlign: { xs: "center", md: "left" }, // Center text on small screens
          }}
          id="moderator-register"
        >
          <Box>
            <CustomText
              text="Register as a moderator"
              style={{
                fontWeight: "bold",
                fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" }, // Responsive font size
                color: theme.palette.text.primary, // Use theme color for consistency
              }}
            />
            <CustomText text="Enter your correct information here, any mismatch might mean you don't get reimbursed.. and we don't want that now do we?" />
          </Box>

          {/* Form Fields */}
          <Grid container spacing={2}>
            {/* Use Grid for paired inputs */}
            {/* First Name */}
            <Grid size={6}>
              <CustomInputField
                id="firstName"
                label="Bank Account First Name"
                type="text"
                fullWidth
                value={moderatorData.firstName}
                onChange={(e) =>
                  handleModeratorData(e.target.id, e.target.value)
                }
              />
            </Grid>
            {/* Last Name */}
            <Grid size={6}>
              <CustomInputField
                id="lastName"
                label="Bank Account Last Name"
                type="text"
                fullWidth
                value={moderatorData.lastName}
                onChange={(e) =>
                  handleModeratorData(e.target.id, e.target.value)
                }
              />
            </Grid>
            {/* Account number */}
            <Grid size={6}>
              <CustomInputField
                id="accountNumber"
                label="Bank Account Number"
                type="number"
                fullWidth
                value={moderatorData.accountNumber}
                onChange={(e) =>
                  handleModeratorData(e.target.id, e.target.value)
                }
              />
            </Grid>
            {/* phoneNumber number */}
            <Grid size={6}>
              <CustomInputField
                id="phoneNumber"
                label="Phone Number with country code 234810..."
                type="number"
                fullWidth
                value={moderatorData.phoneNumber}
                onChange={(e) =>
                  handleModeratorData(e.target.id, e.target.value)
                }
              />
            </Grid>
            {/* Email */}
            <Grid size={6}>
              <CustomInputField
                id="bankName"
                label="Bank Name"
                type="text"
                fullWidth
                value={moderatorData.bankName}
                onChange={(e) =>
                  handleModeratorData(e.target.id, e.target.value)
                }
              />
            </Grid>
            {/* Country Select */}
          </Grid>

          {/* Sign Up Button */}
          <Box
            sx={{
              width: "100%",
              cursor: "pointer",
              maxWidth: { xs: "300px", sm: "250px", md: "300px" }, // Responsive button width
              margin: "0 auto", // Center the button
              marginTop: { xs: "16px", sm: "24px", md: "32px" }, // Responsive margin
            }}
            onClick={handleRegister}
          >
            {/* <Link to={"/verify"}> */}
            <CustomButton
              text={"Register"}
              sx={{
                width: "100%",
                padding: { xs: "8px 16px", sm: "12px 24px" }, // Responsive padding
                fontSize: { xs: "0.875rem", sm: "1rem" }, // Responsive font size
              }}
              isLoading={isLoading}
            />
            {/* </Link> */}
          </Box>

          <Box
            sx={{
              mb: 10,
            }}
          />
        </Box>
      )}
    </>
  );
};

export default Create;
