"use client";

import {
  type CSSProperties,
  useLayoutEffect,
  useRef,
  useSyncExternalStore,
} from "react";
import gsap from "gsap";
import { sobreContent } from "@/content";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

/* Inline stand-in for @gsap/react's useGSAP: one gsap.context lives for the
   component's lifetime, the callback is re-added when dependencies change,
   and the context is reverted only on unmount. */
function useGSAP(
  callback: () => void | (() => void),
  options?: {
    dependencies?: unknown[];
    scope?: { current: Element | null } | Element | null;
  },
) {
  const deps = options?.dependencies ?? [];
  const scope = options?.scope;
  const ctxRef = useRef<gsap.Context | null>(null);
  const cleanupRef = useRef<(() => void) | undefined>(undefined);

  useLayoutEffect(() => {
    const el =
      scope && typeof scope === "object" && "current" in scope
        ? scope.current
        : (scope as Element | null);
    ctxRef.current = gsap.context(() => {}, el ?? undefined);
    return () => {
      cleanupRef.current?.();
      cleanupRef.current = undefined;
      ctxRef.current?.revert();
      ctxRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    if (!ctxRef.current) return;
    cleanupRef.current?.();
    const ret = ctxRef.current.add(callback);
    cleanupRef.current = typeof ret === "function" ? ret : undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

type JourneyItem = {
  id: string;
  date: string;
  title: string;
  description: string;
  brand?: string;
};

type SplitTextInstance = InstanceType<typeof SplitText>;

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQueryList = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQueryList.addEventListener("change", callback);
  return () => mediaQueryList.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.(REDUCED_MOTION_QUERY)?.matches ?? false;
}

function getServerReducedMotionSnapshot() {
  return false;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getServerReducedMotionSnapshot,
  );
}

// Marcos vêm de content/sobre.json em ordem cronológica: posições pares
// ficam na fileira de cima e ímpares na de baixo.
const allJourneyItems: JourneyItem[] = sobreContent.timeline.milestones.map(
  (milestone, index) => ({ ...milestone, id: `m${index}` }),
);
const topJourneyData = allJourneyItems.filter((_, index) => index % 2 === 0);
const bottomJourneyData = allJourneyItems.filter((_, index) => index % 2 === 1);

export function JourneyTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const wholeSliderRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const textColor = "var(--aura-text)";
  const mutedTextColor = "var(--aura-text-soft)";
  const activeStyle: CSSProperties = { backgroundColor: "var(--aura-mint)" };
  const mutedTextStyle: CSSProperties = { color: mutedTextColor };
  const sectionStyle: CSSProperties = {
    color: textColor,
    backgroundColor: "var(--aura-void)",
  };

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const isMobile = window.innerWidth < 600;
    const slidePercent = isMobile ? -43 : -38;
    // Measured against the actual DOM instead of a guessed percentage: the
    // bottom row's extra left offset (ml-[...], used to stagger it from the
    // top row) makes the last milestone sit further right than a flat "%"
    // of the line's own track would reach, so we read its real position.
    const lineEl = section.querySelector<HTMLElement>(".journey-line");
    const lastItem = allJourneyItems[allJourneyItems.length - 1];
    const lastDot = section.querySelector(`.jd-${lastItem.id}`);
    let lineWidth = isMobile ? "62%" : "100%";
    if (lineEl && lastDot) {
      const lineRect = lineEl.getBoundingClientRect();
      const dotRect = lastDot.getBoundingClientRect();
      const targetWidth = dotRect.left + dotRect.width / 2 - lineRect.left;
      if (targetWidth > 0) {
        lineWidth = `${targetWidth}px`;
      }
    }
    // "bottom" (not a fixed viewport %) keeps this mathematically
    // guaranteed to finish before the sticky section releases, regardless
    // of the viewport's aspect ratio.
    const slideEnd = "92% bottom";

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: slideEnd,
        scrub: true,
      },
      defaults: { ease: "none" },
    });

    tl.fromTo(
      wholeSliderRef.current,
      { xPercent: 0 },
      { xPercent: slidePercent },
    );

    if (reducedMotion) {
      gsap.set(".journey-line", { width: lineWidth });
      return;
    }

    // Driven by the same timeline/ScrollTrigger as the slide (rather than a
    // second independent ScrollTrigger on the same trigger element) so it
    // shares the exact same progress mapping — a separate ScrollTrigger
    // here was observed stuck at progress 1 from the very start.
    tl.fromTo(
      ".journey-line",
      { width: 0 },
      { width: lineWidth, ease: "power2.out" },
      0,
    );
  }, { dependencies: [reducedMotion], scope: sectionRef });

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = allJourneyItems;

    if (reducedMotion) {
      items.forEach((item) => {
        gsap.set(`.jl-${item.id}`, { scaleY: 1 });
        gsap.set(`.jd-${item.id}`, { scale: 1 });
        gsap.set(`.date-${item.id}`, { opacity: 1, clearProps: "transform" });
        gsap.set(`.title-${item.id}`, { opacity: 1, clearProps: "transform" });
        gsap.set(`.description-${item.id}`, { opacity: 1, clearProps: "transform" });
        if (item.brand) gsap.set(`.brand-${item.id}`, { opacity: 1, clearProps: "transform" });
      });
      return;
    }

    items.forEach((item) => {
      gsap.set(`.jl-${item.id}`, { scaleY: 0, transformOrigin: "bottom bottom" });
      gsap.set(`.jd-${item.id}`, { scale: 0 });
      gsap.set(`.date-${item.id}`, { opacity: 0, y: 10 });
      gsap.set(`.title-${item.id}`, { opacity: 1 });
      gsap.set(`.description-${item.id}`, { opacity: 1 });
      if (item.brand) gsap.set(`.brand-${item.id}`, { opacity: 0, y: 10 });
    });

    // Bottom row's connector (line + dot) is sized to each item's own
    // measured content height instead of a single guessed value: content
    // length varies a lot between milestones (a one-line vs. five-line
    // description), so a fixed height either strands the dot far below
    // short entries or buries it inside long ones. The height is capped to
    // the viewport's remaining space (minus a small safety margin): the
    // sticky section wrapper is h-screen with overflow-hidden, so on short
    // wide windows an uncapped height can push the dot past the visible
    // area and clip it out entirely.
    //
    // Driven by a ResizeObserver plus a scroll listener (not a one-shot
    // measurement): the connector's own text can resize (ResizeObserver),
    // and the section's sticky wrapper isn't pinned yet at mount time so
    // its measured top shifts once the user actually scrolls it into its
    // pinned position (scroll listener, see below).
    let bottomConnectorObserver: ResizeObserver | undefined;
    let syncBottomConnectorHeights: (() => void) | undefined;
    const bottomConnectorCleanup: Array<() => void> = [];
    if (window.innerWidth >= 600) {
      const dotMargin = 28;
      const viewportSafety = 16;
      const entries: Array<{ connector: HTMLElement; description: Element }> = [];
      bottomJourneyData.forEach((item) => {
        const connector = section.querySelector<HTMLElement>(`.connector-${item.id}`);
        const description = section.querySelector(`.description-${item.id}`);
        if (connector && description) entries.push({ connector, description });
      });

      const syncConnectorHeights = () => {
        entries.forEach(({ connector, description }) => {
          const connectorTop = connector.getBoundingClientRect().top;
          const contentBottom = description.getBoundingClientRect().bottom;
          const desiredHeight = contentBottom - connectorTop + dotMargin;
          const maxHeight = window.innerHeight - connectorTop - viewportSafety;
          const height = Math.min(desiredHeight, maxHeight);
          if (height > 0) connector.style.height = `${height}px`;
        });
      };

      bottomConnectorObserver = new ResizeObserver(syncConnectorHeights);
      entries.forEach(({ description }) => bottomConnectorObserver!.observe(description));
      syncConnectorHeights();
      syncBottomConnectorHeights = syncConnectorHeights;

      // The section's sticky wrapper isn't "stuck" yet at mount (scrollY is
      // usually 0 there), so connector.getBoundingClientRect().top at this
      // point reflects the section's normal in-flow position, not its
      // pinned one - which is ~100px higher once position:sticky actually
      // engages. Re-measuring on every scroll event keeps the connector
      // height correct once the section pins, instead of freezing it at a
      // stale pre-pin value that never gets revisited. Unthrottled: it's
      // three getBoundingClientRect() reads, cheap enough for a scroll
      // handler, and rAF-based throttling here is unreliable in backgrounded
      // tabs (rAF callbacks can be paused indefinitely while hidden).
      const handleScrollSync = () => syncConnectorHeights();
      window.addEventListener("scroll", handleScrollSync, { passive: true });
      bottomConnectorCleanup.push(() => window.removeEventListener("scroll", handleScrollSync));
    }

    const titleSplits: Partial<Record<string, SplitTextInstance>> = {};
    const descriptionSplits: Partial<Record<string, SplitTextInstance>> = {};

    items.forEach((item) => {
      titleSplits[item.id] = new SplitText(`.title-${item.id}`, {
        type: "chars, words, lines",
        mask: "lines",
      });
      descriptionSplits[item.id] = new SplitText(`.description-${item.id}`, {
        type: "chars, words, lines",
        mask: "lines",
      });
    });

    const duration = 1.2;

    const createItemTimeline = (
      item: JourneyItem,
      startPos: number,
      endPos: number,
    ) => {
      const lineSelector = `.jl-${item.id}`;
      const dotSelector = `.jd-${item.id}`;
      const titleLines = titleSplits[item.id]?.lines || [];
      const descriptionLines = descriptionSplits[item.id]?.lines || [];
      const isTop = topJourneyData.some((topItem) => topItem.id === item.id);

      if (!isTop) {
        gsap.set(lineSelector, { transformOrigin: "top top" });
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          // Both ends anchor to the viewport bottom (not a fixed %) so the
          // pair stays correctly ordered and finishes before the sticky
          // section releases, regardless of the viewport's aspect ratio.
          start: `${startPos}% bottom`,
          end: `${endPos}% bottom`,
          scrub: true,
        },
      });

      // Title/description are the longest-running tweens in this timeline
      // (full `duration`, driving the per-line stagger reveal), so they're
      // added first to anchor the timeline's zero point. The dot/line/date
      // are then aligned to that same start ("<") instead of being
      // sequenced first with a negative `delay` to pull the text back over
      // them: a negative delay on the first children of a root timeline
      // gets its zero point shifted forward by GSAP to avoid negative
      // start times, which silently stranded the dot/line in a short
      // window in the *middle* of the timeline. On scrub, that meant
      // reverse-scrolling made the dot finish hiding well before the text
      // did (dot's window ended while text was still only ~40% hidden) -
      // exactly the "circle disappears before the text" bug reported.
      // Anchoring both to the same start keeps them reaching fully-hidden
      // together on reverse scroll.
      timeline
        .fromTo(
          titleLines,
          { y: 100 },
          { y: 0, duration, stagger: 0.02, ease: "power2.out" },
        )
        .fromTo(
          descriptionLines,
          { y: 100 },
          { y: 0, duration, stagger: 0.02, ease: "power2.out" },
          "<",
        )
        .to(lineSelector, { scaleY: 1, duration: duration * 0.4 }, "<")
        .to(dotSelector, { scale: 1, duration: duration * 0.4 }, "<")
        .to(`.date-${item.id}`, { opacity: 1, y: 0, duration: duration * 0.4 }, "<");

      if (item.brand) {
        timeline.to(
          `.brand-${item.id}`,
          { opacity: 1, y: 0, duration: duration * 0.8, ease: "power2.out" },
          "<+=0.25",
        );
      }

      return timeline;
    };

    const isMobile = window.innerWidth < 600;
    // Mobile's windows start close to when the slide actually scrolls each
    // item into view (roughly index/5 of the 0-92% slide range) instead of
    // an evenly-spaced-by-index schedule, so text isn't still hidden for a
    // stretch after its box has already arrived on screen.
    const positions: ReadonlyArray<readonly [number, number]> = isMobile
      ? [
          [0, 13],
          [15, 28],
          [32, 45],
          [49, 62],
          [66, 79],
          [83, 92],
        ]
      : [
          [6, 26],
          [19, 39],
          [32, 52],
          [45, 65],
          [58, 78],
          [71, 91],
        ];

    items.forEach((item, index) => {
      const [startPos, endPos] = positions[index];
      createItemTimeline(item, startPos, endPos);
    });

    const handleResize = () => {
      syncBottomConnectorHeights?.();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      Object.values(titleSplits).forEach((split) => split?.revert?.());
      Object.values(descriptionSplits).forEach((split) => split?.revert?.());
      window.removeEventListener("resize", handleResize);
      bottomConnectorObserver?.disconnect();
      bottomConnectorCleanup.forEach((fn) => fn());
    };
  }, { dependencies: [reducedMotion], scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="trajetoria"
      className="h-[220vw] max-[600px]:h-[380vh] w-full relative"
      style={sectionStyle}
    >
      <div className="h-screen w-screen sticky top-[0%] pt-[min(10%,8vh)] overflow-hidden max-[600px]:top-[5%] max-[600px]:pt-[10%]">
        <div
          ref={wholeSliderRef}
          className="mr-[2vw] flex h-[clamp(420px,48vw,1060px)] w-[clamp(1300px,140vw,1680px)] items-center gap-[5vw] px-[5vw] max-[600px]:h-[clamp(480px,66vh,560px)] max-[600px]:w-[520vw] max-[600px]:px-[7vw]"
        >
          <div className="relative h-full w-full">
            <div className="w-full absolute left-0 top-1/2 -translate-y-1/2 flex items-center h-fit">
              <div className="h-[.8vw] max-[600px]:h-[2vw] max-[600px]:w-[2vw] w-[.8vw] rounded-full" style={activeStyle} />
              <div className="h-px w-[0%] shrink-0 rounded-full journey-line" style={activeStyle} />
              <div className="h-[.8vw] max-[600px]:h-[2vw] max-[600px]:w-[2vw] w-[.8vw] rounded-full" style={activeStyle} />
            </div>

            <div className="flex h-1/2 w-full items-center justify-start gap-[.5vw]">
              <div className="h-full w-[clamp(240px,22vw,340px)] shrink-0 pt-[2vw] max-[600px]:h-fit max-[600px]:w-[36vw] max-[600px]:pt-[5vw]">
                <h2 className="w-full break-normal text-[2.5vw] leading-[1.05] max-[600px]:text-[8.5vw]" style={{ color: textColor }}>
                  {sobreContent.timeline.title}
                </h2>
              </div>

              <div className="flex-1 flex h-full gap-x-[clamp(110px,14vw,190px)] max-[600px]:gap-x-[34vw]">
                {topJourneyData.map((item) => (
                  <div key={`top-${item.id}`} className="relative h-full w-[clamp(230px,22vw,320px)] px-[clamp(12px,2vw,24px)] max-[600px]:flex max-[600px]:w-[62vw] max-[600px]:flex-col max-[600px]:px-[7vw]">
                    <div className="absolute inset-0 flex flex-col items-start">
                      <div className={`size-[1vw] max-[600px]:size-[2.5vw] translate-x-[-50%] relative shrink-0 aspect-square rounded-full jd-${item.id}`} style={activeStyle} />
                      <div className={`w-px flex-1 origin-bottom rounded-full jl-${item.id}`} style={activeStyle} />
                    </div>

                    <div className="mt-[-1vw] space-y-[.6vw] max-[600px]:mt-[-2vw]">
                      <p className={`date-${item.id} text-[0.85vw] leading-none tracking-[0.08em] max-[600px]:text-[2.6vw]`} style={mutedTextStyle}>
                        {item.date}
                      </p>
                      <h4 className={`title-${item.id} text-[1.7vw] leading-tight font-normal max-[600px]:text-[4.4vw]`} style={{ color: textColor }}>
                        {item.title}
                      </h4>
                      <p className={`description-${item.id} w-[90%] text-[1.05vw] leading-[1.3] max-[600px]:w-[90%] max-[600px]:text-[3.3vw]`} style={mutedTextStyle}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-1/2 flex items-center justify-start w-full">
              <div className="w-[clamp(220px,20vw,320px)] shrink-0 pt-[2vw] max-[600px]:pt-[5vw] max-[600px]:w-[36vw] h-full">
                <p className="text-[1.1vw] leading-none max-[600px]:text-[4.2vw]" style={mutedTextStyle}>
                  {sobreContent.timeline.rangeLabel}
                </p>
              </div>

              <div className="flex-1 flex h-full gap-x-[clamp(120px,15vw,200px)] ml-[clamp(200px,18vw,280px)] max-[600px]:gap-x-[34vw] max-[600px]:ml-[7vw]">
                {bottomJourneyData.map((item) => (
                  <div key={`bottom-${item.id}`} className="relative h-full w-[clamp(230px,20vw,320px)] px-[clamp(12px,2vw,24px)] max-[600px]:w-[62vw] max-[600px]:px-[7vw]">
                    <div className={`connector-${item.id} absolute left-0 top-0 h-[clamp(260px,30vw,340px)] flex flex-col items-start max-[600px]:inset-0 max-[600px]:h-auto`}>
                      <div className={`w-px flex-1 origin-top rounded-full jl-${item.id}`} style={activeStyle} />
                      <div className={`size-[1vw] max-[600px]:size-[2.5vw] translate-x-[-50%] relative shrink-0 w-auto aspect-square rounded-full jd-${item.id}`} style={activeStyle} />
                    </div>

                    <div className="flex w-full flex-col pt-[1.5vw] space-y-[.6vw] max-[600px]:h-full max-[600px]:justify-center max-[600px]:pt-0">
                      <p className={`date-${item.id} text-[0.85vw] leading-none tracking-[0.08em] max-[600px]:text-[2.6vw]`} style={mutedTextStyle}>
                        {item.date}
                      </p>
                      <h4 className={`title-${item.id} text-[1.7vw] leading-tight font-normal max-[600px]:text-[4.4vw]`} style={{ color: textColor }}>
                        {item.title}
                      </h4>
                      {item.brand ? (
                        <p
                          className={`brand-${item.id} text-[1vw] font-semibold tracking-[0.02em] max-[600px]:text-[3vw]`}
                          style={{ color: textColor }}
                        >
                          {item.brand}
                        </p>
                      ) : null}
                      <p className={`description-${item.id} w-[92%] text-[1.05vw] leading-[1.3] max-[600px]:w-[92%] max-[600px]:text-[3.3vw]`} style={mutedTextStyle}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
