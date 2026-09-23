"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { createLenis } from "@/lib/animations/lenis";
import { getGsap } from "@/lib/animations/gsap";

const revealSelector = [
  ".section > .section-lead",
  ".about-intro > div",
  ".contact-page-grid > *",
  ".legal-content section",
].join(",");

const groupSelector = [
  ".process-grid",
  ".example-grid",
  ".tags",
  "[data-motion-group]",
].join(",");

export function SiteMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const forceFullMotion =
      new URLSearchParams(window.location.search).get("motion") === "full";
    const shouldReduceMotion = reducedMotion.matches && !forceFullMotion;
    const { gsap, ScrollTrigger } = getGsap();
    const root = document.documentElement;
    let lenis: ReturnType<typeof createLenis> | undefined;
    let ticker: ((time: number) => void) | undefined;
    let anchorFrame = 0;

    root.dataset.motionMode = shouldReduceMotion ? "reduced" : "full";
    if (forceFullMotion) root.dataset.motionOverride = "full";

    if (!shouldReduceMotion) {
      lenis = createLenis();
      root.dataset.lenisActive = "true";
      lenis.on("scroll", ScrollTrigger.update);
      ticker = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);
    }

    const cancelAnchorAnimation = () => {
      if (anchorFrame) window.cancelAnimationFrame(anchorFrame);
      anchorFrame = 0;
    };

    const onSmoothAnchorClick = (event: MouseEvent) => {
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) return;

      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>(
        "a[data-smooth-scroll]",
      );
      if (!link || link.pathname !== window.location.pathname || !link.hash) return;
      const target = document.getElementById(decodeURIComponent(link.hash.slice(1)));
      if (!target) return;

      event.preventDefault();
      event.stopPropagation();
      if (lenis) {
        lenis.scrollTo(target, {
          duration: 1.45,
          easing: (progress) => (1 - Math.cos(Math.PI * progress)) / 2,
          onComplete: () => window.history.pushState(null, "", link.hash),
        });
        return;
      }

      // A deliberate anchor click keeps this one transition available even
      // when the rest of the page follows the system's reduced-motion setting.
      cancelAnchorAnimation();
      const start = window.scrollY;
      const scrollPadding = Number.parseFloat(
        getComputedStyle(document.documentElement).scrollPaddingTop,
      ) || 0;
      const scrollMargin = Number.parseFloat(
        getComputedStyle(target).scrollMarginTop,
      ) || 0;
      const destination = Math.max(
        0,
        Math.min(
          target.getBoundingClientRect().top + start - scrollPadding - scrollMargin,
          document.documentElement.scrollHeight - window.innerHeight,
        ),
      );
      let startedAt: number | undefined;
      const advance = (time: number) => {
        startedAt ??= time;
        const progress = Math.min((time - startedAt) / 1450, 1);
        const eased = (1 - Math.cos(Math.PI * progress)) / 2;
        window.scrollTo({ top: start + (destination - start) * eased, behavior: "instant" });
        if (progress < 1) {
          anchorFrame = window.requestAnimationFrame(advance);
        } else {
          anchorFrame = 0;
          window.history.pushState(null, "", link.hash);
        }
      };
      anchorFrame = window.requestAnimationFrame(advance);
    };
    document.addEventListener("click", onSmoothAnchorClick, true);
    if (shouldReduceMotion) {
      window.addEventListener("wheel", cancelAnchorAnimation, { passive: true });
      window.addEventListener("touchstart", cancelAnchorAnimation, { passive: true });
    }

    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add("all", () => {
        if (shouldReduceMotion) return;
        const hero = document.querySelector<HTMLElement>(
          ".aura-home section:first-of-type, .aura-page-hero",
        );

        if (hero) {
          const visual = hero.querySelector<HTMLElement>(
            "[data-motion-hero-visual]",
          );
          const heroTimeline = gsap.timeline({
            defaults: { ease: "power4.out" },
          });
          heroTimeline
            .from(".site-header .brand-link", {
              autoAlpha: 0,
              y: -14,
              duration: 0.55,
            })
            .from(
              hero.querySelectorAll("[data-motion-hero-meta]"),
              { autoAlpha: 0, y: 14, duration: 0.55, stagger: 0.08 },
              "-=0.32",
            )
            .from(
              hero.querySelector("[data-motion-hero-title]"),
              {
                autoAlpha: 0,
                y: 72,
                clipPath: "inset(100% 0 0 0)",
                duration: 1.08,
              },
              "-=0.3",
            )
            .from(
              hero.querySelector("[data-motion-hero-lead]"),
              { autoAlpha: 0, y: 32, duration: 0.82 },
              "-=0.46",
            )
            .from(
              hero.querySelector("[data-motion-hero-actions]"),
              { autoAlpha: 0, y: 28, duration: 0.74 },
              "-=0.48",
            );
          if (visual) {
            heroTimeline.from(
              visual,
              { autoAlpha: 0, scale: 0.92, y: 24, duration: 0.9 },
              "-=0.74",
            );
            gsap.to(visual, {
              yPercent: 8,
              scale: 1.045,
              ease: "none",
              scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "bottom top",
                scrub: 0.7,
              },
            });
          }
        }

        gsap.utils
          .toArray<HTMLElement>(
            ".section, .showcase-section, .author-section, .legal-content",
          )
          .forEach((section) => {
            if (section.matches(".systems-process-section")) return;
            const headings = section.querySelectorAll<HTMLElement>(
              ":scope > h2, :scope > .aura-section-heading h2, :scope > .showcase-intro h2, :scope > div > h2",
            );
            if (!headings.length) return;
            gsap.from(headings, {
              autoAlpha: 0,
              y: 58,
              clipPath: "inset(100% 0 0 0)",
              duration: 1.02,
              stagger: 0.1,
              ease: "power4.out",
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            });
          });

        gsap.utils.toArray<HTMLElement>(revealSelector).forEach((element) => {
          if (element.closest(".aura-page-hero")) return;
          gsap.from(element, {
            autoAlpha: 0,
            y: 42,
            duration: 0.96,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          });
        });

        gsap.utils.toArray<HTMLElement>(groupSelector).forEach((group) => {
          const items = Array.from(group.children) as HTMLElement[];
          if (!items.length) return;
          gsap.from(items, {
            autoAlpha: 0,
            y: 54,
            duration: 0.94,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: group,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          if (
            element.closest(groupSelector) ||
            element.closest(".service-catalog-grid") ||
            element.closest(".aura-page-hero")
          )
            return;
          gsap.from(element, {
            autoAlpha: 0,
            y: 46,
            duration: 0.92,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          });
        });

        gsap.utils
          .toArray<HTMLElement>(".aura-process-line, [data-motion-line]")
          .forEach((line) => {
            gsap.from(line, {
              scaleX: 0,
              transformOrigin: "left center",
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: { trigger: line, start: "top 90%", once: true },
            });
          });

        gsap.utils
          .toArray<HTMLElement>(".project-image, [data-motion-image]")
          .forEach((image) => {
            gsap.fromTo(
              image,
              { scale: 1.08, clipPath: "inset(0 0 100% 0)" },
              {
                scale: 1,
                clipPath: "inset(0 0 0% 0)",
                duration: 1.05,
                ease: "power3.out",
                scrollTrigger: { trigger: image, start: "top 86%" },
              },
            );
          });

        const site = document.querySelector<HTMLElement>(".aura-site");
        if (site) {
          gsap.to(site, {
            "--motion-field-y": "180px",
            ease: "none",
            scrollTrigger: {
              trigger: site,
              start: "top top",
              end: "bottom bottom",
              scrub: 1,
            },
          });
        }

        gsap.utils
          .toArray<HTMLElement>("[data-motion-counter]")
          .forEach((counter) => {
            const target = Number(counter.dataset.target || 0);
            const state = { value: 0 };
            counter.textContent = "0";
            gsap.timeline({
              scrollTrigger: { trigger: counter, start: "top 82%", once: true },
              onUpdate: () => {
                counter.textContent = String(Math.round(state.value));
              },
            })
              .to(state, { value: target, duration: 1.7, ease: "power2.out" });
          });
      });

      media.add(
        "(min-width: 1100px)",
        () => {
          if (shouldReduceMotion) return;
          gsap.utils
            .toArray<HTMLElement>(".service-catalog")
            .forEach((section) => {
              const heading = section.querySelector<HTMLElement>(
                ".aura-section-heading",
              );
              const grid = section.querySelector<HTMLElement>(
                ".service-catalog-grid",
              );
              if (!heading || !grid || grid.children.length < 3) return;
              ScrollTrigger.create({
                trigger: section,
                start: "top top+=132",
                end: "bottom bottom-=120",
                pin: heading,
                pinSpacing: false,
              });

              gsap.utils.toArray<HTMLElement>(grid.children).forEach((card) => {
                gsap.fromTo(
                  card,
                  { autoAlpha: 0.24, y: 84, scale: 0.965 },
                  {
                    autoAlpha: 1,
                    y: 0,
                    scale: 1,
                    ease: "none",
                    scrollTrigger: {
                      trigger: card,
                      start: "top 92%",
                      end: "top 54%",
                      scrub: 0.65,
                    },
                  },
                );
              });
            });

          const productStage =
            document.querySelector<HTMLElement>(".product-stage");
          const showcase =
            document.querySelector<HTMLElement>(".showcase-section");
          if (productStage && showcase) {
            gsap.to(productStage, {
              yPercent: -4,
              scale: 1.012,
              ease: "none",
              scrollTrigger: {
                trigger: showcase,
                start: "top 75%",
                end: "bottom 30%",
                scrub: 0.8,
              },
            });
          }

          gsap.utils
            .toArray<HTMLElement>("[data-showcase-key]")
            .forEach((story) => {
              const select = () =>
                window.dispatchEvent(
                  new CustomEvent("kronvs:showcase-select", {
                    detail: story.dataset.showcaseKey,
                  }),
                );
              ScrollTrigger.create({
                trigger: story,
                start: "top 58%",
                end: "bottom 42%",
                onEnter: select,
                onEnterBack: select,
              });
              gsap.fromTo(
                story,
                { y: 64 },
                {
                  y: 0,
                  ease: "none",
                  scrollTrigger: {
                    trigger: story,
                    start: "top 92%",
                    end: "top 56%",
                    scrub: 0.6,
                  },
                },
              );
            });
        },
      );

      media.add(
        "(max-width: 1099px)",
        () => {
          if (shouldReduceMotion) return;
          gsap.utils
            .toArray<HTMLElement>(".service-catalog-grid")
            .forEach((grid) => {
              gsap.from(grid.children, {
                autoAlpha: 0,
                y: 48,
                duration: 0.86,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: { trigger: grid, start: "top 84%" },
              });
            });
        },
      );

      media.add("all", () => {
        if (!shouldReduceMotion) return;

        root.dataset.motionReduced = "true";
        const hero = document.querySelector<HTMLElement>(
          ".aura-home section:first-of-type, .aura-page-hero",
        );
        const reducedTimeline = gsap.timeline({
          defaults: { duration: 0.48, ease: "power1.out" },
        });

        if (hero) {
          const heroTargets = [
            ...hero.querySelectorAll<HTMLElement>("[data-motion-hero-meta]"),
            hero.querySelector<HTMLElement>("[data-motion-hero-title]"),
            hero.querySelector<HTMLElement>("[data-motion-hero-lead]"),
            hero.querySelector<HTMLElement>("[data-motion-hero-actions]"),
            hero.querySelector<HTMLElement>("[data-motion-hero-visual]"),
          ].filter((element): element is HTMLElement => Boolean(element));

          reducedTimeline.from(heroTargets, {
            opacity: 0,
            duration: 0.52,
            stagger: 0.07,
          });
        }

        const reducedTargets = new Set<HTMLElement>();
        gsap.utils
          .toArray<HTMLElement>(
            [
              ".section > h2",
              ".section > .aura-section-heading",
              ".showcase-intro",
              ".author-section > *",
              revealSelector,
              ".aura-card",
              ".project-card",
              "[data-reveal]",
            ].join(","),
          )
          .forEach((element) => {
            if (!element.closest(".aura-page-hero")) reducedTargets.add(element);
          });

        reducedTargets.forEach((element) => {
          gsap.from(element, {
            opacity: 0,
            duration: 0.5,
            ease: "power1.out",
            scrollTrigger: {
              trigger: element,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          });
        });

        return () => delete root.dataset.motionReduced;
      });

      return () => media.revert();
    });

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 120);

    return () => {
      cancelAnchorAnimation();
      document.removeEventListener("click", onSmoothAnchorClick, true);
      window.removeEventListener("wheel", cancelAnchorAnimation);
      window.removeEventListener("touchstart", cancelAnchorAnimation);
      window.clearTimeout(refresh);
      context.revert();
      if (ticker) gsap.ticker.remove(ticker);
      lenis?.destroy();
      delete root.dataset.lenisActive;
      delete root.dataset.motionMode;
      delete root.dataset.motionOverride;
    };
  }, [pathname]);

  return null;
}
