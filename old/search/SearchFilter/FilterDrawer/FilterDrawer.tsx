import { Box, Container, Drawer, Grid } from "@mui/material";
import { useCategoriaFilterQuery } from "common/hooks/useCategoriaFilterQuery";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SearchInput } from "typings";
import { SearchFilterDrawerAppBar } from "./SearchFilterDrawerAppBar";
import { SearchFilterDrawerFirstGrid } from "./SearchFilterDrawerFirstGrid";
import { SearchFilterDrawerSecondGrid } from "./SearchFilterDrawerSecondGrid";
import { SearchFilterDrawerThirdGrid } from "./SearchFilterDrawerThirdGrid";

interface IProps {
  open: boolean;
  setLoading: () => void;
  input: Partial<SearchInput>;
  onClose: () => void;
  drawerState: Partial<SearchInput>;
  gridRef: React.MutableRefObject<HTMLButtonElement | undefined>;
  setDrawerState: Dispatch<SetStateAction<Partial<SearchInput>>>;
}

export function FilterDrawer({
  onClose,
  open,
  drawerState,
  setDrawerState,
  input,
  setLoading,
  gridRef,
}: IProps) {
  useEffect(() => setDrawerState(input), [input]);
  const [localCategory, setLocalCategory] = useState<string | undefined>(
    undefined
  );
  const filterQuery = useCategoriaFilterQuery(drawerState, localCategory);
  return (
    <Drawer
      keepMounted={false}
      open={open}
      anchor="bottom"
      PaperProps={{
        sx: { height: "100%", display: "flex", flexDirection: "column" },
      }}
      onClose={onClose}
    >
      <SearchFilterDrawerAppBar
        setLoading={setLoading}
        onClose={onClose}
        gridRef={gridRef}
        setDrawerState={setDrawerState}
        input={input}
        drawerState={drawerState}
      />
      <Box sx={{ overflowY: "auto", flexGrow: 1 }}>
        <Container>
          <Grid
            container
            spacing={2}
            columns={{ xs: 4, sm: 8, md: 12, lg: 9, xl: 9 }}
          >
            <SearchFilterDrawerFirstGrid
              setDrawerState={setDrawerState}
              drawerState={drawerState}
              filter={filterQuery}
              setLocalCategory={setLocalCategory}
            />
            <SearchFilterDrawerSecondGrid
              setDrawerState={setDrawerState}
              drawerState={drawerState}
            />
            <SearchFilterDrawerThirdGrid
              setDrawerState={setDrawerState}
              drawerState={drawerState}
              filter={filterQuery}
            />
          </Grid>
        </Container>
      </Box>
    </Drawer>
  );
}
