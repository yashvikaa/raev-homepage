"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import CTAButton from "./CTAButton";

interface HeroCTAProps {
  text?: string;
  href?: string;
}

export default function HeroCTA({ text = "WORK WITH US", href = "#" }: HeroCTAProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.4,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="mt-4 sm:mt-5 md:mt-6 select-none opacity-0">
      <CTAButton text={text} href={href} />
    </div>
  );
}
