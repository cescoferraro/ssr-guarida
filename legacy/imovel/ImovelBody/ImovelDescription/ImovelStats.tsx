import { Box, Divider, Typography } from "@mui/material";
import { UseQueryResult } from "@tanstack/react-query";
import { center } from "common/center";
import { DialogState } from "legacy/imovel/ImovelBody/ImovelDialog/ImovelDialog";
import { PluralizeWords } from "legacy/imovel/ImovelBody/ImovelDescription/PluralizeWords";
import React, { Dispatch, SetStateAction, SVGProps } from "react";
import { Imovel } from "typings";

interface IProps {
  query: UseQueryResult<Imovel>;
  setDialogState: Dispatch<SetStateAction<DialogState>>;
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

export const ImovelStats: React.FC<IProps> = ({ setDialogState, query }) => {
  const number = query?.data?.suites ? query?.data?.suites : 0;
  return (
    <>
      <Box display="flex" sx={{ py: 4, width: "100%" }}>
        <Box>
          <Box sx={{ ...center }}>
            <Typography fontSize={30}>{query.data?.quartos}</Typography>
          </Box>
          <PluralizeWords length={query.data?.quartos} desc="Dormitório" />
        </Box>
        <Box sx={{ pl: 5 }}>
          {number > 0 && (
            <>
              <Box display="flex" sx={{ pb: 1 }}>
                <Box sx={{ ...center, color: "grey.500" }}>
                  <Typography fontSize={30} lineHeight={1} color="black">
                    {number}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    ...center,
                    color: "grey.500",
                    alignItems: "end",
                    pl: 1,
                  }}
                >
                  <PluralizeWords length={number} desc="Suíte" />
                  <GuaridaInfo
                    onClick={() =>
                      setDialogState((s) => ({
                        open: !s.open,
                        title: "Suites",
                        description:
                          "entre os totais de banheiros alguns são Suítes. A Suíte é o termo usado para identificar um quarto que tem um banheiro próprio integrado ao cômodo.",
                      }))
                    }
                  />
                </Box>
              </Box>
              <Divider />
            </>
          )}
          <Box display="flex" sx={{ pt: 0.8 }}>
            <Box sx={{ ...center, justifyContent: "flex-end" }}>
              <Typography fontSize={30} lineHeight={1}>
                {query.data?.banheiros}
              </Typography>
            </Box>
            <Box sx={{ ...center, alignItems: "end", pl: 1 }}>
              <PluralizeWords length={query.data?.banheiros} desc="Banheiro" />
            </Box>
          </Box>
        </Box>
        <Box sx={{ pl: 5 }}>
          <Box sx={{ ...center }}>
            <Typography fontSize={30}>{query.data?.vagas}</Typography>
          </Box>
          <PluralizeWords length={query.data?.vagas} desc="Vaga" />
        </Box>
        <Box sx={{ pl: 5 }}>
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
