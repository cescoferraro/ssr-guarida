import { experimental_sx, styled, TextField } from "@mui/material";

export const RoundedSelect = styled(TextField)(({ theme }) =>
  experimental_sx({
    "& .MuiInputBase-input": { py: 3 / 8 },
    "& svg": {
      color: theme.palette.primary.dark,
    },
    "& fieldset": {
      borderRadius: "30px",
      backgroundColor: theme.palette.info.main,
      color: "purple",
      borderColor: "transparent !important",
      zIndex: -2,
    },
  })
);
