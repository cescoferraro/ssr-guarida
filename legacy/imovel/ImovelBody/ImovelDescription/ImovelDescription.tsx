import { Box, CardActions, Chip, useMediaQuery, useTheme } from "@mui/material";
import { ChipPropsColorOverrides } from "@mui/material/Chip/Chip";
import { OverridableStringUnion } from "@mui/types";
import { UseQueryResult } from "@tanstack/react-query";
import { center } from "common/center";
import { ImovelStats } from "legacy/imovel/ImovelBody/ImovelDescription/ImovelStats";
import { ImovelTexts } from "legacy/imovel/ImovelBody/ImovelDescription/ImovelTexts";
import { ImovelTitle } from "legacy/imovel/ImovelBody/ImovelDescription/ImovelTitle";
import { DialogState } from "legacy/imovel/ImovelBody/ImovelDialog/ImovelDialog";
import { ImovelSocialShare } from "components/ImovelSocialShare/ImovelSocialShare";
import React, { Dispatch, SetStateAction } from "react";
import { Imovel } from "typings";

interface IProps {
  setDialogState: Dispatch<SetStateAction<DialogState>>;
  query: UseQueryResult<Imovel>;
}

export type ChipItem = {
  color?: OverridableStringUnion<
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning",
    ChipPropsColorOverrides
  >;
  label: string;
};

export function NewChipGroup({
  items,
  display = "block",
}: {
  items: ChipItem[];
  display?: string;
}) {
  return (
    <Box display={display} sx={{ flexDirection: "column" }}>
      {items.map((s) => {
        return (
          <Box
            key={s.label}
            sx={display === "flex" ? { ...center, pt: 1 } : {}}
          >
            <Chip
              label={s.label}
              color={s.color}
              sx={{ height: 24, "& span": { px: 1 } }}
            />
          </Box>
        );
      })}
    </Box>
  );
}

export const ImovelDescription: React.FC<IProps> = ({
  query,
  setDialogState,
}) => {
  const { data } = query;
  const items: ChipItem[] = data?.tag_exclusivo
    ? [{ label: "Guarida Exclusive", color: "primary" }]
    : [];
  const isSmallScreen = useMediaQuery(useTheme().breakpoints.down("md"));
  return (
    <Box
      sx={{
        transform: isSmallScreen ? "translateY( -200px )" : "unset",
        mt: isSmallScreen ? 4 : 0,
        zIndex: 20,
      }}
    >
      <CardActions>
        <ImovelSocialShare imovel={data} />
      </CardActions>
      <NewChipGroup items={items} />
      <ImovelTitle data={data} />
      <ImovelStats setDialogState={setDialogState} query={query} />
      <ImovelTexts data={data} />
    </Box>
  );
};
