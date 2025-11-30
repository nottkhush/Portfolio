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
      "Three.js"
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
      "REST APIs"
    ],
    color: "blue",
  },
  {
    category: "Tools & Libraries",
    items: [
      "Git",
      "GitHub",
      "Postman",
      "Browser DevTools"
    ],
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
    <section id="skills" className="h-full min-h-0 flex items-center justify-center bg-[#f7f6f2] px-6">
      <div className="w-full max-w-5xl">
        <h2 className={`${dmSerifSans.className} text-center text-6xl font-extrabold text-gray-900 mb-8`}>My Skills & Stack</h2>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Header with light gray rounded rectangles */}
          <div className="grid grid-cols-3 bg-white border-b border-gray-200">
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
          {rows.map((r, idx) => (
            <div
              key={r.category}
              className={`grid grid-cols-1 md:grid-cols-3 py-6 px-6 gap-4 items-start 
                border-b border-dashed border-gray-300 ${idx === rows.length - 1 ? "border-b-0" : ""}`}
            >
              {/* Category (left column on desktop, top on mobile) */}
              <div className="font-semibold text-gray-700 text-lg flex items-center md:items-start">
                {r.category}
              </div>

              {/* Items (spans 2 cols on desktop) */}
              <div className="md:col-span-2">
                <div className="flex flex-wrap gap-3">
                  {r.items.map((it) => (
                    <Badge key={it} label={it} color={r.color ?? "pink"} />
                  ))}
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
  const base = "text-sm px-3 py-1 rounded-md font-medium shadow-sm whitespace-nowrap";

  const variants: Record<Colors, string> = {
    pink: "bg-pink-50 text-pink-700",
    violet: "bg-violet-50 text-violet-700",
    blue: "bg-sky-50 text-sky-700",
    green: "bg-emerald-50 text-emerald-700",
    red: "bg-red-50 text-red-700",
  };

  return <span className={`${base} ${variants[color]}`}>{label}</span>;
}
