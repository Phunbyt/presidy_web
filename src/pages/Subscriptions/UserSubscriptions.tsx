import { Box, Stack, useTheme } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material"; // Import Material-UI icons for arrows
import Slider from "react-slick";
import UserPlanCard from "../../components/Plans/UserPlanCard";
import { noComments } from "../../assets/svgs";
import CustomText from "../../components/CustomText/CustomText";

const UserSubscriptions = ({ userSubscriptionsData }) => {
  const theme = useTheme();

  // Custom arrow components
  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <Box
        sx={{
          position: "absolute",
          right: { xs: "-10px", sm: "-20px", md: "-30px" }, // Adjust position based on screen size
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1,
          cursor: "pointer",
          color: theme.palette.text.primary, // Use theme color for arrows
          "&:hover": {
            color: theme.palette.primary.main, // Change color on hover
          },
        }}
        onClick={onClick}
      >
        <ArrowForwardIos fontSize="large" />
      </Box>
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <Box
        sx={{
          position: "absolute",
          left: { xs: "-10px", sm: "-20px", md: "-30px" }, // Adjust position based on screen size
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1,
          cursor: "pointer",
          color: theme.palette.text.primary, // Use theme color for arrows
          "&:hover": {
            color: theme.palette.primary.main, // Change color on hover
          },
        }}
        onClick={onClick}
      >
        <ArrowBackIos fontSize="large" />
      </Box>
    );
  };

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Default number of slides to show
    slidesToScroll: 1,
    centerPadding: "20px", // Padding for center mode
    nextArrow: <NextArrow />, // Custom next arrow
    prevArrow: <PrevArrow />, // Custom previous arrow
    responsive: [
      {
        breakpoint: 1024, // For medium screens (tablets)
        settings: {
          slidesToShow: 3, // Show 3 slides
          centerMode: false, // Disable center mode for better alignment
        },
      },
      {
        breakpoint: 768, // For small screens (mobile)
        settings: {
          slidesToShow: 2, // Show 2 slides
          centerMode: false, // Disable center mode for better alignment
        },
      },
      {
        breakpoint: 480, // For extra small screens
        settings: {
          slidesToShow: 1, // Show 1 slide
          centerMode: false, // Disable center mode for better alignment
        },
      },
    ],
  };

  return (
    <Box
      sx={{
        padding: { xs: "0 16px", sm: "0 24px", md: "0 32px" }, // Responsive padding
        position: "relative", // Ensure arrows are positioned correctly
      }}
    >
      {userSubscriptionsData?.length === 0 ? (
        // Empty State
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
              src={noComments} // Add image URL here
              alt={"Empty List"}
              sx={{
                width: "100%",
                maxWidth: { xs: "200px", sm: "300px", md: "400px" }, // Responsive image size
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
              text={"Take a seat"}
              style={{
                fontWeight: "bold",
                fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" }, // Responsive font size
                color: theme.palette.text.primary, // Use theme color for text
                marginBottom: { xs: "16px", sm: "24px" }, // Responsive margin
              }}
            />

            {/* Description */}
            <CustomText
              text={"Now tell us why you're yet to subscribe"}
              style={{
                color: theme.palette.text.secondary, // Use theme color for text
                fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" }, // Responsive font size
              }}
            />
          </Box>
        </Stack>
      ) : (
        // Slider with User Subscriptions
        <Slider {...settings}>
          {userSubscriptionsData.map((item, i) => (
            <Box
              key={i} // Add a key for list rendering
              sx={{
                padding: { xs: "8px", sm: "12px", md: "16px" }, // Responsive padding for each slide
              }}
            >
              <UserPlanCard
                logoUrl={item.logoUrl}
                name={item.name}
                price={item.price}
                currency={item.currency}
              />
            </Box>
          ))}
        </Slider>
      )}
    </Box>
  );
};

export default UserSubscriptions;
