"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

interface NavItem {
  label: string;
  href: string;
  sectionId?: "hero" | "about";
}

const NAV_ITEMS: NavItem[] = [
  { label: "ABOUT US", href: "#about", sectionId: "about" },
  { label: "PROJECTS", href: "#projects" },
  { label: "CONTACT", href: "#contact" },
];

interface NavbarProps {
  activeSection?: "hero" | "about";
  onSelectSection?: (section: "hero" | "about") => void;
}

export default function Navbar({ activeSection = "hero", onSelectSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const isAboutPage = activeSection === "about";

  useEffect(() => {
    if (!menuRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });

      tl.to(menuRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
      }).fromTo(
        itemsRef.current.filter(Boolean),
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.08,
          ease: "power3.out",
        },
        "-=0.2"
      );

      timelineRef.current = tl;
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!timelineRef.current) return;
    if (isOpen) {
      timelineRef.current.play();
    } else {
      timelineRef.current.reverse();
    }
  }, [isOpen]);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (!containerRef.current?.contains(e.relatedTarget as Node)) {
      setIsOpen(false);
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onSelectSection?.("hero");
  };

  const handleItemClick = (e: React.MouseEvent, sectionId?: "hero" | "about") => {
    if (sectionId) {
      e.preventDefault();
      onSelectSection?.(sectionId);
    }
  };

  return (
    <nav
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className="absolute top-3 right-8 sm:top-4 sm:right-10 md:top-4 md:right-12 lg:top-5 lg:right-16 z-30 flex flex-col items-end select-none transition-colors duration-300"
    >
      {/* RAEV Logo Trigger */}
      <a
        href="/"
        onClick={handleLogoClick}
        aria-expanded={isOpen}
        aria-label="RAEV Homepage and Navigation"
        className={`text-3xl sm:text-4xl md:text-4xl lg:text-5xl font tracking-tight uppercase cursor-pointer hover:opacity-75 transition-opacity focus:outline-none font-being block ${
          isAboutPage ? "text-white" : "text-black"
        }`}
      >
        RAEV
      </a>

      {/* Navigation Links Dropdown */}
      <div
        ref={menuRef}
        className="overflow-hidden opacity-0 h-0 flex flex-col items-end pt-2 space-y-1 text-right"
      >
        {NAV_ITEMS.map((item, index) => {
          const isItemActive = activeSection === item.sectionId;
          const textClass = isAboutPage
            ? isItemActive
              ? "text-white underline underline-offset-4"
              : "text-white hover:text-white/80"
            : isItemActive
            ? "text-black underline underline-offset-4"
            : "text-black hover:text-neutral-600";

          return (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleItemClick(e, item.sectionId)}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              className={`text-base sm:text-lg md:text-xl font-extrabold tracking-wider transition-colors uppercase py-0.5 font-helvetica block focus:outline-none focus:underline ${textClass}`}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
