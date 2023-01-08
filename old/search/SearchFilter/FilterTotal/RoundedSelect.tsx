import ArrowBackIosIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  experimental_sx,
  styled,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { SvgIconProps } from "@mui/material/SvgIcon/SvgIcon";
import React from "react";

export const RoundedSelect = styled((props) => (
  <TextField
    SelectProps={{
      IconComponent: (p: SvgIconProps) => (
        <ArrowBackIosIcon {...p} fontSize={"small"} />
      ),
    }}
    {...props}
  />
))<TextFieldProps>(({ theme }) =>
  experimental_sx({
    "& .MuiInputBase-input": {
      color: theme.palette.secondary.contrastText,
      py: 3 / 8,
    },
    "& svg": {
      color: theme.palette.secondary.contrastText,
    },
    "& fieldset": {
      borderRadius: "30px",
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      borderColor: "transparent !important",
      zIndex: -2,
    },
  })
);
