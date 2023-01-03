import PersonIcon from "@mui/icons-material/Person";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import {
  Box,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";

export function GuaridaAppBarActions({
  setBoleto,
}: {
  setBoleto: Dispatch<SetStateAction<boolean>>;
}) {
  const isSm = useMediaQuery(useTheme().breakpoints.only("sm"));
  const isXs = useMediaQuery(useTheme().breakpoints.only("xs"));
  const smallAtLeast = !(isSm || isXs);
  const primary = useTheme().palette.primary;
  return (
    <Box sx={{ display: "flex" }}>
      <Button
        sx={{
          fontSize: 16,
          textTransform: "none",
          color: "black",
          whiteSpace: "nowrap",
          minWidth: "auto",
          borderRadius: 10,
          boxShadow: "none",
          background: "#e7e4e4",
          "&:hover": {
            background: "#e7e4e4",
          },
        }}
        // href="https://www.guarida.com.br/AgenciaVirtual/index/showModalSegundaViaDoc"
        onClick={() => setBoleto((s) => !s)}
        startIcon={<ReceiptOutlinedIcon />}
        fullWidth={false}
        variant={"contained"}
      >
        <b>{smallAtLeast ? "2ª Via de Boleto" : "Boleto"}</b>
      </Button>
      <Box sx={{ pl: 1 }}>
        {smallAtLeast ? (
          <Button
            sx={{
              fontSize: 16,
              textTransform: "none",
              whiteSpace: "nowrap",
              minWidth: "auto",
              color: primary.dark,
              borderColor: primary.dark,
              "&:hover": { borderColor: primary.dark },
              borderRadius: 10,
              ml: 2,
            }}
            startIcon={<PersonIcon />}
            fullWidth={false}
            variant={"outlined"}
            href="https://agenciavirtual3.guarida.com.br/login"
          >
            Agência Virtual
          </Button>
        ) : (
          <IconButton
            sx={{
              background: "#e7e4e4",
              "&:hover": {
                background: "#e7e4e4",
              },
              outline: primary.dark,
            }}
          >
            <PersonIcon sx={{ color: "black" }} />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}
