import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography/Typography";
import desktopAlugar from "common/assets/images/desktop_alugar.png";
import desktopComprar from "common/assets/images/desktop_comprar.png";
import mobileAlugar from "common/assets/images/mobile_alugar.png";
import mobileComprar from "common/assets/images/mobile_comprar.png";
import { center } from "common/center";
import React from "react";
import { SearchType } from "typings";

export function Title() {
  const fontSize = { xs: 25, sm: 30, md: 50, lg: 60 };
  return (
    <>
      <Typography noWrap align="center" sx={{ fontSize }} color="white">
        Tudo que a gente faz
      </Typography>
      <Typography
        noWrap
        sx={{ fontSize, pb: 2 }}
        align="center"
        fontWeight={"900"}
        color="white"
      >
        é para você viver melhor!
      </Typography>
    </>
  );
}

export function Container({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        ...center,
        alignItems: "flex-end",
      }}
    >
      {children}
    </Box>
  );
}

export function AnuncieButton() {
  return (
    <Box sx={{ ...center, pt: 2 }}>
      <Button
        size={"large"}
        sx={{ borderRadius: 20 }}
        variant="contained"
        color={"secondary"}
        fullWidth={false}
        onClick={() =>
          window.open((process.env.REACT_APP_URL || "") + "/anunciar")
        }
      >
        Anuncie seu imóvel
      </Button>
    </Box>
  );
}

interface IProps {
  children: React.ReactNode;
  tabIndex: SearchType;
}

export const BackgroundImage = ({ children, tabIndex }: IProps) => {
    let smallImage = tabIndex === "alugar" ? mobileAlugar.src : mobileComprar.src;
    let desktopImage = tabIndex === "alugar" ? desktopAlugar.src : desktopComprar.src;
    return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        height: "calc( 90vh - 100px) ",
        transition: "background 1s",
        transitionTimingFunction: "linear",
        background: {
          xs: `url(${ smallImage }) no-repeat center top`,
          sm: `url(${ smallImage }) no-repeat center top`,
          md: `url(${ desktopImage }) no-repeat center top`,
          lg: `url(${ desktopImage }) no-repeat center top`,
        },
        backgroundSize: "cover !important",
      }}
    >
      {children}
    </Box>
  );
};
