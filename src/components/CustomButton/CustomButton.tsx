import { SxProps, Theme } from "@mui/material";
import Button from "@mui/material/Button";
import { ReactElement } from "react";

interface CustomButtonProps {
  outlined?: boolean;
  text: string;
  sx?: SxProps<Theme>;
  startIcon?: ReactElement;
}

const CustomButton = ({ text, sx, startIcon }: CustomButtonProps) => {
  return (
    <Button
      sx={{
        ...sx,
      }}
      variant="outlined"
      startIcon={startIcon}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
