import { SectionIndex } from "@/components/technical/section-index";
import { ContactLink } from "@/components/ui/contact-link";
const scopes = [
  [
    "Sistemas de gestão",
    "Ferramentas para organizar o financeiro, o comercial, os atendimentos e os processos internos da sua empresa.",
  ],
  [
    "CRMs e portais",
    "Sistemas para acompanhar oportunidades, relacionar-se com clientes e disponibilizar informações para equipes e parceiros.",
  ],
  [
    "Automações e integrações",
    "Conexão entre ferramentas e automação de tarefas repetitivas, reduzindo a necessidade de transferir informações manualmente.",
  ],
  [
    "Dashboards e soluções sob medida",
    "Indicadores para apoiar decisões e aplicações web desenvolvidas a partir de uma ideia ou necessidade específica do negócio.",
  ],
];
export function Systems() {
  return (
    <section
      id="sistemas"
      className="section container practice-section"
      aria-labelledby="systems-title"
    >
      <SectionIndex number="04">SISTEMAS & TECNOLOGIA</SectionIndex>
      <div className="practice-layout">
        <div className="practice-intro">
          <h2 id="systems-title">
            Menos controles espalhados.
            <br />
            <span className="muted">Mais informação em um sistema.</span>
          </h2>
          <p>
            Criamos sistemas web para gerenciar vendas, clientes, finanças,
            atendimentos e rotinas internas. O desenvolvimento acompanha as
            regras e os processos da sua empresa.
          </p>
          <p>
            Por exemplo: reunir o cadastro de clientes, o andamento dos pedidos
            e os pagamentos em um só lugar. Ou automatizar uma tarefa que hoje
            exige copiar dados de uma planilha para outra.
          </p>
          <ContactLink intent="systems" variant="text" location="systems">
            Falar sobre um sistema
          </ContactLink>
        </div>
        <div className="practice-scopes">
          {scopes.map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
      <div className="combined-practice">
        <div>
          <span className="business-kicker">
            QUANDO AS DUAS FRENTES SE ENCONTRAM
          </span>
          <h3>
            Engenharia e sistemas,
            <br />
            no mesmo projeto.
          </h3>
          <p>
            Uma obra com gestão digital, instalações com controles próprios ou
            processos técnicos integrados a um sistema. Se a sua necessidade
            envolve as duas áreas, estruturamos os escopos em conjunto.
          </p>
        </div>
        <ContactLink intent="both" location="combined">
          Conversar sobre as duas frentes
        </ContactLink>
      </div>
    </section>
  );
}
