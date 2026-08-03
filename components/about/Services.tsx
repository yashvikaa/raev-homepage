"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const services = [
  {
    image: "/images/services/ai-campaigns.jpg",
    title: "AI CAMPAIGNS",
    alt: "AI Campaigns – woman in black outfit seated in modern setting",
  },
  {
    image: "/images/services/product-visuals.jpg",
    title: "PRODUCT VISUALS",
    alt: "Product Visuals – vibrant smoothie cup with fresh fruit",
  },
  {
    image: "/images/services/fashion-content.jpg",
    title: "FASHION CONTENT",
    alt: "Fashion Content – model in red power suit",
  },
  {
    image: "/images/services/advertisements.jpg",
    title: "ADVERTISEMENTS",
    alt: "Advertisements – elegant model in black top with gold earrings",
  },
];

export default function Services() {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      rowRefs.current.forEach((row, index) => {
        if (!row) return;

        gsap.set(row, {
          clipPath: "inset(0 0 100% 0)",
          opacity: 0,
        });

        gsap.to(row, {
          clipPath: "inset(0 0 0% 0)",
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: index * 0.18,
          scrollTrigger: {
            trigger: row,
            start: "top 80%",
            once: true,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full">
      {/* Top Area — White background, oversized heading */}
      <div className="w-full bg-white pt-8 sm:pt-10 md:pt-12 pb-0 px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36">
        <h2 className="font-being uppercase text-black text-[13vw] sm:text-[12vw] md:text-[11.5vw] lg:text-[11vw] leading-[0.61] tracking-tight select-none">
          OUR SERVICES
        </h2>
      </div>

      {/* Bottom Area — Black background, service rows */}
      <div className="w-full bg-black py-10 sm:py-14 md:py-16 px-8 sm:px-12 md:px-16 lg:px-12 xl:px-16">
        <div className="w-full max-w-[1440px] mx-auto">
          {services.map((service, index) => (
            <div
              key={service.title}
              ref={(el) => { rowRefs.current[index] = el; }}
            >
              {/* Service Row */}
              <div className="flex flex-col md:flex-row md:items-stretch gap-0 md:gap-6 lg:gap-8 py-3 sm:py-4 md:py-4">
                {/* Left Column — Image */}
                <div className="w-full md:w-[27%] flex-shrink-0">
                  <div className="relative w-full aspect-[4/3]">
                    <Image
                      src={service.image}
                      alt={service.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 27vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Right Column — Divider + Heading */}
                <div className="flex-1 flex flex-col">
                  {/* Divider — text column width only */}
                  <div className="w-full h-px bg-white/60" />
                  {/* Heading — vertically centered in remaining space */}
                  <div className="flex-1 flex items-center md:justify-end py-5 md:py-0">
                    <h3 className="font-being uppercase text-white text-6xl sm:text-7xl md:text-8xl lg:text-[9vw] xl:text-[8vw] leading-none tracking-tight select-none md:text-right">
                      {service.title}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
