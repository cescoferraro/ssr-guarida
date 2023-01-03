import { Autocomplete, Box, MenuItem, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { center } from "common/center";
import { GuaridaHttpClient } from "common/GuaridaHttpClient";
import { useDebounce } from "common/hooks/useDebounce";
import { FormikProps } from "formik";
import React, { useState } from "react";
import { Local, Localizacoes, LocalType } from "typings";
import { HomeForm } from "./useLoginFormik";

export const LoginLocalField = ({
  formik,
}: {
  formik: FormikProps<HomeForm>;
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const debouncedEndereco = useDebounce<string | undefined>(inputValue, 500);
  const b = (debouncedEndereco?.split("")?.length || 0) > 2;
  const { data, isFetched } = useQuery<unknown, Error, Localizacoes>({
    enabled: debouncedEndereco !== "" && b,
    queryKey: ["autocomplete-search-data", debouncedEndereco, "cidades"],
    queryFn: () =>
      GuaridaHttpClient.get(`/localizacoes`, {
        params: {
          term: debouncedEndereco,
        },
      }).then((d) => d.data),
  });
  const cb =
    (type: LocalType) =>
    (a: Local): Local => ({ ...a, type });

  const [open, setOpen] = React.useState(false);
  return (
    <Box sx={{ ...center, flexGrow: 1 }}>
      <Autocomplete<Local | null>
        open={open}
        onInputChange={(_, value) => {
          if (value.length === 0) {
            if (open) setOpen(false);
          } else {
            if (!open) setOpen(true);
          }
          setInputValue(value);
        }}
        noOptionsText={
          b
            ? isFetched
              ? "Nenhum resultado"
              : "Carregando.."
            : "Digite 3 letras"
        }
        sx={{ mb: { xs: 2, sm: 2, md: 0 }, ml: { xs: 0, sm: 0, md: 2 } }}
        size={"small"}
        value={formik.values.local}
        inputValue={inputValue}
        placeholder={"Local"}
        fullWidth={true}
        options={[
          ...(data?.cidades || []).map(cb("Cidades")),
          ...(data?.bairros || []).map(cb("Bairros")),
          ...(data?.logradouros || []).map(cb("Logradouros")),
        ]}
        isOptionEqualToValue={(option) => {
          return formik.values?.local !== null && option !== null
            ? formik.values?.local?.id === option.id
            : false;
        }}
        getOptionLabel={(option) => (option !== null ? option?.nome || "" : "")}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label={"Cidade, bairro ou logradouro"}
          />
        )}
        renderOption={(props, option) => {
          return (
            <MenuItem {...props} key={option?.slug || ""}>
              {option?.nome}
            </MenuItem>
          );
        }}
        groupBy={(a) => (a === null ? "" : a?.type || "")}
        onChange={(d, ad) => {
          formik.setFieldValue("local", ad);
          setOpen(false);
        }}
      />
    </Box>
  );
};
