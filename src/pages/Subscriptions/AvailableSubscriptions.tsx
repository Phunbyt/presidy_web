import {
  Box,
  IconButton,
  InputBase,
  Paper,
  Stack,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2"; // Keep the Grid import as is
import SearchIcon from "@mui/icons-material/Search";
import PlanCard from "../../components/Plans/PlanCard";
import { done } from "../../assets/svgs";
import CustomText from "../../components/CustomText/CustomText";
import { Key } from "react";

interface Subscription {
  _id: {
    $oid: string;
  };
  name: string;
  price: number;
  currency: string;
  country: string;
  logoUrl: string;
  planUrl: string;
  planCode: string;
  status: string;
  members: number;
  specialEmail: boolean;
  familySize: number;
  createdAt: {
    $date: string;
  };
  updatedAt: {
    $date: string;
  };
  __v: number;
}
interface AvailableSubscriptionsProps {
  availableSubscriptionsData: Subscription[];
}

const AvailableSubscriptions = ({
  availableSubscriptionsData,
}: AvailableSubscriptionsProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        padding: { xs: "16px", sm: "24px", md: "32px" }, // Responsive padding
        marginTop: { xs: "16px", sm: "24px", md: "32px" }, // Margin top for the entire component
      }}
    >
      {availableSubscriptionsData.length === 0 ? (
        // Empty State
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            gap: 2, // Spacing between image and text
          }}
        >
          <Box
            component="img"
            src={done} // Add image URL here
            alt={"Empty List"}
            sx={{
              width: "100%",
              maxWidth: { xs: "200px", sm: "300px", md: "400px" }, // Responsive image size
              height: "auto",
            }}
          />

          <CustomText
            text={"Ssshhh... soft life in progress..."}
            style={{
              fontWeight: "bold",
              fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" }, // Responsive font size
              color: theme.palette.text.primary, // Use theme color for text
            }}
          />
        </Box>
      ) : (
        <Stack spacing={{ xs: 3, sm: 4, md: 5 }}>
          {" "}
          {/* Responsive spacing */}
          {/* Search Bar */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: { xs: "16px", sm: "24px", md: "32px" }, // Responsive margin
            }}
          >
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: { xs: "100%", sm: "400px" }, // Responsive width
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search available plans"
                inputProps={{ "aria-label": "search available plans" }}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </Box>
          {/* Grid of Plan Cards */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center", // Center the grid container
            }}
          >
            <Grid
              container
              spacing={{ xs: 2, sm: 3, md: 4 }} // Responsive spacing
              sx={{
                maxWidth: "1200px", // Limit grid width for larger screens
                width: "100%", // Ensure grid takes full width on smaller screens
              }}
            >
              {availableSubscriptionsData.map(
                (
                  item: {
                    _id: {
                      $oid: string;
                    };
                    logoUrl: string;
                    name: string;
                    price: number;
                    currency: string;
                    country: string;
                    specialEmail: boolean;
                  },
                  index: Key | null | undefined
                ) => (
                  <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    {/* Correctly sized grid items */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center", // Center the PlanCard
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
                        logoStyle={{
                          height: { xs: 30, sm: 50, md: 70 }, // Responsive logo size
                          width: { xs: 30, sm: 50, md: 70 }, // Responsive logo size
                        }}
                        headerTextStyle={{
                          fontSize: {
                            xs: ".6rem",
                            sm: ".8rem",
                            md: "1rem",
                          }, // Responsive font size
                        }}
                      />
                    </Box>
                  </Grid>
                )
              )}
            </Grid>
          </Box>
        </Stack>
      )}
    </Box>
  );
};

export default AvailableSubscriptions;
