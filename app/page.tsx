"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "@/components/hero";
import About, { AboutRefHandle } from "@/components/About";
import Clients from "@/components/Clients";
import CreativityScale from "@/components/CreativityScale";
import Navbar from "@/components/navbar";
import Loader from "@/components/Loader";
import Footer from "@/components/footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const [activeSection, setActiveSection] = useState<"hero" | "about">("hero");
  const pinContainerRef = useRef<HTMLDivElement | null>(null);
  const heroWrapperRef = useRef<HTMLDivElement | null>(null);
  const aboutWrapperRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<AboutRefHandle | null>(null);
  const hasRevealedRef = useRef(false);

  useEffect(() => {
    const container = pinContainerRef.current;
    const aboutEl = aboutWrapperRef.current;
    if (!container || !aboutEl) return;

    const ctx = gsap.context(() => {
      // GSAP ScrollTrigger pinning & card stacking timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=100%", // Pin duration equivalent to 100vh
          pin: true,
          pinSpacing: true,
          scrub: 1, // Smooth scrubbed card transition
          onUpdate: (self) => {
            if (self.progress >= 0.5) {
              setActiveSection("about");
            } else {
              setActiveSection("hero");
            }

            // Trigger ONLY after the About card has completely stacked over the Hero section (when stacking reaches 100%)
            if (self.progress >= 0.999 && !hasRevealedRef.current) {
              hasRevealedRef.current = true;
              // Wait 1ms after the card is fully stacked before starting animations
              setTimeout(() => {
                aboutRef.current?.triggerReveal();
              }, 1);
            }
          },
        },
      });

      // About section slides upward over the pinned Hero section (0 to 1 duration)
      tl.fromTo(
        aboutEl,
        { yPercent: 100 },
        {
          yPercent: 0,
          ease: "none",
        },
        0
      );
    }, pinContainerRef);

    return () => ctx.revert();
  }, []);

  const handleSelectSection = (section: "hero" | "about") => {
    if (section === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (section === "about") {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  return (
    <main className="relative w-full bg-[#F5F4F0] overflow-x-hidden min-h-screen">
      <Loader />

      {/* Persistent Navbar */}
      <Navbar activeSection={activeSection} onSelectSection={handleSelectSection} />

      {/* Pinned Stacking Container */}
      <div ref={pinContainerRef} className="relative w-full h-screen h-[100svh] overflow-hidden">
        {/* Pinned Hero Section */}
        <div ref={heroWrapperRef} className="absolute inset-0 z-10 w-full h-full">
          <Hero />
        </div>

        {/* Card Stacking About Section */}
        <div
          ref={aboutWrapperRef}
          id="about"
          className="absolute inset-0 z-20 w-full h-full shadow-[0_-20px_50px_rgba(0,0,0,0.25)]"
        >
          <About ref={aboutRef} onSelectSection={handleSelectSection} />
        </div>
      </div>

      {/* Clients Section (natural document flow below pinned container) */}
      <Clients />

      {/* Creativity at Scale Section */}
      <CreativityScale />

      {/* Footer Section */}
      <Footer />
    </main>
  );
}

