"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "ABOUT US", href: "/about" },
  { label: "PROJECTS", href: "/#projects" },
  { label: "CONTACT", href: "/#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollSection, setScrollSection] = useState<"hero" | "about">("hero");
  const pathname = usePathname();

  const containerRef = useRef<HTMLElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (pathname !== "/") return;

    const handleScroll = () => {
      if (window.scrollY >= window.innerHeight * 0.5) {
        setScrollSection("about");
      } else {
        setScrollSection("hero");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const isAboutPage = pathname === "/" && scrollSection === "about";

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
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const handleItemClick = (e: React.MouseEvent, href: string) => {
    if (pathname === "/" && href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsOpen(false);
  };

  return (
    <nav
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className="fixed top-3 right-8 sm:top-4 sm:right-10 md:top-4 md:right-12 lg:top-5 lg:right-16 z-50 flex flex-col items-end select-none transition-colors duration-300"
    >
      {/* RAEV Logo Trigger */}
      <Link
        href="/"
        onClick={handleLogoClick}
        aria-expanded={isOpen}
        aria-label="RAEV Homepage and Navigation"
        className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font tracking-tight uppercase cursor-pointer hover:opacity-75 transition-opacity focus:outline-none font-being block text-black"
      >
        RAEV
      </Link>

      {/* Navigation Links Dropdown */}
      <div
        ref={menuRef}
        className="overflow-hidden opacity-0 h-0 flex flex-col items-end pt-2 space-y-1 text-right"
      >
        {NAV_ITEMS.map((item, index) => {
          const isItemActive = pathname === item.href;
          const textClass = isItemActive
            ? "text-black underline underline-offset-4"
            : "text-black hover:text-neutral-600";

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={(e) => handleItemClick(e, item.href)}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              className={`typo-nav transition-colors uppercase py-0.5 block focus:outline-none focus:underline ${textClass}`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
