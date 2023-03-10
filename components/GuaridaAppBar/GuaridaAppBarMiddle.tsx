import { Box, useMediaQuery, useTheme } from "@mui/material";
import { currentAppUrl } from "common/currentAppUrl";
import {
  DesktopAppbarButton,
  IProps,
} from "components/GuaridaAppBar/DesktopAppbarButton";
import React from "react";

const menuItems: Array<IProps> = [
  { title: "Alugar", link: "/alugar" },
  { title: "Comprar", link: "/comprar" },
  { title: "Anunciar", link: currentAppUrl + "/anunciar" },
  { title: "Condomínios", link: currentAppUrl + "/condominios" },
  { title: "Seguros", link: "https://www.guasegs.com.br/" },
  {
    title: "Fale Conosco",
    link: currentAppUrl + "/institucional/fale-conosco",
  },
  {
    title: "Mais",
    menuItems: [
      {
        idItem: "announce",
        label: "Anunciar",
        link: currentAppUrl + "/anunciar",
      },
      {
        idItem: "condominiums",
        label: "Condomínios",
        link: currentAppUrl + "/condominios",
      },
      {
        idItem: "insurance",
        label: "Seguros",
        link: "https://www.guasegs.com.br/",
      },
      {
        idItem: "contact-us",
        label: "Fale Conosco",
        link: currentAppUrl + "/institucional/fale-conosco",
      },
    ],
  },
];

export function GuaridaAppBarMiddle() {
  const isXs = useMediaQuery(useTheme().breakpoints.only("xs"));
  const isMd = useMediaQuery(useTheme().breakpoints.only("md"));
  const isSm = useMediaQuery(useTheme().breakpoints.only("sm"));
  const isLarge = useMediaQuery(useTheme().breakpoints.up("md"));
  const isMDorSm = isMd || isSm;
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: { xs: "none", sm: "flex", md: "flex", lg: "flex" },
        maxHeight: 50,
        justifyContent: "flex-end",
      }}
    >
      {isXs
        ? []
        : menuItems
            .filter((d) =>
              isMDorSm
                ? ["Comprar", "Alugar", "Mais"].includes(d.title)
                : isLarge
                ? !["Mais"].includes(d.title)
                : true
            )
            .map((i, index) => <DesktopAppbarButton key={index} i={i} />)}
    </Box>
  );
}
