import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import { GuaridaHttpClient } from "common/GuaridaHttpClient";
import { useNextParams } from "old/search/useNextParams";
import { SearchInput, SearchResponse, SearchType } from "typings";

export function searchInfiniteQuery(
  input: Partial<SearchInput>,
  pageParam: number
): Promise<SearchResponse> {
  console.log("runned");
  return GuaridaHttpClient.post(`/imoveis`, {
    ...input,
    page: pageParam,
    endereco: input.endereco?.replaceAll("-", " "),
  }).then((c) => c.data);
}

export function useSearchInfiniteQuery(
  input: Partial<SearchInput>,
  response?: SearchResponse
): UseInfiniteQueryResult<SearchResponse> {
  const negocio = useNextParams().negocio as SearchType;
  return useInfiniteQuery<SearchResponse, Error, SearchResponse>({
    queryKey: ["adds", JSON.stringify(input), negocio],
    queryFn: ({ pageParam = 1 }) => searchInfiniteQuery(input, pageParam),
    getNextPageParam: ({ paginacao }) => {
      const currentPage = Number(paginacao?.current);
      return currentPage < (paginacao?.pages || 0)
        ? currentPage + 1
        : undefined;
    },
    staleTime: 0,
    initialData: () => {
      return {
        pageParams: [undefined, 1],
        pages: [response as SearchResponse],
      };
    },
  });
}
