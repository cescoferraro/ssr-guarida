import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { GuaridaHttpClient } from "common/GuaridaHttpClient";
import { Categoria } from "typings";

export function useCategorySlugByIDSMutation(): UseMutationResult<
  Categoria,
  Error,
  number[]
> {
  return useMutation<Categoria, Error, number[]>({
    mutationKey: ["categoria-by-id"],
    mutationFn: (ids) =>
      GuaridaHttpClient.get(`/categorias/slug`, {
        params: {
          ids: ids.join(","),
        },
      }).then((d) => d.data),
  });
}
