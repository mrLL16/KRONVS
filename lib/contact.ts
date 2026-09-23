import { contatoContent } from "@/content";

const form = contatoContent.form;
export const needs: readonly string[] = form.needs;
export type ContactData = {
  name: string;
  phone: string;
  need: string;
  message: string;
};
export type ContactErrors = Partial<Record<keyof ContactData, string>>;
export function validateContact(data: ContactData): ContactErrors {
  const errors: ContactErrors = {};
  if (data.name.trim().length < 2 || data.name.length > 100)
    errors.name = form.errors.name;
  const digits = data.phone.replace(/\D/g, "");
  if (
    !/^[+\d\s().-]+$/.test(data.phone) ||
    digits.length < 10 ||
    digits.length > 15 ||
    data.phone.length > 30
  )
    errors.phone = form.errors.phone;
  if (!needs.includes(data.need)) errors.need = form.errors.need;
  if (data.message.trim().length < 10 || data.message.length > 2000)
    errors.message = form.errors.message;
  return errors;
}
export function buildContactMessage(data: ContactData) {
  const m = form.whatsappMessage;
  return `${m.greeting}\n\n${m.nameLabel}: ${data.name.trim()}\n${m.phoneLabel}: ${data.phone.trim()}\n${m.needLabel}: ${data.need}\n\n${m.messageLabel}:\n${data.message.trim()}`;
}
export function buildWhatsAppUrl(number: string, message: string) {
  const digits = number.replace(/\D/g, "");
  return /^[1-9]\d{9,14}$/.test(digits)
    ? `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
    : null;
}
