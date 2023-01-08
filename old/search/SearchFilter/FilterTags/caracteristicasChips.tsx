import { Close } from "@mui/icons-material";
import { Chip, useTheme } from "@mui/material";
import React, { MouseEventHandler } from "react";
import { capitalizeWordsFirstLetter } from "common/capitalizeWordsFirstLetter";

export function GuaridaFilterChip({
  mySentence,
  onClick,
  icon = true,
}: {
  icon?: boolean;
  mySentence: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}) {
  const theme = useTheme();
  return (
    <Chip
      key={mySentence}
      label={capitalizeWordsFirstLetter(mySentence)}
      onClick={onClick}
      size="small"
      sx={{ backgroundColor: "#F1F1F1" }}
      icon={
        icon ? <Close sx={{ fill: theme.palette.text.primary }} /> : undefined
      }
    />
  );
}
