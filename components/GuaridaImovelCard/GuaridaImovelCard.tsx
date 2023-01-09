import { CardActions } from "@mui/material";
import { ImovelAddress } from "components/GuaridaImovelCard/ImovelAddress";
import { ImovelCardContainer } from "components/GuaridaImovelCard/ImovelCardContainer";
import { ImovelCardContentContainer } from "components/GuaridaImovelCard/ImovelCardContentContainer";
import { ImovelFooter } from "components/GuaridaImovelCard/ImovelFooter";
import { ImovelImages } from "components/GuaridaImovelCard/ImovelImages";
import { ImovelStats } from "components/GuaridaImovelCard/ImovelStats";
import { ImovelTags } from "components/GuaridaImovelCard/ImovelTags";
import { useSearchClickCallback } from "components/GuaridaImovelCard/useSearchClickCallback";
import { ImovelSocialShare } from "components/ImovelSocialShare/ImovelSocialShare";
import { useIsSmallScreen } from "old/imovel/ImovelBody/ImovelPaper/ImovelPaper";
import { useCurrentUrlCampaign } from "old/search/hooks/useSearchInput";
import React from "react";
import { CampanhaImage, Imovel, SearchInput } from "typings";
import Image from "next/image";

interface IProps {
  input?: Partial<SearchInput>;
  imovel?: Imovel;
}

export const GuaridaImovelCard: React.FC<IProps> = ({ imovel, input }) => {
  const campanha = useCurrentUrlCampaign();
  const b = useIsSmallScreen();
  const onClick = useSearchClickCallback(imovel);
  // noinspection SuspiciousTypeOfGuard
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
        <Image
          src={seloUrl}
          alt={"selo_url"}
          width={200}
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
