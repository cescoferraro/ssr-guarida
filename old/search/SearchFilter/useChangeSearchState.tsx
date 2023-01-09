import { UseQueryResult } from "@tanstack/react-query";
import { useCategorySlugByIDSMutation } from "common/hooks/useCategorySlugByIDSMutation";
import { useGetLocalById } from "common/hooks/useGetLocalById";
import { useRouter } from "next/router";
import { useCampanhasQuery } from "old/search/useCampanhasQuery";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import { Bairro, Campanha, Categoria, Logradouro, SearchInput } from "typings";
import { useSearchInputContext } from "../searchInputContext";
import { useNextParams } from "../useNextParams";

export function scrollTop(
  gridRef: React.MutableRefObject<HTMLButtonElement | undefined>
) {
  setTimeout(() => {
    const current = gridRef?.current;
    current?.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, 0);
}

function urlMethod(
  drawerState: Partial<SearchInput>,
  params: ParsedUrlQuery,
  a?: Bairro | Logradouro,
  category?: Categoria,
  q?: UseQueryResult<Campanha[]>
) {
  const { negocio, cidade } = drawerState;
  const negocioPathVariable = negocio
    ? [1, "alugar"].includes(negocio)
      ? "alugar"
      : "comprar"
    : params.negocio;
  const find = q?.data?.find((c) => c.id === drawerState.id_campanha);
  const busca = find?.attributes?.slug || "busca";
  const localPathVariable =
    !cidade && !drawerState.id_filtro ? "rs" : a?.slug || params.local;
  const categoryPathVariable = category
    ? category?.slug
      ? `/${category?.slug}`
      : ""
    : params.type
    ? params.type
      ? `/${params.type}`
      : ""
    : "";
  return `/${busca}/${negocioPathVariable}/${localPathVariable}${categoryPathVariable}`;
}

export const useChangeSearchState = (): ((
  par: Partial<SearchInput>
) => Promise<void>) => {
  const [, setInput] = useSearchInputContext();
  const navigate = useRouter().push;
  const params = useNextParams();
  const m = useCategorySlugByIDSMutation();
  const q = useCampanhasQuery();
  const mutateAsync = useGetLocalById();
  return async (state: Partial<SearchInput>) => {
    console.log(state);
    // scrollTop(gridRef);
    const category =
      (state?.categorias || []).length > 0
        ? await m.mutateAsync(state?.categorias || [])
        : undefined;
    let local;
    if (state.id_filtro) {
      const filtroCampanhaSlug = q.data
        ?.map((c) => c.attributes.filtros.data)
        .flat()
        .find((c) => c.id === state.id_filtro)?.attributes?.slug;
      local = { slug: filtroCampanhaSlug };
    } else {
      local = await mutateAsync({
        id: String(state.estado || state.bairro || state.cidade || ""),
        type: state.estado ? "estado" : state.bairro ? "bairro" : "cidade",
      });
    }
    const url = urlMethod(state, params, local, category, q);
    setInput(state);
    navigate(
      {
        pathname: url,
      },
      undefined,
      { shallow: true }
    );
  };
};
