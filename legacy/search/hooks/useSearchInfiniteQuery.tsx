import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import { GuaridaHttpClient } from "common/GuaridaHttpClient";
import { useRouter } from "next/router";
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
  input: Partial<SearchInput>,
  initialResult?: SearchResponse
): UseInfiniteQueryResult<SearchResponse> {
  console.log(454, input.order);
  const negocio = useRouter().query.negocio as SearchType;
  return useInfiniteQuery<SearchResponse, Error, SearchResponse>({
    queryKey: ["adds", JSON.stringify(input), input.order, negocio],
    queryFn: ({ pageParam = 1 }) => searchInfiniteQuery(input, pageParam),
    getNextPageParam: (d) => {
      const { paginacao } = d;
      const currentPage = Number(paginacao?.current);
      return currentPage < (paginacao?.pages || 0)
        ? currentPage + 1
        : undefined;
    },
    staleTime: 0,
    initialData: () => {
      console.log("InitlaData");
      return {
        pageParams: [undefined, 1],
        pages: [initialResult as SearchResponse],
      };
    },
  });
}
