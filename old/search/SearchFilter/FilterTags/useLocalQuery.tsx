import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { GuaridaHttpClient } from "common/GuaridaHttpClient";
import { LocalType } from "old/search/SearchFilter/FilterTags/MoreTags";
import { Bairro, Cidade, Logradouro } from "typings";

export function useLocalQuery(): UseMutationResult<
  Cidade | Bairro | Logradouro,
  Error,
  { type: LocalType; id: string }
> {
  return useMutation<
    Cidade | Bairro | Logradouro,
    Error,
    { type: LocalType; id: string }
  >({
    mutationKey: ["localization"],
    mutationFn: ({ id, type }) =>
      GuaridaHttpClient.get(`/localizacoes/${type}/${id}`).then((d) => d.data),
  });
}
