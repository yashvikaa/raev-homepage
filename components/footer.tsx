"use client";

import React from "react";

export default function Footer() {
  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScrollToAbout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const aboutEl = document.getElementById("about");
    if (aboutEl) {
      aboutEl.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-[#000000] text-white select-none pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-8 sm:pb-10 md:pb-12 px-6 sm:px-12 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Three Column Main Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 lg:gap-12 items-start">
          {/* Left Column: Brand Name, Description & Social Icons */}
          <div className="md:col-span-6 lg:col-span-6 flex flex-col items-start pr-0 md:pr-6">
            {/* RAEV Heading: Being font, same scale as Hero secondary heading */}
            <h2 className="font-being uppercase text-white leading-[0.92] tracking-[-0.0005em] text-[7.2vw] sm:text-[7.6vw] md:text-[8vw] lg:text-[7.6vw]">
              RAEV
            </h2>

            {/* Brand Description: Haas Grot Disp Trial 55 Roman (weight 400) */}
            <p className="font-haas font-normal text-white/70 text-base sm:text-lg md:text-xl lg:text-2xl leading-[1.2] tracking-[-0.03em] max-w-md mt-4 sm:mt-6 md:mt-8">
              Pioneering high-impact visual content and AI-driven creative solutions for forward-thinking brands.
            </p>

            {/* Social Media Icons: Single row with subtle hover effects */}
            <div className="flex items-center space-x-6 sm:space-x-8 mt-8 sm:mt-10 md:mt-12">
              {/* Instagram Icon */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white/60 hover:text-white transition-all duration-200 hover:scale-110 transform"
              >
                <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* LinkedIn Icon */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-white/60 hover:text-white transition-all duration-200 hover:scale-110 transform"
              >
                <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* YouTube Icon */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-white/60 hover:text-white transition-all duration-200 hover:scale-110 transform"
              >
                <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Middle Column: NAVIGATE */}
          <div className="md:col-span-3 lg:col-span-3 flex flex-col items-start mt-4 md:mt-0">
            {/* Heading: NAVIGATE (Haas Grot Disp Trial 65 Medium, weight 500, uppercase) */}
            <h3 className="font-haas font-medium uppercase tracking-[-0.04em] text-lg sm:text-xl md:text-2xl text-white/50 mb-4 sm:mb-6 md:mb-8">
              NAVIGATE
            </h3>

            {/* Links: Haas Grot Disp Trial 55 Roman (weight 400) */}
            <nav className="flex flex-col space-y-3 sm:space-y-4 md:space-y-5">
              <a
                href="#hero"
                onClick={handleScrollToTop}
                className="font-haas font-normal text-base sm:text-lg md:text-xl lg:text-2xl text-white hover:text-white/70 transition-colors tracking-[-0.03em]"
              >
                Home
              </a>
              <a
                href="#about"
                onClick={handleScrollToAbout}
                className="font-haas font-normal text-base sm:text-lg md:text-xl lg:text-2xl text-white hover:text-white/70 transition-colors tracking-[-0.03em]"
              >
                About Us
              </a>
              <a
                href="#projects"
                className="font-haas font-normal text-base sm:text-lg md:text-xl lg:text-2xl text-white hover:text-white/70 transition-colors tracking-[-0.03em]"
              >
                Projects
              </a>
            </nav>
          </div>

          {/* Right Column: CONNECT */}
          <div className="md:col-span-3 lg:col-span-3 flex flex-col items-start mt-4 md:mt-0">
            {/* Heading: CONNECT (Haas Grot Disp Trial 65 Medium, weight 500, uppercase) */}
            <h3 className="font-haas font-medium uppercase tracking-[-0.04em] text-lg sm:text-xl md:text-2xl text-white/50 mb-4 sm:mb-6 md:mb-8">
              CONNECT
            </h3>

            {/* Email Address: Haas Grot Disp Trial 55 Roman (weight 400) */}
            <a
              href="mailto:raevstudio.co@gmail.com"
              className="font-haas font-normal text-base sm:text-lg md:text-xl lg:text-2xl text-white hover:text-white/70 transition-colors tracking-[-0.03em] break-all"
            >
              raevstudio.co@gmail.com
            </a>
          </div>
        </div>

        {/* Thin Horizontal Divider */}
        <div className="border-t border-white/15 my-10 sm:my-14 md:my-16 w-full" />

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-white/60 font-haas font-normal text-sm sm:text-base md:text-lg tracking-[-0.02em]">
          {/* Left: Copyright */}
          <div>© 2026 RAEV Studio. All rights reserved.</div>

          {/* Right: Privacy and Terms */}
          <div className="flex items-center space-x-6">
            <a href="#privacy" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#terms" className="hover:text-white transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
