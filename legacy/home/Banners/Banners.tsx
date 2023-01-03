import { Close } from "@mui/icons-material";
import { Container, Modal } from "@mui/material";
import Box from "@mui/material/Box/Box";
import AmorMovimenta from "common/assets/banners/amor-que-movimenta.png";
import AmorMovimentaGde from "common/assets/banners/amor-que-movimenta2.png";
import Anuncie from "common/assets/banners/anuncie.png";
import AnuncieGde from "common/assets/banners/anuncie2.png";
import { center } from "common/center";
import React from "react";

export interface BannerHome {
  titulo: string;
  imagem: string;
  banner: string;
  link: string;
  slug: string;
}

const banners: BannerHome[] = [
  {
    titulo: "Anuncie Agora",
    banner: Anuncie.src,
    imagem: AnuncieGde.src,
    link: process.env.REACT_APP_URL + "/anunciar",
    slug: "anuncie",
  },
  {
    titulo: "Amor que movimenta",
    banner: AmorMovimenta.src,
    imagem: AmorMovimentaGde.src,
    link:
      process.env.REACT_APP_URL +
      "/institucional/amor-que-movimenta?utm_source=site&utm_medium=banner&utm_campaign=amor-que-movimenta",
    slug: "movimenta",
  },
];

export const Banners = () => {
  const [open, setOpen] = React.useState(false);
  const [banner, setBanner] = React.useState<BannerHome>(banners[0]);
  return (
    <Container
      sx={{ height: 300, display: { xs: "hidden", sm: "hidden" }, ...center }}
    >
      <Box
        display="flex"
        sx={{
          "& > div:nth-of-type(n + 2)": { ml: 2 },
        }}
      >
        {banners.map((b, idx) => (
          <Box
            onClick={() => {
              const bannerHome = banners[idx];
              if (bannerHome) setBanner(bannerHome);
              setOpen((s) => !s);
            }}
            height={290 * (9 / 16)}
            width={290}
            key={b.titulo}
            sx={{
              backgroundImage: `url(${b.imagem})`,
              backgroundSize: "cover",
            }}
          />
        ))}
      </Box>
      <Modal open={open} onClose={() => setOpen((s) => !s)}>
        <>
          <Box onClick={() => setOpen((s) => !s)}>
            <Close />
          </Box>
          <Box>
            <a href={banner.link}>
              <img src={banner.imagem} alt={banner.titulo} />
            </a>
          </Box>
        </>
      </Modal>
    </Container>
  );
};
