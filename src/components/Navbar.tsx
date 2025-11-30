"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { bebasNeue } from "@/lib/fonts";
import { ChevronDown } from "lucide-react";

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
  const [hidden, setHidden] = useState(false);
  const lastScrollRef = useRef(0);

  // active section id
  const [active, setActive] = useState<SectionId>("home");
  // keep a ref so IntersectionObserver handler doesn't need to re-create on active changes
  const activeRef = useRef<SectionId>(active);
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  // dropdown state
  const [contactOpen, setContactOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const firstItemRef = useRef<HTMLAnchorElement | null>(null);

  // Handle hide/show on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScrollRef.current && currentScroll > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollRef.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver: highlights nav links based on visible section.
  useEffect(() => {
    // Build list of elements to observe
    const observedEls: HTMLElement[] = [];
    for (const id of SECTIONS) {
      const el = document.getElementById(id) as HTMLElement | null;
      if (el) observedEls.push(el);
    }

    // If nothing to observe, bail
    if (observedEls.length === 0) return;

    // If you have a custom scroll container, use that as root so we observe relative to it.
    const rootEl = document.getElementById("scroll-container") ?? null;

    const observer = new IntersectionObserver(
      (entries) => {
        // We'll compute which observed element's center is nearest to the container center.
        // Use getBoundingClientRect for stable measurement.
        const rootRect = rootEl
          ? rootEl.getBoundingClientRect()
          : document.documentElement.getBoundingClientRect();
        const containerTop = rootRect.top;
        const containerBottom = rootRect.bottom;
        const containerCenter = (containerTop + containerBottom) / 2;

        let nearestId: SectionId | null = null;
        let nearestDist = Infinity;

        for (const el of observedEls) {
          const r = el.getBoundingClientRect();
          // skip elements that are completely offscreen? optional — but keeping them still works
          const elCenter = (r.top + r.bottom) / 2;
          const dist = Math.abs(elCenter - containerCenter);
          if (dist < nearestDist) {
            nearestDist = dist;
            nearestId = el.id as SectionId;
          }
        }

        if (nearestId && nearestId !== activeRef.current) {
          // batch update on next frame to avoid thrash
          requestAnimationFrame(() => {
            // extra safety: re-check in case active changed already
            if (nearestId && nearestId !== activeRef.current) {
              setActive(nearestId);
              activeRef.current = nearestId;
            }
          });
        }
      },
      {
        root: rootEl,
        // keep a slightly negative bottom margin so the section "enters" a bit earlier if you want
        rootMargin: "0px 0px -30% 0px",
        // a few thresholds are fine; we don't rely on intersectionRatio ordering anymore
        threshold: Array.from({ length: 5 }, (_, i) => i / 4),
      }
    );

    observedEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // we intentionally do not add `active` to deps - activeRef keeps us in sync
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // close dropdown on outside click or Escape
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
      if (e.key === "Escape") setContactOpen(false);
    }

    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [contactOpen]);

  // when opened, focus the first item
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
    // Allow normal modifier-click behavior to open in new tab — don't intercept those
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;

    e.preventDefault();

    // normalize id (strip leading # if present)
    const id = targetId.startsWith("#") ? targetId.slice(1) : targetId;

    const container = document.getElementById("scroll-container");
    const target =
      document.getElementById(id) ?? document.querySelector(`#${id}`);

    if (!container || !target) {
      // fallback: change hash so browser / next can handle it naturally
      window.location.hash = `#${id}`;
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const targetRect = (target as HTMLElement).getBoundingClientRect();
    const scrollTop =
      container.scrollTop + (targetRect.top - containerRect.top);

    container.scrollTo({
      top: Math.round(scrollTop),
      behavior: "smooth",
    });
  };

  // quick connector links (replace these with your real URLs)
  const linkedInUrl = "https://www.linkedin.com/in/khushal-dev";
  const githubUrl = "https://github.com/nottkhush";
  const mailTo = "mailto:khush6569@gmail.com";

  // helper to compute link class for active state — use border to avoid text reflow
  const linkClass = (id: SectionId) =>
    `cursor-pointer px-1 pb-1 transition-all duration-200 border-b-2 ${
      active === id
        ? "border-[#ed501f] text-[#ed501f]"
        : "border-transparent hover:border-gray-200 text-gray-900"
    }`;

  return (
    <div
      className={`
        fixed top-0 left-0 w-full z-50 flex justify-center mt-4 
        transition-transform duration-300 transform-gpu
        ${hidden ? "-translate-y-32" : "translate-y-0"}
      `}
    >
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

        {/* MIDDLE — Nav Items (plain anchors so our handler controls scroll) */}
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
                  : "text-[#ed501f] hover:underline"
              }`}
              aria-label="Open contact menu"
            >
              Contact
              <ChevronDown  size={18}/>
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
            href="/resume.pdf"
            download="Khushal-Jain-Resume.pdf"
            aria-label="Download resume"
          >
            <Button className="text-sm font-bold shadow-2xl shadow-gray-700">
              My Resume
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
