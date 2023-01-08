import { Close } from "@mui/icons-material";
import { Dialog, IconButton } from "@mui/material";
import { FormikProps } from "formik";
import {
  Lead,
  LeadFormComponent,
} from "old/imovel/ImovelBody/ImovelPaper/LeadForm/LeadFormComponent";
import React from "react";

export function LeadFormDialog(props: {
  onClose: () => void;
  open: boolean;
  formik: FormikProps<Lead>;
}) {
  return (
    <Dialog
      onClose={props.onClose}
      open={props.open}
      sx={{ p: 2, minWidth: "40vw" }}
    >
      <IconButton
        onClick={props.onClose}
        sx={{ position: "absolute", top: 0, right: 0 }}
      >
        <Close />
      </IconButton>
      <LeadFormComponent formik={props.formik} />
    </Dialog>
  );
}
