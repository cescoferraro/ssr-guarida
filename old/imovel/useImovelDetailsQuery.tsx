import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { GuaridaHttpClient } from "common/GuaridaHttpClient";
import { useNextParams } from "old/search/useNextParams";
import { Imovel } from "typings";

export const imovelDetailsQuery = (id: string): Promise<Imovel> =>
  GuaridaHttpClient.get<Imovel>(`/imovel/${id}`).then((r) => r.data);

export function useImovelDetailsQuery({
  imovel,
}: {
  imovel: Imovel;
}): UseQueryResult<Imovel> {
  const { id } = useNextParams();
  return useQuery<Imovel>({
    initialData: imovel,
    queryKey: ["detalhe_imovel", id],
    queryFn: () => imovelDetailsQuery(id as string),
  });
}
