import { Box, CardMedia, Skeleton } from "@mui/material";
import { ImovelCarousel } from "components/GuaridaImovelCard/ImovelCarousel";
import { ImovelCategoryChip } from "components/GuaridaImovelCard/ImovelCategoryChip";
import { useGuaridaCategorias } from "common/hooks/useGuaridaCategorias";
import React from "react";
import { Imovel, SearchInput } from "typings";

interface IProps {
  imovel?: Imovel;
  input?: Partial<SearchInput>;
}

export const ImovelImages = ({ imovel, input }: IProps) => {
  const { data } = useGuaridaCategorias(input);
  const categoria = data?.find(
    (d) => String(d.id) === String(imovel?.categoria?.id)
  );
  return (
    <CardMedia component={"div"} sx={{ cursor: "pointer" }}>
      <Box position="relative">
        <ImovelCategoryChip
          categoria={categoria}
          color="info"
          label={categoria?.nome || "__________"}
        />
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
