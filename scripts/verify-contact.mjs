import { chromium, expect } from "@playwright/test";
import { writeFile } from "node:fs/promises";
const browser = await chromium.launch();
const context = await browser.newContext();
await context.addInitScript(() => {
  window.open = (url) => {
    window.__whatsappUrl = url;
    return null;
  };
});
const page = await context.newPage();
try {
  await page.goto("http://127.0.0.1:3000/contato");
  const desktopLayout = await page.evaluate(() => ({
    viewport: window.innerHeight,
    page: document.documentElement.scrollHeight,
    formBottom: document.querySelector(".contact-form")?.getBoundingClientRect().bottom,
  }));
  expect(desktopLayout.page).toBeLessThanOrEqual(desktopLayout.viewport + 1);
  expect(desktopLayout.formBottom).toBeLessThanOrEqual(desktopLayout.viewport);
  const alignment = await page.evaluate(() => {
    const bounds = (selector) => document.querySelector(selector).getBoundingClientRect();
    const center = (rect) => [rect.left + rect.width / 2, rect.top + rect.height / 2];
    return {
      node: center(bounds(".aura-focus-node")),
      pulse: center(bounds(".aura-focus-ring")),
      inputHeight: bounds("#contact-name").height,
      selectHeight: bounds("#contact-need").height,
      privacyRight: bounds(".contact-privacy").right,
      linkRight: bounds(".contact-privacy a").right,
    };
  });
  expect(Math.abs(alignment.node[0] - alignment.pulse[0])).toBeLessThan(2);
  expect(Math.abs(alignment.node[1] - alignment.pulse[1])).toBeLessThan(2);
  expect(alignment.selectHeight).toBe(alignment.inputHeight);
  expect(alignment.privacyRight - alignment.linkRight).toBeLessThan(2);
  const privacy = page.locator(".contact-privacy");
  expect(await privacy.evaluate((element) => element.previousElementSibling?.classList.contains("submit-button"))).toBe(true);
  expect(await privacy.evaluate((element) => getComputedStyle(element).maxWidth)).toBe("none");
  const signal = page.getByRole("button", { name: "Conhecer o contato da KRONVS" });
  await signal.hover();
  await expect(signal).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByText("Vamos entender o seu projeto")).toBeVisible();
  await page.mouse.move(10, 400);
  await expect(signal).toHaveAttribute("aria-expanded", "false");
  await page
    .getByRole("button", { name: "Enviar solicitação", exact: true })
    .click();
  await expect(page.locator("#contact-name")).toBeFocused();
  await expect(page.locator("#contact-phone")).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  expect(await page.evaluate(() => window.__whatsappUrl)).toBeUndefined();
  for (const [key, value] of Object.entries({
    name: "Teste de validação",
    phone: "11966042263",
    message:
      "Precisamos organizar aprovação & histórico.\nIntegração: dados + processos?",
  }))
    await page.locator("#contact-" + key).fill(value);
  await page.locator("#contact-need").selectOption("Sistemas / Tecnologia");
  await page
    .getByRole("button", { name: "Enviar solicitação", exact: true })
    .click();
  await expect(page.getByRole("status")).toContainText("Mensagem preparada");
  const captured = await page.evaluate(() => window.__whatsappUrl);
  const url = new URL(captured);
  expect(url.origin + url.pathname).toBe("https://wa.me/5511966042263");
  const message = url.searchParams.get("text");
  expect(message).toContain("WhatsApp: 11966042263");
  expect(message).toContain(
    "aprovação & histórico.\nIntegração: dados + processos?",
  );
  expect(message).toContain("Tipo de necessidade: Sistemas / Tecnologia");
  expect(url.searchParams.size).toBe(1);
  await expect(
    page.getByRole("link", { name: "Abrir WhatsApp para revisar e enviar" }),
  ).toHaveAttribute("href", captured);
  for (const [intent, need] of [
    ["engineering", "Engenharia"],
    ["systems", "Sistemas / Tecnologia"],
    ["both", "Outro"],
  ]) {
    await page.goto("http://127.0.0.1:3000/contato?necessidade=" + intent);
    await expect(page.locator("#contact-need")).toHaveValue(need);
  }
  const nojs = await browser.newContext({ javaScriptEnabled: false });
  const plain = await nojs.newPage();
  await plain.goto("http://127.0.0.1:3000/contato");
  expect(await plain.locator("noscript").textContent()).toBe(
    "Ative o JavaScript para preparar sua mensagem de contato.",
  );
  await expect(plain.locator("form.contact-form")).toHaveCount(1);
  await expect(plain.locator("button.submit-button")).toBeDisabled();
  await writeFile(
    "artifacts/contact-verification.json",
    JSON.stringify(
      {
        validation: "passed",
        number: "5511966042263",
        encoding: "accents, ampersands, line breaks and plus signs preserved",
        fields: "name, WhatsApp, need and message",
        desktopLayout: "form fits without page scroll at 1280 x 720",
        intent: "three entry points passed",
        nojs: "clear JavaScript notice; no form submission",
        delivery: "window.open intercepted; no external message sent",
      },
      null,
      2,
    ),
  );
  console.log(
    "PASS: validation, WhatsApp destination/encoding, intents, no-JS safeguard. No message sent.",
  );
} finally {
  await browser.close();
}
