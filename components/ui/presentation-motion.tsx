"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Progressive enhancement: content is always visible without JS or animation support.
export function PresentationMotion() {
  const pathname = usePathname();
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    const revealOrder = new WeakMap<Element, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          if (preference.matches) continue;
          const order = revealOrder.get(entry.target) ?? 0;
          const animation = entry.target.animate(
            [
              {
                opacity: 0,
                transform: "translateY(38px) scale(.985)",
                filter: "blur(5px)",
              },
              {
                opacity: 1,
                transform: "translateY(0) scale(1)",
                filter: "blur(0)",
              },
            ],
            {
              duration: 900,
              delay: order * 85,
              easing: "cubic-bezier(.16,1,.3,1)",
              fill: "both",
            },
          );
          animations.add(animation);
          animation.finished
            .then(() => {
              animation.commitStyles();
              animation.cancel();
              animations.delete(animation);
            })
            .catch(() => animations.delete(animation));
        }
      },
      { threshold: 0.08 },
    );
    document
      .querySelectorAll(
        ".hero-eyebrow, .hero h1, .hero-business-intro, .hero-paths>a, .section-index, .section h2, .section > p, .business-service, .practice-scopes article, .combined-practice, .steps article, .contact-form, .legal-content section, .aura-site .aura-card, [data-reveal]",
      )
      .forEach((element, index) => {
        revealOrder.set(element, index % 4);
        observer.observe(element);
      });
    const stop = () => {
      if (preference.matches)
        animations.forEach((animation) => animation.cancel());
    };
    preference.addEventListener("change", stop);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", stop);
      animations.forEach((animation) => animation.cancel());
    };
  }, [pathname]);
  return null;
}
