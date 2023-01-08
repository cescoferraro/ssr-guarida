import { FormikProps, useFormik } from "formik";
import { FormikHelpers } from "formik/dist/types";
import { Lead } from "old/imovel/ImovelBody/ImovelPaper/LeadForm/LeadFormComponent";
import { useGetNegocioIdFromUrl } from "old/search/hooks/useGetNegocioIdFromUrl";
import { useCurrentUrlCampaign } from "old/search/hooks/useSearchInput";
import { Imovel, Undefinable } from "typings";
import * as Yup from "yup";
import { SchemaOf } from "yup";

interface IProps {
  onSubmit: (
    values: Lead,
    formikHelpers: FormikHelpers<Lead>
  ) => void | Promise<void>;
  imovel?: Imovel;
  store: Undefinable<Lead>;
}

const validationSchema: SchemaOf<Partial<Lead>> = Yup.object().shape({
  nome: Yup.string().required("nome é obrigatório"),
  email: Yup.string()
    .email("Não é um email válido")
    .required("Email é obrigatório"),
  telefone: Yup.string().required("Telefone é obrigatório"),
  mensagem: Yup.string(),
  aceita_Termos: Yup.boolean()
    .oneOf([true], "Field must be checked")
    .required("É obrigatório aceitar as políticas de uso"),
  aceita_notificacao: Yup.boolean().required(
    "É obrigatório aceitar os termos de uso"
  ),
  source: Yup.string().required(),
  campanha: Yup.string(),
  negocio: Yup.number().required(),
  codigo_imovel: Yup.number().required(),
  corretor: Yup.number().required(),
});

export function useLeadFormik({
  onSubmit,
  store,
  imovel,
}: IProps): FormikProps<Lead> {
  const campanha = useCurrentUrlCampaign();
  const negocio = useGetNegocioIdFromUrl();
  return useFormik<Lead>({
    initialValues: store || {
      mensagem: "",
      nome: "",
      telefone: "",
      email: "",
      aceita_Termos: false,
      aceita_notificacao: false,
      campanha,
      codigo_imovel: imovel?.id ? Number(imovel?.id) : 0,
      corretor: 0,
      negocio,
      source: "teste",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit,
  });
}
