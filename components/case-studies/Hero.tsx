"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const lines = containerRef.current?.querySelectorAll(".hero-animate");
      if (lines && lines.length > 0) {
        gsap.fromTo(
          Array.from(lines),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-white pt-32 pb-16 sm:pt-40 sm:pb-24 px-6 sm:px-12 md:px-16 lg:px-24 border-b border-black/10">
      <div className="max-w-7xl mx-auto">
        <div className="hero-animate">
          <span className="font-haas font-medium text-xs sm:text-sm uppercase tracking-widest text-black/50 mb-4 block">
            ARCHIVE & INSIGHTS
          </span>
          <h1 className="font-being uppercase text-black leading-[0.88] select-none text-[12vw] sm:text-[11vw] md:text-[10vw] lg:text-[9vw] tracking-tight">
            CASE STUDIES
          </h1>
        </div>

        <div className="hero-animate mt-8 sm:mt-12 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-12">
          <p className="font-haas text-black/80 text-lg sm:text-xl md:text-2xl max-w-2xl leading-relaxed">
            Discover how we collaborate with forward-thinking brands to transform creative vision into scalable, high-impact visual campaigns using AI.
          </p>

          <div className="flex items-center gap-8 font-haas text-sm uppercase tracking-wider text-black/60 pt-4 md:pt-0">
            <div>
              <span className="block font-being text-2xl sm:text-3xl text-black">100+</span>
              <span>CAMPAIGNS</span>
            </div>
            <div className="w-[1px] h-8 bg-black/20" />
            <div>
              <span className="block font-being text-2xl sm:text-3xl text-black">65%</span>
              <span>EFFICIENCY</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
