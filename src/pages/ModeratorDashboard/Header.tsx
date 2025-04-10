import { Box, Stack, useTheme, Avatar } from "@mui/material";
import CustomText from "../../components/CustomText/CustomText";

interface HeaderProps {
  firstName: string;
  lastName: string;
}

const Header = ({ firstName, lastName }: HeaderProps) => {
  const theme = useTheme();

  return (
    <Stack direction="row" alignItems="center" spacing={2} mb={4}>
      <Avatar
        sx={{ width: 56, height: 56, bgcolor: theme.palette.primary.main }}
      >
        {firstName?.charAt(0)}
        {lastName?.charAt(0)}
      </Avatar>
      <Box>
        <CustomText
          text={`Welcome, ${firstName}!`}
          style={{
            fontWeight: "bold",
            fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
            color: theme.palette.text.primary,
          }}
        />
        <CustomText
          text="Moderator Dashboard"
          style={{
            fontSize: { xs: "0.875rem", sm: "1rem", md: "1.125rem" },
            color: theme.palette.text.secondary,
          }}
        />
      </Box>
    </Stack>
  );
};

export default Header;
