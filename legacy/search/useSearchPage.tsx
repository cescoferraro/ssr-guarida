import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { useImoveisMemo } from "legacy/search/hooks/useImoveisMemo";
import { useSearchInfiniteQuery } from "legacy/search/hooks/useSearchInfiniteQuery";
import { useSearchInput } from "legacy/search/hooks/useSearchInput";
import React, { Dispatch, SetStateAction } from "react";
import {
  Categoria,
  Imovel,
  Localizacoes,
  SearchInput,
  SearchResponse,
} from "typings";

export interface SearchPageHooks {
  input: Partial<SearchInput>;
  // setLoading: () => void;
  imoveis: Imovel[];
  // loading: boolean;
  total: number;
  query: UseInfiniteQueryResult<SearchResponse>;
  setInput: Dispatch<SetStateAction<Partial<SearchInput>>>;
}

export function useSearchPage(
  initialResult?: SearchResponse,
  local?: Localizacoes,
  categorias?: Categoria[]
): SearchPageHooks {
  const [input, setInput] = useSearchInput(local, categorias);
  const query = useSearchInfiniteQuery(input, initialResult);
  const imoveis = useImoveisMemo(query);
  return {
    setInput,
    query,
    input,
    imoveis,
    total: query.data?.pages?.[0].total || 0,
  };
}
