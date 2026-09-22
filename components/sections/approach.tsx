import { SectionIndex } from "@/components/technical/section-index";
export function Approach() {
  return (
    <section
      className="section container approach"
      aria-labelledby="approach-title"
    >
      <SectionIndex number="02">ABORDAGEM</SectionIndex>
      <div className="offset-content">
        <h2 id="approach-title">
          Você conta o problema.
          <br />
          <span className="muted">Nós definimos a entrega.</span>
        </h2>
        <div className="approach-body">
          <span className="approach-mark mono" aria-hidden="true">
            [ A → B ]
          </span>
          <div>
            <p>
              Na primeira conversa, entendemos o que você precisa fazer, o que
              já existe e quais dificuldades estão no caminho.
            </p>
            <p>
              A partir disso, delimitamos o serviço, os documentos ou
              funcionalidades a entregar e as etapas do trabalho. Assim, você
              sabe o que está contratando antes de começar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
