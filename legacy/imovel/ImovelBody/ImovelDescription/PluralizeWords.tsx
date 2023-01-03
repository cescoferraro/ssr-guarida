import { Typography } from "@mui/material";
import React from "react";

export const PluralizeWords: React.FC<{ length?: number; desc: string }> = ({
  length,
  desc,
}) => (
  <Typography lineHeight={1} color="grey.500">
    {(length || 0) > 1 ? `${desc}s` : desc}
  </Typography>
);
