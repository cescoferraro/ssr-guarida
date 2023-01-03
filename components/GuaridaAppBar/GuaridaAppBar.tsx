import { AppBar } from "@mui/material";
import { GuaridaBoletoModal } from "components/GuaridaAppBar/GuaridaBoletoModal";
import { GuaridaAppBarActions } from "components/GuaridaAppBar/GuaridaAppBarActions";
import { GuaridaAppBarLogo } from "components/GuaridaAppBar/GuaridaAppBarLogo";
import { GuaridaAppBarMiddle } from "components/GuaridaAppBar/GuaridaAppBarMiddle";
import { GuaridaSidebar } from "components/GuaridaAppBar/GuaridaSidebar";
import { GuaridaToolbar } from "components/GuaridaAppBar/GuaridaToolbar";
import React, { useState } from "react";

export const GuaridaAppBar: React.FC<{
  position?: "fixed" | "absolute" | "sticky" | "static" | "relative";
  children?: React.ReactNode;
}> = ({ children, position = "fixed" }) => {
  const [open, setOpen] = useState(false);
  const [boleto, setBoleto] = useState(false);
  return (
    <>
      <AppBar
        color={"default"}
        component="header"
        position={position}
        sx={{ boxShador: "none" }}
      >
        <GuaridaToolbar>
          <GuaridaAppBarLogo onClick={() => setOpen(!open)} />
          <GuaridaAppBarMiddle />
          <GuaridaAppBarActions setBoleto={setBoleto} />
        </GuaridaToolbar>
        {children}
      </AppBar>
      {open && <GuaridaSidebar open={open} setOpen={setOpen} />}
      {boleto && <GuaridaBoletoModal open={boleto} setBoletoOpen={setBoleto} />}
    </>
  );
};
