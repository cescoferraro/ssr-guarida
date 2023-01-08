import { useRouter } from "next/router";
import { Imovel } from "typings";

export const useSearchClickCallback = (imovel?: Imovel): (() => void) => {
  const navigate = useRouter().push;
  return () => {
    if (imovel) {
      navigate(
        imovel?.url?.includes("detalhe")
          ? imovel?.url
          : `/detalhe${imovel?.url}`
      );
    }
  };
};
