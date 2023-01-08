import { useMediaQuery, useTheme } from "@mui/material";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useImoveisMemo } from "old/search/hooks/useImoveisMemo";
import { useSearchInfiniteQuery } from "old/search/hooks/useSearchInfiniteQuery";
import { useCurrentUrlCampaign } from "old/search/hooks/useSearchInput";
import { useSetArtificialLoadingToFalse } from "old/search/hooks/useSetArtificialLoadingToFalse";
import React, { useRef, useState } from "react";
import {
  CampanhaImage,
  Categoria,
  Imovel,
  Localizacoes,
  LocalizacoesBySlug,
  SearchInput,
  SearchResponse,
} from "typings";

export interface SearchPageHooks {
  input: Partial<SearchInput>;
  needsToSelectFilter: boolean;
  setLoading: () => void;
  imoveis: Imovel[];
  loading: boolean;
  total: number;
  query: UseInfiniteQueryResult<SearchResponse>;
  ref: React.MutableRefObject<HTMLButtonElement | undefined>;
}

function useRedirectToAlugarWhenCampaignSelected(): boolean {
  // const params = useNextParams();
  const navigate = useRouter().push;
  // const location = useLocation();
  // const needsToSelectFilter =
  //   params.campanha !== "busca" && params.local === undefined;
  // useEffect(() => {
  //   if (needsToSelectFilter) {
  //     if (params.negocio === "comprar") {
  //       navigate(location.pathname.replace("comprar", "alugar"));
  //     }
  //   }
  // }, [params.campanh]);
  return false;
}

interface IProps {
  initialLocal?: LocalizacoesBySlug;
  categorias?: Categoria[];
  initialResult?: SearchResponse;
}
export function useSearchPage({
  initialResult,
  categorias,
  initialLocal,
}: IProps): SearchPageHooks {
  const theme = useTheme();
  const ref = useRef<HTMLButtonElement | undefined>();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const [loading, setLoading] = useState<boolean>(true);
  const [query, input] = useSearchInfiniteQuery();
  const imoveis = useImoveisMemo(query);
  useSetArtificialLoadingToFalse(query, setLoading);
  // const needsToSelectFilter = useRedirectToAlugarWhenCampaignSelected();
  const campanha = useCurrentUrlCampaign();
  const findElement = campanha?.attributes?.imagens?.find(
    (i: CampanhaImage) => i.tipo === "billboard_busca"
  );
  const seloUrl = findElement?.desktop?.data?.attributes?.url;
  return {
    needsToSelectFilter: false,
    ref,
    query,
    imoveis:
      query.isLoading || loading
        ? Array.from({ length: isXs ? 2 : 20 }).map(
            () => undefined as unknown as Imovel
          )
        : query.isFetchingNextPage
        ? [...imoveis, undefined as unknown as Imovel]
        : seloUrl
        ? [imoveis[0], seloUrl, ...imoveis.filter((i, idx) => idx !== 0)]
        : imoveis,
    total: query.data?.pages?.[0].total || 0,
    loading,
    setLoading: () => setLoading(true),
    input: { ...input },
  };
}
