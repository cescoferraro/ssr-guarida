import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { GuaridaHttpClient } from "common/GuaridaHttpClient";
import { useParams } from "react-router-dom";
import { LocalizacoesBySlug } from "typings";

export const currentLocalQuery = (slug?: string) =>
  GuaridaHttpClient.get(`/localizacoes/${slug}`).then((d) => d.data);

export function useGuaridaLocal(
  initial?: string
): UseQueryResult<LocalizacoesBySlug> {
  const local = useParams().local;
  const slug = initial || local;
  return useQuery<unknown, Error, LocalizacoesBySlug>({
    queryKey: ["cidade-refresh", slug],
    queryFn: () => currentLocalQuery(slug),
  });
}
