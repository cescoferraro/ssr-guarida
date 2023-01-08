import { components } from "guarida";
import { FilterTitle } from "./SearchFilterButtonFilter";
import { WeirdButton } from "./WeirdButton";
import React, { Dispatch, SetStateAction } from "react";
import { SearchInput } from "typings";

export function CaracteristicasFilter({
  data,
  drawerState,
  setDrawerState,
  title,
  label,
}: {
  title: string;
  label: string;
  data?: components["schemas"]["CaracteristicasImovel"][] | null;
  drawerState: Partial<SearchInput>;
  setDrawerState: Dispatch<SetStateAction<Partial<SearchInput>>>;
}) {
  return (
    <>
      <FilterTitle title={title} label={label} />
      {data?.map((a: components["schemas"]["CaracteristicasImovel"]) => {
        const selected =
          Boolean(drawerState[a.id as keyof SearchInput]) || false;
        return (
          <WeirdButton
            key={a.text}
            sx={{ mr: 10 / 8, mb: 10 / 8 }}
            label={a.text || ""}
            isSelected={selected}
            onClick={() => {
              setDrawerState((s) => ({
                ...s,
                [a.id || ""]: !selected,
              }));
            }}
          />
        );
      })}
    </>
  );
}
