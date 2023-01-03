import { Mail } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { sharableUrl } from "components/ImovelSocialShare/sharableUrl";
import { SocialModalMode } from "components/ImovelSocialShare/SocialModalMode";
import React, { Dispatch, SetStateAction } from "react";
import { Imovel } from "typings";

export function SocialList({
  imovel,
  setMode,
}: {
  setMode: Dispatch<SetStateAction<SocialModalMode>>;
  imovel?: Imovel;
}) {
  const urlToShare = sharableUrl(imovel);
  return (
    <Box display="flex" flexDirection="column">
      <Typography sx={{ py: 1 }}>Compartilhar</Typography>
      <Button
        sx={{ justifyContent: "flex-start" }}
        onClick={() => setMode((m) => (m === "list" ? "email" : "list"))}
        startIcon={<Mail />}
      >
        Email
      </Button>
      <Button
        sx={{ justifyContent: "flex-start" }}
        startIcon={<Mail />}
        onClick={() =>
          (window.location.href = `https://api.whatsapp.com/send?text=${urlToShare}`)
        }
      >
        Whatsapp
      </Button>
      <Button
        sx={{ justifyContent: "flex-start" }}
        startIcon={<Mail />}
        onClick={() => {
          // const text = imovel?.endereco || "";
          // window.location.href = `https://www.facebook.com/sharer/sharer.php?u=${urlToShare}&quote=${text}`;
        }}
      >
        Facebook
      </Button>
      <Button
        sx={{ justifyContent: "flex-start" }}
        startIcon={<Mail />}
        onClick={() =>
          (window.location.href = `https://twitter.com/intent/tweet?text=${encodeURI(
            imovel?.endereco || "" + "  " + urlToShare
          )}`)
        }
      >
        Twitter
      </Button>
    </Box>
  );
}
