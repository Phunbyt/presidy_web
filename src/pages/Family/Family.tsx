import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  Container,
  Typography,
  CircularProgress,
  Link,
  Box,
} from "@mui/material";
import CustomText from "../../components/CustomText/CustomText";
import { getFamilyDetails } from "../../api/lib/plan";
import { toast } from "react-toastify";

type FamilyData = {
  familyLink: string;
  planName: string;
  webDetailsData: string;
};

const Family = () => {
  const { familyUrlId } = useParams<{ familyUrlId: string }>();
  const [data, setData] = useState<FamilyData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFamilyData = async () => {
      try {
        const { data } = await getFamilyDetails({
          familyUrlId: familyUrlId ?? "",
        });

        setData({
          familyLink: data.familyLink,
          webDetailsData: data.webDetailsData,
          planName: data.planName,
        });
      } catch {
        toast.error("Error getting family contact admin");

        setData(null);
      } finally {
        setLoading(false);
      }
    };

    if (familyUrlId) {
      fetchFamilyData();
    }
  }, [familyUrlId]);

  return (
    <Container
      sx={{
        padding: { xs: "16px", sm: "24px", md: "32px" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "50vh",
        textAlign: "center",
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : data ? (
        <Box sx={{ width: "100%", maxWidth: 500 }}>
          <Link
            href={data.familyLink}
            underline="hover"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Typography
              variant="h6"
              sx={{ mb: 2, textTransform: "capitalize" }}
            >
              Clike here to Join {data.planName}
            </Typography>
          </Link>

          <CustomText
            text="Use the detail(s) below on the service provider platform"
            style={{
              fontSize: { xs: "1rem", sm: "1.25rem" },
              fontWeight: 600,
              marginBottom: "8px",
            }}
          />

          <CustomText
            text={data.webDetailsData}
            style={{
              fontSize: { xs: "1rem", sm: "1.25rem" },
            }}
          />
        </Box>
      ) : (
        <Typography color="error">Failed to load family data.</Typography>
      )}
    </Container>
  );
};

export default Family;
