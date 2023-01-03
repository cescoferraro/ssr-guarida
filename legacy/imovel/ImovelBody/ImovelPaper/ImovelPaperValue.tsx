import { Box, Typography } from "@mui/material";
import { GuaridaInfo } from "legacy/imovel/ImovelBody/ImovelDescription/ImovelStats";
import React from "react";

interface IProps {
  title: string;
  valor?: string;
  exist?: boolean;
  onClick?: () => void;
}

export function ImovelPaperValue({
  exist = true,
  onClick,
  title,
  valor,
}: IProps) {
  return exist ? (
    <Box
      color="grey.500"
      sx={{ display: "flex", justifyContent: "space-between" }}
    >
      <Box onClick={onClick} display="flex">
        <Typography>{title}</Typography>
        {onClick && <GuaridaInfo />}
      </Box>
      <Typography>{valor}</Typography>
    </Box>
  ) : null;
}
