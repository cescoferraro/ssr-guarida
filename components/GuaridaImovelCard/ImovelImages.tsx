import { Box, CardMedia, Skeleton } from "@mui/material";
import { useGuaridaCategorias } from "common/hooks/useGuaridaCategorias";
import { ImovelCarousel } from "components/GuaridaImovelCard/ImovelCarousel";
import { ImovelCategoryChip } from "components/GuaridaImovelCard/ImovelCategoryChip";
import React from "react";
import { Imovel, SearchInput } from "typings";

interface IProps {
  imovel?: Imovel;
  input?: Partial<SearchInput>;
}

export const ImovelImages = ({ imovel, input }: IProps) => {
  const { data } = useGuaridaCategorias(input, "putari");
  const categoria = data?.find((d) => String(d.id) === String(imovel?.tipo));
  return (
    <CardMedia component={"div"} sx={{ cursor: "pointer" }}>
      <Box position="relative">
        <ImovelCategoryChip color="info" label={categoria?.nome} />
      </Box>
      <Box sx={{ height: 250 }}>
        {!imovel ? (
          <Skeleton height={250} width="100%" variant="rectangular" />
        ) : (
          <ImovelCarousel images={imovel.fotos || []} />
        )}
      </Box>
    </CardMedia>
  );
};
