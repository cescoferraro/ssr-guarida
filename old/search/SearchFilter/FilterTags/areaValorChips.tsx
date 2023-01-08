import { notEmpty } from "common/notEmpty";
import React from "react";
import { MinMax, SearchInput } from "typings";
import { formatCurrecyString } from "old/search/SearchFilter/FilterDrawer/SearchFilterSlider";
import { GuaridaFilterChip } from "old/search/SearchFilter/FilterTags/caracteristicasChips";

function extracted(label: string, isCurrency: boolean, min?: number) {
  return `${label}: ${
    isCurrency ? formatCurrecyString(min || 0) : `${String(min)}m²`
  }`;
}

export function areaValorChips(
  inputElement: MinMax,
  keyOf: string,
  search: ({ negocio, ...drawerState }: Partial<SearchInput>) => void,
  input: Partial<SearchInput>
): React.ReactNode[] {
  return [
    inputElement?.max ? (
      <GuaridaFilterChip
        key="max"
        mySentence={extracted("Máx", keyOf === "valor", inputElement?.max)}
        onClick={() => {
          delete inputElement?.max;
          search({
            ...input,
            [keyOf]:
              inputElement && Object.keys(inputElement).length > 0
                ? { ...inputElement }
                : undefined,
          });
        }}
      />
    ) : undefined,
    inputElement?.min || inputElement?.min === 0 ? (
      <GuaridaFilterChip
        key="min"
        mySentence={extracted("Mín", keyOf === "valor", inputElement?.min)}
        onClick={() => {
          delete inputElement?.min;
          search({
            ...input,
            [keyOf]:
              inputElement && Object.keys(inputElement).length > 0
                ? { ...inputElement }
                : undefined,
          });
        }}
      />
    ) : undefined,
  ].filter(notEmpty);
}
