import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";

interface IProps {
  value?: string;
  label: string;
}

export function CardStat(props: IProps) {
  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "end",
        }}
      >
        <Typography sx={{ fontSize: 24, fontWeight: 700, lineHeight: 1 }}>
          {props.value}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "end",
          pl: 1,
        }}
      >
        <Typography
          sx={{ fontSize: 16, lineHeight: 1 }}
        >{` ${props.label}`}</Typography>
      </Box>
    </Box>
  );
}
