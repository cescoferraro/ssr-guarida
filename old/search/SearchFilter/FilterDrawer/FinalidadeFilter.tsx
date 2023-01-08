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
  drawerState: Partial<SearchInput>;
}

export const FinalidadeFilter: React.FC<IProps> = ({
  setDrawerState,
  value,
  drawerState,
}) => {
  return (
    <>
      <FormControl>
        <FilterTitle
          title={`${
            window.location.hostname === "localhost" ? "Finalidade" : "Tipo"
          } de `}
          label={"Imóvel"}
        />
        <RadioGroup
          value={value}
          color="secondary"
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
            color="secondary"
            value="Residencial"
            control={<Radio color="secondary" />}
            label="Residencial"
          />
          {!drawerState?.id_campanha && (
            <FormControlLabel
              color="secondary"
              value="comercial"
              control={<Radio color="secondary" />}
              label="Comercial"
            />
          )}
        </RadioGroup>
      </FormControl>
    </>
  );
};
