"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CTAButton from "./CTAButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: "01",
    title: "LOREM IPSUM",
    subtitle: "WOREM IPSUM DOLOR SIT",
    description:
      "Forem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Nunc Vulputate Libero Et Velit Interdum, Ac Aliquet Odio Mattis. Class Aptent Taciti Sociosqu Ad Litora Torquent Per Conubia Nostra, Per Inceptos Himenaeos.",
    image: "/images/projects/project-1.jpg",
    link: "/project-showcase#project1",
  },
  {
    id: "02",
    title: "LOREM IPSUM",
    subtitle: "WOREM IPSUM DOLOR SIT",
    description:
      "Forem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Nunc Vulputate Libero Et Velit Interdum, Ac Aliquet Odio Mattis. Class Aptent Taciti Sociosqu Ad Litora Torquent Per Conubia Nostra, Per Inceptos Himenaeos.",
    image: "/images/projects/project-2.jpg",
    link: "/case-studies",
  },
  {
    id: "03",
    title: "LOREM IPSUM",
    subtitle: "WOREM IPSUM DOLOR SIT",
    description:
      "Forem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Nunc Vulputate Libero Et Velit Interdum, Ac Aliquet Odio Mattis. Class Aptent Taciti Sociosqu Ad Litora Torquent Per Conubia Nostra, Per Inceptos Himenaeos.",
    image: "/images/projects/project-3.jpg",
    link: "/case-studies",
  },
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const projectRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      projectRefs.current.forEach((el) => {
        if (!el) return;

        const img = el.querySelector(".project-bg-img");
        const titleInner = el.querySelector(".project-title-inner");
        const category = el.querySelector(".project-category");
        const desc = el.querySelector(".project-desc");
        const cta = el.querySelector(".project-cta");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });

        // 1. Image fades in while scaling from 1.08 -> 1
        if (img) {
          tl.fromTo(
            img,
            { scale: 1.08, opacity: 0.3 },
            { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" },
            0
          );
        }

        // 2. Title reveals from bottom to top using masked reveal
        if (titleInner) {
          tl.fromTo(
            titleInner,
            { yPercent: 100, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
            0.15
          );
        }

        // 3. Category subtitle fade/slide up
        if (category) {
          tl.fromTo(
            category,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
            0.35
          );
        }

        // 4. Description fades up after title
        if (desc) {
          tl.fromTo(
            desc,
            { y: 25, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
            0.45
          );
        }

        // 5. CTA appears last with slight delay
        if (cta) {
          tl.fromTo(
            cta,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
            0.6
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-[#0E0E0E] text-white">
      {PROJECTS.map((item, index) => (
        <section
          key={`${item.id}-${index}`}
          ref={(el) => {
            projectRefs.current[index] = el;
          }}
          style={{ zIndex: index + 1 }}
          className="sticky top-0 group relative w-full h-screen h-[100svh] overflow-hidden cursor-pointer select-none bg-[#0E0E0E]"
        >
          {/* Immersive Full-Width Background Image */}
          <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
            <Image
              src={item.image}
              alt={item.title}
              fill
              priority={index === 0}
              sizes="100vw"
              className="project-bg-img object-cover object-center w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.215,0.61,0.355,1)] group-hover:scale-[1.04]"
            />
            {/* Subtle Dark Overlay */}
            <div className="absolute inset-0 bg-black/35 group-hover:bg-black/55 transition-colors duration-500 pointer-events-none" />
          </div>

          {/* Top-Left Header: Title & Subtitle */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 lg:top-10 lg:left-10 z-10 max-w-[85vw] sm:max-w-none">
            <div className="overflow-hidden pb-1">
              <h2 className="project-title-inner font-being uppercase text-[7.2vw] sm:text-[7.6vw] md:text-[8vw] lg:text-[7.6vw] leading-[0.72] tracking-[-0.0005em] text-white drop-shadow-md transition-transform duration-400 ease-out group-hover:-translate-y-[4px]">
                {item.title}
              </h2>
            </div>
            <p className="project-category typo-subheading uppercase text-white/90 mt-1 sm:mt-2.5 drop-shadow-sm">
              {item.subtitle}
            </p>
          </div>

          {/* Bottom-Right Content: Description & CTA */}
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 lg:bottom-10 lg:right-10 z-10 max-w-[85vw] sm:max-w-md md:max-w-xl text-right flex flex-col items-end gap-3 sm:gap-4">
            <p className="project-desc typo-body font-normal text-white/90 leading-[1.1] text-right drop-shadow-md">
              {item.description}
            </p>

            <div className="project-cta mt-1">
              <CTAButton text="VIEW MORE" href={item.link} darkBackground={true} hoverTarget="self" flushRight={true} />
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}


