import { useNextParams } from "old/search/useNextParams";
import { Imovel } from "typings";

export function useSharableUrl(imovel?: Imovel): string {
  const params = useNextParams();
  return `${window.location.origin}/busca/${params.negocio}/${params.local}/${params.categoria}/${imovel?.id}`;
}
