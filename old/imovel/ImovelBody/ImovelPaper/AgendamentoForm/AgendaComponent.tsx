/* eslint-disable no-console */
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Box, Button, Modal, Paper, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { center } from "common/center";
import { GuaridaHttpClient } from "common/GuaridaHttpClient";
import { components } from "guarida";
import { AgendaForm } from "old/imovel/ImovelBody/ImovelPaper/AgendamentoForm/AgendaForm";
import { Agendamento } from "old/imovel/ImovelBody/ImovelPaper/AgendamentoForm/Agendamento";
import { useAgendamentoFormik } from "old/imovel/ImovelBody/ImovelPaper/AgendamentoForm/useAgendamentoFormik";
import {
  Lead,
  LeadFormComponent,
} from "old/imovel/ImovelBody/ImovelPaper/LeadForm/LeadFormComponent";
import { useLeadFormik } from "old/imovel/ImovelBody/ImovelPaper/LeadForm/useLeadFormik";
import { SnackState } from "old/imovel/ImovelBody/ImovelPaper/SnackState";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Imovel, Undefinable } from "typings";

function AgendamentoText(props: { onClick: () => void }) {
  return (
    <>
      <Typography
        fontSize={18}
        align={"center"}
        color="info.contrastText"
        fontWeight={700}
      >
        Agende uma visita!
      </Typography>
      <Typography
        fontSize={16}
        align={"center"}
        sx={{ color: "#999999" }}
        fontWeight={700}
      >
        e conheça este imóvel
      </Typography>
      <Box sx={{ ...center, py: 1 }}>
        <Button
          sx={{ textTransform: "none", borderRadius: 20 }}
          size={"large"}
          variant="contained"
          color={"secondary"}
          fullWidth={false}
          onClick={props.onClick}
          startIcon={<CalendarMonthIcon />}
        >
          <Typography>Agendar visita</Typography>
        </Button>
      </Box>
    </>
  );
}

export function AgendaComponent({
  setSnack,
  imovel,
  store,
}: {
  imovel?: Imovel;
  setSnack: Dispatch<SetStateAction<SnackState>>;
  store: Undefinable<Lead>;
}) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Agendamento | undefined>();

  const onClose = () => setOpen((o) => !o);
  const formik = useAgendamentoFormik(setMode);

  const m = useMutation<
    { resposta?: string },
    Error,
    components["schemas"]["DadosVisitasViewModel"]
  >({
    mutationKey: ["2-via-boleto"],
    mutationFn: (variables) => {
      return GuaridaHttpClient.post("/visitas", {
        params: {
          variables,
        },
      });
    },
    onSuccess: (val) => {
      setOpen((o) => !o);
      setMode(undefined);
      setSnack({
        open: true,
        msg: val?.resposta || "Sucesso",
        severity: "success",
      });
    },
  });
  const leadFormik = useLeadFormik({
    onSubmit: async (values) => {
      console.log(23423);
      m.mutateAsync({
        data_de_Visita: mode?.date?.toISOString(),
        email_Interessado: values.email,
        nome_Interessado: values.nome,
        telefone_Interessado: values.telefone,
      });
    },
    store,
    imovel,
  });
  return (
    <Box sx={{ py: 1 }}>
      <AgendamentoText onClick={() => setOpen((o) => !o)} />
      <Modal open={open} sx={{ ...center }} onClose={onClose}>
        <Paper sx={{ p: mode ? 0 : 2.5 }} variant="elevation">
          {mode ? (
            <LeadFormComponent formik={leadFormik} />
          ) : (
            <AgendaForm formik={formik} />
          )}
        </Paper>
      </Modal>
    </Box>
  );
}
