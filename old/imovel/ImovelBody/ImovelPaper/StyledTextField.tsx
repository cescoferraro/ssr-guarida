import { TextField, TextFieldProps } from "@mui/material";
import React from "react";

export const StyledTextField = (props: TextFieldProps) => {
  return (
    <TextField
      InputProps={{ disableUnderline: true }}
      {...props}
      variant="filled"
      sx={{ ...props.sx, textUnderlinePosition: "none" }}
    />
  );
};
