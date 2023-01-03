import { useGuaridaCategoriaQuery } from "common/hooks/useGuaridaCategoriaQuery";
import { notEmpty } from "common/notEmpty";
import { Categoria } from "typings";

export function useCategoriasIdQuery(
  categoria?: string,
  categorias?: Categoria[]
): number[] {
  const catQuery = useGuaridaCategoriaQuery(Boolean(categoria), categorias);
  return (catQuery.data ? catQuery?.data?.map((a) => a.id) || [] : []).filter(
    notEmpty
  );
}
