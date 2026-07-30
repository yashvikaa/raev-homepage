"use client";

import HeroHeading from "./HeroHeading";
import HeroCTA from "./HeroCTA";
import Slider from "./Slider";

export default function Hero() {
  return (
    <section className="relative w-full h-[100vh] h-[100svh] bg-[#FFFFFF] overflow-hidden flex flex-col justify-between select-none">
      {/* Hero Heading and CTA Container */}
      <div className="relative z-20 pt-3 sm:pt-4 md:pt-5 lg:pt-6 pl-8 sm:pl-10 md:pl-12 lg:pl-16 pr-8 sm:pr-10 md:pr-12 lg:pr-16 pointer-events-auto">
        <HeroHeading />
        <HeroCTA />
      </div>

      {/* Infinite Image Slider */}
      <div className="absolute inset-0 z-10 pointer-events-auto translate-y-[2vh] sm:translate-y-[3vh]">
        <Slider />
      </div>
    </section>
  );
}
