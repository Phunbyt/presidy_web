import { Box, Container, Stack, TextField, useTheme } from "@mui/material";
import CustomText from "../../components/CustomText/CustomText";
import { messageSent } from "../../assets/svgs";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { sendSupportMessage } from "../../api/lib/plan";

const Support = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { user } = useContext(GlobalContext);
  const [supportMessasgeData, setSupportMessasgeData] = useState({
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const messageLength = 400;

  const [remainingMessasgeString, setRemainingMessasgeString] = useState(0);

  const handleMessageData = (key: string, value: string) => {
    setSupportMessasgeData((prevState) => ({ ...prevState, [key]: value }));
    if (key === "message") {
      const remainder = value.length;
      setRemainingMessasgeString(remainder);
    }
  };

  const handleSendMessage = async () => {
    setIsLoading(true);

    if (!supportMessasgeData.email || !supportMessasgeData.message) {
      toast.error("Message and email are required");
      setIsLoading(false);

      return;
    }

    await sendSupportMessage(supportMessasgeData);
    toast.success("Message received, we'd  reach out to you shortly");

    setIsLoading(false);
    navigate("/");
  };

  useEffect(() => {
    if (user.email) {
      setSupportMessasgeData((prevState) => ({
        ...prevState,
        email: user.email,
      }));
    }
  }, []);

  return (
    <Container
      sx={{
        padding: { xs: "16px", sm: "24px", md: "32px" }, // Responsive padding
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }} // Stack vertically on small screens, horizontally on larger screens
        spacing={{ xs: 3, sm: 4, md: 6 }} // Responsive spacing
        alignItems="center" // Center align items
      >
        {/* Image Section */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={messageSent} // Add image URL here
            alt={"Support Illustration"}
            sx={{
              width: "100%",
              maxWidth: { xs: "300px", sm: "400px", md: "500px" }, // Responsive image size
              height: "auto",
            }}
          />
        </Box>

        {/* Text and Form Section */}
        <Box
          sx={{
            flex: 1,
            width: "100%",
            textAlign: { xs: "center", md: "left" }, // Center text on small screens
          }}
        >
          {/* Heading */}
          <CustomText
            text={"We're available to help you fix our app"}
            style={{
              fontWeight: "bold",
              fontSize: { xs: ".8rem", sm: "1rem", md: "1.5rem" }, // Responsive font size
              color: theme.palette.text.primary, // Use theme color for text
              marginBottom: { xs: "16px", sm: "24px" }, // Responsive margin
            }}
          />

          {/* Subheading */}
          <CustomText
            text={
              "Send us a message and we'd respond almost immediately... JK we're prompt"
            }
            style={{
              color: theme.palette.text.secondary, // Use theme color for text
              fontSize: { xs: "0.875rem", sm: "1rem", md: "1.125rem" }, // Responsive font size
              marginBottom: { xs: "16px", sm: "24px", md: "32px" }, // Responsive margin
            }}
          />

          {/* Message Input Field */}

          {!user.email && (
            <TextField
              id="email"
              label="Enter your email here"
              fullWidth
              sx={{
                marginBottom: { xs: "16px", sm: "24px", md: "32px" }, // Responsive margin
              }}
              value={supportMessasgeData.email}
              onChange={(e) => handleMessageData(e.target.id, e.target.value)}
            />
          )}

          <TextField
            id="message"
            label="Enter your message here"
            multiline
            rows={6}
            fullWidth
            slotProps={{ htmlInput: { maxLength: messageLength } }}
            sx={{
              marginBottom: { xs: "16px", sm: "24px", md: "32px" }, // Responsive margin
            }}
            helperText={`${remainingMessasgeString}/${messageLength}`}
            value={supportMessasgeData.message}
            onChange={(e) => handleMessageData(e.target.id, e.target.value)}
          />

          {/* Send Message Button */}
          <Box
            sx={{
              width: "100%",
              maxWidth: { xs: "300px", sm: "250px", md: "300px" }, // Responsive button width
              margin: "0 auto", // Center the button
            }}
            onClick={handleSendMessage}
          >
            <CustomButton
              text={"Send Message"}
              sx={{
                width: "100%",
                padding: { xs: "8px 16px", sm: "12px 24px" }, // Responsive padding
                fontSize: { xs: "0.875rem", sm: "1rem" }, // Responsive font size
              }}
              isLoading={isLoading}
            />
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default Support;
