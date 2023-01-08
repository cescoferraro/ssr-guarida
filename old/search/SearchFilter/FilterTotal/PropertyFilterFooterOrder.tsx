import { MenuItem } from "@mui/material";
import { useChangeSearchState } from "old/search/SearchFilter/useChangeSearchState";
import React from "react";
import { SearchInput } from "typings";
import { RoundedSelect } from "./RoundedSelect";

interface IProps {
  gridRef: React.MutableRefObject<HTMLButtonElement | undefined>;
  input: Partial<SearchInput>;
  setLoading: () => void;
}

export const PropertyFilterFooterOrder: React.FC<IProps> = ({
  gridRef,
  input,
  setLoading,
}) => {
  const search = useChangeSearchState(gridRef, setLoading);
  return (
    <RoundedSelect
      color="secondary"
      select
      size="small"
      id="demo-simple-select"
      value={input.order}
      onChange={async (event) =>
        await search({ ...input, order: event.target.value })
      }
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
