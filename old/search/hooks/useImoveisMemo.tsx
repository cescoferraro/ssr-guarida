import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { notEmpty } from "common/notEmpty";
import { Imovel, SearchResponse } from "typings";

export function useImoveisMemo(
  query: UseInfiniteQueryResult<SearchResponse>
): Imovel[] {
  return (query?.data?.pages || [])
    .flat()
    .map((u) => u.imoveis)
    .flat()
    .filter(notEmpty);
}
