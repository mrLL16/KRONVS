"use client";
import Link from "next/link";
import { useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { company } from "@/data/company";
import { contatoContent } from "@/content";
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
const form_ = contatoContent.form;
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
      ? form_.defaultForEngineering
      : intent === "systems"
        ? form_.defaultForSystems
        : intent === "both"
          ? form_.defaultForBoth
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
      setFeedback(form_.feedbackReview);
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
      setFeedback(form_.feedbackNoChannel);
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
    setFeedback(form_.feedbackPrepared);
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
        <p className="availability">{form_.channelNotice}</p>
      )}
      <div className="form-grid">
        {input("name", form_.nameLabel, form_.namePlaceholder, "text", "name", 100)}
        {input(
          "phone",
          form_.phoneLabel,
          form_.phonePlaceholder,
          "tel",
          "tel",
          30,
        )}
      </div>
      <div className="ds-field">
          <label htmlFor="contact-need">{form_.needLabel}</label>
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
            <option value="">{form_.needPlaceholder}</option>
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
        <label htmlFor="contact-message">{form_.messageLabel}</label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          maxLength={2000}
          required
          placeholder={form_.messagePlaceholder}
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
      <noscript>{form_.noscript}</noscript>
      <button
        className="ds-button submit-button"
        type="submit"
        disabled={!hydrated}
      >
        {form_.submitButton}
        <ArrowUpRight size={20} aria-hidden="true" />
      </button>
      <p className="contact-privacy">
        <span>{form_.privacyText}</span>
        <Link href="/avisos-legais#privacidade">
          {form_.privacyLink}
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
          {form_.whatsappLink}
          <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      )}
      {prepared && (
        <details className="message-preview">
          <summary>{form_.previewSummary}</summary>
          <pre>{prepared}</pre>
        </details>
      )}
    </form>
  );
}
