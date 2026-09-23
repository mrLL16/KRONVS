"use client";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { globalContent } from "@/content";
import { MessageCircle, X, ArrowUpRight } from "lucide-react";
const chat = globalContent.chat;

export type ChatMessage = { role: "user" | "assistant"; content: string };
export type ChatTransport = (
  messages: ChatMessage[],
  signal: AbortSignal,
) => Promise<string>;
// Conectar futuramente a um endpoint servidor. Credenciais nunca pertencem ao cliente.
export function AIChatButton({ transport }: { transport?: ChatTransport }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const request = useRef<AbortController | null>(null);
  useEffect(() => {
    if (!open) return;
    const element = dialog.current;
    if (!element) return;
    const button = trigger.current;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element.showModal();
    return () => {
      element.close();
      document.body.style.overflow = overflow;
      request.current?.abort();
      button?.focus();
    };
  }, [open]);
  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!transport || busy) return;
    const form = event.currentTarget;
    const content = String(new FormData(form).get("message") || "").trim();
    if (!content) return;
    const next: ChatMessage[] = [...messages, { role: "user", content }];
    setMessages(next);
    setBusy(true);
    setError("");
    form.reset();
    request.current = new AbortController();
    try {
      const answer = await transport(next, request.current.signal);
      setMessages([...next, { role: "assistant", content: answer }]);
    } catch {
      if (!request.current.signal.aborted)
        setError(chat.errorMessage);
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <button
        ref={trigger}
        className="chat-trigger"
        type="button"
        title="Assistente KRONVS"
        aria-label="Assistente KRONVS"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        <MessageCircle size={21} strokeWidth={1.5} aria-hidden="true" />
      </button>
      <dialog
        ref={dialog}
        className="chat-dialog"
        aria-labelledby="chat-title"
        onCancel={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}
      >
        <div className="chat-panel">
          <div className="chat-heading">
            <div>
              <span className="business-kicker">{chat.kicker}</span>
              <h2 id="chat-title">{chat.title}</h2>
            </div>
            <button
              autoFocus
              type="button"
              className="icon-control"
              aria-label="Fechar assistente"
              onClick={() => setOpen(false)}
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>
          <div className="chat-conversation" role="log" aria-live="polite">
            {!transport && (
              <>
                <p>{chat.inactiveNotice}</p>
                <div className="chat-shortcuts">
                  {chat.shortcuts.map(({ href, label }) => (
                    <Link key={href} href={href} onClick={() => setOpen(false)}>
                      {label}
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </>
            )}
            {messages.map((message, i) => (
              <p className={`chat-message ${message.role}`} key={i}>
                <strong>
                  {message.role === "user" ? chat.userLabel : chat.assistantLabel}
                </strong>
                {message.content}
              </p>
            ))}
          </div>
          <form onSubmit={send}>
            <label htmlFor="chat-input">{chat.inputLabel}</label>
            <textarea
              id="chat-input"
              name="message"
              rows={2}
              maxLength={2000}
              disabled={!transport || busy}
              placeholder={
                transport ? chat.placeholderActive : chat.placeholderInactive
              }
            />
            <button
              className="ds-button"
              type="submit"
              disabled={!transport || busy}
            >
              {busy ? chat.waitingButton : chat.sendButton}
            </button>
            <p role="status">{error}</p>
          </form>
        </div>
      </dialog>
    </>
  );
}
