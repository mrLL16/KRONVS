export function ProjectPreview() {
  return (
    <figure className="project-preview" data-reveal>
      <div className="project-sheet" aria-hidden="true">
        <div className="sheet-heading">
          <span>ESTUDO DE INSTALAÇÕES</span>
          <span>01</span>
        </div>
        <svg viewBox="0 0 520 250" fill="none">
          <g stroke="currentColor" strokeWidth="2">
            <path d="M60 35H460V215H60Z M220 35V115H460 M220 160V215 M60 145H145 M185 145H220" />
            <path
              d="M120 75H175V108H120Z M265 155H325V185H265Z M360 155H420V185H360Z"
              strokeWidth="1"
            />
            <path
              d="M90 195V125H195V65H420 M295 155V135H390V155"
              strokeDasharray="5 5"
              strokeWidth="1"
            />
            <path
              d="M60 20H460 M60 15V25 M460 15V25 M475 35V215 M470 35H480 M470 215H480"
              strokeWidth=".6"
            />
            <path
              d="M145 145V185A40 40 0 0 0 185 145 M220 115H265A45 45 0 0 1 220 160"
              strokeWidth=".8"
            />
          </g>
        </svg>
        <div className="sheet-footer">
          <span>LEVANTAR · PROJETAR · DOCUMENTAR</span>
          <span>ESQUEMA ILUSTRATIVO</span>
        </div>
      </div>
      <figcaption>
        Do levantamento à documentação que orienta a execução.
      </figcaption>
    </figure>
  );
}
