import { Box, Grid } from "@mui/material";
import { UseQueryResult } from "@tanstack/react-query";
import { responsiveGrid } from "common/responsiveGrid";
import React, { Dispatch, SetStateAction } from "react";
import { FilterByCategory, SearchInput } from "typings";
import { NumberPicker } from "./NumberPicker";

interface IProps {
  setDrawerState: Dispatch<SetStateAction<Partial<SearchInput>>>;
  drawerState: Partial<SearchInput>;
  filter: UseQueryResult<FilterByCategory>;
}

export const SearchFilterDrawerThirdGrid: React.FC<IProps> = ({
  setDrawerState,
  drawerState,
  filter,
}) => {
  const propriedades = filter?.data?.propriedades || [];
  return (
    <Grid item {...responsiveGrid} sx={{ justifyContent: "flex-start" }}>
      <Box
        sx={{
          width: "100%",
          pt: 2,
          display: "flex",
          justifyContent: "flex-start",
          pl: {
            lg: 3,
          },
        }}
      >
        <Box>
          {propriedades.map((propriedade) => (
            <NumberPicker
              key={propriedade.id}
              drawerState={drawerState}
              setDrawerState={setDrawerState}
              propriedade={propriedade}
            />
          ))}
        </Box>
      </Box>
    </Grid>
  );
};
