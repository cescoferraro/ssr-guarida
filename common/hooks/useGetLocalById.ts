import { useMutation } from "@tanstack/react-query";
import { GuaridaHttpClient } from "common/GuaridaHttpClient";
import { Bairro, LocalType, Logradouro } from "typings";

export function useGetLocalById() {
  const { mutateAsync } = useMutation<
    Bairro | Logradouro,
    Error,
    { id: string; type: LocalType }
  >({
    mutationKey: ["localizaoes-cidade-id"],
    mutationFn: ({ id, type }) => {
      let string = "logradouro";
      switch (type) {
        case "Bairros":
          string = "bairro";
          break;
        case "Cidades":
          string = "cidade";
          break;
        default:
          break;
      }
      return GuaridaHttpClient.get(`/localizacoes/${string}/${id}`).then(
        ({ data }) => data
      );
    },
  });
  return mutateAsync;
}
