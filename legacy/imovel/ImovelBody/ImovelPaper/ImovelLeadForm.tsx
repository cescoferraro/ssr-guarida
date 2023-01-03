import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Divider,
  FormControlLabel,
  TextField,
  TextFieldProps,
  Typography,
  useTheme,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { center } from "common/center";
import { GuaridaHttpClient } from "common/GuaridaHttpClient";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";

const StyledTextField = (props: TextFieldProps) => {
  return (
    <TextField
      InputProps={{ disableUnderline: false }}
      {...props}
      variant="filled"
      sx={{ mt: 2, ...props.sx, textUnderlinePosition: "none" }}
    />
  );
};

type Lead = {
  msg: string;
  phone: string;
  terms: boolean;
  name: string;
  email: string;
  policy: boolean;
};
export const ImovelLeadForm = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState<string | undefined>(undefined);
  const createLead = useMutation<{ resposta: string }, Error, Lead>({
    mutationKey: [],
    mutationFn: (variables) => {
      return GuaridaHttpClient.post("/lead", {
        params: variables,
      }).then((a) => a.data);
    },
    onSuccess: () => {
      setOpen((s) => !s);
    },
  });
  const formik = useFormik<Lead>({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      msg: "",
      policy: false,
      terms: false,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      phone: Yup.string().required(),
      msg: Yup.string().required(),
      policy: Yup.boolean().oneOf([true], "Field must be checked").required(),
      terms: Yup.boolean().required(),
    }),
    onSubmit: async (values, formikHelpers) => {
      const data = await createLead.mutateAsync(values);
      setMsg(data.resposta);
      formikHelpers.resetForm();
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Dialog
        open={open}
        onClose={() => setOpen((s) => !s)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography>{msg}</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen((s) => !s)} autoFocus>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ pt: 2 }}>
        <Typography align="center" fontSize={18} lineHeight={22 / 8}>
          Quer saber mais informações sobre este imóvel?
        </Typography>
        <Box>
          <StyledTextField
            fullWidth
            sx={{}}
            name="name"
            value={formik.values.name}
            error={Boolean(formik.errors.name)}
            helperText={formik.errors.name}
            onChange={formik.handleChange}
            label="Nome Completo"
            variant="filled"
          />
          <StyledTextField
            fullWidth
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.email)}
            helperText={formik.errors.email}
            label="Email"
            variant="filled"
          />
          <StyledTextField
            fullWidth
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.phone)}
            helperText={formik.errors.phone}
            label="Telefone"
            variant="filled"
          />
          <StyledTextField
            multiline={true}
            fullWidth
            name="msg"
            maxRows={4}
            rows={4}
            error={Boolean(formik.errors.msg)}
            helperText={formik.errors.msg}
            value={formik.values.msg}
            onChange={formik.handleChange}
            label="Mensagem"
            variant="filled"
          />
        </Box>
        <FormControlLabel
          sx={{ py: 2 }}
          control={
            <Checkbox
              name="policy"
              value={formik.values.policy}
              onChange={formik.handleChange}
            />
          }
          label={"Eu concordo com a Política de Privacidade do Grupo Guarida"}
        />

        <FormControlLabel
          sx={{ pb: 2 }}
          control={
            <Checkbox
              name="terms"
              value={formik.values.terms}
              onChange={formik.handleChange}
            />
          }
          label=" Eu aceito receber conteúdos promocionais relacionados aos produtos e serviços do Grupo Guarida "
        />

        <Box sx={{ ...center, pb: 2 }}>
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
        <Divider />
        <Typography align="center" sx={{ pt: 2 }}>
          Agende uma visita! <br />e conheça este imóvel
        </Typography>
        <Box sx={{ ...center, py: 2 }}>
          <Button
            sx={{
              borderRadius: 20,
              background: theme.palette.primary.dark,
            }}
            size={"large"}
            variant="contained"
            color={"primary"}
            fullWidth={false}
            startIcon={<CalendarMonthIcon />}
          >
            <Typography>Agendar visita</Typography>
          </Button>
        </Box>
        <Divider />
        <Typography align={"center"} color="grey.500" sx={{ pt: 2 }}>
          Converse agora com o consultor
        </Typography>
        <Box sx={{ ...center, pt: 2 }}>
          <Button
            sx={{
              borderRadius: 20,
              background: theme.palette.primary.dark,
            }}
            size={"large"}
            variant="contained"
            color={"primary"}
            fullWidth={false}
            startIcon={<WhatsAppIcon />}
          >
            Contato via WhatsApp
          </Button>
        </Box>
      </Box>
    </form>
  );
};
