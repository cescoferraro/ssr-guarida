import {useRouter} from "next/router";
import { useLocation, useNavigate } from "react-router-dom";
import { Imovel } from "typings";

export const useSearchClickCallback = (imovel?: Imovel): (() => void) => {
  const navigate = useRouter().push;
  // const location = useLocation();
  return () => {
    // if (imovel) navigate(location.pathname + `/${imovel.id}`);
  };
};
