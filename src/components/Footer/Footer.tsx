import { Box, Container, Stack, useTheme } from "@mui/material";
import { presidyLogo } from "../../assets/images";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import { NavLink, useLocation } from "react-router";
import CustomButton from "../CustomButton/CustomButton";
import CustomText from "../CustomText/CustomText";
import { useEffect } from "react";

const Footer = () => {
  const theme = useTheme();
  const location = useLocation();

  const socialLinks = [
    { link: "http://", icon: <FacebookIcon /> },
    { link: "http://", icon: <InstagramIcon /> },
    { link: "http://", icon: <LinkedInIcon /> },
    { link: "http://", icon: <XIcon /> },
  ];

  const quickLinks = [
    { name: "About Us", link: "/#about" },
    { name: "Blog", link: "/blog" },
    { name: "Careers", link: "/careers" },
    { name: "Pricing", link: "/pricing" },
  ];

  const resources = [
    { name: "Help Center", link: "/help" },
    { name: "Privacy Policy", link: "/privacy" },
    { name: "Terms of Service", link: "/terms" },
    { name: "FAQs", link: "/faqs" },
  ];

  useEffect(() => {
    const serviceId = location.hash.substring(1);

    if (serviceId) {
      const serviceElement = document.getElementById(serviceId);
      if (serviceElement) {
        serviceElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper, // Use theme background color
        padding: { xs: "24px", sm: "32px", md: "48px" }, // Responsive padding
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }} // Stack vertically on small screens, horizontally on larger screens
          spacing={{ xs: 4, sm: 6, md: 8 }} // Responsive spacing
          justifyContent="space-between" // Space out the sections
          alignItems={{ xs: "center", md: "flex-start" }} // Center align on small screens
        >
          {/* Logo and Social Links */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", md: "flex-start" }, // Center on small screens
              gap: 2, // Spacing between logo and social links
            }}
          >
            <Box
              component="img"
              src={presidyLogo}
              alt="Presidy Logo"
              sx={{
                width: "100%",
                maxWidth: "200px", // Responsive logo size
                height: "auto",
              }}
            />
            <Stack direction="row" spacing={2}>
              {socialLinks.map((item, index) => (
                <NavLink
                  key={index} // Add a key for list rendering
                  to={item.link}
                  style={{
                    textDecoration: "none",
                    color: theme.palette.text.secondary, // Use theme color for icons
                  }}
                >
                  {item.icon}
                </NavLink>
              ))}
            </Stack>
          </Box>

          {/* Quick Links Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", md: "flex-start" }, // Center on small screens
              gap: 2, // Spacing between items
            }}
          >
            <CustomText
              text={"Quick Links"}
              style={{
                fontWeight: "bold",
                fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" }, // Responsive font size
                color: theme.palette.text.primary, // Use theme color for text
              }}
            />
            <Stack spacing={1}>
              {quickLinks.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.link}
                  style={{
                    textDecoration: "none",
                    color: theme.palette.text.secondary, // Use theme color for links
                  }}
                >
                  <CustomText text={link.name} />
                </NavLink>
              ))}
            </Stack>
          </Box>

          {/* Resources Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", md: "flex-start" }, // Center on small screens
              gap: 2, // Spacing between items
            }}
          >
            <CustomText
              text={"Resources"}
              style={{
                fontWeight: "bold",
                fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" }, // Responsive font size
                color: theme.palette.text.primary, // Use theme color for text
              }}
            />
            <Stack spacing={1}>
              {resources.map((resource, index) => (
                <NavLink
                  key={index}
                  to={resource.link}
                  style={{
                    textDecoration: "none",
                    color: theme.palette.text.secondary, // Use theme color for links
                  }}
                >
                  <CustomText text={resource.name} />
                </NavLink>
              ))}
            </Stack>
          </Box>

          {/* Customer Service Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", md: "flex-start" }, // Center on small screens
              gap: 2, // Spacing between text and button
            }}
          >
            <CustomText
              text={"Customer Service"}
              style={{
                fontWeight: "bold",
                fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" }, // Responsive font size
                color: theme.palette.text.primary, // Use theme color for text
              }}
            />
            <Box
              sx={{
                width: "100%",
                maxWidth: { xs: "200px", sm: "250px", md: "300px" }, // Responsive button width
              }}
            >
              <CustomButton
                text={"Contact Us"}
                sx={{
                  width: "100%",
                  padding: { xs: "8px 16px", sm: "12px 24px" }, // Responsive padding
                  fontSize: { xs: "0.875rem", sm: "1rem" }, // Responsive font size
                }}
              />
            </Box>
          </Box>
        </Stack>

        {/* Footer Bottom (Optional) */}
        <Box
          sx={{
            marginTop: { xs: "24px", sm: "32px", md: "48px" }, // Responsive margin
            textAlign: "center",
            color: theme.palette.text.secondary, // Use theme color for text
          }}
        >
          <CustomText
            text={"© 2024 Presidy. All rights reserved."}
            style={{
              fontSize: { xs: "0.875rem", sm: "1rem" }, // Responsive font size
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
