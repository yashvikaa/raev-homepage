"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

interface AboutProps {
  onSelectSection?: (section: "hero" | "about") => void;
}

export default function About({ onSelectSection }: AboutProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLHeadingElement | null>(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      if (bgRef.current) {
        gsap.fromTo(
          bgRef.current,
          { opacity: 0, scale: 1.05 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power2.out",
          }
        );
      }

      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            delay: 0.25,
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100vh] h-[100svh] overflow-hidden select-none flex items-center justify-center"
    >
      {/* Background Image Container with smooth fade-in */}
      <div
        ref={bgRef}
        className={`absolute inset-0 z-0 w-full h-full transition-opacity duration-1000 ease-out ${
          imgLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src="/images/about-bg.png"
          alt="About Us Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          onLoad={() => setImgLoaded(true)}
        />
      </div>

      {/* Centered RAEV STUDIO Display Text */}
      <div className="relative z-10 text-center px-4 pointer-events-none">
        <h1
          ref={textRef}
          className="font-being font uppercase text-white tracking-[-0.00005em] leading-none text-[12vw] sm:text-[13vw] md:text-[14vw] lg:text-[13vw] select-none whitespace-nowrap drop-shadow-md"
        >
          RAEV STUDIO
        </h1>
      </div>
    </section>
  );
}
