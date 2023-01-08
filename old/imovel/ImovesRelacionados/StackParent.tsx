import { Box, SxProps, Theme } from "@mui/material";
import Typography from "@mui/material/Typography/Typography";
import { center } from "common/center";
import { StackContainer } from "old/imovel/ImovesRelacionados/StackContainer";
import React from "react";

export const StackParent: React.FC<{
  sx?: SxProps<Theme>;
  textSx?: SxProps<Theme>;
  children: React.ReactNode;
  title: string;
}> = ({ title, sx, children, textSx }) => (
  <StackContainer disablePadding={true} sx={{ ...sx }}>
    <Box sx={{ ...center }}>
      <Typography
        component="span"
        color="primary.dark"
        sx={{ fontSize: 45, lineHeight: "52px", ...textSx }}
        align="center"
      >
        {title}
      </Typography>
    </Box>
    <Box height={32} />
    {children}
  </StackContainer>
);
