# KRONVS

Site institucional multipágina em Next.js App Router e TypeScript. A identidade usa `design-system/tokens.css`, Open Sans e Fira Code locais, paleta monocromática e os componentes existentes.

## Executar e validar

```sh
npm ci
npm run dev
```

Prévia: http://127.0.0.1:3000. Produção local: `npm run build` e `npm start`. Reinicie o servidor depois de reconstruir o build.

```sh
npm run lint
npm run typecheck
npm run build
npm run test:browser
npm run test:contact
node scripts/verify-motion.mjs
```

Os testes de navegador precisam da prévia em execução e do Chromium (`npx playwright install chromium`). O teste de contato intercepta `window.open`: nenhuma mensagem é enviada nem aberta em serviço externo. Relatórios e capturas ficam em `artifacts/`.

## Rotas

- `/`: apresentação, duas frentes, método e próximo passo.
- `/engenharia`: escopos técnicos, processo, aplicações e espaço de projetos.
- `/sistemas`: serviços, demonstração interativa, possibilidades e processo.
- `/sobre`: posicionamento, filosofia, projetos, compromissos e autoria.
- `/contato`: briefing e preparação da mensagem para WhatsApp.
- `/avisos-legais`: uso, responsabilidade, direitos, privacidade e cookies.

`/privacidade` redireciona para `/avisos-legais#privacidade`. Cada página tem metadata própria; header e footer são compartilhados no layout.

## Configuração

- `data/company.ts`: configuração central da marca e dos canais. WhatsApp autorizado: `5511966042263`.
- `NEXT_PUBLIC_COMPANY_WHATSAPP`: substituição opcional do número central, formato internacional.
- `NEXT_PUBLIC_COMPANY_EMAIL`: canal secundário opcional.
- `NEXT_PUBLIC_SITE_URL`: domínio HTTPS definitivo. Habilita canonical, indexação e sitemap. Sem domínio, mantém noindex para não indexar uma prévia.

As variáveis públicas entram no build. Reconstrua após alterações. Não há API de contato, webhook, banco de contatos ou persistência de formulário. `lib/contact.ts` valida os campos e gera a URL com `encodeURIComponent`. O visitante revisa e confirma o envio no WhatsApp; o site nunca afirma entrega. A abertura é imediata após validação para preservar o gesto de usuário exigido por bloqueadores de pop-up. Um link de recuperação permanece disponível.

## Conteúdo e manutenção

- `data/offerings.ts`: serviços e etapas de cada área.
- `data/projects.ts`: catálogo de projetos; publicar somente conteúdo autorizado e comprovado. Aceita categoria, cliente, cidade, desafio, escopo, solução, resultado, disciplinas, status, imagem e link.
- `components/sections/project-card.tsx`: apresentação reutilizável dos projetos. A lista começa vazia; as páginas exibem um espaço editorial identificado, sem cases fictícios.
- `components/chat/ai-chat.tsx`: modal acessível com navegação útil e estado de integração inativa. `ChatTransport` é a interface futura para um endpoint servidor; não colocar credenciais no cliente nem simular respostas de IA.
- `components/ui/presentation-motion.tsx`: entrada uma vez por elemento e página, com cancelamento em `prefers-reduced-motion`.
- `components/sections/system-showcase.tsx`: demonstração ilustrativa interativa, não case de cliente.
- `lib/analytics.ts`: adaptador inativo por padrão; nenhuma coleta de analytics ou cookies de rastreamento instalada.

O header permanece transparente no topo. Scroll para baixo recolhe a navegação central; scroll para cima, hover ou foco a revelam. Mobile usa menu explícito. O diálogo usa a API nativa para foco e Escape. Componentes estáticos permanecem no servidor.

Separar os conteúdos exige uma navegação adicional para aprofundar cada serviço, mas reduz o volume inicial e impede que sistemas sejam percebidos como uma oferta restrita à engenharia. A demonstração foi preservada na página de Sistemas; a declaração de autoria fica em Sobre.

O footer mantém estrutura e peso visual; o elemento de CNPJ foi substituído por Avisos legais. A marca continua textual. Fontes e licenças em `public/fonts`. ESLint 9 é mantido pela compatibilidade com os plugins atuais. Não foi realizada publicação.
