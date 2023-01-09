import { Box } from "@mui/material";
import { center } from "common/center";
import { useCategoriaFilterQuery } from "common/hooks/useCategoriaFilterQuery";
import { useGuaridaCategoriaQuery } from "common/hooks/useGuaridaCategoriaQuery";
import { useChangeSearchState } from "old/search/SearchFilter/useChangeSearchState";
import { filterPosibleTags } from "old/search/SearchFilter/FilterTags/filterPosibleTags";
import { MoreTags } from "old/search/SearchFilter/FilterTags/MoreTags";
import { Tags } from "old/search/SearchFilter/FilterTags/Tags";
import React from "react";
import { SearchInput } from "typings";

interface IProps {
  input: Partial<SearchInput>;
}

export function FilterTagsComponent({ input }: IProps) {
  const search = useChangeSearchState();
  const { data, isSuccess } = useGuaridaCategoriaQuery();
  const filterQuery = useCategoriaFilterQuery(input);
  const allTags = filterPosibleTags(isSuccess, filterQuery, input);
  return (
    <Box sx={{ ...center, "& > div:nth-of-type(n + 2)": { ml: 2 } }}>
      <Tags
        categorias={data}
        allTags={allTags}
        search={search}
        input={input}
        filterQuery={filterQuery}
      />
      <MoreTags
        search={search}
        input={input}
        allTags={allTags}
        filterQuery={filterQuery}
      />
    </Box>
  );
}
