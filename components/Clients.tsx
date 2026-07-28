"use client";

import Image from "next/image";

interface ClientLogo {
  name: string;
  src: string;
  width: number;
  height: number;
}

const CLIENT_LOGOS: ClientLogo[] = [
  { name: "Ella Stein", src: "/images/logos/ella-stein.png", width: 180, height: 80 },
  { name: "The Curated Collective", src: "/images/logos/curated-collective.png", width: 220, height: 80 },
  { name: "Gulaabi Loom", src: "/images/logos/gulaabi-loom.png", width: 180, height: 80 },
  { name: "Suta", src: "/images/logos/suta.png", width: 160, height: 80 },
  { name: "Kiseka", src: "/images/logos/kiseka.png", width: 160, height: 80 },
  { name: "Ija Bojyu", src: "/images/logos/ija-bojyu.png", width: 180, height: 80 },
];

export default function Clients() {
  // Duplicate list to guarantee smooth continuous seamless loop
  const logos = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <section className="relative w-full bg-white py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden select-none">
      {/* Centered Heading: OUR CLIENTS. */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10 sm:mb-12 md:mb-14">
        <h2 className="font-being uppercase text-black leading-none text-5xl sm:text-6xl md:text-7xl lg:text-[7.5vw] tracking-tight">
          OUR CLIENTS.
        </h2>
      </div>

      {/* Infinite Horizontal Logo Carousel with Fixed Top & Bottom Borders */}
      <div className="relative w-full overflow-hidden py-6 sm:py-8 md:py-10 border-y border-[#D9D9D9] group">
        <div className="flex w-max animate-marquee items-center">
          {logos.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="flex-none px-8 sm:px-12 md:px-16 flex items-center justify-center h-16 sm:h-20 md:h-24 opacity-90 hover:opacity-100 transition-opacity duration-300"
            >
              <Image
                src={logo.src}
                alt={`${logo.name} Logo`}
                width={logo.width}
                height={logo.height}
                className="max-h-full w-auto object-contain select-none pointer-events-none"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Centered Body Text: Built For Brands That Move Fast. */}
      <div className="mt-10 sm:mt-12 md:mt-14 text-center px-4">
        <p className="typo-body text-black">
          Built For <span className="italic">Brands</span> That Move Fast.
        </p>
      </div>
    </section>
  );
}
