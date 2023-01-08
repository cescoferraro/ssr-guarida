import { Chip, experimental_sx, styled } from "@mui/material";
import { Categoria } from "typings";

export const ImovelCategoryChip = styled(Chip)<{ categoria?: Categoria }>(
  ({ categoria }) =>
    experimental_sx({
      position: "absolute !important",
      top: "10px",
      background: "#F1F1F1",
      padding: 0,
      borderRadius: "4px",
      left: "10px !important",
      color: "#444444 !important",
      textTransform: "uppercase",
      lineHeight: "19px",
      zIndex: 9,
      height: 19,
      opacity: 0.7,
      "& > span": {
        color: categoria?.nome ? "unset" : "transparent",
        fontSize: 10,
        px: 0.5,
        py: 0,
      },
    })
);
