import { Box, Typography } from "@mui/material";
import React from "react";
import { Imovel } from "typings";

export function ImovelTitle(props: { data?: Imovel }) {
  return (
    <Box>
      <Typography color="grey.600" fontSize={16}>
        COD: {props.data?.codigo}
      </Typography>
      <Typography variant="h6" fontWeight="bold">
        {(props.data?.titulo || "")
          .replaceAll("Exclusividade Guarida:", "")
          .replaceAll("!", "")}
      </Typography>
      <Typography color="grey.500">
        {props.data?.endereco}, {props.data?.numero}, {props.data?.bairro} -{" "}
        {props.data?.cidade} / {props.data?.uf}
      </Typography>
    </Box>
  );
}
