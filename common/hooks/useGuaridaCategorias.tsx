import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { GuaridaHttpClient } from "common/GuaridaHttpClient";
import { useGetNegocioIdFromUrl } from "old/search/hooks/useGetNegocioIdFromUrl";
import { Categoria, SearchInput } from "typings";

const capitalize = (str: string): string => {
  return `${str?.[0]?.toUpperCase()}${str.slice(1)}`;
};

export function useGuaridaCategorias(
  drawerState?: Partial<SearchInput>
): UseQueryResult<Categoria[]> {
  const useGetNegocioIdFromUrl1 = useGetNegocioIdFromUrl();
  const params = new URLSearchParams({
    tpo_negocio: String(drawerState?.negocio || useGetNegocioIdFromUrl1),
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
