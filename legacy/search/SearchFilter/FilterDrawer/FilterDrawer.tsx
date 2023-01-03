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
  input: Partial<SearchInput>;
  onClose: () => void;
  drawerState: Partial<SearchInput>;
  gridRef: React.MutableRefObject<HTMLButtonElement | undefined>;
  setDrawerState: Dispatch<SetStateAction<Partial<SearchInput>>>;
  setInput: Dispatch<SetStateAction<Partial<SearchInput>>>;
}

function NewComponent({
  drawerState,
  gridRef,
  input,
  onClose,
  setDrawerState,
  setInput,
}: {
  onClose: () => void;
  gridRef: React.MutableRefObject<HTMLButtonElement | undefined>;
  setInput: Dispatch<SetStateAction<Partial<SearchInput>>>;
  setDrawerState: Dispatch<SetStateAction<Partial<SearchInput>>>;
  input: Partial<SearchInput>;
  drawerState: Partial<SearchInput>;
}) {
  const [localCategory, setLocalCategory] = useState<string | undefined>(
    undefined
  );
  const filterQuery = useCategoriaFilterQuery(drawerState, localCategory);
  return (
    <>
      <SearchFilterDrawerAppBar
        setInput={setInput}
        // setLoading={setLoading}
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
    </>
  );
}

export const FilterDrawer: React.FC<IProps> = ({
  onClose,
  open,
  drawerState,
  setDrawerState,
  input,
  setInput,
  gridRef,
}) => {
  useEffect(() => setDrawerState(input), [input]);
  return open ? (
    <Drawer
      keepMounted={false}
      open={open}
      anchor="bottom"
      PaperProps={{
        sx: { height: "100%", display: "flex", flexDirection: "column" },
      }}
      onClose={onClose}
    >
      <NewComponent
        onClose={onClose}
        setInput={setInput}
        gridRef={gridRef}
        setDrawerState={setDrawerState}
        input={input}
        drawerState={drawerState}
      />
    </Drawer>
  ) : (
    <></>
  );
};
