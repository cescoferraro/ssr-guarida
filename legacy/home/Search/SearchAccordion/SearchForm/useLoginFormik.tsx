import { useGetLocalById } from "common/hooks/useGetLocalById";
import { guaridaCurrentLocal } from "common/hooks/guaridaCurrentLocal";
import { useGuaridaLocal } from "common/hooks/useGuaridaLocal";
import { FormikProps, useFormik } from "formik";
import { useGuaridaCategorias } from "common/hooks/useGuaridaCategorias";
import {useRouter} from "next/router";
import { useNavigate } from "react-router-dom";
import { Bairro, Categoria, Local, Logradouro, SearchInput } from "typings";
import * as Yup from "yup";

export interface HomeForm {
  categoria: Categoria | null;
  local: Local | null;
}

export function useLoginFormik(
  searchType: "alugar" | "comprar" | "rent" | undefined
): FormikProps<HomeForm> {
  const navigate = useRouter().push;
  const mutateAsync = useGetLocalById();
  const defaultLocalQuery = guaridaCurrentLocal(
    useGuaridaLocal("porto-alegre-rs").data
  );
  const defaultCategoriaQuery = useGuaridaCategorias({
    negocio: 1,
    finalidade: "Residencial",
  },"elvis");
  return useFormik<HomeForm>({
    initialValues: { categoria: null, local: null },
    validationSchema: Yup.object().shape({
      categoria: Yup.object().nullable(),
      local: Yup.object().nullable(),
    }),
    onSubmit: async ({ ...props }) => {
      if (defaultLocalQuery) {
        const categoria = props.categoria || defaultCategoriaQuery.data?.[0];
        const local = props.local || defaultLocalQuery;

        if (local && categoria) {
          const state: Partial<SearchInput> = {
            categorias: [Number(categoria.id)],
            finalidade: categoria.finalidade || "",
            negocio: searchType === "alugar" ? 1 : 2,
          };

          const m = await mutateAsync({
            id: String(local.id) || "",
            type: local.type || "Cidades",
          });
          if (local.type === "Cidades") {
            state.cidade = local.id;
          }
          if (local.type === "Bairros") {
            state.bairro = local.id;
            state.cidade = (m as Bairro)?.cidade?.id;
          }
          if (local.type === "Logradouros") {
            state.bairro = (m as Logradouro)?.bairro?.id;
            state.cidade = (m as Logradouro)?.bairro?.cidade?.id;
          }
          let url = `/busca/${searchType}/${local.slug}/${categoria.slug}`;
          console.log(url);
          navigate(url);
        } else {
          alert("Default Local/Categoria não encontrados");
        }
      }
    },
  });
}
