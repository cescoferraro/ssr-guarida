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

export const ImovelFooter: React.FC<IProps> = ({ imovel }) => (
  <ImovelFooterContainer>
    {imovel && (
      <Box sx={{ ...center, alignItems: "flex-end" }}>
        <Typography style={{ fontSize: 11, color: "#999999" }} noWrap>
          Código: {imovel?.codigo}
        </Typography>
      </Box>
    )}
    {imovel && (
      <Box sx={{ ...center, alignItems: "flex-end", flexDirection: "column" }}>
        <DiscountComponent imovel={imovel} />
        <Typography fontWeight="bold" style={{ fontSize: 18 }} noWrap>
          {imovel?.valor_txt}
        </Typography>
      </Box>
    )}
    {!imovel && <Skeleton height={28} width="100%" variant="rectangular" />}
  </ImovelFooterContainer>
);
