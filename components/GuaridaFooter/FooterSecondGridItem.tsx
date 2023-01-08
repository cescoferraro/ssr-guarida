import { FooterGridItem } from "components/GuaridaFooter/FooterGridItem";
import { FooterLinkComponent } from "components/GuaridaFooter/FooterLinkComponent";
import { DescriptionWrapper } from "./DescriptionWrapper";

export function FooterSecondGridItem() {
  return (
    <FooterGridItem title={"Trabalhe com a gente"}>
      <DescriptionWrapper description={"Venha fazer parte da nossa história."}>
        {[
          {
            display: "Guarida Carreiras",
            anchor: "https://guaridacarreiras.gupy.io/",
          },
          {
            display: "Seja um corretor associado",
            anchor: "https://g.guarida.com.br/corretor-associado",
          },
          { display: "Parceiros", anchor: "#" },
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
