import { Box, Skeleton, Typography } from "@mui/material";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { center } from "common/center";
import { useGuaridaCategoriaQuery } from "common/hooks/useGuaridaCategoriaQuery";
import { useGuaridaLocal } from "common/hooks/useGuaridaLocal";
import { PropertyFilterFooterOrder } from "old/search/SearchFilter/FilterTotal/PropertyFilterFooterOrder";
import React from "react";
import { useNextParams } from "old/search/useNextParams";
import { Cidade, SearchInput, SearchResponse } from "typings";

interface IProps {
  input: Partial<SearchInput>;
  total: number;
  query: UseInfiniteQueryResult<SearchResponse>;
}

export const FilterTotal: React.FC<IProps> = ({ total, input }) => {
  const find = useGuaridaLocal().data;
  const query = useGuaridaCategoriaQuery();
  const uf = (find as Cidade)?.uf;
  const params = useNextParams();
  const categorias = params.categoria
    ? query.data?.map((a) => a.nome).join(", ")
    : "imóveis";
  const local = find?.nome ? `em ${find?.nome}` : "";
  const ufString = uf ? ` ${uf}` : "";
  return (
    <Box display="flex" sx={{ px: 2, pb: 1 }}>
      <Box
        sx={{
          ...center,
          justifyContent: "flex-start",
          flexBasis: "60%",
          display: { xs: "none", sm: "none", md: "flex" },
        }}
      >
        {false ? (
          <Skeleton variant="text" height={29} width={200} />
        ) : (
          <Box>
            <Typography>{`${total} ${categorias} para ${params.negocio} ${local}${ufString}`}</Typography>
          </Box>
        )}
      </Box>
      <Box
        display="flex"
        sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}
      >
        <PropertyFilterFooterOrder input={input} />
      </Box>
    </Box>
  );
};
