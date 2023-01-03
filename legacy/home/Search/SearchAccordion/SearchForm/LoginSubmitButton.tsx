import { Box, Button } from "@mui/material";
import { FormikProps } from "formik";
import React from "react";
import { center } from "common/center";
import { HomeForm } from "./useLoginFormik";

interface IProps {
  formik: FormikProps<HomeForm>;
}

export const LoginSubmitButton: React.FC<IProps> = ({ formik }) => (
  <Box sx={{ ...center, flexBasis: "20%", pl: { xs: 0, sm: 0, md: 2 } }}>
    <Button
      fullWidth
      disabled={!formik.isValid}
      variant="contained"
      color="secondary"
      type="submit"
    >
      Buscar
    </Button>
  </Box>
);
