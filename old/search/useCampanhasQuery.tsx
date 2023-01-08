import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { GuaridaCMSHttpClient } from "common/GuaridaHttpClient";
import { Campanha, CampanhaResult } from "typings";

const filter = `?populate[filtros][fields][0]=titulo&populate[filtros][fields][1]=slug&populate[imagens][populate]=*`;

export const useCampanhasQuery = (): UseQueryResult<Campanha[]> => {
  return useQuery<Campanha[]>({
    queryKey: ["campanhas", "filter"],
    queryFn: () =>
      GuaridaCMSHttpClient.get<CampanhaResult>(`/campanhas${filter}`).then(
        (d) => d.data?.data || []
      ),
  });
};
