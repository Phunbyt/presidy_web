import { SxProps, Theme } from "@mui/material";
import Button from "@mui/material/Button";
import { ReactElement } from "react";
import CircularProgress from "@mui/material/CircularProgress";

interface CustomButtonProps {
  outlined?: boolean;
  isLoading?: boolean;
  text: string;
  sx?: SxProps<Theme>;
  startIcon?: ReactElement;
  onClick?: () => void;
}

const CustomButton = ({
  text,
  sx,
  startIcon,
  onClick,
  isLoading,
}: CustomButtonProps) => {
  return (
    <Button
      sx={{
        ...sx,
        cursor: "pointer",
      }}
      variant="outlined"
      startIcon={startIcon}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? <CircularProgress /> : text}
    </Button>
  );
};

export default CustomButton;
