import { Autocomplete, Box, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { GuaridaHttpClient } from "common/GuaridaHttpClient";
import { FormikProps } from "formik";
import { capitalize, orderBy } from "lodash";
import React from "react";
import { Categoria, SearchType } from "typings";
import { center } from "common/center";
import { HomeForm } from "./useLoginFormik";

interface IProps {
  searchType?: SearchType;
  formik: FormikProps<HomeForm>;
}

export function CategoriaLoginField({ formik, searchType }: IProps) {
  const tpo_negocio = searchType == "alugar" ? "1" : "2";
  const params = new URLSearchParams({ tpo_negocio });
  const query = useQuery<unknown, Error, Categoria[]>({
    queryKey: ["cat_home", params.toString()],
    queryFn: () =>
      GuaridaHttpClient.get(`/categorias`, {
        params,
      }).then((d) => d.data),
  });
  const options = orderBy([...(query?.data || [])], ["finalidade", "nome"]);
  return (
    <Box sx={{ ...center, flexGrow: 1 }}>
      <Autocomplete<Categoria | null>
        sx={{ mb: { xs: 2, sm: 2, md: 0 } }}
        size={"small"}
        value={formik.values.categoria}
        placeholder="Categoria"
        fullWidth={true}
        options={[
          ...options.filter((a) => a.finalidade === "residencial"),
          ...options.filter((a) => a.finalidade !== "residencial"),
        ]}
        noOptionsText="Selecione um tipo"
        isOptionEqualToValue={(option) =>
          formik.values.categoria === null
            ? false
            : formik.values.categoria?.id ===
              (option === null ? "sdf" : option.id)
        }
        getOptionLabel={(option) => (option === null ? "" : option.nome || "")}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label={"Escolha o tipo de imóvel"}
          />
        )}
        groupBy={(s) => (s === null ? "" : capitalize(s.finalidade || ""))}
        onChange={(event, value) => {
          if (value) formik.setFieldValue("categoria", value);
        }}
      />
    </Box>
  );
}
