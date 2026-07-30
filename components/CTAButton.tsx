"use client";

import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

interface CTAButtonProps {
  text: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
  darkBackground?: boolean;
}

export default function CTAButton({
  text,
  href = "#",
  onClick,
  className = "",
  darkBackground = false,
}: CTAButtonProps) {
  // Strip any leading arrow character if present in the text string
  const cleanText = text.replace(/^[→\s]+/, "");

  return (
    <a
      href={href}
      onClick={onClick}
      className={`group relative inline-flex items-center gap-3 sm:gap-3.5 md:gap-4 h-8 sm:h-9 md:h-10 py-0 rounded-xs select-none cursor-pointer overflow-hidden ${className}`}
    >
      {/* Base Black Square behind icon (Static 1:1 aspect ratio, zero layout reflow) */}
      <span className="absolute top-0 bottom-0 left-0 h-full aspect-square bg-black rounded-xs z-0 pointer-events-none" />

      {/* GPU-Accelerated Expanding Layer (scaleX transform from left origin) */}
      <span className="absolute inset-0 w-full h-full bg-black rounded-xs origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] z-0 pointer-events-none" />

      {/* Stationary Centered Arrow Icon Container */}
      <span className="relative z-10 h-full aspect-square flex items-center justify-center text-white shrink-0">
        <FaArrowRightLong className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-white stroke-[1.5]" />
      </span>

      {/* Stationary Button Text (Transitions text color smoothly) */}
      <span
        className={`relative z-10 typo-cta uppercase font-medium leading-none h-full flex items-center pr-3 sm:pr-4 md:pr-5 transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          darkBackground
            ? "text-white"
            : "text-black group-hover:text-white"
        }`}
      >
        {cleanText}
      </span>
    </a>
  );
}
