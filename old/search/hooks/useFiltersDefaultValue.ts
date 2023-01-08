import { useGetNegocioIdFromUrl } from "./useGetNegocioIdFromUrl";

export function useFiltersDefaultValue(): {
  negocio: number;
  finalidade: string;
  order: string;
} {
  return {
    negocio: useGetNegocioIdFromUrl(),
    order: "codigo-desc",
    finalidade: "Residencial",
  };
}
