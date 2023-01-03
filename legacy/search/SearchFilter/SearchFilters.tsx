import { Box } from "@mui/material";
import { FilterBreadcrums } from "legacy/search/SearchFilter/FilterBreadcrums/FilterBreadcrums";
import { FilterDrawer } from "legacy/search/SearchFilter/FilterDrawer/FilterDrawer";
import { FilterTags } from "legacy/search/SearchFilter/FilterTags/FilterTags";
import { FilterTotal } from "legacy/search/SearchFilter/FilterTotal/FilterTotal";
import React, { Dispatch, SetStateAction, useState } from "react";
import { SearchInput } from "typings";

export interface IProps {
  input: Partial<SearchInput>;
  setInput: Dispatch<SetStateAction<Partial<SearchInput>>>;
  total?: number;
  containerRef: React.MutableRefObject<HTMLButtonElement | undefined>;
}

export const SearchFilters: React.FC<IProps> = ({
  setInput,
  total = 0,
  input,
  containerRef,
}) => {
  const [open, setOpen] = useState(false);
  const [drawerState, setDrawerState] = useState<Partial<SearchInput>>(input);
  return (
    <Box component="header" sx={{ background: "white", zIndex: 34 }}>
      <FilterBreadcrums input={input} />
      <FilterTags
        setInput={setInput}
        input={input}
        setOpen={setOpen}
        gridRef={containerRef}
      />
      <FilterTotal
        setInput={setInput}
        gridRef={containerRef}
        input={input}
        total={total}
      />
      <FilterDrawer
        setInput={setInput}
        gridRef={containerRef}
        drawerState={drawerState}
        setDrawerState={setDrawerState}
        open={open}
        input={input}
        onClose={() => setOpen((o) => !o)}
      />
    </Box>
  );
};
