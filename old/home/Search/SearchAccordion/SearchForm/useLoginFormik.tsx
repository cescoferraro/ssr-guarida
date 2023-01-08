import { useGetLocalById } from "common/hooks/useGetLocalById";
import { useGuaridaCategorias } from "common/hooks/useGuaridaCategorias";
import { useGuaridaLocal } from "common/hooks/useGuaridaLocal";
import { FormikProps, useFormik } from "formik";
import { capitalize } from "lodash";
import { useRouter } from "next/router";
import {
  Bairro,
  Categoria,
  LocalizacoesBySlug,
  LocalType,
  Logradouro,
  SearchInput,
} from "typings";
import * as Yup from "yup";

export interface HomeForm {
  categoria: Categoria | null;
  local: LocalizacoesBySlug | null;
}

export function useLoginFormik(
  searchType: "alugar" | "comprar" | "rent" | undefined
): FormikProps<HomeForm> {
  const navigate = useRouter().push;
  const mutateAsync = useGetLocalById();
  const query = useGuaridaLocal("porto-alegre-rs");
  const defaultLocalQuery = query.data;
  const defaultCategoriaQuery = useGuaridaCategorias({
    negocio: 1,
    finalidade: "Residencial",
  });
  return useFormik<HomeForm>({
    initialValues: { categoria: null, local: null },
    validationSchema: Yup.object().shape({
      categoria: Yup.object().nullable(),
      local: Yup.object().nullable(),
    }),
    onSubmit: async (props) => {
      if (defaultLocalQuery) {
        const categoria = props.categoria || defaultCategoriaQuery.data?.[0];
        const local = props.local || defaultLocalQuery;

        if (local && categoria) {
          const state: Partial<SearchInput> = {
            categorias: [Number(categoria.id)],
            finalidade: capitalize(categoria.finalidade || ""),
            negocio: searchType === "alugar" ? 1 : 2,
          };

          const m = await mutateAsync({
            id: String(local.id) || "",
            type: (local.tipo || "cidade") as LocalType,
          });
          if (local.tipo === "cidades") {
            state.cidade = local.id;
          }
          if (local.tipo === "bairros") {
            state.bairro = local.id;
            state.cidade = (m as Bairro)?.cidade?.id;
          }
          if (local.tipo === "logradouros") {
            state.bairro = (m as Logradouro)?.bairro?.id;
            state.cidade = (m as Logradouro)?.bairro?.cidade?.id;
          }
          navigate(`/busca/${searchType}/${local.slug}/${categoria.slug}`);
        } else {
          alert("Default Local/Categoria não encontrados");
        }
      }
    },
  });
}
