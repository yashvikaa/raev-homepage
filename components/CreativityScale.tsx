"use client";

import Image from "next/image";
import CTAButton from "./CTAButton";

export default function CreativityScale() {
  return (
    <section className="w-full bg-white select-none">
      {/* 1. Full-width Banner Image (~65-70vh height, object-cover) */}
      <div className="relative w-full h-[60vh] sm:h-[65vh] md:h-[70vh] overflow-hidden">
        <Image
          src="/images/creativity-banner.jpg"
          alt="Creativity at Scale Banner"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center pointer-events-none"
        />
      </div>

      {/* 2. Content Section (Matching Figma layout) */}
      <div className="w-full py-16 sm:py-20 md:py-24 lg:py-28 px-6 sm:px-12 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-10 md:gap-16">
          {/* Left Block: Heading, Subheading & Body Text */}
          <div className="flex-1 max-w-3xl">
            {/* Heading: CREATIVITY AT SCALE */}
            <h2 className="font-being uppercase text-black leading-[0.88] select-none whitespace-nowrap">
              <span className="block text-[14vw] sm:text-[13.5vw] md:text-[13.5vw] lg:text-[13.5vw] leading-[0.92] tracking-[-0.000000005em]">
                CREATIVITY
              </span>
              <span className="block text-[7.2vw] sm:text-[7.6vw] md:text-[8vw] lg:text-[7.6vw] leading-[0.92] tracking-[-0.0005em] mt-1 sm:mt-2">
                AT SCALE
              </span>
            </h2>

            {/* Subheading & Description */}
            <div className="mt-8 sm:mt-10 md:mt-12">
              <h3 className="typo-subheading uppercase text-black font-bold text-lg sm:text-xl md:text-2xl tracking-tight mb-3">
                YOUR IDEAS, REALIZED.
              </h3>
              <p className="typo-body text-black/90 text-base sm:text-lg md:text-xl leading-[1.1] max-w-xl">
                From a handful of reference images to campaign-ready visuals, we
                create premium AI-generated content that helps brands launch
                faster, reduce production costs, and make a lasting impression.
              </p>
            </div>
          </div>

          {/* Right Block: CTA Button */}
          <div className="flex-none self-start md:self-end pb-1 md:pb-3">
            <CTAButton text="EXPLORE OUR WORK" href="#explore" />
          </div>
        </div>
      </div>
    </section>
  );
}
