import { Grid } from "@mui/material";
import { UseQueryResult } from "@tanstack/react-query";
import { responsiveGrid } from "common/responsiveGrid";
import { CaracteristicasFilter } from "old/search/SearchFilter/FilterDrawer/CaracteristicasFilter";
import { CategoryFilter } from "old/search/SearchFilter/FilterDrawer/CategoryFilter";
import { useGuaridaCategorias } from "common/hooks/useGuaridaCategorias";
import React, { Dispatch, SetStateAction } from "react";
import { FilterByCategory, SearchInput } from "typings";
import { FinalidadeFilter } from "old/search/SearchFilter/FilterDrawer/FinalidadeFilter";

export const SearchFilterDrawerFirstGrid: React.FC<{
  setDrawerState: Dispatch<SetStateAction<Partial<SearchInput>>>;
  drawerState: Partial<SearchInput>;
  filter: UseQueryResult<FilterByCategory>;
  setLocalCategory: Dispatch<SetStateAction<string | undefined>>;
}> = ({ setLocalCategory, setDrawerState, drawerState, filter }) => {
  const { data } = useGuaridaCategorias(drawerState);
  return (
    <Grid item {...responsiveGrid}>
      <FinalidadeFilter
        drawerState={drawerState}
        setDrawerState={setDrawerState}
        value={drawerState.finalidade || "residencial"}
      />
      <CategoryFilter
        setLocalCategory={setLocalCategory}
        setDrawerState={setDrawerState}
        drawerState={drawerState}
        data={data}
      />
      <CaracteristicasFilter
        title={"Caracteristicas"}
        label={"Imóvel"}
        data={filter.data?.caracteristicasImovel}
        setDrawerState={setDrawerState}
        drawerState={drawerState}
      />
      <CaracteristicasFilter
        title={"Caracteristicas"}
        label={"Condomínio"}
        data={filter.data?.caracteristicasCondominio}
        setDrawerState={setDrawerState}
        drawerState={drawerState}
      />
    </Grid>
  );
};
