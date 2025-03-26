import {
  Box,
  Stack,
  Avatar,
  Divider,
  useTheme,
  Container,
} from "@mui/material";
import { useContext, useEffect } from "react";

import { GlobalContext } from "../../context/GlobalContext";
import CustomText from "../../components/CustomText/CustomText";
import CustomButton from "../../components/CustomButton/CustomButton";
import VerifiedIcon from "@mui/icons-material/Verified";
import PendingIcon from "@mui/icons-material/Pending";
import LogoutIcon from "@mui/icons-material/Logout";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";

import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import countryList from "react-select-country-list";

const ProfilePage = () => {
  const theme = useTheme();
  const { logout, user } = useContext(GlobalContext);
  const navigate = useNavigate();

  // Format the date
  const joinDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const countryName = countryList().getLabel(user.country);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    if (!user.email) {
      toast.error("Oops, you're not supposed to this this!");

      navigate("/");

      return;
    }
  }, [user]);

  return (
    <Container>
      <Box
        sx={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: { xs: "16px", sm: "24px", md: "32px" },
          backgroundColor: theme.palette.background.paper,
          borderRadius: "16px",
          boxShadow: theme.shadows[3],
          mt: 4,
          mb: 6,
        }}
      >
        {/* Profile Header */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 3, sm: 4, md: 6 }}
          alignItems="center"
          mb={4}
        >
          <Avatar
            sx={{
              width: { xs: 120, sm: 150 },
              height: { xs: 120, sm: 150 },
              fontSize: { xs: "3rem", sm: "4rem" },
              bgcolor: theme.palette.primary.main,
            }}
          >
            {user.firstName.charAt(0)}
            {user.lastName.charAt(0)}
          </Avatar>

          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: { xs: "center", sm: "flex-start" },
              textAlign: { xs: "center", sm: "left" },
              gap: { xs: 2, sm: 3 },
            }}
          >
            <CustomText
              text={`${user.firstName} ${user.lastName}`}
              style={{
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                fontWeight: "bold",
                lineHeight: 1.2,
                color: theme.palette.text.primary,
              }}
            />

            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              justifyContent={{ xs: "center", sm: "flex-start" }}
            >
              <CustomText
                text={`@${user.username}`}
                style={{
                  fontSize: { xs: "1rem", sm: "1.25rem" },
                  color: theme.palette.text.secondary,
                }}
              />

              {user.isVerified ? (
                <VerifiedIcon color="primary" fontSize="small" />
              ) : (
                <PendingIcon color="disabled" fontSize="small" />
              )}
            </Stack>

            <Stack
              direction="row"
              spacing={2}
              mt={2}
              justifyContent={{ xs: "center", sm: "flex-start" }}
            >
              <Box
                sx={{ width: { xs: "100%", sm: "auto" }, maxWidth: "200px" }}
              >
                <CustomButton
                  text="Logout"
                  onClick={handleLogout}
                  startIcon={<LogoutIcon />}
                  sx={{
                    width: "100%",
                    padding: { xs: "8px 16px", sm: "10px 20px" },
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                    borderRadius: "20px",
                  }}
                />
              </Box>

              {!user.isVerified && (
                <Box
                  sx={{ width: { xs: "100%", sm: "auto" }, maxWidth: "200px" }}
                >
                  <CustomButton
                    text="Verify Account"
                    sx={{
                      width: "100%",
                      padding: { xs: "8px 16px", sm: "10px 20px" },
                      fontSize: { xs: "0.875rem", sm: "1rem" },
                      borderRadius: "20px",
                    }}
                    onClick={logout}
                  />
                </Box>
              )}
            </Stack>
          </Box>
        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* Profile Details */}
        <Box>
          <CustomText
            text="Account Details"
            style={{
              fontSize: { xs: "1.5rem", sm: "1.75rem" },
              fontWeight: "bold",
              color: theme.palette.text.primary,
              mb: 3,
            }}
          />

          <Stack spacing={{ xs: 2, sm: 3 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <EmailIcon color="primary" />
              <Box>
                <CustomText
                  text="Email Address"
                  style={{
                    fontSize: "0.875rem",
                    color: theme.palette.text.secondary,
                  }}
                />
                <CustomText
                  text={user.email}
                  style={{
                    fontSize: { xs: "1rem", sm: "1.125rem" },
                  }}
                />
              </Box>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <LocationOnIcon color="primary" />
              <Box>
                <CustomText
                  text="Country"
                  style={{
                    fontSize: "0.875rem",
                    color: theme.palette.text.secondary,
                  }}
                />
                <CustomText
                  text={countryName}
                  style={{
                    fontSize: { xs: "1rem", sm: "1.125rem" },
                  }}
                />
              </Box>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <CalendarTodayIcon color="primary" />
              <Box>
                <CustomText
                  text="Member Since"
                  style={{
                    fontSize: "0.875rem",
                    color: theme.palette.text.secondary,
                  }}
                />
                <CustomText
                  text={joinDate}
                  style={{
                    fontSize: { xs: "1rem", sm: "1.125rem" },
                  }}
                />
              </Box>
            </Stack>
          </Stack>
        </Box>

        {/* Account Status Card */}
        <Box
          sx={{
            mt: 4,
            p: 3,
            // backgroundColor: theme.palette.grey[100],
            borderRadius: "12px",
            borderLeft: `4px solid ${
              user.isVerified
                ? theme.palette.success.main
                : theme.palette.warning.main
            }`,
          }}
        >
          <CustomText
            text="Account Status"
            style={{
              fontSize: { xs: "1.25rem", sm: "1.5rem" },
              fontWeight: "bold",
              color: theme.palette.text.primary,
              mb: 1,
            }}
          />
          <CustomText
            text={
              user.isVerified
                ? "Your account is verified and has full access to all features."
                : "Your account is not yet verified. Please check your email for verification instructions."
            }
            style={{
              fontSize: { xs: "0.875rem", sm: "1rem" },
              color: theme.palette.text.secondary,
            }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default ProfilePage;
