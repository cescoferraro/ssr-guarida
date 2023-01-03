import {
  Box,
  Button,
  InputLabel,
  Modal,
  Paper,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography/Typography";
import { useMutation } from "@tanstack/react-query";
import { GuaridaHttpClient } from "common/GuaridaHttpClient";
import { useFormik } from "formik";
import React, { Dispatch, SetStateAction } from "react";

interface BoletoForm {
  phone: string;
  cpf: string;
}

export function GuaridaBoletoModal(props: {
  setBoletoOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}) {
  const m = useMutation<unknown, Error, BoletoForm>({
    mutationKey: ["2-via-boleto"],
    mutationFn: (variables) => {
      return GuaridaHttpClient.post(
        "https://www.guarida.com.br/AgenciaVirtual/index/enviaSegundaViaDo",
        {
          params: {
            variables,
          },
        }
      );
    },
  });
  const formik = useFormik({
    initialValues: {
      cpf: "",
      phone: "",
    },
    onSubmit: async (s) => {
      // eslint-disable-next-line no-console
      console.log(await m.mutateAsync(s));
    },
  });
  return (
    <Modal
      onClose={() => props.setBoletoOpen((s) => !s)}
      open={props.open}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Paper sx={{ p: 4 }}>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column" }}
          onSubmit={formik.handleSubmit}
        >
          <Typography align="center" variant="h4" sx={{ pb: 2 }}>
            2ª via de Boleto
          </Typography>
          <Typography align="center">
            Preencha os dados abaixo para solicitar a segunda via de boleto
          </Typography>
          <Box sx={{ pt: 2 }}>
            <InputLabel shrink htmlFor="bootstrap-input">
              Informe seu CPF/CNPJ
            </InputLabel>
            <TextField
              name="cpf"
              fullWidth
              value={formik.values.cpf}
              onChange={formik.handleChange}
            />
          </Box>
          <Box sx={{ py: 2 }}>
            <InputLabel shrink htmlFor="bootstrap-input">
              Informe seu e-mail ou celular com DDD
            </InputLabel>
            <TextField
              fullWidth
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
          </Box>
          <Button variant="contained" color="secondary" type="submit">
            Enviar boleto
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
}
