import { Box } from "@mui/material";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { FilterBreadcrums } from "old/search/SearchFilter/FilterBreadcrums/FilterBreadcrums";

import { FilterTags } from "old/search/SearchFilter/FilterTags/FilterTags";
import { FilterTotal } from "old/search/SearchFilter/FilterTotal/FilterTotal";
import React, { useState } from "react";
import { SearchInput, SearchResponse } from "typings";

export interface IProps {
  input: Partial<SearchInput>;
  total?: number;
  query: UseInfiniteQueryResult<SearchResponse>;
}

const FilterDrawer = dynamic(() => import("./FilterDrawer/FilterDrawer"), {
  ssr: false,
});

export const SearchFilters: React.FC<IProps> = ({
  query,
  total = 0,
  input,
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
      <FilterBreadcrums input={input} />
      <FilterTags input={input} setOpen={setOpen} />
      <FilterTotal query={query} input={input} total={total} />
      <FilterDrawer
        drawerState={drawerState}
        setDrawerState={setDrawerState}
        open={open}
        input={input}
        onClose={() => setOpen((o) => !o)}
      />
    </Box>
  );
};
