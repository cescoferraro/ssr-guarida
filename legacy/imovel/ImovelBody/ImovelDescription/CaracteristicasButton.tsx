import { Button } from "@mui/material";
import React from "react";

interface IProps {
  label: string;
}

export function CaracteristicasButton({ label }: IProps) {
  return (
    <Button
      sx={{
        color: "#333333",
        borderColor: "#333333",
        "&:hover": { borderColor: "#333333" },
      }}
      variant="outlined"
    >
      {label}
    </Button>
  );
}
