import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect } from "react";
import { SearchResponse } from "typings";

export function useSetArtificialLoadingToFalse(
  query: UseInfiniteQueryResult<SearchResponse>,
  setLoading: Dispatch<SetStateAction<boolean>>
) {
  useEffect(() => {
    if (!query.isLoading && !query.isFetching) setLoading(false);
  });
}
