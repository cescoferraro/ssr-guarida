import { UseQueryResult } from "@tanstack/react-query";
import { chunk } from "lodash";
import { AppSliderImagesDetalhes } from "legacy/imovel/ImovelImages/AppSliderImagesDetalhes";
import React, { Dispatch, SetStateAction } from "react";
import Carousel from "react-material-ui-carousel";
import { Imovel } from "typings";

interface IProps {
  setState: Dispatch<SetStateAction<{ isOpen: boolean; photoIndex: number }>>;
  query: UseQueryResult<Imovel>;
}

export const ImovelCarousel = ({ setState, query }: IProps) => {
  const size = 5;
  return (
    <Carousel
      navButtonsAlwaysVisible={false}
      animation={undefined}
      indicators={true}
      autoPlay={false}
      cycleNavigation={false}
      sx={{ zIndex: 0 }}
      navButtonsAlwaysInvisible={false}
      indicatorIconButtonProps={{ style: { padding: "4px" } }}
      indicatorContainerProps={{
        style: { marginTop: "-34px", position: "absolute", zIndex: 0 },
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
  );
};
