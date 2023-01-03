import { Box, Skeleton } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import { Imovel } from "typings";

export function ImovelAddress(props: { imovel: Imovel | undefined }) {
  return (
    <Box sx={{ px: 2, height: 50, display: "flex", flexDirection: "column" }}>
      {!props.imovel ? (
        <Box>
          <Skeleton height={25} width="100%" variant="rectangular" />
          <Skeleton height={25} width="100%" variant="rectangular" />
        </Box>
      ) : (
        <>
          <Typography fontWeight="bold" style={{ fontSize: 18 }} noWrap>
            {props.imovel?.endereco}
          </Typography>
          <Typography style={{ fontSize: 16 }} noWrap>
            {props.imovel
              ? `${props.imovel?.bairro} ${props.imovel?.cidade} ${props.imovel?.uf}`
              : ""}
          </Typography>
        </>
      )}
    </Box>
  );
}
