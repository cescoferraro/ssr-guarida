import { Phone } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { FooterGridItem } from "components/GuaridaFooter/FooterGridItem";
import { FooterLinkComponent } from "components/GuaridaFooter/FooterLinkComponent";
import * as React from "react";

export function FooterContact({ color }: { color?: string }) {
  const sx = {
    fontWeight: "bold",
    color: color || "#666666",
    fontSize: "18px !important",
    textAlign: "left",
    pb: 1,
  };
  return (
    <FooterGridItem>
      <Box
        sx={{
          "& > p": { pb: 2 },
          "& > button": { mb: 2 },
        }}
      >
        <Typography fontSize={18} noWrap sx={sx}>
          Central de Atendimento
        </Typography>
        <Typography
          noWrap
          sx={{
            ...sx,
            color: color || "#10344D",
          }}
          fontSize={24}
        >
          (51) 3327-9001
        </Typography>
        <Button
          startIcon={<Phone />}
          variant="contained"
          sx={{
            color: "#444444",
            background: "#EEEEEE",
            borderRadius: 20,
            fontSize: 10,
            // whiteSpace: "nowrap",
            // minWidth: "auto",
            "&:hover": {
              background: "#EEEEEE",
            },
          }}
        >
          Atendimento via WhatsApp
        </Button>
        <FooterLinkComponent
          textColor={color}
          always
          spacer
          footerLink={{
            display: "Central de Ajuda",
            anchor: "https://www.guarida.com.br/institucional/fale-conosco",
          }}
        />
        <FooterLinkComponent
          textColor={color}
          always
          spacer
          footerLink={{
            display: "Emergência Condominial",
            anchor:
              "https://www.guarida.com.br/condominios/emergencia-condominial",
          }}
        />
      </Box>
    </FooterGridItem>
  );
}
