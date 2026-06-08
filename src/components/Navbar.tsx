"use client";

import { useEffect, useRef, useState } from "react";
import type React from "react";
import { Button } from "@/components/ui/button";
import { bebasNeue } from "@/lib/fonts";
import { ChevronDown, Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const SECTIONS = [
  "home",
  "about",
  "skills",
  "experience",
  "projects",
  "contact",
] as const;
type SectionId = (typeof SECTIONS)[number];

export function Navbar() {
  const isMobile = useIsMobile();
  const [hidden, setHidden] = useState(false);
  const lastScrollRef = useRef(0);

  // active section id
  const [active, setActive] = useState<SectionId>("home");
  const activeRef = useRef<SectionId>(active);
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  // dropdown state (desktop contact)
  const [contactOpen, setContactOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const firstItemRef = useRef<HTMLAnchorElement | null>(null);

  // mobile menu state
  const [mobileOpen, setMobileOpen] = useState(false);

  // Scroll handler: hide/show navbar + update active section
  useEffect(() => {
    const container = document.getElementById("scroll-container");
    if (!container) return;

    const sectionEls: HTMLElement[] = [];
    for (const id of SECTIONS) {
      const el = document.getElementById(id) as HTMLElement | null;
      if (el) sectionEls.push(el);
    }

    if (sectionEls.length === 0) return;

    const handleScroll = () => {
      // hide / show navbar
      const currentScroll = container.scrollTop;
      if (currentScroll > lastScrollRef.current && currentScroll > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollRef.current = currentScroll;

      // compute nearest section to the center of the container
      const containerRect = container.getBoundingClientRect();
      const containerCenter =
        (containerRect.top + containerRect.bottom) / 2;

      let nearestId: SectionId | null = null;
      let nearestDist = Infinity;

      for (const el of sectionEls) {
        const r = el.getBoundingClientRect();
        const elCenter = (r.top + r.bottom) / 2;
        const dist = Math.abs(elCenter - containerCenter);
        if (dist < nearestDist) {
          nearestDist = dist;
          nearestId = el.id as SectionId;
        }
      }

      if (nearestId && nearestId !== activeRef.current) {
        setActive(nearestId);
        activeRef.current = nearestId;
      }
    };

    // run once on mount to set initial active state
    handleScroll();

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // close contact dropdown on outside click or Escape (desktop)
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!contactOpen) return;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setContactOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setContactOpen(false);
        setMobileOpen(false);
      }
    }

    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [contactOpen]);

  // when desktop contact dropdown opened, focus the first item
  useEffect(() => {
    if (contactOpen) {
      requestAnimationFrame(() => firstItemRef.current?.focus());
    }
  }, [contactOpen]);

  // Smart scroll: accepts "contact" or "#contact"
  const smartScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;

    e.preventDefault();

    const id = targetId.startsWith("#") ? targetId.slice(1) : targetId;

    const container = document.getElementById("scroll-container");
    const target =
      document.getElementById(id) ?? document.querySelector<HTMLElement>(`#${id}`);

    if (!container || !target) {
      window.location.hash = `#${id}`;
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const scrollTop =
      container.scrollTop + (targetRect.top - containerRect.top);

    container.scrollTo({
      top: Math.round(scrollTop),
      behavior: "smooth",
    });
  };

  const linkedInUrl = "https://www.linkedin.com/in/khushal-dev";
  const githubUrl = "https://github.com/nottkhush";
  const mailTo = "mailto:khush6569@gmail.com";

  const linkClass = (id: SectionId) =>
    `cursor-pointer px-1 pb-1 transition-all duration-200 border-b-2 ${
      active === id
        ? "border-[#ed501f] text-[#ed501f]"
        : "border-transparent hover:border-gray-200 text-gray-900"
    }`;

  const closeDropdownWithContact = () => {
    setContactOpen(false);
    setActive("contact");
    activeRef.current = "contact";
  };

  const handleMobileNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: SectionId
  ) => {
    smartScroll(e, id);
    setMobileOpen(false);
  };

  return (
    <div
      className={`
        fixed top-0 left-0 w-full z-50 flex justify-center mt-4
        transition-transform duration-300 transform-gpu
        ${hidden ? "-translate-y-32" : "translate-y-0"}
      `}
    >
      {isMobile ? (
        // ===== MOBILE NAVBAR =====
        <div className="relative bg-white max-w-sm w-full rounded-2xl px-4 py-3 flex items-center justify-between shadow-xl">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => smartScroll(e, "home")}
            className="inline-flex"
          >
            <Button
              className={`${bebasNeue.className} bg-[#ed501f] hover:bg-[#ed501f] font-extrabold text-white px-1 py-0.5 rounded-md shadow-2xl shadow-gray-700 cursor-default`}
            >
              Khushal
            </Button>
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen((s) => !s)}
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
            className="p-2 rounded-xl border border-gray-200 shadow-sm"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Mobile menu panel */}
          {mobileOpen && (
            <div className="absolute top-full left-0 mt-3 w-full rounded-2xl bg-white shadow-xl border border-gray-100 py-3">
              <nav className="flex flex-col gap-2 px-4">
                <a
                  href="#home"
                  onClick={(e) => handleMobileNavClick(e, "home")}
                  className={linkClass("home")}
                >
                  Home
                </a>
                <a
                  href="#about"
                  onClick={(e) => handleMobileNavClick(e, "about")}
                  className={linkClass("about")}
                >
                  About
                </a>
                <a
                  href="#skills"
                  onClick={(e) => handleMobileNavClick(e, "skills")}
                  className={linkClass("skills")}
                >
                  Skills
                </a>
                <a
                  href="#experience"
                  onClick={(e) => handleMobileNavClick(e, "experience")}
                  className={linkClass("experience")}
                >
                  Experience
                </a>
                <a
                  href="#projects"
                  onClick={(e) => handleMobileNavClick(e, "projects")}
                  className={linkClass("projects")}
                >
                  Projects
                </a>
              </nav>

              <div className="border-t my-3" />

              {/* Contact + Resume */}
              <div className="flex flex-col gap-3 px-4 pb-2">
                <div className="flex items-center justify-center gap-4">
                  <a
                    href={linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5 text-[#0A66C2]" />
                  </a>
                  <a href={mailTo} aria-label="Email">
                    <Mail className="w-5 h-5 text-[#EA4335]" />
                  </a>
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>

                <a
                  href="/Khushal_Jain_Resume.pdf"
                  download="Khushal_Jain_Resume.pdf"
                  aria-label="Download resume"
                  className="mt-1"
                >
                  <Button className="w-full text-sm font-bold shadow-2xl shadow-gray-700">
                    My Resume
                  </Button>
                </a>
              </div>
            </div>
          )}
        </div>
      ) : (
        // ===== DESKTOP NAVBAR =====
        <div className="relative grid grid-cols-3 bg-white max-w-4xl w-full rounded-2xl px-4 py-3 items-center shadow-xl">
          {/* LEFT - Logo */}
          <div className="flex justify-start">
            <a
              href="#home"
              onClick={(e) => smartScroll(e, "home")}
              className="inline-flex"
            >
              <Button
                className={`${bebasNeue.className} bg-[#ed501f] hover:bg-[#ed501f] font-extrabold text-white px-1 py-0.5 rounded-md shadow-2xl shadow-gray-700  cursor-default`}
              >
                Khushal
              </Button>
            </a>
          </div>

          {/* MIDDLE - Nav Items */}
          <div className="flex justify-center gap-6">
            <a
              href="#home"
              onClick={(e) => smartScroll(e, "home")}
              className={linkClass("home")}
            >
              Home
            </a>
            <a
              href="#about"
              onClick={(e) => smartScroll(e, "about")}
              className={linkClass("about")}
            >
              About
            </a>
            <a
              href="#skills"
              onClick={(e) => smartScroll(e, "skills")}
              className={linkClass("skills")}
            >
              Skills
            </a>
            <a
              href="#experience"
              onClick={(e) => smartScroll(e, "experience")}
              className={linkClass("experience")}
            >
              Experience
            </a>
            <a
              href="#projects"
              onClick={(e) => smartScroll(e, "projects")}
              className={linkClass("projects")}
            >
              Projects
            </a>

            {/* Contact button (opens dropdown) */}
            <div className="relative" ref={dropdownRef}>
              <button
                aria-haspopup="menu"
                aria-expanded={contactOpen}
                onClick={() => setContactOpen((s) => !s)}
                className={`text-md font-medium flex items-center gap-2 ${
                  active === "contact"
                    ? "border-b-2 border-[#ed501f] text-[#ed501f]"
                    : "text-[#ed501f] hover:text-[#ed501f]"
                }`}
                aria-label="Open contact menu"
              >
                Contact
                <ChevronDown size={18} />
              </button>

              {/* Dropdown */}
              <div
                role="menu"
                aria-label="Contact options"
                className={`absolute right-0 mt-3 w-20 bg-white rounded-lg border border-gray-100 shadow-lg py-2 z-50 transform origin-top-right transition-all ${
                  contactOpen
                    ? "opacity-100 scale-100 pointer-events-auto"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <a
                  ref={firstItemRef}
                  href={linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="menuitem"
                  className="flex items-center justify-center px-3 py-2 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                  onClick={closeDropdownWithContact}
                >
                  <Linkedin className="w-5 h-5 text-[#0A66C2]" />
                </a>

                <a
                  href={mailTo}
                  role="menuitem"
                  className="flex items-center justify-center px-3 py-2 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                  onClick={closeDropdownWithContact}
                >
                  <Mail className="w-5 h-5 text-[#EA4335]" />
                </a>

                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="menuitem"
                  className="flex items-center justify-center px-3 py-2 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                  onClick={closeDropdownWithContact}
                >
                  <Github className="w-5 h-5 text-gray-800" />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT - Resume (download) */}
          <div className="flex justify-end">
            <a
              href="/Khushal_Jain_Resume.pdf"
              download="Khushal_Jain_Resume.pdf"
              aria-label="Download resume"
            >
              <Button className="text-sm font-bold shadow-2xl shadow-gray-700">
                My Resume
              </Button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
