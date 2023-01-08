import { Button, ButtonProps, useTheme } from "@mui/material";
import React from "react";

interface IProps extends ButtonProps {
  isSelected: boolean;
  label: string;
}

export function WeirdButton(props: IProps) {
  const contrastText = useTheme().palette.info.contrastText;
  const mainText = useTheme().palette.secondary.main;
  const color = props.isSelected
    ? `${mainText} !important`
    : `${contrastText} !important`;
  return (
    <Button
      variant="outlined"
      sx={{
        ...props.sx,
        color: props.isSelected ? "black" : contrastText,
        fontWeight: props.isSelected ? 700 : 400,
        borderColor: color,
        ":hover": {
          color: "black",
          borderColor: color,
          opacity: 0.4,
        },
      }}
      onClick={props.onClick}
      color="secondary"
    >
      {props.label}
    </Button>
  );
}
