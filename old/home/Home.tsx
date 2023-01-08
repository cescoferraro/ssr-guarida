import { Banners } from "old/home/Banners/Banners";
import React from "react";
import { GuaridaAppBar } from "components/GuaridaAppBar/GuaridaAppBar";
import { GuaridaFooter } from "components/GuaridaFooter/GuaridaFooter";
import { Search } from "old/home/Search/Search";

export const Home = () => {
  return (
    <>
      <GuaridaAppBar />
      <Search />
      <Banners />
      <GuaridaFooter />
    </>
  );
};
