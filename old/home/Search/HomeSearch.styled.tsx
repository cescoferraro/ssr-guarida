import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography/Typography";
import desktopAlugar from "common/assets/images/desktop_alugar.png";
import desktopComprar from "common/assets/images/desktop_comprar.png";
import mobileAlugar from "common/assets/images/mobile_alugar.png";
import mobileComprar from "common/assets/images/mobile_comprar.png";

import { center } from "common/center";
import React from "react";
// import { Helmet } from "react-helmet";
import { SearchType } from "typings";

export function Title() {
  const fontSize = { xs: 25, sm: 30, md: 50, lg: 60 };
  return (
    <Box position="relative" sx={{ mb: 2 }}>
      <Box sx={{ width: "100%", position: "absolute", zIndex: 5, ...center }}>
        {/*<Box sx={{ mx: { xs: 8, sm: 3, md: 5, lg: 20 } }}>*/}
        <Box
          sx={{
            display: "flex",
            resize: "horizontal",
            overflow: "hidden",
            height: "width",
            width: { xs: 264, sm: 304, md: 430, lg: 430 },
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 264.108 85.045"
            width="100%"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              id="guarida-grafismo"
              d="M262.15,24.27l-3.219,2.341a152.592,152.592,0,0,1-91.385,30.136A152.592,152.592,0,0,1,76.162,26.611L72.944,24.27,35.59,61.624l4.1,3.218a204.489,204.489,0,0,0,127.958,44.473A204.689,204.689,0,0,0,295.6,64.842l4.1-3.218L262.345,24.27Z"
              transform="translate(-35.59 -24.27)"
              fill="#db1b5e"
            />
          </svg>
        </Box>
        {/*</Box>*/}
      </Box>
      <Box
        sx={{
          height: "auto",
          zIndex: 10,
          position: "relative",
        }}
      >
        <Typography noWrap align="center" sx={{ fontSize }} color="white">
          Tudo que a gente faz
          <br />é para você viver melhor!
        </Typography>
      </Box>
    </Box>
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
        color="secondary"
        fullWidth={false}
        onClick={() => window.open((process.env.URL || "") + "/anunciar")}
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
  return (
    <>
      {/*<Helmet>*/}
      {/*  <link rel="preload" as="image" href={mobileAlugar} />*/}
      {/*  <link rel="preload" as="image" href={mobileComprar} />*/}
      {/*  <link rel="preload" as="image" href={desktopAlugar} />*/}
      {/*  <link rel="preload" as="image" href={desktopComprar} />*/}
      {/*</Helmet>*/}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          minHeight: "calc( 90vh - 100px) ",
          height: "calc( 90vh - 100px) ",
          transition: "background 1s",
          transitionTimingFunction: "linear",
          background: {
            xs: `url(${
              tabIndex === "alugar" ? mobileAlugar : mobileComprar
            }) no-repeat center center`,
            sm: `url(${
              tabIndex === "alugar" ? mobileAlugar : mobileComprar
            }) no-repeat center center`,
            md: `url(${
              tabIndex === "alugar" ? desktopAlugar : desktopComprar
            }) no-repeat center center`,
            lg: `url(${
              tabIndex === "alugar" ? desktopAlugar : desktopComprar
            }) no-repeat center center`,
          },
          backgroundSize: "cover !important",
        }}
      >
        {children}
      </Box>
    </>
  );
};
