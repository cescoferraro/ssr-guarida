import { Share } from "@mui/icons-material";
import { Box, IconButton, Modal, Paper } from "@mui/material";
import { center } from "common/center";
import { EmailForm } from "components/ImovelSocialShare/EmailForm";
import { SocialList } from "components/ImovelSocialShare/SocialList";
import { SocialModalMode } from "components/ImovelSocialShare/SocialModalMode";
import React, { useState } from "react";
import { Imovel } from "typings";

export function ImovelSocialShare({ imovel }: { imovel?: Imovel }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<SocialModalMode>("list");
  return (
    <Box
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <IconButton
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen((o) => !o);
        }}
      >
        <Share />
      </IconButton>
      <Modal
        open={open}
        sx={{ ...center }}
        onClose={() => {
          setMode("list");

          setOpen((o) => !o);
        }}
      >
        <Paper sx={{ maxWidth: 300, minWidth: 300, p: 2 }}>
          {mode === "email" && <EmailForm imovel={imovel} setMode={setMode} />}
          {mode === "list" && <SocialList imovel={imovel} setMode={setMode} />}
        </Paper>
      </Modal>
    </Box>
  );
}
