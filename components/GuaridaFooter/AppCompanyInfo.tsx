import { Box, Typography } from "@mui/material";
import { center } from "common/center";
import Selo45Anos from "common/assets/images/Selo45Anos.png";

export const AppCompanyInfo = () => {
  return (
    <Box sx={{}}>
      <Box sx={{ ...center, pb: 2.5 }}>
        <img src={Selo45Anos} alt="Selo45Anos" />
      </Box>
      <Box>
        <Typography align="center" color="#666666" fontSize={14}>
          @2022 Guarida Imóvel. Todos os direitos reservados. CRECI RS - 413J |
          CNPJ Guarida: 89398.606/001-30
        </Typography>
      </Box>
    </Box>
  );
};
