import { Box, Typography } from "@mui/material";
import React from "react";
import { Imovel } from "typings";

export function ImovelTitle({ imovel }: { imovel?: Imovel }) {
  return (
    <Box>
      <Typography color="grey.600" fontSize={16}>
        COD: {imovel?.codigo}
      </Typography>
      <Typography variant="h6" fontWeight="bold">
        {(imovel?.titulo || "")
          .replaceAll("Exclusividade Guarida:", "")
          .replaceAll("!", "")}
      </Typography>
      <Typography color="grey.500">
        {imovel?.endereco}, {imovel?.numero}, {imovel?.bairro} -{" "}
        {imovel?.cidade} / {imovel?.uf}
      </Typography>
    </Box>
  );
}
