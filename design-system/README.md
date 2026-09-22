# Landing / Mono — Design system v1.0

## Escopo e premissas
Sistema proposto para uma landing page de serviços de desenvolvimento, com geração de contato como conversão principal. Nome comercial, oferta e público ainda não foram definidos. Os textos do guia são exemplos, não afirmações sobre uma empresa. Alterar essas premissas muda o conteúdo e a hierarquia comercial, não exige substituir a base visual. Não há backend, formulário de envio ou site publicado.

## Origem visual
Referência: [Portfolio Full-stack Developer — Taisia Tsyganok](https://www.behance.net/gallery/199132655/Portfolio-Full-stack-Developer), publicado em 21/05/2024; imagens examinadas em 17/09/2026.
A prancha 03 declara Fira Code, Open Sans e as cores #121212, #F5F5F5, #A6A6A6 e #3D3D3D. Títulos deslocados, cápsulas, recortes arredondados, círculos de contorno e projetos coloridos sobre fundo monocromático vêm da observação das pranchas. As demais medidas e regras abaixo são propostas, não especificações extraídas do autor.

## Direção
Editorial, técnica e sóbria. Reservar a cor para imagens reais de projetos. Um CTA principal por bloco: “Conversar sobre meu projeto”. Projetos são a evidência secundária. Sem gradientes decorativos, estatísticas inventadas, carrossel automático ou sombra como padrão de elevação.

## Tokens semânticos
| Token CSS | Valor | Uso |
|---|---|---|
| --color-bg | #121212 | Fundo |
| --color-surface | #1C1C1C | Superfície de apoio proposta |
| --color-text | #F5F5F5 | Texto principal / CTA claro |
| --color-muted | #A6A6A6 | Texto secundário no fundo escuro |
| --color-line | #3D3D3D | Divisórias decorativas, nunca texto essencial |
| --color-control-border | #858585 | Contorno identificável de inputs e controles |
| --color-error | #FFB4AB | Erro, sempre acompanhado de mensagem |
| --color-success | #B9D8BC | Sucesso, sempre acompanhado de mensagem |

Não usar #A6A6A6 como texto sobre #F5F5F5. Nas superfícies claras, usar #121212 para títulos e #3D3D3D para corpo. O arquivo contrast-check.json registra as razões calculadas por luminância relativa sRGB. A validação desses pares não equivale a uma auditoria completa de acessibilidade.

## Tipografia
| Papel | Fonte / peso | Desktop | Mobile | Entrelinha |
|---|---|---|---|---|
| Display | Fira Code / 500 | até 96px | 36px mínimo | 1,12 |
| H2 | Fira Code / 500 | até 64px | 32px mínimo | 1,2 |
| H3 | Fira Code / 500 | 24px | 20px | 1,4 |
| Lead | Open Sans / 400 | 18px | 18px | 1,6 |
| Corpo | Open Sans / 400 | 16px | 16px | 1,6 |
| Rótulo | Fira Code / 400 | 14px | 14px | 1,5 |
| Metadado | Fira Code / 400 | 12px | 12px | 1,6 |

Uma única tag H1. Títulos com tracking -0,045em, corpo sem tracking negativo. Largura de leitura até 60ch. Fira Code apenas em títulos e metadados: textos longos monoespaçados ocupam mais largura e aumentam o comprimento da página. Nunca reduzir texto para preservar uma quebra do desktop. Fontes Google carregadas no guia; fallbacks locais definidos. Na implementação final, servir WOFF2 local e carregar somente pesos usados.

## Grid, espaçamento e geometria
- Conteúdo: máximo 1200px; margens 20px mobile, fluidas até 64px.
- Mobile <768px: 4 colunas de referência, gap 16px; conteúdo em uma coluna.
- Tablet 768–1023px: 8 colunas, gap 24px; pares de cards quando couberem.
- Desktop ≥1024px: 12 colunas, gap 24px; hero e projetos em composição 5/7 ou 7/5.
- Escala: 4, 8, 12, 16, 24, 32, 48, 64, 96 e 128px. Seções: 64px mobile, até 128px desktop.
- Raio: campo 12px; card 24px; mídia em destaque 32px; cápsula 999px.
- Borda: 1px. Sem sombra por padrão. Não confundir borda decorativa com contorno de controle.
- Círculos: decorativos, aria-hidden, pointer-events:none, recortados dentro da seção, sem gerar overflow.

## Componentes e contratos
| Componente | Anatomia | Estados e comportamento |
|---|---|---|
| Header | Marca, até 3 âncoras, CTA | Em mobile, âncoras podem quebrar linha; se houver menu, expor aria-expanded e fechar com Escape |
| Hero | Eyebrow, H1, proposta, CTA, link de projetos | Ordem DOM igual à ordem de leitura; assimetria somente visual no desktop |
| Botão primário | Texto + seta opcional | Default, hover, active, focus-visible, disabled e loading; altura ≥48px |
| Botão secundário | Contorno + texto | Mesmo tamanho e foco; não depender de hover para compreensão |
| Botão circular | Ícone + nome acessível | ≥48×48px; usar apenas com contexto claro |
| Tag | Texto curto, borda sutil | Não interativa; se filtrar conteúdo, usar botão com aria-pressed |
| Card de serviço | Título, descrição, escopo | Versão escura e inversa; no máximo um destaque claro no grupo |
| Card de projeto | Mídia, categoria, título, contribuição, link | Imagem 16:10, object-fit:cover só quando não cortar conteúdo crítico; título descreve destino |
| Campo | Label persistente, input, ajuda/erro | Default, focus, filled, invalid, disabled; aria-describedby para ajuda/erro |
| FAQ | Pergunta em summary, resposta | details/summary nativos; abertura por teclado e clique |
| Rodapé | CTA final, contatos e autoria | Não criar links sem destino ou perfis fictícios |

Seta e texto podem parecer duas formas, mas devem pertencer a uma única âncora e a um único alvo de teclado. Para ícones, usar biblioteca consistente (ex.: Lucide), traço 1,5–2px, tamanho 20px. Não usar glifos como ícones definitivos; as setas do guia são demonstrações tipográficas.

Loading: manter largura do botão; aria-busy=true, impedir envio duplicado, mensagem “Enviando…”. Falha: preservar dados e mostrar erro próximo ao campo e resumo quando necessário. Sucesso: só após confirmação real do servidor; nunca simular envio em produção.

## Estrutura recomendada da landing
1. Header com Projetos, Serviços e Contato.
2. Hero: promessa específica, para quem, CTA de conversa e atalho para projetos.
3. Projetos selecionados: problema, contribuição, resultado verificável; sem resultados fictícios.
4. Serviços: três escopos claramente delimitados.
5. Processo: descoberta, construção, validação e entrega.
6. FAQ: escopo, prazo, suporte e orçamento; responder apenas após definição comercial.
7. Contato: ação principal repetida e canal real.

Artigos e currículo são opcionais: no portfólio original são centrais, mas numa landing podem competir com o contato. Não esconder provas essenciais dentro de um carrossel.

## Movimento e responsividade
Hover 160ms, mudanças de estado 240ms, curva cubic-bezier(.2,0,0,1). Deslocamento máximo de 2px; sem parallax ou animação contínua. Respeitar prefers-reduced-motion. Imagens com dimensões/aspect-ratio reservadas. Hero sem altura fixa em vh. Abaixo de 768px remover deslocamento de título e empilhar texto, CTA e mídia; o conteúdo deve funcionar em 320px e com zoom 200%.

## Decisões e trade-offs
- Monocromia mantém coerência com a referência, mas reduz os recursos para distinguir categorias; compensar com títulos, posição e espaço.
- Fira Code reforça a direção técnica, mas palavras em português ocupam mais espaço; título fluido e quebras naturais são obrigatórios.
- Contornos mais claros perdem parte da sutileza original, mas tornam campos e controles mais identificáveis.
- Grid editorial estático perde o movimento de um carrossel, mas mantém os projetos visíveis e reduz complexidade de teclado, toque e carregamento.
- Não copiar currículo, projetos ou números do autor para o conteúdo da nova landing.

## Critérios de aceite
- [ ] Substituir marca e textos de exemplo por conteúdo aprovado.
- [ ] Conectar CTAs a canais reais e verificar cada destino.
- [ ] Testar teclado, foco, leitores de tela e zoom 200% na implementação final.
- [ ] Confirmar ausência de overflow em 320, 390, 768 e 1440px.
- [ ] Verificar contraste de texto ≥4,5:1, texto grande ≥3:1 e contornos essenciais ≥3:1.
- [ ] Preservar labels, mensagens de erro e alvos de pelo menos 48px.
- [ ] Substituir mídia de exemplo por projetos autorizados e texto alternativo adequado.
- [ ] Validar envio, falha e recuperação do formulário com o backend real, se implementado.

## Arquivos
- index.html: guia visual interativo e aplicação de exemplo.
- tokens.css: tokens e componentes CSS reutilizáveis.
- contrast-check.json: verificação numérica dos pares selecionados.
