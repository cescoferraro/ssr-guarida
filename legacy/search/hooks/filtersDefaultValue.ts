import { getNegocioIdFromUrl } from "legacy/search/hooks/getNegocioIdFromUrl";
import { SearchInput } from "typings";

export function filtersDefaultValue(negocio?: string): Partial<SearchInput> {
  return {
    negocio: getNegocioIdFromUrl(negocio),
    order: "preco-asc",
    finalidade: "Residencial",
  };
}
