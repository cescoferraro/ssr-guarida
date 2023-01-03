import { CardContent, experimental_sx, styled } from "@mui/material";

export const ImovelCardContentContainer = styled(CardContent)(
  experimental_sx({
    cursor: "pointer",
    px: 0,
    py: 0,
    pb: "0px !important",
  })
);
