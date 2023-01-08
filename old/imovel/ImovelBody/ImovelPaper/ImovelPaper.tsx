import {
  Divider,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { notEmpty } from "common/notEmpty";
import { DiscountComponent } from "components/DiscountComponent/DiscountComponent";
import { NewChipGroup } from "old/imovel/ImovelBody/ImovelDescription/ImovelDescription";
import { DialogState } from "old/imovel/ImovelBody/ImovelDialog/ImovelDialog";
import { ImovelPaperValue } from "old/imovel/ImovelBody/ImovelPaper/ImovelPaperValue";
import { BannersCampanhaComponent } from "old/search/BannersCampanhaComponent";
import React, { Dispatch, SetStateAction } from "react";
import { Imovel } from "typings";
import { ImovelLeadForm } from "./ImovelLeadForm";

interface IProps {
  children?: React.ReactNode;
  imovel?: Imovel;
  setDialogState: Dispatch<SetStateAction<DialogState>>;
  title?: string;
}

export function useIsSmallScreen(): boolean {
  return useMediaQuery(useTheme().breakpoints.down("md"));
}

export const ImovelPaper: React.FC<IProps> = ({ imovel, setDialogState }) => {
  return (
    <Paper
      elevation={6}
      sx={{
        // width: isSmallScreen ? "100%" : "65%",
        maxWidth: 405,
        transform: "translateY( -40px )",
        borderRadius: "10px 10px 0 0",
        py: 4,
        px: {
          xs: 2,
          sm: 2,
          md: 4,
        },
        width: {
          xs: "calc(100% - 32px)",
          sm: "calc(100% - 32px)",
          md: "calc(100% - 64px)",
        },
        // padding: "30px 40px",
        position: "sticky",
        top: 200,
      }}
    >
      <BannersCampanhaComponent
        id_campanha={undefined}
        imageType={"header_imovel"}
        screen="desktop"
      />
      <Typography textAlign="center" color="grey.500" fontSize={16}>
        Valor do Imóvel
      </Typography>
      <NewChipGroup
        sx={{
          py: 1,
          flexDirection: "row",
          justifyContent: "center",
          "& > div:nth-of-type(n + 2)": {
            ml: 1,
          },
        }}
        display={"flex"}
        items={[
          (imovel?.valor_anterior_num || 0) > 0
            ? {
                label: "Melhor Preço",
                color: "primary" as const,
              }
            : undefined,
          imovel?.tag_carencia
            ? {
                label: `${imovel?.carencia ?? "0"} Dias de Aluguel Grátis`,
              }
            : undefined,
        ].filter(notEmpty)}
      />
      <DiscountComponent imovel={imovel} />
      <Typography align="right" fontSize={30} fontWeight="bold">
        {imovel?.valor_total_txt || imovel?.valor_txt}
      </Typography>

      <ImovelPaperValue
        onClick={() =>
          setDialogState((s) => ({
            open: !s.open,
            title: "Condomínio",
            description:
              "O valor do condomínio poderá sofrer alterações de acordo com Boxersos fatores, como a variação da taxa condominial fixa, a variação do consumo de gás e água da unidade alugada, a variação do consumo de água das unidades do condomínio, entre outros.",
          }))
        }
        title={"Condomínio"}
        valor={imovel?.valor_condominio_txt || undefined}
      />
      <ImovelPaperValue
        title={"IPTU"}
        valor={imovel?.valor_iptu_txt || undefined}
      />
      <ImovelPaperValue
        title={"Seguro Fogo"}
        exist={(imovel?.seguro_fogo_num || 0) > 0}
        valor={imovel?.seguro_fogo_txt || undefined}
      />
      <ImovelPaperValue
        title={"Custo de Serviços"}
        exist={(imovel?.custos_servicos_num || 0) > 0}
        valor={imovel?.custos_servicos_txt || undefined}
      />
      <br />
      <Typography color="grey.500" align="center">
        *Valores sujeitos à alteração
      </Typography>
      <Typography color="grey.500" align="center">
        **Valores aproximados
      </Typography>
      <Divider sx={{ pt: 2 }} />
      <ImovelLeadForm imovel={imovel} />
    </Paper>
  );
};
