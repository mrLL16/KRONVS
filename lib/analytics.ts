export type AnalyticsEvent =
  | "click_primary_cta"
  | "click_whatsapp"
  | "click_engineering"
  | "click_combined"
  | "click_custom_system"
  | "submit_contact"
  | "view_service";
type Adapter = (
  event: AnalyticsEvent,
  properties: Record<string, string>,
) => void;
let adapter: Adapter | undefined;
// A integração deve ser explicitamente instalada, conforme a política de privacidade.
export function configureAnalytics(next: Adapter) {
  adapter = next;
}
export function track(
  event: AnalyticsEvent,
  properties: Record<string, string> = {},
) {
  try {
    adapter?.(event, properties);
  } catch {
    /* Analytics nunca bloqueia a navegação. */
  }
}
