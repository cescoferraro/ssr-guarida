import { useGuaridaLocal } from "common/hooks/useGuaridaLocal";
import { identity, pickBy } from "lodash";
import { useCategoriasIdQuery } from "old/search/hooks/useCategoriasIdQuery";
import { useCampanhasQuery } from "old/search/useCampanhasQuery";
import { useNextParams } from "old/search/useNextParams";
import { Dispatch, SetStateAction, useState } from "react";
import { Campanha, FiltroCampanha, SearchInput } from "typings";
import { useFiltersDefaultValue } from "./useFiltersDefaultValue";

const removeEmptyArrays = (value: unknown) =>
  Array.isArray(value) ? value.length > 0 : true;

export function useCurrentUrlCampaign(): Campanha | undefined {
  const params = useNextParams();
  return useCampanhasQuery().data?.find(
    (c) => c.attributes.slug == params.campanha
  );
}

export function useSearchInput(): [
  Partial<SearchInput>,
  Dispatch<SetStateAction<Partial<SearchInput>>>
] {
  const query = useGuaridaLocal();
  const params = useNextParams();
  const categorias = useCategoriasIdQuery();
  const campanha = useCurrentUrlCampaign();
  const [input, setInput] = useState<Partial<SearchInput>>({
    ...useFiltersDefaultValue(),
    categorias,
    [query?.data?.tipo as string]: query.data?.id,
    id_campanha: campanha?.id,
    id_filtro: campanha?.attributes?.filtros?.data?.find(
      (f: FiltroCampanha) => f?.attributes?.slug === params.local
    )?.id,
  });
  return [pickBy(pickBy(input, identity), removeEmptyArrays), setInput];
}
