/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Slider, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import React, { Dispatch, SetStateAction } from "react";
import { NumericFormat } from "react-number-format";
import { MinMax, SearchInput } from "typings";

interface IProps {
  drawerState: Partial<SearchInput>;
  setDrawerState: Dispatch<SetStateAction<Partial<SearchInput>>>;
  keyof: keyof SearchInput;
  label: string;
  suffix?: string;
  isCurrency?: boolean;
}

export function formatCurrecyString(value?: number): string {
  if (!value) return "";
  return Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    notation: "compact",
  }).format(value || 0);
}

export function SearchFilterSlider({
  drawerState,
  keyof,
  label,
  setDrawerState,
  isCurrency,
  suffix = "",
}: IProps) {
  const value = drawerState[keyof] as MinMax;
  const max =
    drawerState.negocio === 1
      ? isCurrency
        ? 30000
        : 1000
      : isCurrency
      ? 1000000
      : 20000;
  return (
    <Box sx={{ pt: 2 }}>
      <Box
        sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}
      >
        <Typography>{label}</Typography>
        <Typography color="primary" sx={{ fontWeight: 800 }}>
          {value
            ? `${value?.min}${suffix} - ${
                value?.max
                  ? isCurrency
                    ? formatCurrecyString(value.max)
                    : value?.max
                  : ""
              }${suffix}`
            : "Não definido"}
        </Typography>
      </Box>
      <Box sx={{ p: 2, pb: 0 }}>
        <Slider
          max={max}
          value={[value?.min || 0, value?.max || 0]}
          onChange={(event: Event, newValue?: number | number[]) => {
            if (typeof newValue === "number") return;
            setDrawerState((s) => ({
              ...s,
              [keyof]: { min: newValue?.[0], max: newValue?.[1] },
            }));
          }}
          valueLabelDisplay="auto"
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-around" }}>
        <NumericFormat
          customInput={TextField}
          thousandSeparator={"."}
          decimalSeparator={","}
          prefix={"R$"}
          size="small"
          value={value?.min}
          placeholder={"Mínimo"}
          sx={{ input: { textAlign: "center" } }}
          onChange={(e: any) => {
            setDrawerState((s) => ({
              ...s,
              [keyof]: { ...(s[keyof] as MinMax), min: Number(e.target.value) },
            }));
          }}
        />
        <Box sx={{ width: 8 }} />
        <NumericFormat
          customInput={TextField}
          thousandSeparator={"."}
          decimalSeparator={","}
          prefix={"R$"}
          variant="outlined"
          size="small"
          placeholder={"Máximo"}
          value={value?.max}
          sx={{ input: { textAlign: "center" } }}
          onChange={(e: any) => {
            setDrawerState((s) => ({
              ...s,
              [keyof]: { ...(s[keyof] as MinMax), max: Number(e.target.value) },
            }));
          }}
        />
      </Box>
    </Box>
  );
}
