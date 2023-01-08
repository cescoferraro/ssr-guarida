/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_URL: "http://homolog.api.guarida.bonaparte.ag",
    CMS_API_URL: "http://develop.cms.guarida.bonaparte.ag/api",
    VERSION: "3.0.6",
    DATE_BUILD: "21/11/2022",
    AGENCIA_VIRUAL_URL: "https://agenciavirtual3.guarida.com.br/login",
    CONTATO_WHATS_URL: "https://api.whatsapp.com/send?phone=555133279001",
    URL: "https://www.guarida.com.br",
    LOCAL_URL: "http://localhost:3000",
  },
};

module.exports = {
  ...nextConfig,
  async redirects() {
    return [
      {
        source: "/alugar",
        destination: "/busca/alugar/porto-alegre-rs/apartamento",
        permanent: true,
      },
      {
        source: "/comprar",
        destination: "/busca/comprar/porto-alegre-rs/apartamento",
        permanent: true,
      },
    ];
  },
};
