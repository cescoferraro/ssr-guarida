import { useNextParams } from "old/search/useNextParams";

export function useGetNegocioIdFromUrl(): 1 | 2 {
  return useNextParams().negocio === "alugar" ? 1 : 2;
}
