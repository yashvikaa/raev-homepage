"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface HeroCTAProps {
  text?: string;
  href?: string;
}

export default function HeroCTA({ text = "→ WORK WITH US", href = "#" }: HeroCTAProps) {
  const ctaRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (!ctaRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.4,
        }
      );
    }, ctaRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="mt-4 sm:mt-5 md:mt-6 select-none">
      <a
        ref={ctaRef}
        href={href}
        className="inline-flex items-center text-base sm:text-lg md:text-xl lg:text-2xl font-extrabold tracking-wider text-[#222222] hover:text-black uppercase underline underline-offset-6 cursor-pointer transition-all duration-200 group font-helvetica"
      >
        <span className="group-hover:translate-x-1.5 transition-transform duration-200 inline-block">
          {text}
        </span>
      </a>
    </div>
  );
}
