import { Box, experimental_sx, styled } from "@mui/material";

export const SearchContainer = styled(Box)(
  experimental_sx({
    flexGrow: 1,
    overflowY: "scroll",
    marginTop: {
      xs: 208 / 8,
      sm: 220 / 8,
      md: 256 / 8,
    },
    background:
      "transparent linear-gradient(180deg, #fff 0%, #F6F5F5 360px) 0% 0% no-repeat padding-box;",
  })
);
