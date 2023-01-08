import { Box } from "@mui/material";
import { center } from "common/center";
import { FooterLinkComponent } from "components/GuaridaFooter/FooterLinkComponent";

export const FooterMainLinks: React.FC = () => (
  <Box display="flex" sx={{ ...center, py: 3 }}>
    <Box
      id="main_links"
      sx={{
        width: { xs: "100%", sm: "100%", md: "unset" },
        display: "flex",
        "& > div": {
          pb: { xs: 2, sm: 2, md: 0 },
        },
        "& > div:nth-of-type(n + 2)": {
          ml: { xs: "0", sm: "0", md: 4 },
        },
        flexDirection: {
          xs: "column",
          sm: "column",
          md: "row",
        },
      }}
    >
      {[
        { display: " Guia do Usuário", anchor: "#" },
        {
          display: " Política de Privacidade",
          anchor:
            (process.env.URL || "") + "/institucional/politica-de-privacidade",
        },
        {
          display: " Termos e Condições de Uso",
          anchor:
            "https://sgi.guarida.com.br/guarida/server-ftp/Condominios/AgenciaVirtual/UseTerm/termo-de-uso.pdf",
        },
        {
          display: " Políticas de Cookies",
          anchor:
            (process.env.URL || "") + "/institucional/politica-de-cookies",
        },
      ].map((footerLink) => (
        <FooterLinkComponent
          key={footerLink.display}
          noWrap
          always
          spacer
          footerLink={footerLink}
        />
      ))}
    </Box>
  </Box>
);
