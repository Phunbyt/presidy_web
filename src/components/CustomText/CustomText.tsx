import { SxProps, Theme } from "@mui/material";
import Typography from "@mui/material/Typography";
interface CustomTextProps {
  text: string;
  style?: SxProps<Theme>;
  variant?: "h1" | "body1";
  component?: "h1" | "p";
}
const CustomText = ({
  text,
  style,
  variant = "body1",
  component = "p",
}: CustomTextProps) => {
  return (
    <Typography
      variant={variant}
      gutterBottom
      component={component}
      sx={{ ...style }}
    >
      {text}
    </Typography>
  );
};

export default CustomText;
