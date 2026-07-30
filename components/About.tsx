"use client";

import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import CTAButton from "./CTAButton";

interface AboutProps {
  onSelectSection?: (section: "hero" | "about") => void;
}

export interface AboutRefHandle {
  triggerReveal: () => void;
}

const About = forwardRef<AboutRefHandle, AboutProps>(({ onSelectSection }, ref) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const headingContainerRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const bottomRightRef = useRef<HTMLDivElement | null>(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const hasAnimatedRef = useRef(false);

  useImperativeHandle(ref, () => ({
    triggerReveal: () => {
      if (hasAnimatedRef.current) return;
      hasAnimatedRef.current = true;

      // 600ms duration with Slow easing (power2.inOut)
      const tl = gsap.timeline({
        defaults: { duration: 0.6, ease: "power2.inOut" },
      });

      // 1. Animate RAEV STUDIO heading from center to top-left
      if (headingContainerRef.current) {
        tl.to(
          headingContainerRef.current,
          {
            top: "0%",
            left: "0%",
            xPercent: 0,
            yPercent: 0,
            scale: 0.55,
            transformOrigin: "top left",
          },
          0
        );
      }

      // 2. Reveal bottom-right content with right-to-left clip-path reveal concurrently
      if (bottomRightRef.current) {
        tl.to(
          bottomRightRef.current,
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
          },
          0
        );
      }
    },
  }));

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

      {/* RAEV STUDIO Display Text & Top-Left CTA (Initially Centered) */}
      <div
        ref={headingContainerRef}
        className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 sm:p-10 md:p-12 lg:p-16 pointer-events-auto transition-none"
      >
        <h1
          ref={headingRef}
          className="font-being uppercase text-white tracking-[-0.00005em] leading-none text-[12vw] sm:text-[13vw] md:text-[14vw] lg:text-[13vw] select-none whitespace-nowrap drop-shadow-md"
        >
          RAEV STUDIO
        </h1>
      </div>

      {/* Bottom-Right Content Block (Initially Hidden with Right-to-Left Clip Path) */}
      <div
        ref={bottomRightRef}
        className="absolute bottom-8 right-8 sm:bottom-10 sm:right-10 md:bottom-12 md:right-12 lg:bottom-14 lg:right-16 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl text-right z-20 pointer-events-auto opacity-0"
        style={{ clipPath: "inset(0% 0% 0% 100%)" }}
      >
        <h2 className="typo-subheading uppercase text-white mb-2 sm:mb-3 drop-shadow-md">
          WOREM IPSUM DOLOR SIT
        </h2>
        <p className="typo-body font-normal text-white/90 leading-[1.1] text-right drop-shadow-md">
          Forem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Nunc Vulputate Libero
          Et Velit Interdum, Ac Aliquet Odio Mattis. Class Aptent Taciti Sociosqu Ad Litora
          Torquent Per Conubia Nostra, Per Inceptos Himenaeos.
        </p>
      </div>
    </section>
  );
});

About.displayName = "About";

export default About;
