import { Box, Stack, SxProps, Theme, useTheme } from "@mui/material";
import CustomButton from "../CustomButton/CustomButton";
import CustomText from "../CustomText/CustomText"; // Import CustomText component

interface PlanCardProps {
  logoUrl: string;
  name: string;
  price: number;
  currency: string;
  country: string;
  logoStyle?: SxProps<Theme>;
  headerTextStyle?: SxProps<Theme>;
  subTextStyle?: SxProps<Theme>;
  currencyTextStyle?: SxProps<Theme>;
  buttonStyle?: SxProps<Theme>;
}

const PlanCard = ({
  logoUrl,
  name,
  price,
  currency,
  country,
  logoStyle,
  headerTextStyle,
  subTextStyle,
  currencyTextStyle,
  buttonStyle,
}: PlanCardProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper, // Use theme background color
        borderRadius: "12px", // Rounded corners
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Subtle shadow
        padding: { xs: "16px", sm: "20px", md: "24px" }, // Responsive padding
        transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth hover effect
        "&:hover": {
          transform: "translateY(-8px)", // Lift card on hover
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)", // Enhanced shadow on hover
        },
        maxWidth: "300px", // Limit card width
        width: "100%", // Ensure it takes full width on small screens
        textAlign: "center", // Center content
      }}
    >
      <Stack spacing={2} alignItems="center">
        {/* Logo */}
        <Box
          component="img"
          src={logoUrl}
          alt={name}
          sx={{
            height: { xs: 60, sm: 80, md: 100 }, // Responsive logo size
            width: { xs: 60, sm: 80, md: 100 }, // Responsive logo size
            borderRadius: "50%", // Circular logo
            objectFit: "cover", // Ensure the image fits well
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow
            ...logoStyle,
          }}
        />

        {/* Name */}
        <CustomText
          text={name}
          style={{
            fontWeight: "bold",
            fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" }, // Responsive font size
            color: theme.palette.text.primary, // Use theme text color
            textTransform: "capitalize", // Capitalize text
            ...headerTextStyle,
          }}
        />

        {/* Price and Currency */}
        <Stack direction="row" spacing={1} alignItems="baseline">
          <CustomText
            text={`${price}`}
            style={{
              fontWeight: "bold",
              fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" }, // Responsive font size
              color: theme.palette.primary.main, // Use primary color for price
              ...subTextStyle,
            }}
          />
          <CustomText
            text={currency}
            style={{
              fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" }, // Responsive font size
              color: theme.palette.text.secondary, // Use secondary text color
            }}
          />
        </Stack>

        {/* Country */}
        <CustomText
          text={country}
          style={{
            fontSize: { xs: "0.875rem", sm: "1rem", md: "1.125rem" }, // Responsive font size
            color: theme.palette.text.secondary, // Use secondary text color
            fontWeight: 500,
            textTransform: "capitalize", // Capitalize text
            ...currencyTextStyle,
          }}
        />

        {/* Join Now Button */}
        <Box
          sx={{
            width: "100%",
            maxWidth: { xs: "200px", sm: "250px", md: "300px" }, // Responsive button width
            marginTop: { xs: "16px", sm: "24px", md: "32px" }, // Responsive margin
          }}
        >
          <CustomButton
            text={"Join Now"}
            sx={{
              width: "100%",
              padding: { xs: "8px 16px", sm: "12px 24px" }, // Responsive padding
              fontSize: { xs: "0.875rem", sm: "1rem" }, // Responsive font size
              ...buttonStyle,
            }}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default PlanCard;
