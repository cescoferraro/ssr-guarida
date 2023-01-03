import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {GuaridaHttpClient} from "common/GuaridaHttpClient";
import {Imovel} from "typings";

export function useImovelDetailsQuery(id?: string): UseQueryResult<Imovel> {
  return useQuery<Imovel>({
    queryKey: ["detalhe_imovel", id],
    queryFn: () =>
      GuaridaHttpClient.get<Imovel>(`/imovel/${id}`).then((r) => r.data),
  });
}
