import { Box } from "@mui/material";
import React from "react";

export function ButtonContainer({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        "& > button:nth-of-type(n + 2)": {
          ml: { xs: 1, sm: 1, md: 2 },
        },
      }}
    >
      {children}
    </Box>
  );
}
