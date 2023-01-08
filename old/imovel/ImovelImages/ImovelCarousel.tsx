import { Box } from "@mui/material";
import { UseQueryResult } from "@tanstack/react-query";
import { chunk } from "lodash";
import { AppSliderImagesDetalhes } from "old/imovel/ImovelImages/AppSliderImagesDetalhes";
import React, { Dispatch, SetStateAction, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Imovel } from "typings";

interface IProps {
  setState: Dispatch<SetStateAction<{ isOpen: boolean; photoIndex: number }>>;
  query: UseQueryResult<Imovel>;
}

export const ImovelCarousel = ({ setState, query }: IProps) => {
  const size = 5;
  const [visible, setVisible] = useState(false);
  return (
    <Box
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <Carousel
        animation="slide"
        swipe={false}
        // timeout={{ appear: 0, enter: 900, exit: 900 }}
        // animation={undefined}
        autoPlay={false}
        cycleNavigation={false}
        navButtonsAlwaysVisible={visible}
        indicators={visible}
        sx={{ zIndex: 0 }}
        navButtonsAlwaysInvisible={false}
        indicatorIconButtonProps={{ style: { padding: "4px" } }}
        indicatorContainerProps={{
          style: { marginTop: "-34px", position: "absolute", zIndex: 10 },
        }}
      >
        {chunk(query.data?.fotos || [], size).map((foto, index) => (
          <AppSliderImagesDetalhes
            step={size}
            key={index}
            index={index}
            onClick={(photoIndex) => setState({ photoIndex, isOpen: true })}
            images={foto}
          />
        ))}
      </Carousel>
    </Box>
  );
};
