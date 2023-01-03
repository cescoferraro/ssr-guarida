import { Box, experimental_sx, styled } from "@mui/material";

export const SearchFormContainer = styled(Box)(() =>
  experimental_sx({
    display: "flex",
    justifyContent: "space-between",
    flexDirection: { xs: "column", sm: "column", md: "row" },
  })
);
