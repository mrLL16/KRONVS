import { ArrowDownRight } from "lucide-react";
import { SectionIndex } from "@/components/technical/section-index";
import { services } from "@/data/services";
export function Solutions() {
  return (
    <section
      id="solucoes"
      className="section container"
      aria-labelledby="solutions-title"
    >
      <SectionIndex number="01">O QUE ENTREGAMOS</SectionIndex>
      <div className="section-heading">
        <h2 id="solutions-title">
          O que você precisa resolver?
          <br />
          <span className="muted">Veja como podemos ajudar.</span>
        </h2>
        <p>
          De um projeto técnico a um sistema de gestão: cada serviço tem uma
          entrega definida e pode ser contratado separadamente.
        </p>
      </div>
      <div className="business-services">
        {services.map((service) => (
          <article
            key={service.id}
            data-service={service.id}
            className={`business-service ${service.id === "engenharia" ? "inverse" : ""}`}
          >
            <span className="business-kicker">
              {service.id === "engenharia"
                ? "DO ESTUDO À EXECUÇÃO"
                : "DA IDEIA AO SISTEMA"}
            </span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <div className="service-delivery">
              <h4>O que você recebe</h4>
              <p>{service.delivery}</p>
            </div>
            <ul>
              {service.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <a className="business-explore" href={`#${service.id}`}>
              Conhecer {service.id === "engenharia" ? "engenharia" : "sistemas"}
              <ArrowDownRight size={20} aria-hidden="true" />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
