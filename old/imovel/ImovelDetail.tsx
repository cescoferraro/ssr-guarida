import HomeIcon from "@mui/icons-material/Home";
import { Box, IconButton } from "@mui/material";
import { center } from "common/center";
import { GuaridaAppBar } from "components/GuaridaAppBar/GuaridaAppBar";
import { GuaridaToolbar } from "components/GuaridaAppBar/GuaridaToolbar";
import { GuaridaFooter } from "components/GuaridaFooter/GuaridaFooter";
import { ImovelBody } from "old/imovel/ImovelBody/ImovelBody";
import { ImovelImages } from "old/imovel/ImovelImages/ImovelImages";
import { ImovesRelacionados } from "old/imovel/ImovesRelacionados/ImovesRelacionados";
import { useImovelDetailsQuery } from "old/imovel/useImovelDetailsQuery";
import { Detalhe } from "old/search/SearchFilter/FilterBreadcrums/Detalhe";
import React from "react";
import { Imovel } from "typings";

export const ImovelDetail = ({ imovel }: { imovel: Imovel }) => {
  const release = false;
  const query = useImovelDetailsQuery({ imovel });
  return (
    <>
      <GuaridaAppBar />
      <GuaridaToolbar />
      <Box
        display="flex"
        sx={{
          zIndex: 10,
          background: "white",
          position: "sticky",
          top: {
            xs: 56,
            sm: 64,
            md: 100,
            lg: 100,
          },
        }}
        position={"sticky"}
      >
        <Box sx={{ ...center }}>
          <IconButton size="large" edge="start" color="default" sx={{ pr: 1 }}>
            <HomeIcon />
          </IconButton>
        </Box>
        <Detalhe
          sx={{
            ...center,
          }}
        />
      </Box>
      <ImovelImages query={query} />
      <ImovelBody query={query} />
      {/*{release && <ImovesRelacionados />}*/}
      <GuaridaFooter />
    </>
  );
};
