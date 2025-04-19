import { Box, useTheme } from "@mui/material";
import CustomText from "../../components/CustomText/CustomText";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material"; // Import Material-UI icons for arrows

import PlanCard from "../../components/Plans/PlanCard";
import { useContext, useState, useEffect } from "react";
import { getAvailablePlans, getAPublicPlans } from "../../api/lib/plan";
import { GlobalContext } from "../../context/GlobalContext";

const Plans = () => {
  const theme = useTheme();
  const { token } = useContext(GlobalContext);

  interface SubscriptionPlan {
    _id: {
      $oid: string;
    };
    logoUrl: string;
    name: string;
    price: number;
    currency: string;
    country: string;
    specialEmail: boolean;
  }

  const [availableSubscriptionsData, setAvailableSubscriptionsData] = useState<
    SubscriptionPlan[]
  >([]);

  const handleAvailableSubscriptions = async () => {
    if (token) {
      const { data } = await getAvailablePlans({ token });
      setAvailableSubscriptionsData(data);
    } else {
      const { data } = await getAPublicPlans();

      setAvailableSubscriptionsData(data);
    }
  };

  useEffect(() => {
    handleAvailableSubscriptions();
  }, []);

  // Custom arrow components
  const NextArrow = ({ onClick }: { onClick?: () => void }) => {
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

  const PrevArrow = ({ onClick }: { onClick?: () => void }) => {
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
    infinite: availableSubscriptionsData.length > 3,
    speed: 500,
    slidesToShow: 3, // Default number of slides to show
    slidesToScroll: 1,
    autoplaySpeed: 3000, // Slower autoplay speed for better usability
    autoplay: true,
    centerMode: true,
    centerPadding: "20px", // Padding for center mode
    nextArrow: <NextArrow />, // Custom next arrow
    prevArrow: <PrevArrow />, // Custom previous arrow
    responsive: [
      {
        breakpoint: 1024, // For medium screens (tablets)
        settings: {
          slidesToShow: 2, // Show 2 slides
          centerMode: false, // Disable center mode for better alignment
        },
      },
      {
        breakpoint: 768, // For small screens (mobile)
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
        padding: { xs: "16px", sm: "24px", md: "32px" }, // Responsive padding
      }}
    >
      {/* Heading */}
      <Box
        sx={{
          textAlign: "center",
          marginBottom: { xs: "24px", sm: "32px", md: "48px" }, // Responsive margin
        }}
      >
        <CustomText
          text={"A wide range of premium plans for all your needs"}
          style={{
            fontWeight: "bold",
            fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" }, // Responsive font size
            color: theme.palette.text.primary, // Use theme color for consistency
          }}
        />
      </Box>

      {/* Slider */}
      <Box
        sx={{
          padding: { xs: "0 16px", sm: "0 24px", md: "0 32px" }, // Responsive padding
          position: "relative", // Ensure arrows are positioned correctly
        }}
      >
        <Slider {...settings}>
          {availableSubscriptionsData.map((item, i) => (
            <Box
              key={i} // Add a key for list rendering
              sx={{
                padding: { xs: "8px", sm: "12px", md: "16px" }, // Responsive padding for each slide
              }}
            >
              <PlanCard
                _id={item._id}
                logoUrl={item.logoUrl}
                name={item.name}
                price={item.price}
                currency={item.currency}
                country={item.country}
                specialEmail={item.specialEmail}
              />
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default Plans;
