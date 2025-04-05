import { TextField, useTheme } from "@mui/material";

import { ChangeEvent } from "react";

interface CustomInputFieldProps {
  id: string;
  label: string;
  type: string;
  fullWidth: boolean;
  sx?: object;
  value: string;
  multiline?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  rows?: number;
  slotProps?: object;
  helperText?: string;
}

const CustomInputField: React.FC<CustomInputFieldProps> = ({
  id,
  label,
  type,
  fullWidth,
  multiline,
  rows,
  sx,
  value,
  onChange,
  slotProps,
  helperText,
}) => {
  const theme = useTheme();

  return (
    <TextField
      id={id}
      label={label}
      type={type}
      fullWidth={fullWidth}
      multiline={multiline}
      rows={rows}
      helperText={helperText}
      slotProps={{ ...slotProps }}
      sx={{
        ...sx,
        "& .MuiOutlinedInput-input": {
          "&:-webkit-autofill": {
            "-webkit-box-shadow": `0 0 0 100px ${theme.palette.background.paper} inset`,
            "-webkit-text-fill-color": theme.palette.text.primary,
          },
        },
      }}
      value={value}
      onChange={onChange}
    />
  );
};

export default CustomInputField;
