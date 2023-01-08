import { useGuaridaCategoriaQuery } from "common/hooks/useGuaridaCategoriaQuery";
import { notEmpty } from "common/notEmpty";
import { useNextParams } from "old/search/useNextParams";

export function useCategoriasIdQuery(): number[] {
  const categoria = useNextParams().categoria;
  const catQuery = useGuaridaCategoriaQuery(Boolean(categoria));
  return (
    categoria && catQuery.data ? catQuery?.data?.map((a) => a.id) || [] : []
  ).filter(notEmpty);
}
