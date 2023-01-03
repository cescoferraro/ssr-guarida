import {
  Autocomplete,
  Box,
  FormControl,
  FormLabel,
  Grid,
  TextField,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { GuaridaHttpClient } from "common/GuaridaHttpClient";
import { responsiveGrid } from "common/responsiveGrid";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Bairro, SearchInput } from "typings";
import { CidadeAutoComplete } from "./CidadeAutoComplete";
import { SearchFilterSlider } from "./SearchFilterSlider";

interface IProps {
  setDrawerState: Dispatch<SetStateAction<Partial<SearchInput>>>;
  drawerState: Partial<SearchInput>;
}

function NewBairrrosAutocomplete(props: {
  setDrawerState: Dispatch<SetStateAction<Partial<SearchInput>>>;
  drawerState: Partial<SearchInput>;
}) {
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
  const options = [...(query?.data || [])];
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
        options={options}
        isOptionEqualToValue={(option) => value?.id === option.id}
        getOptionLabel={(option) => option.nome || ""}
        renderInput={(params) => (
          <TextField
            {...params}
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
}

export const SearchFilterDrawerSecondGrid: React.FC<IProps> = ({
  drawerState,
  setDrawerState,
}) => {
  return (
    <Grid item {...responsiveGrid}>
      <Box sx={{ pt: 2 }}>
        <CidadeAutoComplete
          drawerState={drawerState}
          setDrawerState={setDrawerState}
        />
        <NewBairrrosAutocomplete
          drawerState={drawerState}
          setDrawerState={setDrawerState}
        />
        <SearchFilterSlider
          isCurrency
          label={"Valor de Imóvel"}
          keyof={"valor"}
          drawerState={drawerState}
          setDrawerState={setDrawerState}
        />
        <SearchFilterSlider
          suffix={"m²"}
          label={"Área do Imóvel"}
          keyof={"area"}
          drawerState={drawerState}
          setDrawerState={setDrawerState}
        />
      </Box>
    </Grid>
  );
};

// <FormControl fullWidth>
//   <Typography>Endereço</Typography>
//   <TextField
//     value={drawerState?.endereco || ""}
//     InputProps={{ startAdornment: <SearchIcon /> }}
//     onChange={({ target: { value } }) =>
//       setDrawerState((i) => ({
//         ...i,
//         endereco: value,
//       }))
//     }
//     size="small"
//     placeholder={useLocationString()}
//   />
// </FormControl>
