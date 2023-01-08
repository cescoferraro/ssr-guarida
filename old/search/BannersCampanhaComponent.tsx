import { ImageAutoplay } from "old/search/ImageAutoplay";
import { useCampanhasQuery } from "old/search/useCampanhasQuery";
import React from "react";

interface IProps {
  id_campanha?: number | null;

  imageType?: string;
  screen?: "mobile" | "desktop";
}

export function BannersCampanhaComponent({
  screen,
  id_campanha,
  imageType,
}: IProps) {
  const q = useCampanhasQuery();
  return (
    <ImageAutoplay
      imageType={imageType}
      screen={screen}
      images={
        id_campanha
          ? q.data?.filter((c) => c.attributes.id === id_campanha)?.[0]
              .attributes.imagens
          : q.data?.[0]?.attributes?.imagens
      }
    />
  );
}
