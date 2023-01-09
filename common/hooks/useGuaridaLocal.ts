import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { GuaridaHttpClient } from "common/GuaridaHttpClient";
import { useNextParams } from "old/search/useNextParams";
import { LocalizacoesBySlug } from "typings";

export const currentLocalQuery = (slug?: string) =>
  GuaridaHttpClient.get(`/localizacoes/${slug}`).then((d) => d.data);

export function useGuaridaLocal(
  initial?: string
): UseQueryResult<LocalizacoesBySlug> {
  const local = useNextParams().localizacao;
  const slug = initial || local;
  return useQuery<unknown, Error, LocalizacoesBySlug>({
    queryKey: ["cidade-refresh", slug],
    queryFn: () => currentLocalQuery(slug),
  });
}
