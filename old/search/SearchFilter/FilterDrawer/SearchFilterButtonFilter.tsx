import { useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";

export function FilterTitle(props: {
  first?: boolean;
  title?: string;
  label?: string;
}) {
  return (
    <>
      {props.title && props.label && (
        <Typography
          sx={{
            fontSize: 18,
            color: "#C3C3C3",
            mb: 2,
            mt: props.first ? 0 : 2,
          }}
        >
          {props.title}
          <span
            style={{ color: useTheme().palette.text.primary }}
          >{` ${props.label}`}</span>
        </Typography>
      )}
    </>
  );
}
