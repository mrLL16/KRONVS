"use client";
import { useEffect } from "react";
import { track } from "@/lib/analytics";
export function ServiceObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            track("view_service", {
              service: (entry.target as HTMLElement).dataset.service!,
            });
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.5 },
    );
    document
      .querySelectorAll("[data-service]")
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return null;
}
