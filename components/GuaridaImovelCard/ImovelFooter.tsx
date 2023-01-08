import { Box, Skeleton } from "@mui/material";
import Typography from "@mui/material/Typography";
import { center } from "common/center";
import { DiscountComponent } from "components/DiscountComponent/DiscountComponent";
import { ImovelFooterContainer } from "components/GuaridaImovelCard/ImovelFooterContainer";
import React from "react";
import { Imovel } from "typings";

interface IProps {
  imovel?: Imovel;
}

export const ImovelFooter: React.FC<IProps> = ({ imovel }) => {
  const hasDiscount = (imovel?.valor_anterior_num || 0) > 0;
  return (
    <ImovelFooterContainer>
      {imovel && (
        <Box sx={{ ...center, alignItems: "flex-end" }}>
          <Typography style={{ fontSize: 14, color: "#666666" }} noWrap>
            Código: {imovel?.codigo}
          </Typography>
        </Box>
      )}
      {imovel && (
        <Box
          sx={{
            ...center,
            alignItems: "flex-end",
            flexDirection: !hasDiscount ? "unset" : "column",
          }}
        >
          <DiscountComponent imovel={imovel} />
          <Typography fontWeight="bold" style={{ fontSize: 18 }} noWrap>
            {imovel?.valor_total_txt || imovel?.valor_txt}
          </Typography>
        </Box>
      )}
      {!imovel && (
        <Box
          sx={{
            ...center,
            justifyContent: "space-between",
            height: 46,
            width: "100%",
          }}
        >
          <Skeleton height={46} width="25%" variant="rectangular" />
          <Skeleton height={46} width="25%" variant="rectangular" />
        </Box>
      )}
    </ImovelFooterContainer>
  );
};
