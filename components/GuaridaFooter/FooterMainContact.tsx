import {
  Box,
  Container,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FooterContact } from "components/GuaridaFooter/FooterContact";
import { FooterLinkComponent } from "components/GuaridaFooter/FooterLinkComponent";

export function FooterMainContact() {
  const theme: Theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.only("sm"));
  const big = useMediaQuery(theme.breakpoints.down("md"));
  return big ? (
    <Box sx={{ background: "#000000" }}>
      <Container>
        <Box
          sx={{
            py: 4,
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {md && (
            <Box sx={{ pr: 2, flexBasis: "50%" }}>
              <Typography fontSize={20} sx={{ pb: 2, color: "white" }}>
                Central de Ajuda Guarida
              </Typography>
              <Typography fontSize={16} sx={{ pb: 2, color: "white" }}>
                Tudo que você precisa saber na Guarida está aqui!
              </Typography>
              <FooterLinkComponent
                textColor={"white"}
                always
                spacer
                footerLink={{
                  display: "Central de Ajuda",
                  anchor:
                    "https://www.guarida.com.br/institucional/fale-conosco",
                }}
              />
              <FooterLinkComponent
                textColor={"white"}
                always
                spacer
                footerLink={{
                  display: "Fale Conosco",
                  anchor:
                    "https://www.guarida.com.br/institucional/fale-conosco",
                }}
              />
            </Box>
          )}
          <Box sx={{ pl: 2, flexBasis: md ? "50%" : "100%" }}>
            <FooterContact color={"#FFFFFF"} />
          </Box>
        </Box>
      </Container>
    </Box>
  ) : null;
}
