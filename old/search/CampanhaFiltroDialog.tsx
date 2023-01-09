import {
  Box,
  Button,
  Dialog,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { center } from "common/center";
import { useRouter } from "next/router";
import { useChangeSearchState } from "old/search/SearchFilter/useChangeSearchState";
import { useCampanhasQuery } from "old/search/useCampanhasQuery";
import React, { useState } from "react";
import { CampanhaImage, FiltroCampanha, SearchInput } from "typings";
import { useNextParams } from "./useNextParams";

export function CampanhaFiltroDialog({
  input,
}: // search,
{
  // search: ({ negocio, ...drawerState }: Partial<SearchInput>) => void;
  input: Partial<SearchInput>;
}) {
  const search = useChangeSearchState();
  const q = useCampanhasQuery();
  const navigate = useRouter().push;
  const params = useNextParams();
  const campanha = q.data?.find((c) => c.id === input.id_campanha);
  const [filtro, setFiltro] = useState<undefined | number>(undefined);
  const filtros = campanha?.attributes?.filtros.data;
  const data = campanha?.attributes?.imagens?.find(
    (c: CampanhaImage) => c.tipo === "header_filtro"
  )?.["desktop"]?.data;
  const p = useNextParams();
  return (
    <Dialog open={p.campanha !== "busca" && !p.localizacao} sx={{ ...center }}>
      <Paper sx={{ overflow: "hidden" }}>
        <Box
          sx={{
            // height: 305,
            width: data?.attributes?.width,
            height: data?.attributes?.height,
            // minWidth: theme.breakpoints.up("md") ? 605 : "80vw",
            backgroundImage: `url(${data?.attributes?.url})`,
            // backgroundSize: "cover",
            backgroundPosition: "center",
            // background: theme.palette.secondary.main,
          }}
        />
        <Box sx={{ p: 4 }}>
          <Typography variant="h4" align="center">
            {campanha?.attributes?.titulo}
          </Typography>
          <Typography component="p" align="center" sx={{ py: 2 }}>
            Escolha a instituição de ensino perto de onde você quer morar
          </Typography>
          <TextField
            select
            fullWidth
            value={filtro}
            onChange={(event) => setFiltro(Number(event.target.value))}
          >
            {filtros?.map((f: FiltroCampanha) => (
              <MenuItem key={f.attributes?.slug} value={f.id}>
                {f.attributes?.titulo}
              </MenuItem>
            ))}
          </TextField>
          <Box
            display="flex"
            sx={{ ...center, justifyContent: "space-between", py: 2 }}
          >
            <Button
              onClick={() => navigate(`/${params?.negocio || ""}`)}
              color="secondary"
              variant="text"
            >
              Sair da Campanha
            </Button>
            <Button
              color="secondary"
              variant="contained"
              onClick={async () => {
                await search({
                  ...input,
                  id_filtro: filtro,
                });
              }}
            >
              Buscar Imóveis
            </Button>
          </Box>
        </Box>
      </Paper>
    </Dialog>
  );
}
