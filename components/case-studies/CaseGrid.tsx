"use client";

import Image from "next/image";

interface CaseStudy {
  id: string;
  title: string;
  category: string;
  client: string;
  metric: string;
  metricLabel: string;
  description: string;
  image: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "01",
    title: "NEO-LUXURY AUTOMOTIVE REVEAL",
    category: "AI VISUALS",
    client: "LOREM IPSUM",
    metric: "4.2M",
    metricLabel: "ORGANIC IMPRESSIONS",
    description: "Generated 150+ hyper-realistic 8K asset variations for an international vehicle launch in under 2 weeks.",
    image: "/images/slide1.jpg",
  },
  {
    id: "02",
    title: "VIRTUAL FASHION WEEK CAMPAIGN",
    category: "PRODUCT VISUALS",
    client: "LOREM IPSUM",
    metric: "68%",
    metricLabel: "REDUCED PRODUCTION COST",
    description: "End-to-end synthetic model rendering and garment virtualization for a global digital runway debut.",
    image: "/images/slide2.jpg",
  },
  {
    id: "03",
    title: "HIGH-SCALE PRODUCT ECOSYSTEM",
    category: "VIDEO ADVERTISEMENTS",
    client: "LOREM IPSUM",
    metric: "12X",
    metricLabel: "ASSET GENERATION SPEED",
    description: "Automated brand-consistent visual collateral across print, web, and spatial 3D environments.",
    image: "/images/slide3.jpg",
  },
  {
    id: "04",
    title: "ARCHITECTURAL CINEMATICS",
    category: "FASHION CAMPAIGNS",
    client: "LOREM IPSUM",
    metric: "95%",
    metricLabel: "CLIENT APPROVAL RATE",
    description: "Photorealistic lighting simulations and cinematic walkthroughs for sustainable urban architecture.",
    image: "/images/creativity-banner.jpg",
  },
];

export default function CaseGrid() {
  return (
    <section className="w-full bg-white py-16 sm:py-24 px-6 sm:px-12 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="border-b border-black/10 pb-6 mb-12 sm:mb-16">
          <h2 className="font-being uppercase text-black select-none text-[7.2vw] sm:text-[7.6vw] md:text-[8vw] lg:text-[7.6vw] leading-[0.72] tracking-[-0.0005em]">
            FEATURED PROJECTS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
          {CASE_STUDIES.map((item) => (
            <article key={item.id} className="group flex flex-col cursor-pointer">
              {/* Image Container */}
              <div className="relative w-full h-[320px] sm:h-[400px] md:h-[420px] overflow-hidden rounded-sm bg-black/5 mb-6">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-white font-haas text-xs uppercase px-3 py-1 tracking-wider">
                  {item.category}
                </div>
              </div>

              {/* Header Info */}
              <div className="flex items-baseline justify-between gap-4 mb-2">
                <span className="font-haas text-xs uppercase tracking-wider text-black/50">
                  {item.client}
                </span>
                <span className="font-being text-sm text-black/40">
                  [{item.id}]
                </span>
              </div>

              {/* Metric Callout */}
              <div className="flex items-center gap-3 py-3 border-y border-black/10 my-3">
                <span className="font-being text-xl sm:text-2xl text-black">{item.metric}</span>
                <span className="font-haas text-xs uppercase tracking-wider text-black/60">{item.metricLabel}</span>
              </div>

              {/* Description */}
              <p className="font-haas text-black/70 text-sm sm:text-base leading-relaxed">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
