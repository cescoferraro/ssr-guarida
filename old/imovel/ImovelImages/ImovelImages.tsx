import Box from "@mui/material/Box/Box";
import { UseQueryResult } from "@tanstack/react-query";
import { ImovelCarousel } from "old/imovel/ImovelImages/ImovelCarousel";
import { ImovelFotosLightbox } from "old/imovel/ImovelImages/ImovelFotosLightbox";
import React, { useState } from "react";
import { Imovel } from "typings";

interface IProps {
  query: UseQueryResult<Imovel>;
}

interface IState {
  isOpen: boolean;
  photoIndex: number;
}

export const ImovelImages: React.FC<IProps> = ({ query }) => {
  const [state, setState] = useState<IState>({ photoIndex: 0, isOpen: false });
  return (
    <Box sx={{ height: 500 }}>
      <ImovelCarousel query={query} setState={setState} />
      <ImovelFotosLightbox state={state} query={query} setState={setState} />
    </Box>
  );
};
