export const needs = [
  "Engenharia",
  "Consultoria",
  "HVAC / Climatização",
  "Planejamento / Gestão de Obras",
  "Sistemas / Tecnologia",
  "Automação de Processos",
  "Outro",
] as const;
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
    errors.name = "Informe seu nome, entre 2 e 100 caracteres.";
  const digits = data.phone.replace(/\D/g, "");
  if (
    !/^[+\d\s().-]+$/.test(data.phone) ||
    digits.length < 10 ||
    digits.length > 15 ||
    data.phone.length > 30
  )
    errors.phone = "Informe seu telefone com DDD.";
  if (!(needs as readonly string[]).includes(data.need))
    errors.need = "Selecione o tipo de necessidade.";
  if (data.message.trim().length < 10 || data.message.length > 2000)
    errors.message = "Descreva o cenário entre 10 e 2.000 caracteres.";
  return errors;
}
export function buildContactMessage(data: ContactData) {
  return `Olá, entrei em contato pelo site da KRONVS.\n\nNome: ${data.name.trim()}\nWhatsApp: ${data.phone.trim()}\nTipo de necessidade: ${data.need}\n\nMensagem:\n${data.message.trim()}`;
}
export function buildWhatsAppUrl(number: string, message: string) {
  const digits = number.replace(/\D/g, "");
  return /^[1-9]\d{9,14}$/.test(digits)
    ? `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
    : null;
}
