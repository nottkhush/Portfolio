import { dmSerifSans } from "@/lib/fonts";
import React, { JSX } from "react";

type Colors = "pink" | "violet" | "blue" | "green" | "red";

type Row = {
  category: string;
  items: string[];
  color?: Colors;
};

const rows: Row[] = [
  {
    category: "Languages",
    items: ["C++", "JavaScript", "SQL", "HTML", "CSS"],
    color: "pink",
  },
  {
    category: "Frontend",
    items: [
      "React",
      "Next.js",
      "Zustand",
      "Tailwind CSS",
      "ShadCN",
      "GSAP",
      "Three.js",
    ],
    color: "violet",
  },
  {
    category: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "Socket.IO",
      "JWT",
      "Better-auth",
      "REST APIs",
    ],
    color: "blue",
  },
  {
    category: "Tools & Libraries",
    items: ["Git", "GitHub", "Postman", "Browser DevTools"],
    color: "red",
  },
  {
    category: "Databases",
    items: ["MongoDB", "PostgreSQL", "MySQL"],
    color: "green",
  },
];

export default function SkillsAndStack(): JSX.Element {
  return (
    <section
      id="skills"
      // removed h-full, added scroll-mt to avoid navbar overlap,
      // and balanced vertical padding
      className="relative bg-[#f7f6f2] px-4 sm:px-6  sm:py-20 md:py-24 flex justify-center scroll-mt-24 md:scroll-mt-32"
    >
      <div className="w-full max-w-5xl">
        <h2
          className={`${dmSerifSans.className} text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-8 sm:mb-10`}
        >
          My Skills & Stack
        </h2>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Desktop header */}
          <div className="hidden md:grid grid-cols-3 bg-white border-b border-gray-200">
            <div className="py-4 pl-6">
              <div className="inline-block bg-gray-100 border border-gray-200 rounded-md px-4 py-2 font-semibold text-gray-700">
                Category
              </div>
            </div>

            <div className="py-4 col-span-2">
              <div className="inline-block bg-gray-100 border border-gray-200 rounded-md ml-3 px-4 py-2 font-semibold text-gray-700">
                Tools & Tech
              </div>
            </div>
          </div>

          {/* Rows */}
          {rows.map((r) => (
            <div
              key={r.category}
              className="border-b border-dashed border-gray-200 last:border-b-0"
            >
              <div className="flex flex-col gap-3 md:grid md:grid-cols-3 md:gap-4 py-5 px-4 sm:px-6">
                {/* Category */}
                <div className="flex flex-col gap-1">
                  {/* Mobile label */}
                  <span className="md:hidden text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Category
                  </span>

                  <span className="font-semibold text-base sm:text-lg text-gray-800">
                    {r.category}
                  </span>
                </div>

                {/* Items */}
                <div className="md:col-span-2 flex flex-col gap-2">
                  {/* Mobile label */}
                  <span className="md:hidden text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Tools & Tech
                  </span>

                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {r.items.map((it) => (
                      <Badge key={it} label={it} color={r.color ?? "pink"} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Badge component with color variants (type-safe) ---------- */
function Badge({ label, color = "pink" }: { label: string; color?: Colors }) {
  const base =
    "text-xs sm:text-sm px-2.5 sm:px-3 py-1 rounded-md font-medium shadow-sm whitespace-nowrap";

  const variants: Record<Colors, string> = {
    pink: "bg-pink-50 text-pink-700",
    violet: "bg-violet-50 text-violet-700",
    blue: "bg-sky-50 text-sky-700",
    green: "bg-emerald-50 text-emerald-700",
    red: "bg-red-50 text-red-700",
  };

  return <span className={`${base} ${variants[color]}`}>{label}</span>;
}
