// noinspection SpellCheckingInspection

import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { SearchInput } from "typings";
import { FilterTitle } from "./SearchFilterButtonFilter";

interface IProps {
  value: string | undefined;
  setDrawerState: Dispatch<SetStateAction<Partial<SearchInput>>>;
}

export const FinalidadeFilter: React.FC<IProps> = ({
  setDrawerState,
  value,
}) => {
  return (
    <>
      <FormControl>
        <FilterTitle
          title={`${
            window.location.hostname === "localhost" ? "Finalidade" : "Tipo"
          }de `}
          label={"Imóvel"}
        />
        <RadioGroup
          value={value}
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          onChange={(_, value) => {
            setDrawerState((s) => ({
              ...s,
              finalidade: value,
              valor: undefined,
              categorias: undefined,
              numerovagas: undefined,
              numeroquartos: undefined,
              numerobanheiros: undefined,
              numerosuites: undefined,
              numeroelevador: undefined,
              area: undefined,
            }));
          }}
        >
          <FormControlLabel
            value="Residencial"
            control={<Radio />}
            label="Residencial"
          />
          <FormControlLabel
            value="comercial"
            control={<Radio />}
            label="Comercial"
          />
        </RadioGroup>
      </FormControl>
    </>
  );
};
