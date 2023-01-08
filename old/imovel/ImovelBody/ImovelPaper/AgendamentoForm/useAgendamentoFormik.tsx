import { FormikProps, useFormik } from "formik";
import { Agendamento } from "old/imovel/ImovelBody/ImovelPaper/AgendamentoForm/Agendamento";
import { Dispatch, SetStateAction } from "react";
import * as Yup from "yup";

export function useAgendamentoFormik(
  setMode: Dispatch<SetStateAction<Agendamento | undefined>>
): FormikProps<Agendamento> {
  return useFormik<Agendamento>({
    initialValues: {
      date: null,
      slot: null,
    },
    validationSchema: Yup.object().shape({
      date: Yup.string().required(),
      slot: Yup.string().required(),
    }),
    onSubmit: (values) => {
      setMode(values);
    },
  });
}
