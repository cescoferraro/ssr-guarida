import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

interface IProps {
  children: React.ReactNode;
  description?: string;
}

export function DescriptionWrapper({ description, children }: IProps) {
  return useMediaQuery(useTheme().breakpoints.only("sm")) ? (
    <Box display="flex" width="100%" justifyContent="space-between">
      <Box sx={{ flexBasis: "50%", pr: 2 }}>
        <Typography color={"text.primary"} fontSize={16}>
          {description || `Insert Text`}
        </Typography>
      </Box>
      <Box sx={{ flexBasis: "50%", pl: 2 }}>{children}</Box>
    </Box>
  ) : (
    <>{children}</>
  );
}
