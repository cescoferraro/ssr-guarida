import { Box, Button, Typography } from "@mui/material";
import { center } from "common/center";
import React from "react";

export function SendAlreadyFilledLead(props: { onClick: () => Promise<void> }) {
  return (
    <Box sx={{ py: 1 }}>
      <Typography
        fontSize={16}
        align={"center"}
        sx={{ color: "#999999" }}
        fontWeight={700}
      >
        Quer saber mais informações sobre o imóvel?
      </Typography>
      <Box sx={{ ...center, py: 1 }}>
        <Button
          sx={{ borderRadius: 20, textTransform: "none" }}
          size={"large"}
          variant="contained"
          color={"secondary"}
          fullWidth={false}
          onClick={props.onClick}
        >
          Tenho interesse
        </Button>
      </Box>
    </Box>
  );
}
