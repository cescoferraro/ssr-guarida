import { Box, Grid } from "@mui/material";
import { responsiveGrid } from "common/responsiveGrid";
import { BairroAutocomplete } from "old/search/SearchFilter/FilterDrawer/BairroAutocomplete";
import { CampanhaFiltrosAutocomplete } from "old/search/SearchFilter/FilterDrawer/CampanhaFiltrosAutocomplete";
import { LogradouroAutocomplete } from "old/search/SearchFilter/FilterDrawer/LogradouroAutocomplete";
import React, { Dispatch, SetStateAction } from "react";
import { SearchInput } from "typings";
import { CidadeAutoComplete } from "./CidadeAutoComplete";
import { SearchFilterSlider } from "./SearchFilterSlider";

interface IProps {
  setDrawerState: Dispatch<SetStateAction<Partial<SearchInput>>>;
  drawerState: Partial<SearchInput>;
}

export const SearchFilterDrawerSecondGrid: React.FC<IProps> = ({
  drawerState,
  setDrawerState,
}) => {
  return (
    <Grid item {...responsiveGrid}>
      <Box sx={{ pt: 2 }}>
        {!drawerState?.id_campanha ? (
          <>
            <CidadeAutoComplete
              drawerState={drawerState}
              setDrawerState={setDrawerState}
            />
            <BairroAutocomplete
              drawerState={drawerState}
              setDrawerState={setDrawerState}
            />
            <LogradouroAutocomplete
              drawerState={drawerState}
              setDrawerState={setDrawerState}
            />
          </>
        ) : (
          <CampanhaFiltrosAutocomplete
            drawerState={drawerState}
            setDrawerState={setDrawerState}
          />
        )}
        <SearchFilterSlider
          isCurrency
          label={"Valor de Imóvel"}
          keyof={"valor"}
          drawerState={drawerState}
          setDrawerState={setDrawerState}
        />
        <SearchFilterSlider
          suffix={"m²"}
          label={"Área do Imóvel"}
          keyof={"area"}
          drawerState={drawerState}
          setDrawerState={setDrawerState}
        />
      </Box>
    </Grid>
  );
};
