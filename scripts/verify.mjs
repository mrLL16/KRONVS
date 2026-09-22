import { chromium, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
const browser = await chromium.launch();
const context = await browser.newContext({ reducedMotion: "reduce" });
const page = await context.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
  if (
    m.type() === "warning" &&
    /hydration|hydrated|didn't match/i.test(m.text())
  )
    errors.push(m.text());
});
const routes = [
  "/",
  "/engenharia",
  "/sistemas",
  "/sobre",
  "/contato",
  "/avisos-legais",
];
const results = [];
const widths = [320, 390, 768, 1024, 1386, 1440];
await mkdir("artifacts", { recursive: true });
try {
  for (const path of routes) {
    for (const width of widths) {
      await page.setViewportSize({ width, height: 1000 });
      const response = await page.goto("http://127.0.0.1:3000" + path, {
        waitUntil: "networkidle",
      });
      expect(response.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("main")).toHaveCount(1);
      await expect(page.locator("body > header.site-header")).toHaveCount(1);
      await expect(page.locator("body > footer.footer")).toHaveCount(1);
      expect(
        await page.locator("body > footer.footer").innerText(),
      ).not.toMatch(/69\.112\.536|CNPJ/);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width);
      if (width === 1440 || width === 390 || (width === 1386 && path === "/")) {
        const axe = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze();
        results.push({
          path,
          width,
          title: await page.title(),
          violations: axe.violations.map((v) => ({
            id: v.id,
            nodes: v.nodes.map((n) => n.target),
          })),
        });
        await page.screenshot({
          path: `artifacts/${path.slice(1) || "home"}-${width}.png`,
          fullPage: true,
        });
      }
    }
  }
  await page.goto("http://127.0.0.1:3000");
  await expect(page.getByText("01 — 03", { exact: true })).toBeVisible();
  await expect(page.getByText("01 — 05", { exact: true })).toHaveCount(0);
  await expect(
    page
      .getByRole("link", { name: "Falar com a KRONVS", exact: true })
      .locator("svg"),
  ).toHaveCount(1);
  const heroSpacing = await page.evaluate(() => {
    const title = document.querySelector("main h1");
    const lead = title?.nextElementSibling;
    const actions = lead?.nextElementSibling;
    if (!title || !lead || !actions) return null;
    return {
      titleToLead:
        lead.getBoundingClientRect().top - title.getBoundingClientRect().bottom,
      leadToActions:
        actions.getBoundingClientRect().top -
        lead.getBoundingClientRect().bottom,
    };
  });
  expect(heroSpacing?.titleToLead).toBeGreaterThanOrEqual(48);
  expect(heroSpacing?.leadToActions).toBeGreaterThanOrEqual(40);
  expect(
    await page.locator("section#top").evaluate((element) => {
      const style = getComputedStyle(element);
      return [style.borderTopWidth, style.borderRightWidth, style.borderRadius];
    }),
  ).toEqual(["0px", "0px", "0px"]);
  await page.goto("http://127.0.0.1:3000");
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(120);
  await page.mouse.move(1300, 800);
  await page.evaluate(() => window.scrollTo({ top: 900, behavior: "instant" }));
  await expect(page.locator("header")).toHaveClass(/nav-concealed/);
  await expect(page.locator(".site-nav")).toBeHidden();
  await page.mouse.move(700, 40);
  await expect(page.locator(".site-nav")).toBeVisible();
  await page.mouse.move(1300, 800);
  await expect(page.locator(".site-nav")).toBeHidden();
  await page.evaluate(() => window.scrollTo({ top: 650, behavior: "instant" }));
  await expect(page.locator(".site-nav")).toBeVisible();
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.getByRole("button", { name: "Soluções", exact: true }).hover();
  await expect(
    page.getByRole("link", { name: /^Engenharia Projetos/ }),
  ).toBeVisible();
  await page.evaluate(() => (window.__navigationTest = "preserved"));
  await page.getByRole("link", { name: /^Engenharia Projetos/ }).click();
  await expect(page).toHaveURL(/\/engenharia$/);
  expect(await page.evaluate(() => window.__navigationTest)).toBe("preserved");
  await page
    .getByRole("button", { name: "Assistente KRONVS", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.locator("#chat-input")).toBeDisabled();
  const chatAxe = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();
  expect(chatAxe.violations).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(
    page.getByRole("button", { name: "Assistente KRONVS", exact: true }),
  ).toBeFocused();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator(".mobile-menu-trigger").click();
  await page.getByRole("button", { name: "Soluções", exact: true }).click();
  await page.getByRole("link", { name: /^Sistemas Tecnologia/ }).click();
  await expect(page).toHaveURL(/\/sistemas$/);
  await expect(page.locator(".mobile-menu-trigger")).toHaveAttribute(
    "aria-expanded",
    "false",
  );
  await page
    .locator(".showcase-switch")
    .getByRole("button", { name: "Financeiro", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Controle financeiro", exact: true }),
  ).toBeVisible();
  await page.locator(".mobile-menu-trigger").click();
  await page.keyboard.press("Escape");
  await expect(page.locator(".mobile-menu-trigger")).toHaveAttribute(
    "aria-expanded",
    "false",
  );
  await page.goto("http://127.0.0.1:3000/privacidade");
  await expect(page).toHaveURL(/avisos-legais#privacidade$/);
  expect(errors).toEqual([]);
  expect(results.flatMap((r) => r.violations)).toEqual([]);
  await writeFile(
    "artifacts/verification.json",
    JSON.stringify(
      {
        results,
        errors,
        header: "scroll down/up/hover passed",
        navigation: "SPA and mobile passed",
        chat: "dialog, Escape, focus and axe passed",
      },
      null,
      2,
    ),
  );
  console.log(
    `PASS: ${routes.length} routes × ${widths.length} widths, axe, header, navigation, chat, showcase, console.`,
  );
} finally {
  await browser.close();
}
