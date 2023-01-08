import {
  Box,
  CardActions,
  Chip,
  darken,
  SxProps,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ChipPropsColorOverrides } from "@mui/material/Chip/Chip";
import { OverridableStringUnion } from "@mui/types";
import { UseQueryResult } from "@tanstack/react-query";
import { center } from "common/center";
import { ImovelStats } from "old/imovel/ImovelBody/ImovelDescription/ImovelStats";
import { ImovelTexts } from "old/imovel/ImovelBody/ImovelDescription/ImovelTexts";
import { ImovelTitle } from "old/imovel/ImovelBody/ImovelDescription/ImovelTitle";
import { DialogState } from "old/imovel/ImovelBody/ImovelDialog/ImovelDialog";
import { ImovelSocialShare } from "components/ImovelSocialShare/ImovelSocialShare";
import React, { Dispatch, SetStateAction } from "react";
import { Imovel } from "typings";

interface IProps {
  setDialogState: Dispatch<SetStateAction<DialogState>>;
  query: UseQueryResult<Imovel>;
}

export type ChipColor = OverridableStringUnion<
  | "default"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning",
  ChipPropsColorOverrides
>;

export type ChipItem = {
  color?: ChipColor;
  label: string;
};

export function NewChipGroup({
  items,
  display = "block",
  sx,
}: {
  items: ChipItem[];
  display?: string;
  sx?: SxProps;
}) {
  return (
    <Box display={display} sx={{ flexDirection: "column", ...sx }}>
      {items.map((s) => {
        return (
          <Box
            key={s.label}
            sx={display === "flex" ? { ...center, pt: 1 } : {}}
          >
            <Chip
              label={s.label}
              // color={}
              sx={(theme) => {
                const color =
                  s.color === "primary"
                    ? theme.palette.primary.main
                    : theme.palette.secondary.main;
                return {
                  backgroundColor: darken(color, 0.2),
                  color: theme.palette.secondary.contrastText,
                  height: 24,
                  "& span": { px: 1 },
                  borderRadius: 0,
                };
              }}
            />
          </Box>
        );
      })}
    </Box>
  );
}

export const ImovelDescription: React.FC<IProps> = ({ query }) => {
  const { data } = query;
  const items: ChipItem[] = data?.tag_exclusivo
    ? [{ label: "Guarida Exclusive", color: "secondary" }]
    : [];
  const isSmallScreen = useMediaQuery(useTheme().breakpoints.down("md"));
  return (
    <Box
      sx={{
        transform: isSmallScreen ? "translateY( -40px )" : "unset",
        mt: isSmallScreen ? 4 : 0,
      }}
    >
      <CardActions>
        <ImovelSocialShare imovel={data} />
      </CardActions>
      <NewChipGroup items={items} />
      <ImovelTitle imovel={data} />
      <ImovelStats query={query} />
      <ImovelTexts data={data} />
    </Box>
  );
};
