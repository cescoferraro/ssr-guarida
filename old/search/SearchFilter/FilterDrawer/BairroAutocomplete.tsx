import { Autocomplete, FormControl, FormLabel, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { GuaridaHttpClient } from "common/GuaridaHttpClient";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Bairro, SearchInput } from "typings";

interface IProps {
  setDrawerState: Dispatch<SetStateAction<Partial<SearchInput>>>;
  drawerState: Partial<SearchInput>;
}

export const BairroAutocomplete: React.FC<IProps> = (props) => {
  const cidade = props.drawerState.cidade;
  const params = new URLSearchParams({ id: String(cidade) || "" });
  const query = useQuery<unknown, Error, Bairro[]>({
    enabled: Boolean(cidade),
    queryKey: [params.toString()],
    queryFn: () =>
      GuaridaHttpClient.get(`/localizacoes/bairros?${params.toString()}`).then(
        (d) => d.data
      ),
  });
  const [value, setValue] = useState<Bairro | null>(null);
  const bairro = props.drawerState.bairro;
  useEffect(() => {
    const b = query?.data?.find((a) => a.id === bairro);
    if (b) setValue(b);
  }, [query.data, cidade, bairro]);
  return (
    <FormControl fullWidth>
      <FormLabel>Bairro</FormLabel>
      <Autocomplete<Bairro>
        disabled={!cidade}
        size={"small"}
        value={value}
        fullWidth={true}
        options={[...(query?.data || [])]}
        color="secondary"
        isOptionEqualToValue={(option) => value?.id === option.id}
        getOptionLabel={(option) => option.nome || ""}
        renderInput={(params) => (
          <TextField
            {...params}
            color="secondary"
            variant="outlined"
            placeholder={!cidade ? "Selecione uma cidade" : "Selecione"}
          />
        )}
        groupBy={() => "Bairros"}
        onChange={(event, value) => {
          setValue(value);
          props.setDrawerState((s) => ({
            ...s,
            bairro: value ? Number(value.id) : undefined,
          }));
        }}
      />
    </FormControl>
  );
};
