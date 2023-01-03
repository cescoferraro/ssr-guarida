import { UseMutationResult } from "@tanstack/react-query";
import { BairroCidadeChip } from "legacy/search/SearchFilter/FilterTags/BairroCidadeChip";
import React from "react";
import { Bairro, Cidade, Logradouro, SearchInput } from "typings";

export function localizacaoChips(
  element: number,
  k: "bairro" | "cidade",
  search: ({ negocio, ...drawerState }: Partial<SearchInput>) => void,
  input: Partial<SearchInput>,
  qq: UseMutationResult<
    Cidade | Bairro | Logradouro,
    Error,
    { type: "cidade" | "bairro" | "logradouro"; id: string }
  >
): React.ReactNode[] {
  return [
    <BairroCidadeChip
      key={k}
      qq={qq}
      k={k}
      element={element}
      input={input}
      search={search}
    />,
  ];
}
