import { useRouter } from "next/router";
import { Imovel } from "typings";

export const useSearchClickCallback = (imovel?: Imovel): (() => void) => {
  const router = useRouter();
  return () => {
    if (imovel) {
      router.push(
        imovel?.url?.includes("detalhe")
          ? imovel?.url
          : `/detalhe${imovel?.url}`
      );
    }
  };
};
