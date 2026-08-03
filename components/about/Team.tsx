"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Team() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const parasRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const textTargets = [headingRef.current, ...parasRef.current].filter(Boolean);

      // Set initial state — hidden below, clipped from bottom
      gsap.set(textTargets, {
        y: 80,
        opacity: 0,
        clipPath: "inset(0 0 100% 0)",
      });

      // Animate text: rush upward + reveal top-to-bottom
      gsap.to(textTargets, {
        y: 0,
        opacity: 1,
        clipPath: "inset(0 0 0% 0)",
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.15,
        delay: 0.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      // Animate image: fade and scale in
      if (imageRef.current) {
        gsap.set(imageRef.current, { opacity: 0, scale: 1.05 });
        gsap.to(imageRef.current, {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-16 sm:py-24 md:py-32 relative z-10 overflow-hidden"
    >
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0 items-start">
        {/* Left Column — Heading + Text */}
        <div className="flex flex-col items-start px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36">
          <h2
            ref={headingRef}
            className="font-being uppercase text-black text-6xl sm:text-7xl md:text-8xl lg:text-[9vw] xl:text-[8vw] leading-none tracking-tight select-none mb-10 sm:mb-14 md:mb-16"
          >
            TEAM
          </h2>

          <div className="flex flex-col space-y-6 sm:space-y-8 max-w-xl sm:max-w-2xl text-left">
            <p
              ref={(el) => { parasRef.current[0] = el; }}
              className="font-haas text-black text-base sm:text-lg md:text-xl lg:text-[1.35rem] font-normal leading-snug tracking-tight"
            >
              We are creatives, designers, and AI specialists united by one goal; to make exceptional visual content more accessible. Every campaign is crafted with precision, balancing innovation with timeless design principles.
            </p>

            <p
              ref={(el) => { parasRef.current[1] = el; }}
              className="font-haas text-black text-base sm:text-lg md:text-xl lg:text-[1.35rem] font-normal leading-snug tracking-tight"
            >
              Our work begins with understanding your brand and ends with campaign-ready visuals that captivate audiences, strengthen identity, and drive meaningful results.
            </p>
          </div>
        </div>

        {/* Right Column — Portrait Image flush to right edge */}
        <div ref={imageRef} className="relative w-full h-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px] px-6 sm:px-12 md:px-0">
          <Image
            src="/images/team.jpg"
            alt="Team member – woman in floral jacket holding coffee"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
