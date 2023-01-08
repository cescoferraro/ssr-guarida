import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { center } from "common/center";
import { FormikProps } from "formik";
import { components } from "guarida";
import { GuaridaTextField } from "old/imovel/ImovelBody/ImovelPaper/LeadForm/FrukiTextField";
import React from "react";

export type Lead = components["schemas"]["DadosFormularioViewModel"];

export function stripMaskFromValue(str?: string | null): string {
  return (str || "")
    .replaceAll(" ", "")
    .replaceAll("_", "")
    .replaceAll(")", "")
    .replaceAll("(", "")
    .replaceAll("-", "");
}

function LeadFormFields({ formik }: { formik: FormikProps<Lead> }) {
  const stripped = stripMaskFromValue(formik.values.telefone);
  return (
    <Box sx={{ p: 4 }}>
      <Typography align="center" fontSize={18} lineHeight={22 / 8}>
        Quer saber mais informações sobre este imóvel?
      </Typography>
      <GuaridaTextField
        variant={"filled"}
        name="nome"
        value={formik.values?.nome}
        errorString={formik.errors?.nome}
        onChange={formik.handleChange}
        label="Nome Completo"
      />
      <GuaridaTextField
        variant={"filled"}
        name="email"
        value={formik.values?.email}
        onChange={formik.handleChange}
        errorString={formik.errors?.email}
        label={"Email"}
      />
      <GuaridaTextField
        variant={"filled"}
        value={formik.values.telefone}
        errorString={formik.errors.telefone}
        format={
          stripped.length === 10
            ? "(##) ####-#####"
            : stripped.length < 11
            ? "(##) ####-####"
            : "(##) #####-####"
        }
        mask={stripped.length === 10 ? "" : stripped.length < 10 ? "_" : ""}
        label="Celular"
        name="telefone"
        placeholder="(88) 98088-8088"
        onChange={(event) => {
          formik.setFieldValue("telefone", event.target.value);
          formik.validateField("telefone");
        }}
      />
      <GuaridaTextField
        variant={"filled"}
        multiline={true}
        rows={4}
        sx={{ display: "none" }}
        name="mensagem"
        errorString={formik.errors?.mensagem}
        value={formik.values?.mensagem}
        onChange={formik.handleChange}
        label="Mensagem"
      />
      <FormControlLabel
        sx={{ py: 2 }}
        color="secondary"
        control={
          <Checkbox
            name="aceita_Termos"
            value={formik.values?.aceita_Termos}
            onChange={formik.handleChange}
            color="secondary"
          />
        }
        label={"Eu concordo com a Política de Privacidade do Grupo Guarida"}
      />

      <Box>
        <FormControlLabel
          sx={{ pb: 2 }}
          color="secondary"
          control={
            <Checkbox
              name="aceita_notificacao"
              color="secondary"
              value={formik.values?.aceita_notificacao}
              onChange={formik.handleChange}
            />
          }
          label={
            <Typography noWrap={false}>
              Eu aceito receber conteúdos promocionais relacionados aos produtos
              <br />e serviços do Grupo Guarida
            </Typography>
          }
        />
      </Box>
    </Box>
  );
}

export function LeadFormComponent({ formik }: { formik: FormikProps<Lead> }) {
  return (
    <form
      style={{
        padding: 20,
        // visibility: isLoading ? "hidden" : "unset",
      }}
      onSubmit={formik.handleSubmit}
    >
      <LeadFormFields formik={formik} />
      <Box sx={{ ...center }}>
        <Button
          disabled={!(formik.isValid && formik.dirty)}
          type="submit"
          size="large"
          variant="contained"
          color={"secondary"}
          fullWidth={false}
        >
          Enviar mensagem
        </Button>
      </Box>
    </form>
  );
}
