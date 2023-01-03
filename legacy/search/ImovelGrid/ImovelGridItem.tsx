import { Grid } from "@mui/material";
import { responsiveGrid } from "common/responsiveGrid";
import { GuaridaImovelCard } from "components/GuaridaImovelCard/GuaridaImovelCard";
import React from "react";
import { Imovel, SearchInput } from "typings";

interface IProps {
  input: Partial<SearchInput>;
  imovel: Imovel | undefined;
}

export const ImovelGridItem = (props: IProps) => (
  <Grid
    item
    {...responsiveGrid}
    sx={{
      padding: { xs: 2, sm: 2 },
      width: { xs: "calc( 100% - 32px)", sm: "unset" },
      minWidth: { xs: "unset", sm: 400, md: 400 },
    }}
  >
    <GuaridaImovelCard input={props.input} imovel={props.imovel} />
  </Grid>
);
