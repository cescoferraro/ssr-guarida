import { Box } from "@mui/material";
import React from "react";

interface IProps {
  item?: { foto?: string | null };
  index: number;
}

export const CarouselImage = (props: IProps) => {
  const imgPath = props?.item?.foto || "";
  return (
    <Box
      sx={{
        display: "block",
        height: 250,
        overflow: "hidden",
        width: "100%",
        backgroundImage: `url(${imgPath})`,
        backgroundSize: "cover",
      }}
    />
  );
};
