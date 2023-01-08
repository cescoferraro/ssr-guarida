import { Box, Divider, Typography } from "@mui/material";
import { UseQueryResult } from "@tanstack/react-query";
import { center } from "common/center";
import { PluralizeWords } from "old/imovel/ImovelBody/ImovelDescription/PluralizeWords";
import React, { SVGProps } from "react";
import { Imovel } from "typings";

interface IProps {
  query: UseQueryResult<Imovel>;
}

export const GuaridaInfo: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={19} height={19} {...props}>
    <path data-name="Caminho 1018" d="M0 0h19v19H0Z" fill="none" />
    <path
      data-name="Caminho 1019"
      d="M8.75 5.75h1.5v1.5h-1.5Zm0 3h1.5v4.5h-1.5ZM9.5 2A7.5 7.5 0 1 0 17 9.5 7.5 7.5 0 0 0 9.5 2Zm0 13.5a6 6 0 1 1 6-6 6.008 6.008 0 0 1-6 6Z"
      fill="#999"
    />
  </svg>
);

export const ImovelStats: React.FC<IProps> = ({ query }) => {
  return (
    <>
      <Box
        display="flex"
        sx={{ py: 4, width: "100%", display: "flex", gap: 2 }}
      >
        <Box>
          <Box sx={{ ...center }}>
            <Typography fontSize={30}>{query.data?.quartos}</Typography>
          </Box>
          <PluralizeWords length={query.data?.quartos} desc="Dormitório" />
        </Box>
        <Box>
          <Box sx={{ ...center }}>
            <Typography fontSize={30}>{query.data?.banheiros}</Typography>
          </Box>
          <PluralizeWords length={query.data?.banheiros} desc="Banheiro" />
        </Box>
        <Box>
          <Box sx={{ ...center }}>
            <Typography fontSize={30}>{query.data?.vagas}</Typography>
          </Box>
          <PluralizeWords length={query.data?.vagas} desc="Vaga" />
        </Box>
        <Box>
          <Box sx={{ ...center }}>
            <Typography fontSize={30}>
              {query.data?.area_total_txt}m²
            </Typography>
          </Box>
          <PluralizeWords
            length={query.data?.area_util_num}
            desc="Área privativa"
          />
        </Box>
      </Box>
      <Divider />
    </>
  );
};
