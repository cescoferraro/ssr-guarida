import { Box } from "@mui/material";
import { GuaridaAppBar } from "components/GuaridaAppBar/GuaridaAppBar";
import { GuaridaFooter } from "components/GuaridaFooter/GuaridaFooter";
import { Banners } from "legacy/home/Banners/Banners";
import { Search } from "legacy/home/Search/Search";
import React from "react";

export const Home = () => {
  return (
    <>
      <GuaridaAppBar position={"static"} />
      <Box sx={{ background: "white", overflowY: "scroll" }}>
        <Search />
        <Banners />
        <GuaridaFooter />
      </Box>
    </>
  );
};
