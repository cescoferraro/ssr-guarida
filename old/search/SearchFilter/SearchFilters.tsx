import { Box } from "@mui/material";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { FilterBreadcrums } from "old/search/SearchFilter/FilterBreadcrums/FilterBreadcrums";
import { FilterDrawer } from "old/search/SearchFilter/FilterDrawer/FilterDrawer";
import { FilterTags } from "old/search/SearchFilter/FilterTags/FilterTags";
import { FilterTotal } from "old/search/SearchFilter/FilterTotal/FilterTotal";
import React, { useState } from "react";
import { SearchInput, SearchResponse } from "typings";

export interface IProps {
  input: Partial<SearchInput>;
  total?: number;
  setLoading: () => void;
  loading: boolean;
  containerRef: React.MutableRefObject<HTMLButtonElement | undefined>;
  query: UseInfiniteQueryResult<SearchResponse>;
}

export const SearchFilters: React.FC<IProps> = ({
  query,
  setLoading,
  total = 0,
  input,
  containerRef,
  loading,
}) => {
  const [open, setOpen] = useState(false);
  const [drawerState, setDrawerState] = useState<Partial<SearchInput>>(input);
  return (
    <Box
      component="header"
      sx={{
        background: "white",
        zIndex: 34,
        position: "sticky",
        top: {
          xs: 56,
          sm: 64,
          md: 100,
          lg: 100,
        },
      }}
    >
      <FilterBreadcrums
        setLoading={setLoading}
        containerRef={containerRef}
        input={input}
      />
      <FilterTags
        input={input}
        setOpen={setOpen}
        setLoading={setLoading}
        gridRef={containerRef}
      />
      <FilterTotal
        loading={loading}
        query={query}
        gridRef={containerRef}
        setLoading={setLoading}
        input={input}
        total={total}
      />
      <FilterDrawer
        gridRef={containerRef}
        setLoading={setLoading}
        drawerState={drawerState}
        setDrawerState={setDrawerState}
        open={open}
        input={input}
        onClose={() => setOpen((o) => !o)}
      />
    </Box>
  );
};
