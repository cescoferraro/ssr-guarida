import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import { GuaridaHttpClient } from "common/GuaridaHttpClient";
import { useSearchInput } from "old/search/hooks/useSearchInput";
import { useNextParams } from "old/search/useNextParams";
import { SearchInput, SearchResponse, SearchType } from "typings";

export function searchInfiniteQuery(
  input: Partial<SearchInput>,
  pageParam: number
): Promise<SearchResponse> {
  return GuaridaHttpClient.post(`/imoveis`, {
    ...input,
    page: pageParam,
    endereco: input.endereco?.replaceAll("-", " "),
  }).then((c) => c.data);
}

export function useSearchInfiniteQuery(
  debouncedEndereco?: string | null
): [UseInfiniteQueryResult<SearchResponse>, Partial<SearchInput>] {
  const [input, initialized] = useSearchInput();
  const negocio = useNextParams().negocio as SearchType;
  return [
    useInfiniteQuery<SearchResponse, Error, SearchResponse>({
      enabled: initialized,
      queryKey: ["adds", debouncedEndereco, JSON.stringify(input), negocio],
      queryFn: ({ pageParam = 1 }) => searchInfiniteQuery(input, pageParam),
      getNextPageParam: ({ paginacao }) => {
        const currentPage = Number(paginacao?.current);
        return currentPage < (paginacao?.pages || 0)
          ? currentPage + 1
          : undefined;
      },
    }),
    input,
  ];
}
