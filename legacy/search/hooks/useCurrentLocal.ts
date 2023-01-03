import { guaridaCurrentLocal } from "common/hooks/guaridaCurrentLocal";
import { useGuaridaLocal } from "common/hooks/useGuaridaLocal";
import {useRouter} from "next/router";
import {Bairro, Cidade, Localizacoes, Logradouro} from "typings";

export function useCurrentLocal(
    local?: Localizacoes,
): {
  cidade?: number;
  bairro?: number;
} {
  const query = useGuaridaLocal(useRouter().query.localizacao as string | undefined, local);
  const find = guaridaCurrentLocal(query.data);
  const logradouro = find as Logradouro;
  const bairro = find as Bairro;
  const cidade = find as Cidade;
  return {
    cidade: logradouro?.bairro
      ? logradouro?.bairro?.cidade?.id
      : bairro?.cidade
      ? bairro?.cidade?.id
      : cidade?.id,
    bairro: logradouro?.bairro
      ? logradouro?.bairro?.id
      : bairro?.cidade
      ? bairro?.id
      : undefined,
  };
}
