import { Link, Stack } from "@mui/material";
import CustomButton from "../CustomButton/CustomButton";

const pages = [
  { name: "Home", id: "/" },
  { name: "Subscriptions", id: "subscriptions" },
  { name: "Support", id: "support" },
  { name: "Login", id: "login" },
];

const NavList = () => {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }} // Stack vertically on small screens, row on larger screens
      gap={{ xs: 2, sm: 3, md: 4 }} // Responsive gap between items
      ml={{ xs: 3, sm: 0 }} // Responsive left margin
      mt={{ xs: 3, sm: 0 }} // Responsive top margin
      width={{ xs: "150px", sm: "auto" }} // Responsive width
      alignItems={{ xs: "flex-start", sm: "center" }} // Align items to the left on small screens, center on larger screens
    >
      {/* Navigation Links */}
      {pages.map((page) => (
        <Link
          key={page.id}
          href={page.id}
          sx={{
            textDecoration: "none",
            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" }, // Responsive font size
          }}
        >
          {page.name}
        </Link>
      ))}

      {/* Sign Up Button */}
      <CustomButton
        text="Sign Up"
        sx={{
          maxWidth: { xs: "100px", sm: "120px", md: "150px" }, // Responsive button width
          padding: { xs: "0.5em 1em", sm: "0.8em 1.5em" }, // Responsive padding
          fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" }, // Responsive font size
        }}
      />
    </Stack>
  );
};

export default NavList;
