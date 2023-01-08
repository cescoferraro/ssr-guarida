import MenuIcon from "@mui/icons-material/Menu";
import { Link, Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { GuaridaSvgLogo } from "components/GuaridaAppBar/GuaridaSvgLogo";
import React from "react";

export function GuaridaAppBarLogo(props: { onClick: () => void }) {
  const isSmallScreen = useMediaQuery(useTheme().breakpoints.down("md"));
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "left",
        height: "100%",
      }}
    >
      <IconButton
        sx={{ color: "black" }}
        size="large"
        edge="start"
        color="default"
        aria-label="menu"
        onClick={props.onClick}
      >
        <MenuIcon />
      </IconButton>
      {/*<Link to="/">*/}
      {/*  <Box*/}
      {/*    sx={{*/}
      {/*      display: "flex",*/}
      {/*      overflow: "hidden",*/}
      {/*      height: "width",*/}
      {/*      width: { xs: 120, sm: 120, md: "180px !important" },*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    {isSmallScreen ? <GuaridaSvgLogo /> : <GuaridaSvgLogo />}*/}
      {/*  </Box>*/}
      {/*</Link>*/}
    </Box>
  );
}
