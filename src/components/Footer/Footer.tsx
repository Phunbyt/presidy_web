import { Box, Container, Stack, useTheme } from "@mui/material";
import { lightLogo, presidyLogo } from "../../assets/images";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import { Link, NavLink, useLocation } from "react-router";
import CustomButton from "../CustomButton/CustomButton";
import CustomText from "../CustomText/CustomText";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import Grid from "@mui/material/Grid2"; // Keep the Grid import as is

const Footer = () => {
  const theme = useTheme();
  const location = useLocation();
  const { darkTheme } = useContext(GlobalContext);

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); //scroll to the top of the page
  };

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
        backgroundColor: theme.palette.background.paper,
        padding: { xs: "24px", sm: "32px", md: "48px" },
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          sx={{ justifyContent: "space-between" }}
          spacing={{ xs: 4, sm: 6, md: 4 }}
        >
          {/* Logo and Social Links - First column */}
          <Grid sx={{}} size={{ xs: 6, md: 3 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "flex-start", md: "flex-start" },
                gap: 2,
              }}
            >
              <Box
                component="img"
                src={darkTheme ? lightLogo : presidyLogo}
                alt="Presidy Logo"
                sx={{
                  width: "100%",
                  maxWidth: "200px",
                  height: "auto",
                }}
              />
              <Stack
                direction="row"
                spacing={{ xs: 1, sm: 1.5, md: 2, lg: 2.5 }}
              >
                {socialLinks.map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.link}
                    onClick={handleLinkClick}
                    style={{
                      textDecoration: "none",
                      color: theme.palette.text.secondary,
                    }}
                  >
                    {item.icon}
                  </NavLink>
                ))}
              </Stack>
            </Box>
          </Grid>

          {/* Quick Links Section - Second column */}
          <Grid sx={{}} size={{ xs: 6, md: 2 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "flex-start", md: "flex-start" },
                gap: 2,
              }}
            >
              <CustomText
                text={"Quick Links"}
                style={{
                  fontWeight: "bold",
                  fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
                  color: theme.palette.text.primary,
                }}
              />
              <Stack spacing={1}>
                {quickLinks.map((link, index) => (
                  <NavLink
                    key={index}
                    to={link.link}
                    style={{
                      textDecoration: "none",
                      color: theme.palette.text.secondary,
                    }}
                  >
                    <CustomText text={link.name} />
                  </NavLink>
                ))}
              </Stack>
            </Box>
          </Grid>

          {/* Resources Section - Third column */}
          <Grid sx={{}} size={{ xs: 6, md: 2 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "flex-start", md: "flex-start" },
                gap: 2,
              }}
            >
              <CustomText
                text={"Resources"}
                style={{
                  fontWeight: "bold",
                  fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
                  color: theme.palette.text.primary,
                }}
              />
              <Stack spacing={1}>
                {resources.map((resource, index) => (
                  <NavLink
                    key={index}
                    to={resource.link}
                    style={{
                      textDecoration: "none",
                      color: theme.palette.text.secondary,
                    }}
                  >
                    <CustomText text={resource.name} />
                  </NavLink>
                ))}
              </Stack>
            </Box>
          </Grid>

          {/* Customer Service Section - Fourth column */}
          <Grid sx={{}} size={{ xs: 6, md: 3 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "flex-start", md: "flex-start" },
                gap: 2,
              }}
            >
              <CustomText
                text={"Customer Service"}
                style={{
                  fontWeight: "bold",
                  fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
                  color: theme.palette.text.primary,
                }}
              />
              <Box
                sx={{
                  width: "100%",
                  maxWidth: { xs: "200px", sm: "250px", md: "300px" },
                }}
              >
                <Link to={"/support"}>
                  <CustomButton
                    text={"Contact Us"}
                    sx={{
                      width: "100%",
                      padding: { xs: "8px 16px", sm: "12px 24px" },
                      fontSize: { xs: "0.875rem", sm: "1rem" },
                    }}
                  />
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Footer Bottom */}
        <Box
          sx={{
            marginTop: { xs: "24px", sm: "32px", md: "48px" },
            textAlign: "center",
            color: theme.palette.text.secondary,
          }}
        >
          <CustomText
            text={"© 2024 Presidy. All rights reserved."}
            style={{
              fontSize: { xs: "0.875rem", sm: "1rem" },
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
