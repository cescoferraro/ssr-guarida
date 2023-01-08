import { Box, Button, Typography } from "@mui/material";
import { center } from "common/center";
import { Lead } from "old/imovel/ImovelBody/ImovelPaper/LeadForm/LeadFormComponent";
import React, { Dispatch, SetStateAction } from "react";
import { Undefinable } from "typings";

export interface WeirdApiResult {
  resposta?: string;
  mensagem?: string;
}

interface IProps {
  store: Lead | undefined;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setStore: Dispatch<SetStateAction<Undefinable<Lead>>>;
}

export function AlreadyLeadComponent({ setStore, store, setOpen }: IProps) {
  return store ? (
    <>
      {
        <Box>
          <Typography align="center" fontSize={25} sx={{ color: "#666666" }}>
            {store?.nome || ""}
          </Typography>
          <Typography align="center" fontSize={16} sx={{ color: "#666666" }}>
            {store?.email || ""}
          </Typography>
          <Typography align="center" fontSize={16} sx={{ color: "#666666" }}>
            {store?.telefone || ""}
          </Typography>
          <Box sx={{ ...center }}>
            <Button onClick={() => setOpen((o) => !o)}>Alterar</Button>
            {window.location.hostname.includes("localhost") && (
              <Button onClick={() => setStore(undefined)}>Remover</Button>
            )}
          </Box>
        </Box>
      }
    </>
  ) : null;
}
