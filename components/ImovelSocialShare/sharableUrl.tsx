import { Imovel } from "typings";

export function sharableUrl(imovel?: Imovel): string {
  const params = {} as any;
  return `${window.location.origin}/busca/${params.negocio}/${params.local}/${params.categoria}/${imovel?.id}`;
}
