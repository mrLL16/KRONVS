import { chromium, expect } from "@playwright/test";

const browser = await chromium.launch();
const errors = [];

try {
  const context = await browser.newContext({ reducedMotion: "no-preference" });
  const page = await context.newPage();
  await page.setViewportSize({ width: 1440, height: 1000 });
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (
      ["error", "warning"].includes(message.type()) &&
      !/preloaded using link preload/i.test(message.text())
    )
      errors.push(message.text());
  });

  await page.goto("http://127.0.0.1:3000", { waitUntil: "networkidle" });
  await expect(page.locator("html")).toHaveAttribute(
    "data-lenis-active",
    "true",
  );
  await expect(page.locator("[data-motion-hero-title]")).toBeVisible();
  const homeLayout = await page.evaluate(() => {
    const hero = document.querySelector(".aura-home section:first-of-type");
    const title = document.querySelector("[data-motion-hero-title]");
    const section = document.querySelector(".aura-home section:nth-of-type(2)");
    return {
      heroHeight: hero?.getBoundingClientRect().height || 0,
      heroTop: hero?.getBoundingClientRect().top || 0,
      heroLeft: hero?.getBoundingClientRect().left || 0,
      heroWidth: hero?.getBoundingClientRect().width || 0,
      titleTop: title?.getBoundingClientRect().top || 0,
      titleLeft: title?.getBoundingClientRect().left || 0,
      titleSize: title
        ? Number.parseFloat(getComputedStyle(title).fontSize)
        : 0,
      sectionWidth: section?.getBoundingClientRect().width || 0,
    };
  });

  await page.mouse.move(1300, 800);
  await page.evaluate(() => window.scrollTo({ top: 900, behavior: "instant" }));
  await expect(page.locator("header")).toHaveClass(/nav-concealed/);
  await page.waitForTimeout(450);

  const collapsedGlass = await page.evaluate(() => {
    const header = document.querySelector(".site-header");
    const inner = document.querySelector(".site-header-inner");
    const brand = document.querySelector(".brand-link");
    return {
      header: header && getComputedStyle(header).backgroundColor,
      inner: inner && getComputedStyle(inner).backgroundColor,
      brand: brand && getComputedStyle(brand).backgroundColor,
    };
  });
  expect(collapsedGlass.header).toBe("rgba(0, 0, 0, 0)");
  expect(collapsedGlass.inner).toBe("rgba(0, 0, 0, 0)");
  expect(collapsedGlass.brand).not.toBe("rgba(0, 0, 0, 0)");

  await page.locator("header").hover();
  await expect(page.locator(".site-nav")).toBeVisible();
  expect(
    await page
      .locator(".site-header-inner")
      .evaluate((element) => getComputedStyle(element).backgroundColor),
  ).not.toBe("rgba(0, 0, 0, 0)");

  await page.goto("http://127.0.0.1:3000/engenharia", {
    waitUntil: "networkidle",
  });
  const internalLayout = await page.evaluate(() => {
    const hero = document.querySelector(".aura-page-hero");
    const title = document.querySelector("[data-motion-hero-title]");
    const section = document.querySelector(".section.container");
    return {
      heroHeight: hero?.getBoundingClientRect().height || 0,
      heroTop: hero?.getBoundingClientRect().top || 0,
      heroLeft: hero?.getBoundingClientRect().left || 0,
      heroWidth: hero?.getBoundingClientRect().width || 0,
      titleTop: title?.getBoundingClientRect().top || 0,
      titleLeft: title?.getBoundingClientRect().left || 0,
      titleSize: title
        ? Number.parseFloat(getComputedStyle(title).fontSize)
        : 0,
      sectionWidth: section?.getBoundingClientRect().width || 0,
    };
  });
  expect(
    Math.abs(homeLayout.heroHeight - internalLayout.heroHeight),
  ).toBeLessThanOrEqual(1);
  expect(Math.abs(homeLayout.heroTop - internalLayout.heroTop)).toBeLessThanOrEqual(1);
  expect(Math.abs(homeLayout.heroLeft - internalLayout.heroLeft)).toBeLessThanOrEqual(1);
  expect(Math.abs(homeLayout.heroWidth - internalLayout.heroWidth)).toBeLessThanOrEqual(1);
  expect(Math.abs(homeLayout.titleLeft - internalLayout.titleLeft)).toBeLessThanOrEqual(1);
  expect(
    Math.abs(homeLayout.titleSize - internalLayout.titleSize),
  ).toBeLessThanOrEqual(1);
  expect(
    Math.abs(homeLayout.sectionWidth - internalLayout.sectionWidth),
  ).toBeLessThanOrEqual(1);
  await page.evaluate(() => window.scrollTo({ top: 900, behavior: "instant" }));
  await expect(page.locator(".service-catalog .pin-spacer")).toHaveCount(1);
  await expect(
    page.locator(".service-catalog-grid .aura-card").first(),
  ).toBeVisible();

  await page.goto("http://127.0.0.1:3000/sistemas", {
    waitUntil: "networkidle",
  });
  await page
    .locator(".showcase-switch")
    .getByRole("button", { name: "Projetos", exact: true })
    .click();
  await expect(
    page.locator('[data-showcase-key="projects"]'),
  ).toHaveAttribute("data-active", "true");
  await expect(
    page.getByRole("heading", { name: "Portfólio em execução" }),
  ).toBeVisible();
  await page.waitForTimeout(850);
  await expect(page.getByText("Levantamento técnico", { exact: true })).toBeVisible();
  await page.locator(".showcase-experience").screenshot({
    path: "artifacts/showcase-projects.png",
  });

  await page.locator('[data-showcase-key="dashboard"]').click();
  await expect(
    page.locator('[data-showcase-key="dashboard"]'),
  ).toHaveAttribute("data-active", "true");
  await expect(
    page.getByRole("heading", { name: "Dashboard operacional" }),
  ).toBeVisible();
  await page.waitForTimeout(850);
  await expect(page.getByText("R$ 428 mil", { exact: true })).toBeVisible();
  await page.locator(".showcase-experience").screenshot({
    path: "artifacts/showcase-dashboard.png",
  });

  const financeScroll = await page
    .locator('[data-showcase-key="finance"]')
    .evaluate(
      (element) => element.getBoundingClientRect().top + window.scrollY - 500,
    );
  await page.evaluate(
    (top) => window.scrollTo({ top, behavior: "instant" }),
    financeScroll,
  );
  await expect(
    page
      .locator(".showcase-switch")
      .getByRole("button", { name: "Financeiro", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(
    page.locator('[data-showcase-key="finance"]'),
  ).toHaveAttribute("data-active", "true");
  await expect(
    page.getByRole("heading", { name: "Controle financeiro" }),
  ).toBeVisible();
  await page.waitForTimeout(850);
  await page.locator(".showcase-experience").screenshot({
    path: "artifacts/showcase-finance.png",
  });

  expect(errors).toEqual([]);
  await context.close();

  const reducedContext = await browser.newContext({ reducedMotion: "reduce" });
  const reducedPage = await reducedContext.newPage();
  await reducedPage.goto("http://127.0.0.1:3000", { waitUntil: "networkidle" });
  await expect(reducedPage.locator("html")).not.toHaveAttribute(
    "data-lenis-active",
    "true",
  );
  await expect(reducedPage.locator("html")).toHaveAttribute(
    "data-motion-reduced",
    "true",
  );
  await expect(reducedPage.locator("html")).toHaveAttribute(
    "data-motion-mode",
    "reduced",
  );
  await expect(reducedPage.locator("h1")).toBeVisible();

  const reducedCard = reducedPage.locator(".aura-card").first();
  await expect(reducedCard).toHaveCSS("opacity", "0");
  await reducedCard.scrollIntoViewIfNeeded();
  await expect(reducedCard).toHaveCSS("opacity", "1");

  await reducedPage.goto("http://127.0.0.1:3000/sistemas", {
    waitUntil: "networkidle",
  });
  await reducedPage
    .locator(".showcase-switch")
    .getByRole("button", { name: "Financeiro", exact: true })
    .click();
  await expect(
    reducedPage.locator('[data-showcase-key="finance"]'),
  ).toHaveAttribute("data-active", "true");
  await expect(
    reducedPage.locator('[data-showcase-key="finance"]'),
  ).toHaveCSS("opacity", "1");
  await expect(
    reducedPage.locator('[data-showcase-key="dashboard"]'),
  ).toHaveCSS("opacity", "0.34");

  await reducedPage
    .locator(".showcase-switch")
    .getByRole("button", { name: "Projetos", exact: true })
    .click();
  await expect(
    reducedPage.locator('[data-showcase-key="projects"]'),
  ).toHaveCSS("opacity", "1");
  await expect(
    reducedPage.locator('[data-showcase-key="finance"]'),
  ).toHaveCSS("opacity", "0.34");

  await reducedPage.goto("http://127.0.0.1:3000/sobre?motion=full", {
    waitUntil: "networkidle",
  });
  await expect(reducedPage.locator("html")).toHaveAttribute(
    "data-motion-mode",
    "full",
  );
  await expect(reducedPage.locator("html")).toHaveAttribute(
    "data-motion-override",
    "full",
  );
  await expect(reducedPage.locator("html")).toHaveAttribute(
    "data-lenis-active",
    "true",
  );
  await reducedContext.close();

  console.log(
    "PASS: Lenis, GSAP hero, liquid-glass header, desktop pin, reduced fades and full-motion review.",
  );
} finally {
  await browser.close();
}
