import { Container, Grid, useMediaQuery, useTheme } from "@mui/material";
import { UseQueryResult } from "@tanstack/react-query";
import { denter } from "common/center";
import { ImovelDescription } from "old/imovel/ImovelBody/ImovelDescription/ImovelDescription";
import {
  DialogState,
  ImovelDialog,
} from "old/imovel/ImovelBody/ImovelDialog/ImovelDialog";
import { ImovelPaper } from "old/imovel/ImovelBody/ImovelPaper/ImovelPaper";
import React, { useState } from "react";
import { Imovel } from "typings";

interface IProps {
  query: UseQueryResult<Imovel>;
}

export function ImovelBody({ query }: IProps) {
  const isSmallScreen = useMediaQuery(useTheme().breakpoints.down("md"));
  const [dialogState, setDialogState] = useState<DialogState>({ open: false });

  const ce = isSmallScreen ? denter : {};
  const de = !isSmallScreen ? denter : {};
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: "flex", flexDirection: "column", ...ce }}
        >
          {isSmallScreen ? (
            <ImovelPaper setDialogState={setDialogState} imovel={query?.data} />
          ) : (
            <ImovelDescription setDialogState={setDialogState} query={query} />
          )}
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: "flex", flexDirection: "column", ...de }}
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
