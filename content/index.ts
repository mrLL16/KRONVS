import home from "./home.json";
import engenharia from "./engenharia.json";
import sistemas from "./sistemas.json";
import sobre from "./sobre.json";
import contato from "./contato.json";
import projetos from "./projetos.json";
import legais from "./legais.json";
import global from "./global.json";

export const homeContent = home;
export const engenhariaContent = engenharia;
export const sistemasContent = sistemas;
export const sobreContent = sobre;
export const contatoContent = contato;
export const projetosContent = projetos;
export const legaisContent = legais;
export const globalContent = global;

// Cada entrada vira uma aba em /conteudo (só em desenvolvimento). Para
// migrar uma nova página: criar content/<slug>.json, importar aqui e listar.
export const contentPages = {
  home: { title: "Home", path: "/", data: home },
  engenharia: { title: "Engenharia", path: "/engenharia", data: engenharia },
  sistemas: { title: "Sistemas", path: "/sistemas", data: sistemas },
  sobre: { title: "Sobre nós", path: "/sobre", data: sobre },
  contato: { title: "Contato", path: "/contato", data: contato },
  projetos: { title: "Projetos", path: "/engenharia#projetos", data: projetos },
  legais: { title: "Avisos legais", path: "/avisos-legais", data: legais },
  global: { title: "Global (menu, rodapé, chat)", path: "/", data: global },
} as const;

export type ContentSlug = keyof typeof contentPages;
