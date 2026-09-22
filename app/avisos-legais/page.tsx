import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { PageHero } from "@/components/sections/page-hero";
import { company } from "@/data/company";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Avisos Legais | KRONVS",
  "Informações institucionais sobre conteúdo, responsabilidade, propriedade intelectual, privacidade, cookies e serviços externos do site KRONVS.",
  "/avisos-legais",
);
export default function Legal() {
  return (
    <PageShell>
      <PageHero
        eyebrow="INFORMAÇÕES DO SITE"
        title="Avisos legais"
        description="Condições de uso do conteúdo e informações sobre privacidade e serviços externos."
      />
      <div className="container legal-content">
        <section>
          <h2>Aviso legal</h2>
          <p>
            Este site apresenta os serviços da {company.fullName}. Descrições e
            exemplos têm finalidade institucional. Escopo, condições de
            contratação, prazos e responsabilidades são definidos em proposta ou
            contrato específico.
          </p>
        </section>
        <section>
          <h2>Limitação de responsabilidade</h2>
          <p>
            O conteúdo não substitui levantamento, análise técnica ou avaliação
            das condições de um projeto. Sua aplicação depende do contexto, dos
            requisitos e das responsabilidades profissionais pertinentes.
            Demonstrações de interface e esquemas identificados como
            ilustrativos não representam projetos de clientes ou resultados
            obtidos.
          </p>
          <p>
            Estas informações não afastam direitos ou responsabilidades
            previstos na legislação aplicável.
          </p>
        </section>
        <section>
          <h2>Propriedade intelectual</h2>
          <p>
            A marca, os textos, a identidade, as interfaces e os materiais
            próprios da KRONVS não devem ser reproduzidos ou utilizados sem
            autorização, quando aplicável. Materiais de terceiros permanecem
            sujeitos aos direitos e licenças de seus titulares, respeitadas as
            hipóteses legais de utilização.
          </p>
        </section>
        <section id="privacidade">
          <h2>Privacidade</h2>
          <p>
            O formulário organiza os dados que você preenche no próprio
            navegador: nome, empresa opcional, e-mail, telefone, necessidade,
            título, descrição, local opcional e prazo. Ele não encaminha esses
            dados a uma API da KRONVS nem os grava em um banco de dados do site.
          </p>
          <p>
            Ao continuar, a mensagem é incluída no link aberto no WhatsApp,
            serviço externo sujeito à sua própria política de privacidade.
            Revise o conteúdo antes de confirmar o envio. Evite incluir senhas,
            dados sensíveis ou informações confidenciais de terceiros.
          </p>
          <p>
            As informações efetivamente recebidas pela KRONVS poderão ser
            utilizadas para responder ao contato, avaliar a demanda e tratar de
            eventual contratação. Para esclarecimentos ou solicitações sobre
            seus dados, utilize{" "}
            {company.email ? (
              <a href={`mailto:${company.email}`}>o e-mail de contato</a>
            ) : (
              <Link href="/contato">o canal de contato da KRONVS</Link>
            )}
            .
          </p>
        </section>
        <section>
          <h2>Cookies e registros técnicos</h2>
          <p>
            Esta versão não instala cookies de rastreamento nem ativa
            ferramentas de publicidade ou análise de navegação. A hospedagem
            pode processar registros técnicos necessários à disponibilização e
            proteção do site. O assistente não envia mensagens a um provedor de
            IA enquanto sua integração estiver inativa.
          </p>
        </section>
        <section>
          <h2>Links externos</h2>
          <p>
            Serviços externos, incluindo o WhatsApp, possuem condições e
            políticas próprias. A KRONVS não controla seu conteúdo,
            disponibilidade ou funcionamento. Consulte as informações do
            respectivo fornecedor ao utilizá-los.
          </p>
        </section>
        <section>
          <h2>Atualizações</h2>
          <p>
            O conteúdo e estes avisos podem ser atualizados para refletir
            mudanças no site e em seus serviços. Versão de 18 de setembro de
            2026.
          </p>
        </section>
        <p className="legal-references">
          Referências:{" "}
          <a href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm">
            Lei Geral de Proteção de Dados
          </a>{" "}
          e{" "}
          <a href="https://www.planalto.gov.br/ccivil_03/leis/l9610.htm">
            Lei de Direitos Autorais
          </a>
          , consultadas em 18/09/2026.
        </p>
      </div>
    </PageShell>
  );
}
