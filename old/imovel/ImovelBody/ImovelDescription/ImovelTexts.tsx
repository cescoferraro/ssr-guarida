import ArticleIcon from "@mui/icons-material/Article";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useCategoriaFilterQuery } from "common/hooks/useCategoriaFilterQuery";
import { notEmpty } from "common/notEmpty";
import { ButtonContainer } from "old/imovel/ImovelBody/ImovelDescription/ButtonContainer";
import {
  ChipColor,
  NewChipGroup,
} from "old/imovel/ImovelBody/ImovelDescription/ImovelDescription";
import { FilterTitle } from "old/search/SearchFilter/FilterDrawer/SearchFilterButtonFilter";
import React from "react";
import { Imovel } from "typings";

interface IProps {
  data?: Imovel;
}

export function ImovelTexts({ data }: IProps) {
  const theme = useTheme();
  const predicate = (a?: string) => a !== "";
  const condos = (data?.caracteristicas_condominio || []).filter(predicate);
  const caracteristicasImovel = (data?.caracteristicas_imovel || []).filter(
    predicate
  );

  const filterQuery = useCategoriaFilterQuery({ finalidade: "Residencial" });
  return (
    <>
      <Box>
        <Typography fontSize={20} sx={{ py: 4 }}>
          Sobre o imóvel
        </Typography>
        <Typography fontSize={16}>{data?.descricao_interna}</Typography>
      </Box>
      {caracteristicasImovel.length > 0 && (
        <Box sx={{ py: 2 }}>
          <FilterTitle title={"Caracteristicas"} label={"Imóvel"} />
          <ButtonContainer>
            <NewChipGroup
              sx={{
                py: 1,
                flexDirection: "row",
                "& > div:nth-of-type(n + 2)": { ml: 1 },
              }}
              display={"flex"}
              items={caracteristicasImovel
                .map((c) => ({
                  color: "secondary" as ChipColor,
                  label:
                    filterQuery.data?.caracteristicasImovel?.find(
                      (d) => d.id === c
                    )?.text || c,
                }))
                .filter(notEmpty)}
            />
          </ButtonContainer>
        </Box>
      )}
      {condos.length > 0 && (
        <Box sx={{ py: 2 }}>
          <FilterTitle title={"Caracteristicas"} label={"Condomínio"} />
          <ButtonContainer>
            <NewChipGroup
              sx={{
                py: 1,
                flexDirection: "row",
                "& > div:nth-of-type(n + 2)": { ml: 1 },
              }}
              display={"flex"}
              items={condos
                .map((c) => ({
                  color: "secondary" as ChipColor,
                  label:
                    filterQuery.data?.caracteristicasCondominio?.find(
                      (d) => d.id === c
                    )?.text || c,
                }))
                .filter(notEmpty)}
            />
          </ButtonContainer>
        </Box>
      )}
      {data?.renda_minima_txt && (
        <Box sx={{ py: 4 }}>
          <Typography
            fontSize={30}
            noWrap
            lineHeight={"36px"}
            sx={{ pb: 4 }}
            color="text.primary"
          >
            O que eu preciso para alugar este imóvel?
          </Typography>
          <Box sx={{ py: 2 }} display="flex">
            <Box>
              <ArticleIcon
                sx={{ color: theme.palette.text.primary }}
                fontSize="large"
                color="primary"
              />
            </Box>
            <Box sx={{ pl: 2 }}>
              <Typography fontSize={18} sx={{ color: "#707070" }}>
                {`Comprovar renda mensal bruta de aproximadamente`}
              </Typography>
              <Typography fontSize={35}>{data?.renda_minima_txt}</Typography>
              <br />
              <Typography>
                A renda pode ser composta por até 4 pessoas físicas. Esse valor
                pode variar em função do aluguel final acordado
              </Typography>
            </Box>
          </Box>
          <Box display="flex" sx={{ py: 2 }}>
            <Box>
              <AttachMoneyIcon
                fontSize="large"
                sx={{ color: theme.palette.text.primary }}
                color="primary"
              />
            </Box>
            <Box sx={{ pl: 2 }}>
              <Typography fontSize={18} sx={{ color: "#707070" }}>
                Enviar documentos digitais e ser aprovado em nossa análise de
                crédito
              </Typography>
              <Typography>
                Analisamos diversos critérios relacionados ao histórico de
                rendimento e gastos para traçar o perfil de crédito dos
                locatários, com base nos comprovantes enviados por você
              </Typography>
            </Box>
          </Box>
          <Box>
            <Button
              color="secondary"
              href="https://www.guarida.com.br/alugueis/documentacao-alugar"
            >
              Envie Documentos
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
}
