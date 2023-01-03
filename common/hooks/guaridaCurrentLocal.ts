import { UseQueryResult } from "@tanstack/react-query";
import { notEmpty } from "common/notEmpty";
import { Bairro, Cidade, Local, Localizacoes, Logradouro } from "typings";

export function guaridaCurrentLocal(
    data?: Localizacoes
): Local | undefined {
  return (
    data
      ? Object.values(data)
          .flat()
          .filter<Bairro | Logradouro | Cidade>(notEmpty)
      : []
  )?.[0];
}
