import ArticleIcon from "@mui/icons-material/Article";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { ButtonContainer } from "legacy/imovel/ImovelBody/ImovelDescription/ButtonContainer";
import { CaracteristicasButton } from "legacy/imovel/ImovelBody/ImovelDescription/CaracteristicasButton";
import { FilterTitle } from "legacy/search/SearchFilter/FilterDrawer/SearchFilterButtonFilter";
import React from "react";
import { Imovel } from "typings";

export function ImovelTexts(props: { data?: Imovel }) {
  const whatDoINeed = false;
  const theme = useTheme();
  const predicate = (a?: string) => a !== "";
  const condos = (props.data?.caracteristicas_condominio || []).filter(
    predicate
  );
  const caracteristicasImovel = (
    props.data?.caracteristicas_imovel || []
  ).filter(predicate);
  return (
    <>
      <Box>
        <Typography fontSize={20} sx={{ py: 4 }}>
          Sobre o imóvel
        </Typography>
        <Typography fontSize={16}>{props.data?.descricao_interna}</Typography>
      </Box>
      {caracteristicasImovel.length > 0 && (
        <Box sx={{ py: 2 }}>
          <FilterTitle title={"Caracteristicas"} label={"Imóvel"} />
          <ButtonContainer>
            {caracteristicasImovel.map((c, index) => (
              <CaracteristicasButton key={index} label={c} />
            ))}
          </ButtonContainer>
        </Box>
      )}
      {condos.length > 0 && (
        <Box sx={{ py: 2 }}>
          <FilterTitle title={"Caracteristicas"} label={"Condomínio"} />
          <ButtonContainer>
            {condos.map((c, index) => (
              <CaracteristicasButton key={index} label={c} />
            ))}
          </ButtonContainer>
        </Box>
      )}
      {whatDoINeed && (
        <Box sx={{ py: 4 }}>
          <Typography fontSize={30} sx={{ pb: 4 }} color="primary.dark">
            O que preciso para alugar este imóvel?
          </Typography>
          <Typography>{props.data?.descricao_interna}</Typography>
        </Box>
      )}
      {props.data?.renda_minima_txt && (
        <Box sx={{ py: 4 }}>
          <Typography
            fontSize={30}
            noWrap
            lineHeight={"36px"}
            sx={{ pb: 4 }}
            color="primary.dark"
          >
            O que eu preciso para alugar este imóvel?
          </Typography>
          <Box sx={{ py: 2 }} display="flex">
            <Box>
              <ArticleIcon
                sx={{ color: theme.palette.primary.dark }}
                fontSize="large"
                color="primary"
              />
            </Box>
            <Box sx={{ pl: 2 }}>
              <Typography fontSize={18} sx={{ color: "#707070" }}>
                {`Comprovar renda mensal bruta de aproximadamente`}
              </Typography>
              <Typography fontSize={35}>
                {props.data?.renda_minima_txt}
              </Typography>
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
                sx={{ color: theme.palette.primary.dark }}
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
            <Button href="https://www.guarida.com.br/alugueis/documentacao-alugar">
              Envie Documentos
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
}
