import { filtersDefaultValue } from "legacy/search/hooks/filtersDefaultValue";
import { useCategoriasIdQuery } from "legacy/search/hooks/useCategoriasIdQuery";
import { useCurrentLocal } from "legacy/search/hooks/useCurrentLocal";
import { identity, pickBy } from "lodash";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import { Categoria, Localizacoes, SearchInput } from "typings";

const removeEmptyArrays = (value: unknown) =>
  Array.isArray(value) ? value.length > 0 : true;

function getState(): Partial<SearchInput> | undefined {
  // let item
  // if (typeof window !== "undefined") {
  //   item = localStorage.getItem("state");
  // }
  // return item ? JSON.parse(item) : {}
  return {};
}

export function getSearchInput(
  categorias: number[],
  cidade?: number,
  bairro?: number,
  negocio?: string
) {
  const input = {
    ...filtersDefaultValue(negocio),
    categorias,
    cidade,
    bairro,
  };
  return pickBy(pickBy(input, identity), removeEmptyArrays);
}

export function useSearchInput(
  local?: Localizacoes,
  initialCategorias?: Categoria[]
): [Partial<SearchInput>, Dispatch<SetStateAction<Partial<SearchInput>>>] {
  const categoria = useRouter().query.categoria as string | undefined;
  const negocio = useRouter().query.negocio as string | undefined;
  const { bairro, cidade } = useCurrentLocal(local);
  const categorias = useCategoriasIdQuery(categoria, initialCategorias);
  const [input, setInput] = useState<Partial<SearchInput>>(
    getSearchInput(categorias, cidade, bairro, negocio)
  );
  return [input, setInput];
}
