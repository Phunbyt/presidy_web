import { SxProps, Theme } from "@mui/material";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
interface CustomButtonProps {
  outlined?: boolean;
  text: string;
  sx?: SxProps<Theme>;
}

const CustomButton = ({ text, sx }: CustomButtonProps) => {
  const { theme } = useContext(GlobalContext);

  return (
    <Button
      sx={{
        ...sx,
      }}
      variant="outlined"
    >
      {text}
    </Button>
  );
};

export default CustomButton;
