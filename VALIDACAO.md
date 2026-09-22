# Validação KRONVS — site multipágina

Revisão de 18/09/2026. Prévia local em http://127.0.0.1:3000. Não houve publicação.

## Estrutura e interface

- Build de produção concluído com as seis páginas pré-renderizadas; nenhuma API de contato.
- Lint sem erros ou avisos e TypeScript sem erros.
- As seis rotas respondem HTTP 200 e apresentam título próprio, um H1, um main e header/footer únicos.
- Responsividade verificada em 320, 390, 768 e 1440px em todas as páginas, sem overflow horizontal.
- Capturas inspecionadas: Home e Engenharia/Sistemas no desktop, Contato no celular.
- Axe WCAG 2 A/AA e 2.1 AA: nenhuma violação nas seis páginas em 1440px e no formulário em 390px. Diálogo também auditado. Auditoria automatizada não substitui teste completo com leitor de tela.
- Nenhum erro de execução ou console no percurso de navegação.
- Header: recolhimento ao descer, retorno ao subir, retorno por hover e manutenção de marca/chat.
- Dropdown: abertura por hover no desktop e toque/clique no mobile; navegação nativa sem reload.
- Menu mobile: abertura, fechamento por seleção e Escape.
- Chat: modal abre, Escape fecha e devolve foco; envio desabilitado enquanto a integração está inativa.
- Demonstração de sistemas: alternância de interface validada.
- Movimento: animações terminam; movimento reduzido cancela animações; conteúdo principal e autoria disponíveis sem JavaScript.
- Rodapé sem CNPJ; Avisos legais e Privacidade apontam para a página correta. Rota antiga de privacidade redireciona.

## Contato

Número central: +55 11 96604-2263. A validação verifica nome, e-mail, telefone, necessidade, título, descrição e opções de prazo. Empresa e local são opcionais. A mensagem preserva acentos, ampersands, quebras de linha, sinais de adição e interrogações usando encodeURIComponent.

Os testes interceptam window.open e conferem o destino wa.me, a mensagem e o link de recuperação. Não houve envio externo. Entradas contextualizadas de engenharia, sistemas e ambas foram verificadas. Sem JavaScript, o formulário não envia dados e oferece orientação para ativá-lo.

Evidências: `artifacts/verification.json`, `artifacts/contact-verification.json`, `artifacts/motion-verification.json`. Os scripts são reproduzíveis conforme README.

## Limites e configuração posterior

O assistente está estruturalmente preparado, sem provedor de IA conectado. O catálogo de projetos começa vazio e não contém clientes ou resultados fictícios. Para indexação pública, definir o domínio real em NEXT_PUBLIC_SITE_URL e reconstruir o build; a prévia mantém noindex. Não foi realizada nova medição Lighthouse para esta versão.
