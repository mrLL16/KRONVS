# KRONVS / AURA design system

Sistema de interface derivado das imagens AURA e da gravação de tela fornecida pelo usuário. Ele é uma direção visual para aplicar na Kronvs; não é uma cópia de conteúdo, marca ou componentes proprietários do projeto de referência.

## Direção visual

O sistema usa preto dominante, verde Petronas como único acento cromático, painéis translúcidos, ondas de partículas e tipografia grotesca grande. A sensação é de infraestrutura inteligente em operação: o movimento mostra fluxo, enquanto a interface permanece silenciosa e editorial.

O verde Petronas é reservado para ação, estado ativo e visualizações de automação. Não usar verde em todos os textos, bordas e ícones; isso elimina hierarquia e torna o acento cansativo.

## Tokens

`tokens.css` é independente do sistema monocromático existente. Todos os tokens começam com `--aura-` para evitar colisões com a Kronvs atual. Importe o arquivo e envolva a área com `.aura-scope`.

### Cores

| Papel | Token | Valor |
| --- | --- | --- |
| Fundo | `--aura-void` | `#050806` |
| Superfície | `--aura-panel-solid` | `#0C1B16` |
| Texto | `--aura-text` | `#F3F8F4` |
| Texto secundário | `--aura-text-soft` | `#C0CEC7` |
| Texto discreto | `--aura-text-dim` | `#74867D` |
| Ação principal | `--aura-petronas` | `#00A19C` |
| Verde Petronas | `--aura-petronas` | `#00A19C` |
| Verde Petronas claro | `--aura-mint` / `--aura-petronas-bright` | `#4DDBD0` |
| Verde Petronas profundo | `--aura-petronas-deep` | `#006E6A` |
| Divisória | `--aura-line` | `rgba(187,255,227,.18)` |

O trade-off operacional é deliberado: um único acento cria força e reconhecimento, mas oferece menos recursos para codificar estados. Texto de leitura deve permanecer em `--aura-text` ou `--aura-text-soft`; use o verde Petronas como acento, nunca como parágrafo longo.

## Tipografia

- Display: Open Sans 400, fluido entre 44 e 152px; títulos com entrelinha compacta e tracking negativo.
- Corpo: Open Sans 400, 16px, entrelinha 1.55.
- Metadados e rótulos: Fira Code, 11–13px.
- Não usar peso 700 como padrão: o sistema da referência cria contraste com tamanho, cor e espaço, não com negrito pesado.

## Layout

- Container máximo: 1440px; gutter fluido de 20–72px.
- Desktop: grid de 12 colunas, gap de 24px.
- Tablet: grid de 8 colunas, gap de 20px.
- Mobile: uma coluna, gap de 16px; hero, cartões e FAQ empilhados.
- Seções respiram entre 80 e 176px. Um fundo visual grande pode ocupar a seção, mas nunca deve aumentar a altura para `100vh` sem conteúdo real.
- Raio: 10px em controles pequenos, 20px em cartões, 32px em blocos hero, 999px em chips e botões.

## Componentes

### Header

Logo central ou marca curta, até cinco links, um CTA. Em mobile, substituir links por menu explícito com `aria-expanded`; não deixar a navegação desaparecer.

### Hero

Eyebrow curto, H1 de no máximo duas linhas, uma frase de valor e uma ação. O mesh fica atrás do texto. O orb pode acompanhar a rolagem, mas deve desaparecer com `prefers-reduced-motion`.

### Métricas

Usar somente números reais da Kronvs. Cada métrica deve ter unidade e fonte interna. O visual de referência usa percentuais e contagens como prova; inventar esses números quebra confiança mais rápido do que um layout imperfeito.

### Workflow cards

Quatro cartões correspondentes a conectar, construir, ativar e escalar. Use `--aura-panel` e uma linha fina; o brilho deve aparecer somente no item em foco.

### FAQ

Usar `<details><summary>` ou equivalente acessível. Linhas horizontais e respostas curtas. Evitar accordion controlado sem suporte a teclado.

### People / cases

Fotos ou cases devem permanecer em escala de cinza ou baixa saturação; o verde destaca o estado, não o rosto. O texto da pessoa deve estar dentro de um painel com fundo estável, nunca apenas sobre uma imagem sem scrim.

### CTA

Botão principal claro com alvo mínimo de 48px. No máximo uma ação primária por seção. O estado loading preserva a largura e bloqueia o reenvio; erro aparece próximo do campo e não somente em toast.

## Movimento

Use três ritmos: 160ms para hover, 320ms para transições de componente e 900ms para entrada de seção. Ondas e orbs podem ter loop contínuo somente como decoração; nunca coloque informação necessária apenas em movimento. Reduza ou remova loops em `prefers-reduced-motion`.

## Implementação na Kronvs

```css
@import "./design-system/aura/tokens.css";
```

Em um componente, use a classe de escopo:

```tsx
<section className="aura-scope aura-mesh">
  <div className="aura-shell">
    <span className="aura-mono aura-muted">KRONVS / AUTOMAÇÃO</span>
    <h1>Operação inteligente.</h1>
    <p>Estruture processos e sistemas para o trabalho real.</p>
    <a className="aura-button" href="#contato">Conversar com a KRONVS</a>
  </div>
</section>
```

O arquivo não substitui a experiência atual da Kronvs. A aplicação segura é migrar seção por seção: primeiro tokens e hero, depois workflow, prova social e CTA final. O risco de migrar a página inteira de uma vez é perder a clareza da oferta original sob um efeito visual forte.

## Critérios de aceite

- [ ] Todos os textos são próprios da Kronvs.
- [ ] Todos os números e depoimentos têm fonte real.
- [ ] O hero continua legível sem o mesh e sem animação.
- [ ] A interface funciona em 320px, 768px e 1440px sem overflow.
- [ ] Foco de teclado é visível e os alvos têm pelo menos 48px.
- [ ] O verde não é usado como único indicador de estado.
- [ ] `prefers-reduced-motion` remove loops decorativos.
- [ ] O CTA aponta para um canal existente e testado.
