import { SxProps, Theme } from "@mui/material";
import Button from "@mui/material/Button";

interface CustomButtonProps {
  outlined?: boolean;
  text: string;
  sx?: SxProps<Theme>;
}

const CustomButton = ({ text, sx }: CustomButtonProps) => {
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
