import { Autocomplete, FormControl, FormLabel, TextField } from "@mui/material";
import { UseQueryResult } from "@tanstack/react-query";
import { useCampanhasQuery } from "old/search/useCampanhasQuery";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Campanha, FiltroCampanha, SearchInput } from "typings";

interface IProps {
  setDrawerState: Dispatch<SetStateAction<Partial<SearchInput>>>;
  drawerState: Partial<SearchInput>;
}

function filterFiltersByCapaignId(
  q: UseQueryResult<Campanha[]>,
  drawerState: Partial<SearchInput>
) {
  return q.data
    ?.filter((c) => c.id === drawerState.id_campanha)
    .map((a) => a.attributes.filtros.data)
    .flat();
}

export const CampanhaFiltrosAutocomplete = ({
  drawerState,
  setDrawerState,
}: IProps) => {
  const q = useCampanhasQuery();
  const filtros = filterFiltersByCapaignId(q, drawerState);
  const [value, setValue] = useState<FiltroCampanha | null>(null);
  const options = [...(filtros || [])];

  useEffect(() => {
    if (q?.data) {
      const find = filterFiltersByCapaignId(q, drawerState)?.find(
        (f) => f.id === drawerState.id_filtro
      );
      if (find) setValue(find);
    }
  }, [q.data]);
  return (
    <FormControl fullWidth>
      <FormLabel>Selecione uma universidade</FormLabel>
      <Autocomplete<FiltroCampanha>
        size={"small"}
        value={value}
        fullWidth={true}
        options={options}
        isOptionEqualToValue={(option) => value?.id === option.id}
        getOptionLabel={(option) => option.attributes.titulo || ""}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            color="secondary"
            placeholder={"Selecione"}
          />
        )}
        onChange={(event, value) => {
          setValue(value);
          setDrawerState((s) => ({
            ...s,
            id_filtro: value ? Number(value.id) : undefined,
          }));
        }}
      />
    </FormControl>
  );
};
