import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";

interface IProps {
  value?: string;
  label: string;
  isFirst?: boolean;
}

export function CardStat({ label, value, isFirst = false }: IProps) {
  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          pl: isFirst ? 0 : 1,
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "end",
        }}
      >
        <Typography sx={{ fontSize: 24, fontWeight: 700, lineHeight: 1 }}>
          {value}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "end",
        }}
      >
        <Typography
          sx={{ fontSize: 16, lineHeight: 1 }}
        >{` ${label}`}</Typography>
      </Box>
    </Box>
  );
}
