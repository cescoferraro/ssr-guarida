import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Box, Button, Typography } from "@mui/material";
import { center } from "common/center";
import { capitalize } from "lodash";
import {
  Lead,
  stripMaskFromValue,
} from "old/imovel/ImovelBody/ImovelPaper/LeadForm/LeadFormComponent";
import React, { Dispatch, SetStateAction } from "react";
import { useNextParams } from "old/search/useNextParams";
import { Imovel } from "typings";

export function goToWhats(imovel?: Imovel, negocio?: string) {
  // ?phone=555133279001&text=%23Alugar%20um%20Im%C3%B3vel%20-%20COD-14369
  const host = "https://api.whatsapp.com/send";
  const negocioText = capitalize(negocio || "");
  const text = `#${negocioText} um Imóvel - COD-${imovel?.codigo || ""}`;
  const phone = stripMaskFromValue(imovel?.corretor?.celular || "555133279001");
  const encodedText = encodeURIComponent(text);
  window.location.href = `${host}?phone=${phone}&text=${encodedText}`;
}

export function CorretorComponent({
  imovel,
  store,
  setOpen,
  setSend2Whats,
}: {
  store: Lead | undefined;
  imovel?: Imovel;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setSend2Whats: Dispatch<SetStateAction<boolean>>;
}) {
  const negocio = useNextParams().negocio;
  return (
    <>
      {imovel?.corretor && (
        <>
          <Box sx={{ ...center, pb: 1, pt: 2 }}>
            <img
              style={{ width: 105, height: 105, borderRadius: 50 }}
              src={imovel?.corretor?.foto || ""}
              alt=""
            />
          </Box>
          <Typography fontWeight={700} align={"center"}>
            Corretor
          </Typography>
          <Typography fontSize={20} fontWeight={700} align={"center"}>
            {imovel?.corretor?.nome || ""}
          </Typography>
          <Typography
            align={"center"}
            color="info.contrastText"
            fontWeight={700}
          >
            CRECI: {imovel?.corretor?.codigo || ""}
          </Typography>
        </>
      )}
      <Typography
        fontSize={18}
        sx={{ py: 1 }}
        align={"center"}
        color="info.contrastText"
        fontWeight={700}
      >
        Converse agora com o consultor
      </Typography>
      <Box sx={{ ...center }}>
        <Button
          sx={{ textTransform: "none", borderRadius: 20 }}
          size={"large"}
          variant="contained"
          color={"secondary"}
          fullWidth={false}
          startIcon={<WhatsAppIcon />}
          onClick={() => {
            setSend2Whats(true);
            if (store) {
              goToWhats(imovel, negocio);
              return;
            }
            setOpen((o) => !o);
          }}
        >
          Contato via WhatsApp
        </Button>
      </Box>
    </>
  );
}
