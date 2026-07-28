"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import Hero from "@/components/hero";
import About from "@/components/About";
import Navbar from "@/components/navbar";
import Loader from "@/components/Loader";

export default function Home() {
  const [activeSection, setActiveSection] = useState<"hero" | "about">("hero");
  const heroWrapperRef = useRef<HTMLDivElement | null>(null);
  const aboutWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const heroEl = heroWrapperRef.current;
    const aboutEl = aboutWrapperRef.current;
    if (!heroEl || !aboutEl) return;

    if (activeSection === "about") {
      // Animate Hero out
      gsap.to(heroEl, {
        opacity: 0,
        y: -30,
        duration: 0.5,
        ease: "power3.inOut",
        onComplete: () => {
          heroEl.style.display = "none";
        },
      });

      // Animate About in
      aboutEl.style.display = "block";
      gsap.fromTo(
        aboutEl,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          delay: 0.15,
        }
      );
    } else {
      // Animate About out
      gsap.to(aboutEl, {
        opacity: 0,
        y: 30,
        duration: 0.5,
        ease: "power3.inOut",
        onComplete: () => {
          aboutEl.style.display = "none";
        },
      });

      // Animate Hero in
      heroEl.style.display = "block";
      gsap.fromTo(
        heroEl,
        { opacity: 0, y: -30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          delay: 0.15,
        }
      );
    }
  }, [activeSection]);

  return (
    <main className="relative min-h-screen w-full bg-[#F5F4F0] overflow-hidden">
      <Loader />

      {/* Persistent Navbar throughout transitions */}
      <Navbar activeSection={activeSection} onSelectSection={setActiveSection} />

      {/* Hero Full-Screen View */}
      <div ref={heroWrapperRef} className="w-full h-full">
        <Hero />
      </div>

      {/* About Us Full-Screen View */}
      <div ref={aboutWrapperRef} className="w-full h-full hidden opacity-0">
        <About onSelectSection={setActiveSection} />
      </div>
    </main>
  );
}