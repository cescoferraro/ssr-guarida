import { currentAppUrl } from "common/currentAppUrl";
import { DescriptionWrapper } from "components/GuaridaFooter/DescriptionWrapper";
import { FooterGridItem } from "components/GuaridaFooter/FooterGridItem";
import { FooterLinkComponent } from "components/GuaridaFooter/FooterLinkComponent";

export function FooterFirstGridItem() {
  return (
    <FooterGridItem title={"Sobre nós"}>
      <DescriptionWrapper>
        {[
          {
            display: "Grupo Guarida",
            anchor: currentAppUrl + "/institucional",
          },
          {
            display: "Agências",
            anchor: currentAppUrl + "/institucional/agencias",
          },
          { display: "Campanhas", anchor: "#" },
          { display: "Blog", anchor: "https://blog.guarida.com.br/" },
          {
            display: "Central de Ajuda",
            anchor: "https://g.guarida.com.br/faq",
          },
          {
            display: "Avalie Nossos Serviços",
            anchor:
              "https://forms.office.com/pages/responsepage.aspx?id=nnAi80MDLkWoRqOkFh7OFwNgTTY7-H1Oj-GcO6A6PE9URUxYTTNZRlM0MTFWQkRRVTI2OUVROEZNRC4u",
          },
        ].map((footerLink) => (
          <FooterLinkComponent
            key={footerLink.display}
            footerLink={footerLink}
          />
        ))}
      </DescriptionWrapper>
    </FooterGridItem>
  );
}
