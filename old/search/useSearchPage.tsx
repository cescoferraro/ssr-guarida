import { useMediaQuery, useTheme } from "@mui/material";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { IResult } from "common/getBuscaServerProps";
import { useImoveisMemo } from "old/search/hooks/useImoveisMemo";
import { useSearchInfiniteQuery } from "old/search/hooks/useSearchInfiniteQuery";
import {
  useCurrentUrlCampaign,
  useSearchInput,
} from "old/search/hooks/useSearchInput";
import { Dispatch, SetStateAction } from "react";
import { CampanhaImage, Imovel, SearchInput, SearchResponse } from "typings";

export interface SearchPageHooks {
  input: Partial<SearchInput>;
  setInput: Dispatch<SetStateAction<Partial<SearchInput>>>;
  needsToSelectFilter: boolean;
  imoveis: Imovel[];
  total: number;
  query: UseInfiniteQueryResult<SearchResponse>;
}

export function useSearchPage({ response }: IResult): SearchPageHooks {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  // const [loading, setLoading] = useState<boolean>(true);
  const [input, setInput] = useSearchInput();
  console.log(999, JSON.stringify(input));
  const query = useSearchInfiniteQuery(input, response);
  const imoveis = useImoveisMemo(query);
  // useSetArtificialLoadingToFalse(query, setLoading);
  const campanha = useCurrentUrlCampaign();
  const findElement = campanha?.attributes?.imagens?.find(
    (i: CampanhaImage) => i.tipo === "billboard_busca"
  );
  const seloUrl = findElement?.desktop?.data?.attributes?.url;
  return {
    needsToSelectFilter: false,
    query,
    imoveis: query.isFetching
      ? Array.from({ length: isXs ? 2 : 20 }).map(
          () => undefined as unknown as Imovel
        )
      : query.isFetchingNextPage
      ? [...imoveis, undefined as unknown as Imovel]
      : seloUrl
      ? [imoveis[0], seloUrl, ...imoveis.filter((i, idx) => idx !== 0)]
      : imoveis,
    total: query.data?.pages?.[0].total || 0,
    input,
    setInput,
  };
}
