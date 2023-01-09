import { MenuItem } from "@mui/material";
import { useSearchInputContext } from "old/search/searchInputContext";
import React from "react";
import { SearchInput } from "typings";
import { RoundedSelect } from "./RoundedSelect";

interface IProps {
  input: Partial<SearchInput>;
}

export const PropertyFilterFooterOrder: React.FC<IProps> = ({ input }) => {
  // const search = useChangeSearchState(gridRef, setLoading);
  const [, setInput] = useSearchInputContext();
  return (
    <RoundedSelect
      color="secondary"
      select
      size="small"
      id="demo-simple-select"
      value={input.order}
      onChange={async (event) => {
        setInput({ ...input, order: event.target.value, page: 0 });
        // await search();
      }}
    >
      {[
        {
          id: "codigo-desc",
          label: "Mais relevantes",
        },
        {
          id: "preco-desc",
          label: "Menor valor",
        },
        {
          id: "preco-asc",
          label: "Maior valor",
        },
      ].map((d) => (
        <MenuItem key={d.id} value={d.id}>
          {d.label}
        </MenuItem>
      ))}
    </RoundedSelect>
  );
};
