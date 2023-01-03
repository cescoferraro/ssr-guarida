import { Chip, experimental_sx, styled } from "@mui/material";
import { Categoria } from "typings";

const color = "#444444 !important";
export const ImovelCategoryChip = styled(Chip)<{ categoria?: Categoria }>(
  ({ label }) => {
    return experimental_sx({
      position: "absolute !important",
      top: "10px",
      background: "#F1F1F1",
      padding: 0,
      borderRadius: "4px",
      left: "10px !important",
      color,
      textTransform: "uppercase",
      lineHeight: "19px",
      zIndex: "100",
      height: 19,
      opacity: 0.7,
      "& > span": {
        color: label ? color : "transparent",
        fontSize: 10,
        px: 0.5,
        py: 0,
      },
    });
  }
);
