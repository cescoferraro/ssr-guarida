import { Autocomplete, FormControl, FormLabel, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { GuaridaHttpClient } from "common/GuaridaHttpClient";
import { useDebounce } from "common/hooks/useDebounce";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Cidade, Localizacoes, SearchInput } from "typings";

interface IProps {
  setDrawerState: Dispatch<SetStateAction<Partial<SearchInput>>>;
  drawerState: Partial<SearchInput>;
}

export function CidadeAutoComplete({ drawerState, setDrawerState }: IProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const debouncedEndereco = useDebounce<string | undefined>(inputValue, 1000);
  const [value, setValue] = useState<Cidade | null>(null);
  const { data } = useQuery<unknown, Error, Localizacoes>({
    enabled: debouncedEndereco !== "",
    queryKey: ["autocomplete-search-data", debouncedEndereco, "cidades"],
    queryFn: () =>
      GuaridaHttpClient.get(`/localizacoes`, {
        params: {
          term: debouncedEndereco,
        },
      }).then((d) => d.data),
  });
  const options = [...(data?.cidades || [])];
  const cidade = drawerState.cidade;
  const qq = useQuery<unknown, Error, Cidade>({
    enabled: Boolean(cidade),
    queryKey: [cidade],
    queryFn: () =>
      GuaridaHttpClient.get(`/localizacoes/cidade/${cidade}`).then(
        (d) => d.data
      ),
  });
  useEffect(() => {
    if (qq?.data) setValue(qq.data);
  }, [qq.data]);
  return (
    <FormControl color="secondary" fullWidth>
      <FormLabel>Cidade</FormLabel>
      <Autocomplete<Cidade>
        sx={{ mb: 2 }}
        size={"small"}
        color="secondary"
        value={value}
        noOptionsText={"Digite"}
        inputValue={inputValue}
        onInputChange={(_, value) => setInputValue(value)}
        fullWidth={true}
        options={options || []}
        isOptionEqualToValue={(option) => {
          return value?.id === option.id;
        }}
        getOptionLabel={(option) => option.nome || ""}
        renderInput={(params) => (
          <TextField
            {...params}
            color="secondary"
            variant="outlined"
            placeholder={"Selecione"}
          />
        )}
        groupBy={() => "cidades"}
        onChange={(event, value) => {
          setValue(value);
          setDrawerState((s) => ({
            ...s,
            cidade: value ? Number(value.id) : undefined,
          }));
        }}
      />
    </FormControl>
  );
}
