import { Box } from "@mui/material";
import React from "react";

interface IProps {
  children: React.ReactNode;
}

export const ImovelFooterContainer: React.FC<IProps> = ({ children }) => (
  <Box
    sx={{
      height: 60 - 2 * 2 * 8 + 18,
      display: "flex",
      justifyContent: "space-between",
      py: 2,
      px: 2,
      pt: 2,
    }}
  >
    {children}
  </Box>
);
