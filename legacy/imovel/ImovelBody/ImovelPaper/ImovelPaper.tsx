import {Box, Divider, Paper, Typography, useMediaQuery, useTheme,} from "@mui/material";
import {notEmpty} from "common/notEmpty";
import {DiscountComponent} from "components/DiscountComponent/DiscountComponent";
import {NewChipGroup} from "legacy/imovel/ImovelBody/ImovelDescription/ImovelDescription";
import {DialogState} from "legacy/imovel/ImovelBody/ImovelDialog/ImovelDialog";
import {ImovelPaperValue} from "legacy/imovel/ImovelBody/ImovelPaper/ImovelPaperValue";
import React, {Dispatch, SetStateAction} from "react";
import {Imovel} from "typings";
import {ImovelLeadForm} from "./ImovelLeadForm";

interface IProps {
    children?: React.ReactNode;
    imovel?: Imovel;
    setDialogState: Dispatch<SetStateAction<DialogState>>;
    title?: string;
}

export const ImovelPaper: React.FC<IProps> = ({imovel, setDialogState}) => {
    const zIndex = 10;
    const isSmallScreen = useMediaQuery(useTheme().breakpoints.down("md"));
    return (
        <Box
            sx={{
                zIndex,
                display: "flex",
                justifyContent: isSmallScreen ? "center" : "flex-end",
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    width: isSmallScreen ? "100%" : "65%",
                    transform: "translateY( -200px )",
                    borderRadius: "10px 10px 0 0",
                    padding: "30px 40px",
                    zIndex,
                }}
            >
                <Typography textAlign="center" color="grey.500" fontSize={16}>
                    Valor do Imóvel
                </Typography>
                <NewChipGroup
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
                <DiscountComponent imovel={imovel}/>
                <Typography align="right" fontSize={30} fontWeight="bold">
                    {imovel?.valor_total_txt}
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
                <br/>
                <Typography color="grey.500" align="center">
                    *Valores sujeitos à alteração
                </Typography>
                <Typography color="grey.500" align="center">
                    **Valores aproximados
                </Typography>
                <Divider sx={{pt: 2}}/>
                <ImovelLeadForm/>
            </Paper>
        </Box>
    );
};
