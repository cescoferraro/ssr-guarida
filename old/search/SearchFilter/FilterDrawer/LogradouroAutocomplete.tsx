import { Autocomplete, FormControl, FormLabel, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { GuaridaHttpClient } from "common/GuaridaHttpClient";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Logradouro, SearchInput } from "typings";

interface IProps {
  setDrawerState: Dispatch<SetStateAction<Partial<SearchInput>>>;
  drawerState: Partial<SearchInput>;
}

export const LogradouroAutocomplete = ({
  drawerState,
  setDrawerState,
}: IProps) => {
  const { bairro } = drawerState;
  const params = new URLSearchParams({ id: String(bairro) || "" });
  const query = useQuery<unknown, Error, Logradouro[]>({
    enabled: Boolean(bairro),
    queryKey: [params.toString()],
    queryFn: () =>
      GuaridaHttpClient.get(
        `/localizacoes/logradouros?${params.toString()}`
      ).then((d) => d.data),
  });
  const logradouro = drawerState.logradouro;
  const [value, setValue] = useState<Logradouro | null>(null);

  const options = [...(query?.data || [])];
  useEffect(() => {
    const b = query?.data?.find((a) => a.id === logradouro);
    if (b) setValue(b);
  }, [query.data, logradouro]);

  return (
    <FormControl fullWidth>
      <FormLabel>
        <h6>Logradouro</h6>
      </FormLabel>
      <Autocomplete<Logradouro>
        disabled={!bairro}
        size={"small"}
        value={value}
        fullWidth={true}
        options={options}
        isOptionEqualToValue={(option) => value?.id === option.id}
        getOptionLabel={(option) => option.nome || ""}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            color="secondary"
            placeholder={!logradouro ? "Selecione uma logradouro" : "Selecione"}
          />
        )}
        groupBy={() => "Logradouros"}
        onChange={(event, value) => {
          setValue(value);
          setDrawerState((s) => ({
            ...s,
            logradouro: value ? Number(value.id) : undefined,
          }));
        }}
      />
    </FormControl>
  );
};
