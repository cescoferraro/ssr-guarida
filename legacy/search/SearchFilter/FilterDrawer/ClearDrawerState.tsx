import { Close } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";

export function ClearDrawerState(props: { onClick: () => void }) {
  return (
    <Button
      onClick={props.onClick}
      variant="text"
      size="large"
      endIcon={<Close />}
      sx={{
        textTransform: "none",
        wordBreak: "no-wrap",
        fontSize: { xs: 9, sm: 14 },
      }}
    >
      Limpar filtros
    </Button>
  );
}
