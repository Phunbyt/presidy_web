import { Box, Stack, useTheme } from "@mui/material";
import CustomText from "../CustomText/CustomText";

interface UserPlanCardProps {
  logoUrl: string;
  name: string;
  price: number;
  currency: string;
}

const UserPlanCard = ({
  logoUrl,
  name,
  price,
  currency,
}: UserPlanCardProps) => {
    const theme = useTheme();
    
      const shadowColor =
        theme.palette.mode === "dark"
          ? "rgba(255, 255, 255, 0.1)"
          : "rgba(0, 0, 0, 0.1)";


  return (
    <Stack
      direction="row"
      spacing={{ xs: 2, sm: 3 }} // Responsive spacing between logo and text
      alignItems="center" // Center align items vertically
      sx={{
        padding: { xs: "8px", sm: "12px" }, // Responsive padding
        backgroundColor: theme.palette.background.paper, // Use theme background color
        borderRadius: "12px", // Rounded corners
        boxShadow: `0px 4px 10px ${shadowColor}`, // Dynamic shadow color
        transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth hover effect
        "&:hover": {
          transform: "translateY(-4px)", // Lift card on hover
          boxShadow: `0px 8px 20px ${shadowColor}`, // Enhanced shadow on hover
        },
        width: "100%", // Take full width of the parent container
        maxWidth: "none", // Remove maxWidth constraint
      }}
    >
      {/* Logo */}
      <Box
        component="img"
        src={logoUrl}
        alt={name}
        sx={{
          height: { xs: 40, sm: 50, md: 60 }, // Responsive logo size
          width: { xs: 40, sm: 50, md: 60 }, // Responsive logo size
          borderRadius: "50%", // Circular logo
          objectFit: "cover", // Ensure the image fits well
          border: `2px solid ${theme.palette.primary.main}`, // Add a border
          flexShrink: 0, // Prevent the logo from shrinking
        }}
      />

      {/* Text Section */}
      <Box
        sx={{
          flex: 1, // Allow the text section to grow and fill available space
          minWidth: 0, // Prevent overflow issues
        }}
      >
        {/* Name */}
        <CustomText
          text={name}
          style={{
            fontWeight: "bold",
            fontSize: { xs: "0.75rem", sm: "0.8rem", md: ".9rem" }, // Smaller responsive font size
            color: theme.palette.text.primary, // Use theme text color
            textTransform: "capitalize", // Capitalize text
            // whiteSpace: "nowrap", // Prevent text wrapping
            // overflow: "hidden", // Prevent overflow
            // textOverflow: "ellipsis", // Add ellipsis for overflow
          }}
        />

        {/* Price and Currency */}
        <Stack direction="row" spacing={1} alignItems="baseline">
          <CustomText
            text={`${price}`}
            style={{
              fontWeight: "bold",
              fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" }, // Smaller responsive font size
              color: theme.palette.primary.main, // Use primary color for price
            }}
          />
          <CustomText
            text={currency}
            style={{
              fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" }, // Smaller responsive font size
              color: theme.palette.text.secondary, // Use secondary text color
            }}
          />
        </Stack>
      </Box>
    </Stack>
  );
};

export default UserPlanCard;
