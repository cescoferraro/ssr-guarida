import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { SocialModalMode } from "components/ImovelSocialShare/SocialModalMode";
import React, { Dispatch, SetStateAction } from "react";
import { Imovel } from "typings";
import * as Yup from "yup";

interface IProps {
  setMode: Dispatch<SetStateAction<SocialModalMode>>;
  imovel?: Imovel;
}

export function EmailForm({ setMode }: IProps) {
  const formik = useFormik<{ email: string; adds: boolean; policy: boolean }>({
    initialValues: { email: "", adds: false, policy: false },
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required(),
      policy: Yup.boolean().oneOf([true], "Field must be checked").required(),
      adds: Yup.boolean().required(),
    }),
    onSubmit: values => {
      console.log(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography sx={{ py: 1 }}>Compartilhar</Typography>
        <TextField
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          helperText={formik.errors.email || " "}
          error={Boolean(formik.errors.email)}
        />
        <FormControlLabel
          sx={{ py: 2 }}
          control={
            <Checkbox
              onClick={() => {
                formik.setValues({
                  ...formik.values,
                  policy: !formik.values.policy,
                });
              }}
              name="policy"
              checked={formik.values.policy}
              value={formik.values.policy}
            />
          }
          label={"Eu concordo com a Política de Privacidade do Grupo Guarida"}
        />
        <FormControlLabel
          sx={{ pb: 2 }}
          control={
            <Checkbox
              onClick={() => {
                formik.setValues({
                  ...formik.values,
                  adds: !formik.values.adds,
                });
              }}
              name="adds"
              checked={formik.values.adds}
              value={formik.values.adds}
            />
          }
          label=" Eu aceito receber conteúdos promocionais relacionados aos produtos e serviços do Grupo Guarida "
        />
        <Box display="flex" justifyContent={"space-between"}>
          <Button
            fullWidth
            onClick={() => setMode((m) => (m === "list" ? "email" : "list"))}
          >
            Voltar
          </Button>
          <Button
            fullWidth
            type="button"
            onClick={() => formik.submitForm()}
            variant={"contained"}
          >
            Enviar
          </Button>
        </Box>
      </Box>
    </form>
  );
}
