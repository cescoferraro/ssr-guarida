import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { GuaridaHttpClient } from "common/GuaridaHttpClient";
import { getNegocioIdFromUrl } from "legacy/search/hooks/getNegocioIdFromUrl";
import { useRouter } from "next/router";
import { Categoria, SearchInput } from "typings";

const capitalize = (str: string): string => {
  return `${str?.[0]?.toUpperCase()}${str.slice(1)}`;
};

export function useGuaridaCategorias(
  drawerState?: Partial<SearchInput>,
  h?: string
): UseQueryResult<Categoria[]> {
  const negocio = useRouter().query.negocio as string | undefined;
  const params = new URLSearchParams({
    tpo_negocio: String(drawerState?.negocio || getNegocioIdFromUrl(negocio)),
    finalidade: capitalize(drawerState?.finalidade || ""),
  });
  return useQuery<unknown, Error, Categoria[]>({
    queryKey: ["categorias", params.toString()],
    queryFn: () =>
      GuaridaHttpClient.get(`/categorias?${params.toString()}`, {
        params: {},
      }).then((d) => d.data),
  });
}
