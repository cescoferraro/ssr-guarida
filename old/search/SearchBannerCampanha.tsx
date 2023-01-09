import { Container } from "@mui/material";
import { center } from "common/center";
import { BannersCampanhaComponent } from "old/search/BannersCampanhaComponent";
import React from "react";

export function SearchBannerCampanha() {
  return (
    <Container sx={{ ...center }}>
      <BannersCampanhaComponent imageType="header_busca" />
    </Container>
  );
}
