import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { ImovelGridItem } from "legacy/search/ImovelGrid/ImovelGridItem";
import React from "react";
import { Imovel, SearchInput, SearchResponse } from "typings";

interface IProps {
  input: Partial<SearchInput>;
  imoveis: Imovel[];
  query: UseInfiniteQueryResult<SearchResponse>;
}

function useLoadingImoveis(): Imovel[] {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  return Array.of({ length: isXs ? 2 : 20 }).map(
    () => undefined as unknown as Imovel
  );
}

export const ImovelGrid: React.FC<IProps> = ({ imoveis, input, query }) => {
  const loadingImoveis = useLoadingImoveis();
  const list = query.isFetching ? loadingImoveis : imoveis;
  return (
    <Grid
      container
      columns={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 15, xxl: 18 }}
      justifyContent="center"
    >
      {list.map((imovel: Imovel | undefined, index) => (
        <ImovelGridItem key={index} input={input} imovel={imovel} />
      ))}
    </Grid>
  );
};
