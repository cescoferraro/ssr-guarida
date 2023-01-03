import MenuIcon from "@mui/icons-material/Menu";
import { Box, IconButton } from "@mui/material";
import { GuaridaSvgLogo } from "components/GuaridaAppBar/GuaridaSvgLogo";
import Link from "next/link";
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
        sx={{
          color: "black",
          display: { xs: "block", sm: "block", md: "none" },
        }}
        size="large"
        edge="start"
        color="default"
        aria-label="menu"
        onClick={props.onClick}
      >
        <MenuIcon />
      </IconButton>
      <Link href="/">
        <Box sx={{ width: 120, height: 30 }}>
          <GuaridaSvgLogo />
        </Box>
      </Link>
    </Box>
  );
}
