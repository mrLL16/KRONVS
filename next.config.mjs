/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      // 308 (permanente) em vez do redirect() de página, que devolve 307:
      // sinaliza ao Google para consolidar o valor de SEO em /avisos-legais
      // em vez de tratar as duas URLs como conteúdo duplicado.
      {
        source: "/privacidade",
        destination: "/avisos-legais#privacidade",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
