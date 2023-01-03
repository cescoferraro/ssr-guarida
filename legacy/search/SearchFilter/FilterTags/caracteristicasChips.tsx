import { Close } from "@mui/icons-material";
import { Chip, useTheme } from "@mui/material";
import React from "react";
import { capitalizeWordsFirstLetter } from "common/capitalizeWordsFirstLetter";

export function GuaridaFilterChip(props: {
  mySentence: string;
  index: number;
  onClick?: () => void;
}) {
  const theme = useTheme();
  return (
    <Chip
      key={props.mySentence}
      label={capitalizeWordsFirstLetter(props.mySentence)}
      onClick={props?.onClick}
      size="small"
      sx={{ backgroundColor: "#F1F1F1" }}
      icon={<Close sx={{ fill: theme.palette.primary.dark }} />}
    />
  );
}
