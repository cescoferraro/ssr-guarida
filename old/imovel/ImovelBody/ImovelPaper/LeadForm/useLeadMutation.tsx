import { useMutation } from "@tanstack/react-query";
import { GuaridaHttpClient } from "common/GuaridaHttpClient";
import { goToWhats } from "old/imovel/ImovelBody/ImovelPaper/CorretorComponent";
import { WeirdApiResult } from "old/imovel/ImovelBody/ImovelPaper/LeadForm/AlreadyLeadComponent";
import { Lead } from "old/imovel/ImovelBody/ImovelPaper/LeadForm/LeadFormComponent";
import { SnackState } from "old/imovel/ImovelBody/ImovelPaper/SnackState";
import { Dispatch, SetStateAction } from "react";
import { useNextParams } from "old/search/useNextParams";
import { Imovel, Undefinable } from "typings";

export function useLeadMutation(
  setStore: Dispatch<SetStateAction<Undefinable<Lead>>>,
  setOpen: Dispatch<SetStateAction<boolean>>,
  setSnack: Dispatch<SetStateAction<SnackState>>,
  send2Whats: boolean,
  imovel?: Imovel
) {
  const negocio = useNextParams().negocio;
  return useMutation<WeirdApiResult, Error, Lead>({
    mutationKey: [],
    mutationFn: (variables) =>
      GuaridaHttpClient.post("/lead", variables).then((a) => a.data),
    onSuccess: (val, lead) => {
      setOpen(false);
      setStore({
        ...lead,
        aceita_notificacao: false,
        aceita_Termos: false,
      });
      setSnack({
        open: true,
        msg: val?.mensagem || val?.resposta || "Sucesso",
        severity: "success",
      });
      if (send2Whats) {
        goToWhats(imovel, negocio);
      }
    },
    onError: (error) => {
      setSnack({ open: true, msg: error.name, severity: "error" });
    },
  });
}
