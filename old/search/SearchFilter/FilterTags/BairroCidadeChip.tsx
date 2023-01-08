import { UseMutationResult } from "@tanstack/react-query";
import { GuaridaFilterChip } from "./caracteristicasChips";
import { capitalizeWordsFirstLetter } from "common/capitalizeWordsFirstLetter";
import React, { useEffect, useState } from "react";
import { Bairro, Cidade, Logradouro, SearchInput } from "typings";

export function BairroCidadeChip({
  qq,
  k,
  element,
  search,
  input,
}: {
  k: "bairro" | "cidade";
  qq: UseMutationResult<
    Cidade | Bairro | Logradouro,
    Error,
    { type: "cidade" | "bairro" | "logradouro"; id: string }
  >;
  search: ({ negocio, ...drawerState }: Partial<SearchInput>) => void;
  input: Partial<SearchInput>;
  element: number;
}) {
  const [state, setState] = useState<Cidade | Bairro | undefined>(undefined);
  useEffect(() => {
    const ff = async () =>
      setState(await qq.mutateAsync({ type: k, id: String(element) }));
    void ff();
  }, [k, element]);
  return (
    <GuaridaFilterChip
      key={k}
      mySentence={state?.nome || capitalizeWordsFirstLetter(k)}
      onClick={() => {
        delete input[k];
        search(input);
      }}
    />
  );
}
