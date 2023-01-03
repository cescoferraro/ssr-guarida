import { Card, experimental_sx, styled } from "@mui/material";

export const ImovelCardContainer = styled(Card)(
  experimental_sx({
    display: "flex",
    flexDirection: "column",
    minWidth: { xs: "90vw", sm: 390, md: 390 },
    boxShadow: "none",
  })
);
