import MenuIcon from "@mui/icons-material/Menu";
import { Box, IconButton } from "@mui/material";
import React from "react";

export function GuaridaAppBarLogo(props: { onClick: () => void }) {
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
