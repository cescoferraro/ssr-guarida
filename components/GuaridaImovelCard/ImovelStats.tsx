import { Box, Skeleton } from "@mui/material";
import { CardStat } from "components/GuaridaImovelCard/CardStat";
import React from "react";
import { Imovel } from "typings";

interface IProps {
  imovel: Imovel | undefined;
}

export function ImovelStats(props: IProps) {
  return (
    <Box
      sx={{
        height: 64,
        mt: 2,
        mb: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          height: 40,
          color: "#666666",
        }}
      >
        {!props.imovel ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              px: 2,
              width: "100%",
            }}
          >
            <Skeleton height={40} width="20%" variant="rectangular" />
            <Skeleton height={40} width="20%" variant="rectangular" />
            <Skeleton height={40} width="20%" variant="rectangular" />
            <Skeleton height={40} width="20%" variant="rectangular" />
          </Box>
        ) : (
          <>
            <CardStat
              value={String(props.imovel?.quartos)}
              label={
                (props.imovel?.quartos || 0) > 1 ? `Dormitórios` : "Dormitório"
              }
            />
            <CardStat
              value={String(props.imovel?.banheiros)}
              label={
                (props.imovel?.banheiros || 0) > 1 ? `Banheiros` : "Banheiro"
              }
            />
            <CardStat
              value={String(props.imovel?.vagas)}
              label={(props.imovel?.vagas || 0) > 1 ? `Vagas` : "Vaga"}
            />
            <CardStat value={props.imovel?.area_total_txt || ""} label={"m²"} />
          </>
        )}
      </Box>
    </Box>
  );
}
