"use client";
import Link from "next/link";
import { useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { company } from "@/data/company";
import {
  buildContactMessage,
  buildWhatsAppUrl,
  needs,
  validateContact,
  type ContactData,
  type ContactErrors,
} from "@/lib/contact";
import { track } from "@/lib/analytics";
const subscribe = () => () => {};
export function ContactForm() {
  const params = useSearchParams();
  const intent = params.get("necessidade");
  return <ContactFormContent key={intent ?? "general"} intent={intent} />;
}
function ContactFormContent({ intent }: { intent: string | null }) {
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const [errors, setErrors] = useState<ContactErrors>({});
  const [feedback, setFeedback] = useState("");
  const [prepared, setPrepared] = useState("");
  const [href, setHref] = useState<string | null>(null);
  const form = useRef<HTMLFormElement>(null);
  const configured = Boolean(buildWhatsAppUrl(company.whatsapp, ""));
  const initialNeed =
    intent === "engineering"
      ? "Engenharia"
      : intent === "systems"
        ? "Sistemas / Tecnologia"
        : intent === "both"
          ? "Outro"
          : "";
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(
      new FormData(event.currentTarget),
    ) as ContactData;
    const validation = validateContact(data);
    setErrors(validation);
    setHref(null);
    setPrepared("");
    if (Object.keys(validation).length) {
      setFeedback("Revise os campos indicados.");
      requestAnimationFrame(() =>
        form.current
          ?.querySelector<HTMLElement>('[aria-invalid="true"]')
          ?.focus(),
      );
      return;
    }
    const message = buildContactMessage(data);
    const url = buildWhatsAppUrl(company.whatsapp, message);
    setPrepared(message);
    setHref(url);
    if (!url) {
      setFeedback(
        "Sua mensagem foi preparada, mas o WhatsApp da KRONVS ainda não está disponível. Nenhum dado foi enviado.",
      );
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
    setFeedback(
      "Mensagem preparada. Revise e confirme o envio no WhatsApp. Se a nova janela não abriu, use o link abaixo.",
    );
    track("click_whatsapp", { source: "contact-form" });
  }
  const input = (
    key: "name" | "phone",
    label: string,
    placeholder: string,
    type = "text",
    autoComplete?: string,
    maxLength = 100,
  ) => (
    <div className="ds-field">
      <label htmlFor={`contact-${key}`}>
        {label}
      </label>
      <input
        id={`contact-${key}`}
        name={key}
        placeholder={placeholder}
        required
        type={type}
        autoComplete={autoComplete}
        maxLength={maxLength}
        aria-invalid={Boolean(errors[key])}
        aria-describedby={errors[key] ? `${key}-error` : undefined}
        onChange={() =>
          setErrors((previous) => ({ ...previous, [key]: undefined }))
        }
      />
      {errors[key] && (
        <span id={`${key}-error`} className="field-error">
          {errors[key]}
        </span>
      )}
    </div>
  );
  return (
    <form
      className="contact-form"
      ref={form}
      noValidate
      onSubmit={submit}
      aria-label="Solicitação de contato"
    >
      {!configured && (
        <p className="availability">
          O canal de WhatsApp está em configuração. Você pode preparar a
          mensagem abaixo; nenhum envio será feito enquanto o canal não estiver
          disponível.
        </p>
      )}
      <div className="form-grid">
        {input("name", "Nome", "Seu nome", "text", "name", 100)}
        {input(
          "phone",
          "WhatsApp com DDD",
          "+55 (00) 00000-0000",
          "tel",
          "tel",
          30,
        )}
      </div>
      <div className="ds-field">
          <label htmlFor="contact-need">Tipo de necessidade</label>
          <select
            id="contact-need"
            name="need"
            required
            defaultValue={initialNeed}
            aria-invalid={Boolean(errors.need)}
            aria-describedby={errors.need ? "need-error" : undefined}
            onChange={() =>
              setErrors((previous) => ({ ...previous, need: undefined }))
            }
          >
            <option value="">Selecione uma opção</option>
            {needs.map((need) => (
              <option key={need}>{need}</option>
            ))}
          </select>
          {errors.need && (
            <span className="field-error" id="need-error">
              {errors.need}
            </span>
          )}
      </div>
      <div className="ds-field">
        <label htmlFor="contact-message">Como podemos ajudar?</label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          maxLength={2000}
          required
          placeholder="Conte brevemente o que você precisa."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          onChange={() =>
            setErrors((previous) => ({ ...previous, message: undefined }))
          }
        />
        {errors.message && (
          <span id="message-error" className="field-error">
            {errors.message}
          </span>
        )}
      </div>
      <noscript>
        Ative o JavaScript para preparar sua mensagem de contato.
      </noscript>
      <button
        className="ds-button submit-button"
        type="submit"
        disabled={!hydrated}
      >
        Enviar solicitação
        <ArrowUpRight size={20} aria-hidden="true" />
      </button>
      <p className="contact-privacy">
        <span>Ao continuar, os dados serão incluídos na mensagem aberta no WhatsApp. O envio à KRONVS só acontece quando você confirmar nesse serviço.</span>
        <Link href="/avisos-legais#privacidade">
          Saiba como os dados são utilizados.
        </Link>
      </p>
      <p role="status" className="form-feedback">
        {feedback}
      </p>
      {href && (
        <a
          className="text-link"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          Abrir WhatsApp para revisar e enviar
          <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      )}
      {prepared && (
        <details className="message-preview">
          <summary>Revisar mensagem preparada</summary>
          <pre>{prepared}</pre>
        </details>
      )}
    </form>
  );
}
