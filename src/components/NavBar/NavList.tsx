import { Stack, useTheme } from "@mui/material";
import CustomButton from "../CustomButton/CustomButton";
import { Link, To, useNavigate } from "react-router"; // Corrected import
import CustomText from "../CustomText/CustomText";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";

const NavList = ({
  toggleDrawer,
}: {
  toggleDrawer: (value: boolean) => void;
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { user } = useContext(GlobalContext);

  const basePages = [
    { name: "Home", id: "/" },
    { name: "Subscriptions", id: "/subscriptions" },
    { name: "Support", id: "/support" },
  ];

  interface Page {
    name: string;
    id: string;
  }

  const getPages = (hasEmail: boolean): Page[] =>
    hasEmail
      ? [...basePages, { name: "Transactions", id: "/transactions" }]
      : [...basePages, { name: "Login", id: "/login" }];

  const [pages, setPages] = useState(() => getPages(Boolean(user.email)));

  const handleNavigation = (key: To) => {
    console.log("here....");

    navigate(key);
    toggleDrawer(false);
  };

  useEffect(() => {
    setPages(getPages(Boolean(user.email)));
  }, [user.email]);

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
        // <Link
        //   key={page.id}
        //   to={page.id}
        //   style={{
        //     textDecoration: "none",
        //     color: theme.palette.text.primary, // Use theme color for text
        //   }}
        // >
        <CustomText
          key={page.id}
          text={page.name}
          style={{
            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" }, // Responsive font size
            color: theme.palette.text.primary, // Use theme color for text
          }}
          onClick={() => handleNavigation(page.id)}
        />
        // </Link>
      ))}

      {/* Sign Up Button */}
      {!user.email ? (
        // <Link to={"/signup"}>
        <CustomButton
          text="Sign Up"
          sx={{
            maxWidth: { xs: "100px", sm: "120px", md: "150px" }, // Responsive button width
            padding: { xs: "0.5em 1em", sm: "0.8em 1.5em" }, // Responsive padding
            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" }, // Responsive font size
          }}
          onClick={() => handleNavigation("/signup")}
        />
      ) : (
        // </Link>
        // <Link to={"/profile"}>
        <CustomButton
          text="Profile"
          sx={{
            maxWidth: { xs: "100px", sm: "120px", md: "150px" }, // Responsive button width
            padding: { xs: "0.5em 1em", sm: "0.8em 1.5em" }, // Responsive padding
            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" }, // Responsive font size
          }}
          onClick={() => handleNavigation("/profile")}
        />
        // </Link>
      )}
    </Stack>
  );
};

export default NavList;
