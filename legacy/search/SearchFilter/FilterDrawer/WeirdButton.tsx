import { Button, ButtonProps, useTheme } from "@mui/material";
import React from "react";

interface IProps extends ButtonProps {
  isSelected: boolean;
  label: string;
}

export function WeirdButton(props: IProps) {
  const contrastText = useTheme().palette.info.contrastText;
  const mainText = useTheme().palette.primary.main;
  const color = props.isSelected
    ? `${mainText} !important`
    : `${contrastText} !important`;
  return (
    <Button
      variant="outlined"
      sx={{
        ...props.sx,
        color: color,
        borderColor: color,
        ":hover": {
          color: color,
          borderColor: color,
          opacity: 0.4,
        },
      }}
      onClick={props.onClick}
      color="primary"
    >
      {props.label}
    </Button>
  );
}
