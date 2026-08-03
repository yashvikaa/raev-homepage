"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";

interface NavItem {
  label: string;
  href: string;
  subtitle?: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "HOME", href: "/", subtitle: "01" },
  { label: "ABOUT US", href: "/about", subtitle: "02" },
  { label: "PROJECTS", href: "/#clients", subtitle: "03" },
  { label: "CASE STUDY", href: "/#creativity", subtitle: "04" },
  { label: "CONTACT", href: "/#contact", subtitle: "05" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const menuOverlayRef = useRef<HTMLDivElement | null>(null);
  const coverItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const navLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Calculate radial position away from center for floating cover elements
  const getRadialTranslation = (element: HTMLElement, distance = 400) => {
    const rect = element.getBoundingClientRect();
    const elemCenter = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
    const viewportCenter = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    let dx = elemCenter.x - viewportCenter.x;
    let dy = elemCenter.y - viewportCenter.y;
    if (dx === 0 && dy === 0) {
      dx = 1;
      dy = 1;
    }
    const len = Math.hypot(dx, dy) || 1;
    return {
      x: (dx / len) * distance,
      y: (dy / len) * distance,
    };
  };

  // Build the GSAP Clip Timeline
  const initTimeline = useCallback(() => {
    if (!menuOverlayRef.current) return;

    // Reset styles
    gsap.set(menuOverlayRef.current, {
      clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
      visibility: "hidden",
      pointerEvents: "none",
    });

    const coverElems = coverItemsRef.current.filter(Boolean) as HTMLDivElement[];
    gsap.set(coverElems, { x: 0, y: 0, opacity: 1, scale: 1, rotation: 0 });

    const links = navLinksRef.current.filter(Boolean) as HTMLAnchorElement[];
    gsap.set(links, { y: 60, opacity: 0 });

    const tl = gsap.timeline({
      paused: true,
      onStart: () => {
        if (menuOverlayRef.current) {
          gsap.set(menuOverlayRef.current, { visibility: "visible", pointerEvents: "auto" });
        }
      },
      onReverseComplete: () => {
        if (menuOverlayRef.current) {
          gsap.set(menuOverlayRef.current, { visibility: "hidden", pointerEvents: "none" });
        }
      },
    });

    // 1. Clip Path Reveal (Center outwards polygon expand)
    tl.to(
      menuOverlayRef.current,
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 0.75,
        ease: "expo.inOut",
      },
      0
    );

    // 2. Radial cover items scatter effect
    coverElems.forEach((item, index) => {
      const { x, y } = getRadialTranslation(item, 350);
      tl.to(
        item,
        {
          x,
          y,
          opacity: 0,
          scale: 0.8,
          rotation: (index % 2 === 0 ? 1 : -1) * 15,
          duration: 0.65,
          ease: "expo.out",
        },
        0.1 + index * 0.04
      );
    });

    // 3. Staggered reveal for menu navigation links
    tl.to(
      links,
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.07,
        ease: "power3.out",
      },
      0.35
    );

    timelineRef.current = tl;
  }, []);

  useEffect(() => {
    initTimeline();
    const handleResize = () => {
      if (!isOpen) initTimeline();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [initTimeline, isOpen]);

  // Toggle open/close state
  const toggleMenu = () => {
    if (!timelineRef.current) return;
    const nextState = !isOpen;
    setIsOpen(nextState);

    if (nextState) {
      timelineRef.current.play();
    } else {
      timelineRef.current.reverse();
    }
  };

  // Keyboard accessibility (ESC key to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        toggleMenu();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Handle navigation click inside menu
  const handleItemClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (!timelineRef.current) return;

    // Close menu animation first
    setIsOpen(false);
    timelineRef.current.reverse();

    setTimeout(() => {
      if (href.startsWith("/#")) {
        const targetId = href.replace("/#", "");
        if (pathname === "/") {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          } else if (targetId === "about") {
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
          }
        } else {
          router.push(href);
        }
      } else if (href === "/") {
        if (pathname === "/") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          router.push("/");
        }
      } else {
        router.push(href);
      }
    }, 600);
  };

  return (
    <div ref={containerRef} className="relative z-[100] select-none">
      {/* Fixed Header Bar with Logo and Toggle Trigger */}
      <header className="fixed top-0 left-0 w-full px-6 py-5 sm:px-10 sm:py-6 md:px-14 md:py-7 flex items-center justify-between z-[110] pointer-events-auto mix-blend-difference">
        <div />

        {/* Toggle Button Trigger */}
        <button
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
          className="flex items-center gap-3 px-4 py-2 border border-white/30 bg-black text-white hover:bg-white hover:text-black transition-all duration-300 group cursor-pointer focus:outline-none"
        >
          <span className="text-sm font-haas uppercase tracking-wider">
            {isOpen ? "CLOSE" : "MENU"}
          </span>
          <div className="relative w-5 h-4 flex flex-col justify-between items-center opacity-60 group-hover:opacity-100 transition-opacity duration-300">
            <span
              className={`w-full h-0.5 bg-current transition-all duration-300 transform ${
                isOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`w-full h-0.5 bg-current transition-all duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-full h-0.5 bg-current transition-all duration-300 transform ${
                isOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </div>
        </button>
      </header>

      {/* Full-Screen GSAP Clip Navigation Overlay */}
      <div
        ref={menuOverlayRef}
        aria-hidden={!isOpen}
        className="fixed inset-0 w-screen h-screen z-[90] bg-[#0E0E0E] text-[#F5F4F0] flex flex-col justify-between p-8 sm:p-12 md:p-16 overflow-hidden"
      >
        {/* Decorative Grid Cover Cards (Scatter Radially on Open) */}
        <div className="absolute inset-0 grid grid-cols-2 sm:grid-cols-4 gap-4 p-8 pointer-events-none opacity-20 z-0">
          {[1, 2, 3, 4].map((num, idx) => (
            <div
              key={num}
              ref={(el) => {
                coverItemsRef.current[idx] = el;
              }}
              className="w-full h-full rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm"
            />
          ))}
        </div>

        {/* Top Header Placeholder spacing */}
        <div className="w-full h-16 sm:h-20" />

        {/* Main Navigation Links */}
        <div className="relative z-10 my-auto flex flex-col justify-center items-start space-y-4 sm:space-y-6 md:space-y-8 max-w-5xl mx-auto w-full">
          {NAV_ITEMS.map((item, index) => {
            const isActive =
              pathname === item.href || (item.href.startsWith("/#") && pathname === "/");

            return (
              <div key={item.label} className="overflow-hidden w-full">
                <Link
                  href={item.href}
                  ref={(el) => {
                    navLinksRef.current[index] = el;
                  }}
                  onClick={(e) => handleItemClick(e, item.href)}
                  className="group flex items-baseline gap-4 sm:gap-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-being uppercase tracking-tight text-white/90 hover:text-white transition-colors duration-300 focus:outline-none"
                >
                  <span className="text-sm sm:text-base md:text-lg font-haas text-neutral-500 group-hover:text-white transition-colors">
                    {item.subtitle}
                  </span>
                  <span className="relative inline-block transform group-hover:translate-x-3 transition-transform duration-300">
                    {item.label}
                    {isActive && (
                      <span className="absolute left-0 -bottom-2 w-full h-1 bg-white/80 rounded-full" />
                    )}
                  </span>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Footer info inside overlay */}
        <div className="relative z-10 w-full pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm font-haas text-neutral-400 gap-4">
          <div>
            <span>RAEV DIGITAL AGENCY &copy; {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#contact" className="hover:text-white transition-colors">
              HELLO@RAEV.STUDIO
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              INSTAGRAM
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
