import { useCategorySlugByIDSMutation } from "common/hooks/useCategorySlugByIDSMutation";
import { useGetLocalById } from "common/hooks/useGetLocalById";
import React, { Dispatch, SetStateAction } from "react";
import { Params } from "react-router-dom";
import { Bairro, Categoria, Logradouro, SearchInput } from "typings";

export function scrollTop(
  gridRef: React.MutableRefObject<HTMLButtonElement | undefined>
) {
  setTimeout(() => {
    const current = gridRef?.current;
    current?.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, 0);
}

function urlMethod(
  drawerState: Partial<SearchInput>,
  params: Readonly<Params>,
  a?: Bairro | Logradouro,
  category?: Categoria
) {
  const { negocio } = drawerState;
  const negocioPathVariable = negocio
    ? [1, "alugar"].includes(negocio)
      ? "alugar"
      : "comprar"
    : params.negocio;

  const localPathVariable = a?.slug || params.local;

  const categoryPathVariable = category
    ? category?.slug
      ? `/${category?.slug}`
      : ""
    : params.type
    ? params.type
      ? `/${params.type}`
      : ""
    : "";

  return `/busca/${negocioPathVariable}/${localPathVariable}${categoryPathVariable}`;
}

export const useChangeSearchState = (
  gridRef: React.MutableRefObject<HTMLButtonElement | undefined>,
  setInput: Dispatch<SetStateAction<Partial<SearchInput>>>
  // setLoading: () => void
): ((par: Partial<SearchInput>) => Promise<void>) => {
  // const navigate = useRouter().push;
  const params = {};
  const m = useCategorySlugByIDSMutation();
  const mutateAsync = useGetLocalById();
  return async (state: Partial<SearchInput>) => {
    scrollTop(gridRef);
    const category = await m.mutateAsync(state?.categorias || []);
    const local = await mutateAsync({
      id: String(state.bairro || state.cidade || ""),
      type: state.bairro ? "Bairros" : "Cidades",
    });

    const url = urlMethod(state, params, local, category);
    console.log(state);
    const newVar = { ...state, page: 1 };
    setInput(newVar);
    console.log(newVar);
  };
};
