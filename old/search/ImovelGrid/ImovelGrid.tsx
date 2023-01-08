import { Grid } from "@mui/material";
import { ImovelGridItem } from "old/search/ImovelGrid/ImovelGridItem";
import React from "react";
import { Imovel, SearchInput } from "typings";

interface IProps {
  input: Partial<SearchInput>;
  loading: boolean;
  imoveis: Imovel[];
}

export const ImovelGrid: React.FC<IProps> = ({ imoveis, input }) => {
  return (
    <Grid
      container
      columns={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 15, xxl: 18 }}
      justifyContent="center"
    >
      {imoveis.map((imovel: Imovel | undefined, index) => (
        <ImovelGridItem key={index} input={input} imovel={imovel} />
      ))}
    </Grid>
  );
};
