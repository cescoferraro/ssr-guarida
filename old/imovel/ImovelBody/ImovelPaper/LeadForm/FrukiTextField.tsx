import { Box, TextField, TextFieldProps, useTheme } from "@mui/material";
import { FilledTextFieldProps } from "@mui/material/TextField/TextField";
import React from "react";
import { PatternFormat } from "react-number-format";

interface IProps extends FilledTextFieldProps {
  format?: string;
  mask?: string;
  errorString?: string;
}

export function GuaridaTextField({
  format,
  mask,
  errorString,
  variant = "filled",
  ...pr
}: IProps) {
  const theme = useTheme();
  const props: TextFieldProps = {
    color: "secondary",
    sx: {
      borderRadius: 10,
      borderColor: theme.palette.grey.A200,
      "& fieldset": {
        borderRadius: 50,
      },
    },
    fullWidth: true,
    helperText: errorString || " ",
    variant,
    ...pr,
  };
  return (
    <Box>
      {format ? (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <PatternFormat
          format={format}
          mask={mask}
          customInput={TextField}
          {...props}
        />
      ) : (
        <TextField {...props} />
      )}
    </Box>
  );
}
