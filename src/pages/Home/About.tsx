import { Box, Container, Stack, useTheme } from "@mui/material";
import CustomText from "../../components/CustomText/CustomText"; // Import CustomText component
import { delivery, lockedSecurity, yoga } from "../../assets/svgs";

const About = () => {
  const theme = useTheme();

  const aboutItems = [
    {
      title: "Trustworthy and Secure",
      description:
        "At Presidy, we prioritize the stability and security of all subscriptions and accounts. We ensure that all transactions are conducted through our official website, eliminating the risk of fraudulent software and unauthorized transactions.",
      image: lockedSecurity, // Add image URL here
    },
    {
      title: "Exceptional Service at an Affordable Price",
      description:
        "Presidy offers premium services at a lower cost, making it an attractive option for our users. We match users from the same region first, ensuring a seamless experience. Our customer-centric approach means we listen to your feedback and strive to exceed your expectations.",
      image: yoga, // Add image URL here
    },
    {
      title: "Timely Delivery and Expert Support",
      description:
        "At Presidy, we're committed to delivering exceptional value for our products and services. We ensure real-time delivery of your subscriptions and provide professional customer support to address any questions or concerns you may have.",
      image: delivery, // Add image URL here
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper, // Use theme background color
        padding: { xs: "24px", sm: "32px", md: "48px" }, // Responsive padding
      }}
    >
      <Container maxWidth="lg">
        {/* Section Title */}
        <Box id={"about"}>
          <CustomText
            text="About Us"
            style={{
              fontWeight: "bold",
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" }, // Responsive font size
              textAlign: "center",
              color: theme.palette.text.primary, // Use theme color for text
              marginBottom: { xs: "24px", sm: "32px", md: "48px" }, // Responsive margin
            }}
          />
        </Box>

        {/* About Items */}
        <Stack spacing={{ xs: 4, sm: 6, md: 8 }}>
          {aboutItems.map((item, index) => (
            <Stack
              key={index}
              direction={{
                xs: "column",
                md: index % 2 === 0 ? "row" : "row-reverse",
              }} // Alternate layout for each item
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
                  src={item.image} // Add image URL here
                  alt={item.title}
                  sx={{
                    width: "100%",
                    maxWidth: { xs: "300px", sm: "400px", md: "500px" }, // Responsive image size
                    height: "auto",
                    borderRadius: "12px", // Rounded corners
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Subtle shadow
                  }}
                />
              </Box>

              {/* Text Section */}
              <Box
                sx={{
                  flex: 1,
                  textAlign: { xs: "center", md: "left" }, // Center text on small screens
                }}
              >
                {/* Title */}
                <CustomText
                  text={item.title}
                  style={{
                    fontWeight: "bold",
                    fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" }, // Responsive font size
                    color: theme.palette.text.primary, // Use theme color for text
                    marginBottom: { xs: "16px", sm: "24px" }, // Responsive margin
                  }}
                />

                {/* Description */}
                <CustomText
                  text={item.description}
                  style={{
                    color: theme.palette.text.secondary, // Use theme color for text
                    fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" }, // Responsive font size
                  }}
                />
              </Box>
            </Stack>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default About;
