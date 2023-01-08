import { currentAppUrl } from "common/currentAppUrl";
import { DescriptionWrapper } from "components/GuaridaFooter/DescriptionWrapper";
import { FooterGridItem } from "components/GuaridaFooter/FooterGridItem";
import { FooterLinkComponent } from "components/GuaridaFooter/FooterLinkComponent";

export function FooterFirstGridItem() {
  return (
    <FooterGridItem title={"Sobre nós"}>
      <DescriptionWrapper
        description={`Conheça a Guarida, experiência no ramo imobiliário que reflete aquilo que nos move, nosso propósito.Tudo que a gente faz é pra você viver melhor!`}
      >
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
            display: "Amor que movimenta",
            anchor:
              "https://www.guarida.com.br/institucional/amor-que-movimenta",
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
