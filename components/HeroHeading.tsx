"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroHeading() {
  const containerRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const lines = containerRef.current?.querySelectorAll(".heading-line");
      if (lines && lines.length > 0) {
        gsap.fromTo(
          lines,
          { y: "100%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            delay: 0.05,
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <h1
      ref={containerRef}
      className="font-being font uppercase text-black select-none whitespace-nowrap"
    >
      <span className="block overflow-hidden pb-0.5">
        <span className="block heading-line text-[14vw] sm:text-[13.5vw] md:text-[13.5vw] lg:text-[13.5vw] leading-[0.92] tracking-[-0.000000005em]">
          ONE CAMPAIGN.
        </span>
      </span>
      <span className="block overflow-hidden pt-0.5">
        <span className="block heading-line text-[7.2vw] sm:text-[7.6vw] md:text-[8vw] lg:text-[7.6vw] leading-[0.92] tracking-[-0.0005em] mt-1.5 sm:mt-2">
          HUNDREDS OF POSSIBILITIES.
        </span>
      </span>
    </h1>
  );
}
