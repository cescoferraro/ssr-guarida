import { Container, Grid, useMediaQuery, useTheme } from "@mui/material";
import { UseQueryResult } from "@tanstack/react-query";
import { ImovelDescription } from "legacy/imovel/ImovelBody/ImovelDescription/ImovelDescription";
import { ImovelPaper } from "legacy/imovel/ImovelBody/ImovelPaper/ImovelPaper";
import {
  DialogState,
  ImovelDialog,
} from "legacy/imovel/ImovelBody/ImovelDialog/ImovelDialog";
import React, { useState } from "react";
import { Imovel } from "typings";

interface IProps {
  query: UseQueryResult<Imovel>;
}

export function ImovelBody({ query }: IProps) {
  const isSmallScreen = useMediaQuery(useTheme().breakpoints.down("md"));
  const [dialogState, setDialogState] = useState<DialogState>({ open: false });

  return (
    <Container>
      <Grid container>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          {isSmallScreen ? (
            <ImovelPaper imovel={query?.data} setDialogState={setDialogState} />
          ) : (
            <ImovelDescription setDialogState={setDialogState} query={query} />
          )}
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          {isSmallScreen ? (
            <ImovelDescription setDialogState={setDialogState} query={query} />
          ) : (
            <ImovelPaper setDialogState={setDialogState} imovel={query?.data} />
          )}
        </Grid>
      </Grid>
      <ImovelDialog dialogState={dialogState} setDialogState={setDialogState} />
    </Container>
  );
}
