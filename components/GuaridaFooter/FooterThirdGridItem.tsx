import { currentAppUrl } from "common/currentAppUrl";
import { FooterGridItem } from "components/GuaridaFooter/FooterGridItem";
import { FooterLinkComponent } from "components/GuaridaFooter/FooterLinkComponent";
import { DescriptionWrapper } from "./DescriptionWrapper";

export function FooterThirdGridItem() {
  const links = [
    {
      display: "Área de Locação",
      links: [
        { display: "Antecipação do Aluguel", anchor: "#" },
        { display: "Alugar um Imóvel", anchor: currentAppUrl + "/alugar" },
        {
          display: "Anunciar um Imóvel para Alugar",
          anchor: currentAppUrl + "/anunciar?tipo-anuncio=alugar",
        },
        { display: "Calculadora de Aluguel", anchor: "#" },
        {
          display: "Como alugar na Guarida",
          anchor: currentAppUrl + "/alugar",
        },
        { display: "Reforma Express", anchor: currentAppUrl + "/alugar" },
      ],
    },
    {
      display: "Área de Vendas",
      links: [
        { display: "Comprar um Imóvel", anchor: currentAppUrl + "/vender" },
        {
          display: "Anunciar um imóvel para Comprar",
          anchor: currentAppUrl + "/anunciar",
        },
        { display: "Calculadora de Venda", anchor: "#" },
        {
          display: "Como Comprar na Guarida",
          anchor: currentAppUrl + "/vender",
        },
      ],
    },
    {
      display: "Área de Condomínios",
      links: [
        {
          display: "Proposta de Condomínio",
          anchor: currentAppUrl + "/condominios",
        },
        {
          display: "2ª via de boleto",
          anchor:
            currentAppUrl + "/AgenciaVirtual/index/showModalSegundaViaDoc",
        },
      ],
    },
    {
      display: "Guarida Seguros",
      links: [
        {
          display: "Conheça a Guarida Segura",
          anchor: "https://www.guasegs.com.br/",
        },
      ],
    },
    {
      display: "Guarida Soluções Financeiras",
      links: [
        {
          display: "Proposta de Condomínio",
          anchor: currentAppUrl + "/condominios",
        },
        {
          display: "2ª via de boleto",
          anchor:
            currentAppUrl + "/AgenciaVirtual/index/showModalSegundaViaDoc",
        },
      ],
    },
  ];
  return (
    <FooterGridItem title="Áreas de negócio">
      <DescriptionWrapper
        description={`Confiança e segurança para proprietários e inquilinos.`}
      >
        {links.map((footerLink) => (
          <FooterLinkComponent
            key={footerLink.display}
            footerLink={footerLink}
          />
        ))}
      </DescriptionWrapper>
    </FooterGridItem>
  );
}
