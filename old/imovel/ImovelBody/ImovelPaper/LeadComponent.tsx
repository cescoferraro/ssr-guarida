import { FormikProps } from "formik";
import { AlreadyLeadComponent } from "old/imovel/ImovelBody/ImovelPaper/LeadForm/AlreadyLeadComponent";
import { Lead } from "old/imovel/ImovelBody/ImovelPaper/LeadForm/LeadFormComponent";
import { LeadFormDialog } from "old/imovel/ImovelBody/ImovelPaper/LeadFormDialog";
import { SendAlreadyFilledLead } from "old/imovel/ImovelBody/ImovelPaper/SendAlreadyFilledLead";
import React from "react";
import { Undefinable } from "typings";

export function LeadComponent(props: {
  onClose: () => void;
  open: boolean;
  formik: FormikProps<Lead>;
  store: Lead | undefined;
  open1: (value: ((prevState: boolean) => boolean) | boolean) => void;
  store1: (
    value: ((val: Undefinable<Lead>) => Undefinable<Lead>) | Undefinable<Lead>
  ) => void;
  onClick: () => Promise<void>;
}) {
  return (
    <>
      <LeadFormDialog
        onClose={props.onClose}
        open={props.open}
        formik={props.formik}
      />
      <AlreadyLeadComponent
        store={props.store}
        setOpen={props.open1}
        setStore={props.store1}
      />
      <SendAlreadyFilledLead onClick={props.onClick} />
    </>
  );
}
