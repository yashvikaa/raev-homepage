"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Image stacks up from below without opacity fade (loading animation)
      tl.fromTo(
        imageRef.current,
        { y: "100%" },
        {
          y: "0%",
          duration: 1.3,
          ease: "power4.out",
        }
      );

      // Text spans slide up from below without opacity fade (loading animation)
      const innerSpans = textRef.current?.querySelectorAll(".text-line");
      if (innerSpans && innerSpans.length > 0) {
        tl.fromTo(
          Array.from(innerSpans),
          { y: "120%" },
          {
            y: "0%",
            duration: 1.0,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.9"
        );
      }

      // Scroll animation timeline across extended hero section
      const bodyTexts = textRef.current?.querySelectorAll(".body-text");

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // 1. Phase 1 (0 -> 0.4): Image moves up fully (-100%) and headings change color from white to black while pinned
      scrollTl.to(
        imageRef.current,
        {
          y: "-100%",
          ease: "none",
          duration: 0.4,
        },
        0
      );

      if (innerSpans && innerSpans.length > 0) {
        scrollTl.to(
          Array.from(innerSpans),
          {
            color: "#000000",
            ease: "none",
            duration: 0.4,
          },
          0
        );
      }

      // 2. Phase 2 (0.4 -> 0.8): Body text animates left-to-right until 100% complete while pinned
      if (bodyTexts && bodyTexts.length > 0) {
        scrollTl.to(
          Array.from(bodyTexts),
          {
            opacity: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            stagger: 0.15,
            ease: "power2.out",
            duration: 0.4,
          },
          0.4
        );
      }

      // 3. Hold state (0.8 -> 1.0): Body text is fully animated; page scroll-down away from hero happens only after this
      scrollTl.to({}, { duration: 0.2 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[350vh] bg-white"
    >
      <div className="sticky top-0 w-full h-[100dvh] overflow-hidden flex items-center justify-center px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36 py-12 sm:py-20">
        {/* Background Image Container: stacks up from below */}
        <div
          ref={imageRef}
          className="absolute inset-0 w-full h-full pointer-events-none translate-y-full"
        >
          <Image
            src="/images/heroabout.jpg"
            alt="heroabout"
            fill
            priority
            className="object-cover object-center"
          />
          {/* Dark overlay for white text contrast */}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Centered Typography & 3-Column Layout */}
        <div
          ref={textRef}
          className="relative z-20 w-full max-w-[1400px] mx-auto my-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 w-full select-none items-start">
            {/* Column 1 */}
            <div className="flex flex-col items-start text-left">
              <h1 className="font-being text-white text-[7.2vw] sm:text-[7.6vw] md:text-[8vw] lg:text-[7.6vw] leading-none tracking-tight">
                <span className="inline-block overflow-hidden py-1">
                  <span className="block text-line">You imagine.</span>
                </span>
              </h1>
              <p
                className="body-text font-haas text-black text-sm sm:text-base md:text-lg lg:text-xl font-normal leading-snug mt-4 max-w-xs opacity-0"
                style={{ clipPath: "inset(0% 100% 0% 0%)" }}
              >
                Bring us your vision through moodboards, outfit references, or existing imagery.
              </p>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col items-start text-left">
              <h1 className="font-being text-white text-[7.2vw] sm:text-[7.6vw] md:text-[8vw] lg:text-[7.6vw] leading-none tracking-tight">
                <span className="inline-block overflow-hidden py-1">
                  <span className="block text-line">We.</span>
                </span>
              </h1>
              <p
                className="body-text font-haas text-black text-sm sm:text-base md:text-lg lg:text-xl font-normal leading-snug mt-4 max-w-xs opacity-0"
                style={{ clipPath: "inset(0% 100% 0% 0%)" }}
              >
                Our AI-powered creative process turns your ideas into high-quality branded visuals.
              </p>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col items-start text-left">
              <h1 className="font-being text-white text-[7.2vw] sm:text-[7.6vw] md:text-[8vw] lg:text-[7.6vw] leading-none tracking-tight">
                <span className="inline-block overflow-hidden py-1">
                  <span className="block text-line">Deliver.</span>
                </span>
              </h1>
              <p
                className="body-text font-haas text-black text-sm sm:text-base md:text-lg lg:text-xl font-normal leading-snug mt-4 max-w-xs opacity-0"
                style={{ clipPath: "inset(0% 100% 0% 0%)" }}
              >
                Receive polished campaign assets that save time, reduce production costs, and scale effortlessly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


