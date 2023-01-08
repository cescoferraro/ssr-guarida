import { CardActions } from "@mui/material";
import { ImovelCardContentContainer } from "components/GuaridaImovelCard/ImovelCardContentContainer";
import { ImovelCardContainer } from "components/GuaridaImovelCard/ImovelCardContainer";
import { useSearchClickCallback } from "components/GuaridaImovelCard/useSearchClickCallback";
import { useIsSmallScreen } from "old/imovel/ImovelBody/ImovelPaper/ImovelPaper";
import { useCurrentUrlCampaign } from "old/search/hooks/useSearchInput";
import React from "react";
import { CampanhaImage, Imovel, SearchInput } from "typings";
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
  const campanha = useCurrentUrlCampaign();
  const b = useIsSmallScreen();
  const onClick = useSearchClickCallback(imovel);
  if (typeof imovel === "string") {
    return (
      <ImovelCardContainer
        sx={{
          backgroundImage: `url(${imovel})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "100%",
        }}
      />
    );
  }
  const findElement = campanha?.attributes?.imagens?.find(
    (i: CampanhaImage) => i.tipo === "selo_busca"
  )?.[b ? "mobile" : "desktop"];
  const seloUrl = findElement?.data?.attributes?.url;
  return (
    <ImovelCardContainer onClick={onClick}>
      <ImovelImages input={input} imovel={imovel} />
      <CardActions
        sx={{ position: "relative", cursor: "pointer", px: 2, height: 33 }}
      >
        <ImovelSocialShare imovel={imovel} />
        <img
          src={seloUrl}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
          }}
        />
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
