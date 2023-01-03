import { useParams } from "react-router-dom";
import { Imovel } from "typings";

export function sharableUrl(imovel?: Imovel): string {
  const params = useParams();
  return `${window.location.origin}/busca/${params.negocio}/${params.local}/${params.categoria}/${imovel?.id}`;
}
