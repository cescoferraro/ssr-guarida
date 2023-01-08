import { Divider, useMediaQuery, useTheme } from "@mui/material";
import { useLocalStorage } from "common/hooks/useLocalstorage";
import { appVersion } from "components/GuaridaFooter/AppVersion";
import { AgendaComponent } from "old/imovel/ImovelBody/ImovelPaper/AgendamentoForm/AgendaComponent";
import { CorretorComponent } from "old/imovel/ImovelBody/ImovelPaper/CorretorComponent";
import { GuaridaSnackbar } from "old/imovel/ImovelBody/ImovelPaper/GuaridaSnackbar";
import { LeadComponent } from "old/imovel/ImovelBody/ImovelPaper/LeadComponent";
import {
  Lead,
  stripMaskFromValue,
} from "old/imovel/ImovelBody/ImovelPaper/LeadForm/LeadFormComponent";
import { useLeadFormik } from "old/imovel/ImovelBody/ImovelPaper/LeadForm/useLeadFormik";
import { useLeadMutation } from "old/imovel/ImovelBody/ImovelPaper/LeadForm/useLeadMutation";
import { SnackState } from "old/imovel/ImovelBody/ImovelPaper/SnackState";
import React, { useState } from "react";
import { Imovel, Undefinable } from "typings";

export const ImovelLeadForm = ({ imovel }: { imovel?: Imovel }) => {
  const [snack, setSnack] = React.useState<SnackState>({ open: false });
  const [open, setOpen] = useState<boolean>(false);
  const [send2Whats, setSend2Whats] = useState<boolean>(false);
  const [store, setStore] = useLocalStorage<Undefinable<Lead>>(
    `guarida-lead-${appVersion}`
  );
  const createLead = useLeadMutation(
    setStore,
    setOpen,
    setSnack,
    send2Whats,
    imovel
  );
  const formik = useLeadFormik({
    onSubmit: async (values, formikHelpers) => {
      await createLead.mutateAsync({
        ...values,
        telefone: stripMaskFromValue(values?.telefone),
      });
      formikHelpers.resetForm();
    },
    store,
    imovel,
  });
  const isBigScreen = useMediaQuery(useTheme().breakpoints.up("md"));
  return (
    <>
      <GuaridaSnackbar
        bigScreen={isBigScreen}
        snack={snack}
        onClose={() => setSnack((a) => ({ ...a, open: false }))}
      />
      <LeadComponent
        onClose={() => setOpen((o) => !o)}
        open={open}
        formik={formik}
        store={store}
        open1={setOpen}
        store1={setStore}
        onClick={async () => {
          if (!store) {
            setSend2Whats(false);
            setOpen((o) => !o);
            return;
          }
          await createLead.mutateAsync(store);
        }}
      />
      <Divider />
      <AgendaComponent imovel={imovel} store={store} setSnack={setSnack} />
      <Divider />
      <CorretorComponent
        setSend2Whats={setSend2Whats}
        setOpen={setOpen}
        imovel={imovel}
        store={store}
      />
    </>
  );
};
