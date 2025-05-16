import { Box, Stack, useTheme } from "@mui/material";
import { musicCelebrate, painter, sports } from "../../assets/svgs";
import CustomText from "../../components/CustomText/CustomText";

const featuresList = [
  {
    title: "Create",
    description: "Create a Family Subscription on our supported platforms... choose the maximum capacity",
    image: painter,
  },
  {
    title: "Submit",
    description:
      "Submit the family link and your bank account information for rembursement",
    image: sports,
  },
  {
    title: "Serenade",
    description:
      "Set up once and enjoy all FREE subscription and additional perks",
    image: musicCelebrate,
  },
];

const Features = () => {
  const theme = useTheme();

  return (
    <Stack
      direction={{ xs: "column", md: "row" }} // Stack vertically on small screens, horizontally on medium and larger screens
      spacing={{ xs: 4, sm: 6, md: 8 }} // Responsive spacing between sections
      sx={{
        padding: { xs: "16px", sm: "24px", md: "32px" }, // Responsive padding
        alignItems: "center", // Center content vertically
        textAlign: "center", // Center text for all screen sizes
      }}
    >
      {featuresList.map((feature, index) => (
        <Box
          key={index} // Add a key for list rendering
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center", // Center content horizontally
            gap: 2, // Consistent spacing between elements
            maxWidth: { xs: "100%", sm: "400px", md: "500px" }, // Limit width for better readability
          }}
        >
          {/* Feature Image */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center", // Center image horizontally
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              alt={feature.title} // Use feature title as alt text
              src={feature.image}
              sx={{
                width: "100%",
                maxWidth: { xs: "200px", sm: "250px", md: "300px" }, // Responsive image size
                height: "auto",
                borderRadius: "8px", // Optional: Add rounded corners
              }}
            />
          </Box>

          {/* Feature Title */}
          <CustomText
            text={feature.title}
            style={{
              fontWeight: "bold",
              fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" }, // Responsive font size
              color: theme.palette.text.primary, // Use theme color for consistency
            }}
          />

          {/* Feature Description */}
          <CustomText
            text={feature.description}
            style={{
              fontWeight: "300",
              fontSize: { xs: "0.875rem", sm: "1rem", md: "1.125rem" }, // Responsive font size
              color: theme.palette.text.secondary, // Use theme color for consistency
              maxWidth: "400px", // Limit description width for better readability
            }}
          />
        </Box>
      ))}
    </Stack>
  );
};

export default Features;
