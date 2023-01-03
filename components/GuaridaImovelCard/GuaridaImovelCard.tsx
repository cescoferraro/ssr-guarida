import { CardActions } from "@mui/material";
import { ImovelCardContentContainer } from "components/GuaridaImovelCard/ImovelCardContentContainer";
import { ImovelCardContainer } from "components/GuaridaImovelCard/ImovelCardContainer";
import { useSearchClickCallback } from "components/GuaridaImovelCard/useSearchClickCallback";
import React from "react";
import { Imovel, SearchInput } from "typings";
import { ImovelAddress } from "components/GuaridaImovelCard/ImovelAddress";
import { ImovelFooter } from "components/GuaridaImovelCard/ImovelFooter";
import { ImovelStats } from "components/GuaridaImovelCard/ImovelStats";
import { ImovelImages } from "components/GuaridaImovelCard/ImovelImages";
import { ImovelTags } from "components/GuaridaImovelCard/ImovelTags";
import { ImovelSocialShare } from "components/ImovelSocialShare/ImovelSocialShare";

interface IProps {
  input?: Partial<SearchInput>;
  imovel?: Imovel;
}

export const GuaridaImovelCard: React.FC<IProps> = ({ imovel, input }) => {
  return (
    <ImovelCardContainer onClick={useSearchClickCallback(imovel)}>
      <ImovelImages input={input} imovel={imovel} />
      <CardActions sx={{ cursor: "pointer", px: 2, height: 33 }}>
        <ImovelSocialShare imovel={imovel} />
      </CardActions>
      <ImovelCardContentContainer>
        <ImovelAddress imovel={imovel} />
        <ImovelStats imovel={imovel} />
        <ImovelTags imovel={imovel} />
        <ImovelFooter imovel={imovel} />
      </ImovelCardContentContainer>
    </ImovelCardContainer>
  );
};
