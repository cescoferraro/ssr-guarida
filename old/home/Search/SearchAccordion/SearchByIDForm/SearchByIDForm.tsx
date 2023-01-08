import { Autocomplete, FormControl, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { GuaridaHttpClient } from "common/GuaridaHttpClient";
import { useDebounce } from "common/hooks/useDebounce";
import { capitalize } from "lodash";
import { useRouter } from "next/router";
import * as React from "react";
import { useState } from "react";
import { ImovelCodeQuery, SearchImovelCode, SearchType } from "typings";

export interface ImovelCode extends SearchImovelCode {
  type?: SearchType;
}
export function SearchByIDForm() {
  const navigate = useRouter().push;
  const [inputValue, setInputValue] = useState<string>("");
  const debouncedEndereco = useDebounce<string | undefined>(inputValue, 1000);
  const [value, setValue] = useState<ImovelCode | null>(null);

  const { data } = useQuery<unknown, Error, ImovelCodeQuery>({
    enabled: debouncedEndereco !== "",
    queryKey: [debouncedEndereco, "cod-query"],
    queryFn: () =>
      GuaridaHttpClient.get(`/imoveis/${debouncedEndereco}`).then(
        (d) => d.data
      ),
  });
  return (
    <FormControl fullWidth>
      <Autocomplete<ImovelCode>
        sx={{ mb: 2 }}
        size={"small"}
        noOptionsText={"Digite o código"}
        fullWidth={true}
        value={value}
        inputValue={inputValue}
        onInputChange={(_, value) => setInputValue(value)}
        options={[
          ...(data?.imoveisAluguel || []).map((a) => ({
            ...a,
            type: "aluguel" as SearchType,
          })),
          ...(data?.imoveisComprar || []).map((a) => ({
            ...a,
            type: "comprar" as SearchType,
          })),
        ]}
        isOptionEqualToValue={(option) => {
          return value?.codigoImovel === option.codigoImovel;
        }}
        getOptionLabel={(option) => (option ? `${option.codigoImovel}` : "")}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" placeholder={"Selecione"} />
        )}
        groupBy={(e) => capitalize(e?.type) || "alugar"}
        onChange={(event, value) => {
          if (value) {
            setValue(value);
            navigate(`/detalhe${value?.url}`);
          }
        }}
      />
    </FormControl>
  );
}
