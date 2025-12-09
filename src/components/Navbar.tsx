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
          {/* LEFT — Logo */}
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

          {/* MIDDLE — Nav Items */}
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
                aria-haspopup="true"
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
                {/* LinkedIn */}
                <a
                  ref={firstItemRef}
                  href={linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="menuitem"
                  className="flex items-center justify-center px-3 py-2 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                  onClick={() => {
                    setContactOpen(false);
                    setActive("contact");
                    activeRef.current = "contact";
                  }}
                >
                  <svg
                    className="w-5 h-5 text-[#0A66C2]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M4.98 3.5C4.98 4.88 3.9 6 2.5 6S0 4.88 0 3.5 1.08 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zM8.5 8h3.84v2.19h.05c.54-1.02 1.86-2.09 3.83-2.09 4.1 0 4.86 2.7 4.86 6.2V24h-4v-7.08c0-1.69-.03-3.87-2.36-3.87-2.36 0-2.72 1.84-2.72 3.75V24h-4V8z" />
                  </svg>
                </a>

                {/* Email */}
                <a
                  href={mailTo}
                  role="menuitem"
                  className="flex items-center justify-center px-3 py-2 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                  onClick={() => {
                    setContactOpen(false);
                    setActive("contact");
                    activeRef.current = "contact";
                  }}
                >
                  <svg
                    className="w-5 h-5 text-[#EA4335]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 13.065L1.5 6.5V18a2 2 0 002 2h17a2 2 0 002-2V6.5L12 13.065zM12 11L22.5 4H1.5L12 11z" />
                  </svg>
                </a>

                {/* GitHub */}
                <a
                  href={githubUrl}
                  role="menuitem"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-3 py-2 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                  onClick={() => {
                    setContactOpen(false);
                    setActive("contact");
                    activeRef.current = "contact";
                  }}
                >
                  <svg
                    className="w-5 h-5 text-gray-800"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.9 3.17 9.06 7.57 10.53.55.1.75-.24.75-.53v-1.87c-3.08.67-3.73-1.5-3.73-1.5-.5-1.26-1.22-1.6-1.22-1.6-.99-.68.08-.66.08-.66 1.1.08 1.68 1.13 1.68 1.13.97 1.66 2.55 1.18 3.17.9.1-.7.38-1.18.69-1.45-2.46-.28-5.05-1.23-5.05-5.47 0-1.21.43-2.2 1.13-2.98-.12-.28-.49-1.41.1-2.94 0 0 .9-.29 2.95 1.13a10.1 10.1 0 012.68-.36c.91 0 1.83.12 2.68.36 2.05-1.42 2.95-1.13 2.95-1.13.59 1.53.22 2.66.1 2.94.7.78 1.13 1.77 1.13 2.98 0 4.25-2.6 5.19-5.07 5.47.39.34.74 1.02.74 2.06v3.05c0 .29.19.64.76.53 4.4-1.47 7.57-5.63 7.57-10.53C23.25 5.48 18.27.5 12 .5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT — Resume (download) */}
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
