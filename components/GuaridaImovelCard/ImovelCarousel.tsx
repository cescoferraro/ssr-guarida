import { Box } from "@mui/material";
import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { CarouselImage } from "components/GuaridaImovelCard/CarouselImage";
import { Foto } from "typings";

export interface IProps {
  images?: Foto[];
}

export const ImovelCarousel = ({ images }: IProps) => {
  const [visible, setVisible] = useState(false);
  return (
    <Box
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <Carousel
        sx={{ height: 250 }}
        autoPlay={false}
        animation={undefined}
        duration={0}
        cycleNavigation={false}
        navButtonsAlwaysInvisible={false}
        indicators={visible}
        indicatorIconButtonProps={{
          style: {
            color: "white", // 2
            padding: "4px",
          },
        }}
        activeIndicatorIconButtonProps={{ style: { color: "black" } }}
        indicatorContainerProps={{
          style: { marginTop: "-34px", position: "absolute", zIndex: 2 },
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          onClick: (e) => {
            e.preventDefault();
            e.stopPropagation();
          },
        }}
      >
        {(images || []).map((item, index) => (
          <CarouselImage key={index} index={index} item={item} />
        ))}
      </Carousel>
    </Box>
  );
};
