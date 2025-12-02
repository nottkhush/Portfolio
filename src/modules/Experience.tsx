// modules/experience.tsx
"use client";

import { dmSerifSans } from "@/lib/fonts";
import Image from "next/image";
import React from "react";

type ExperienceItem = {
  id: string;
  role: string;
  period: string;
  points: string[];
  company: {
    name: string;
    location: string;
    logo?: string;
  };
};

const experiences: ExperienceItem[] = [
  {
    id: "exp-printonia",
    role: "Junior Full-Stack Developer",
    period: "Jan 2025 – May 2025",
    points: [
      "Developed and maintained product and sales websites using React, Zustand, Tailwind CSS and REST APIs, ensuring timely updates and site reliability.",
      "Coordinated with cross-functional teams to smoothly roll out updates and launch new features.",
      "Designed and implemented 8 new features based on user research and demand, increasing engagement by 30% and retention by 15%.",
      "Used browser dev tools, Git and CI-friendly workflows to deliver stable releases and rapid fixes.",
    ],
    company: {
      name: "Printonia LLC",
      location: "Remote",
      logo: "/PrintoniaLC.svg", // optional — replace with a real asset or remove
    },
  },
  // optional: keep OctopusX or other prior work if you'd like them shown alongside the internship
  // {
  //   id: "exp-octopusx",
  //   role: "Software Engineer",
  //   period: "Apr 2023 – Apr 2025",
  //   points: [
  //     "Built and maintained backend systems and project architecture using a monorepo for multiple apps.",
  //     "Led front and back-end teams; handled task distribution, code reviews, and key technical decisions.",
  //     "Designed ERDs, planned flows, and built scalable database schemas for performance & reliability.",
  //     "Managed 20+ projects in one codebase, ensuring smooth collaboration & consistent development.",
  //   ],
  //   company: {
  //     name: "OctopusX",
  //     location: "Chattogram, Bangladesh",
  //     logo: "/octopusx.png",
  //   },
  // },
];

export default function Experience() {
  const scrollToContact = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const container = document.getElementById("scroll-container");
    const target = document.getElementById("contact");
    if (container && target) {
      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      container.scrollTo({
        top: container.scrollTop + (targetRect.top - containerRect.top),
        behavior: "smooth",
      });
    } else {
      // Next.js-friendly: update hash without full navigation
      try {
        history.replaceState(null, "", "#contact");
      } catch {
        window.location.hash = "contact";
      }
    }
  };

  return (
    <section
      id="experience"
      className="bg-white min-h-screen px-6 py-20 flex flex-col"
      aria-labelledby="experience-heading"
    >
      <div className="max-w-4xl mx-auto flex flex-col flex-1">
        <h2
          id="experience-heading"
          className={`${dmSerifSans.className} text-4xl md:text-5xl font-extrabold text-gray-900 mt-20 text-center`}
        >
          Where I&apos;ve Worked
        </h2>

        <div className="flex-1 flex items-center justify-center relative mt-8">
          {/* vertical line (desktop only) */}
          <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-gray-200" />

          {/* timeline dot */}
          <div className="hidden md:flex absolute left-0 items-center h-full">
            <div className="w-4 h-4 bg-orange-500 rounded-full ring-4 ring-white shadow-md translate-x-[-50%]" />
          </div>

          {/* the card */}
          <ol className="w-full space-y-6">
            {experiences.map((exp) => (
              <li key={exp.id} className="md:pl-20">
                <article className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition">
                  <header className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {exp.role}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {exp.company.name} • {exp.company.location}
                      </p>
                    </div>

                    <span className="inline-block text-xs font-medium bg-gray-100 text-gray-700 px-3 py-1 rounded-full whitespace-nowrap">
                      {exp.period}
                    </span>
                  </header>

                  <ul className="list-disc pl-5 mt-4 space-y-3 text-gray-700">
                    {exp.points.map((p, i) => (
                      <li key={i} className="leading-relaxed">
                        {p}
                      </li>
                    ))}
                  </ul>

                  <footer className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100">
                        {exp.company.logo ? (
                          <Image
                            src={exp.company.logo}
                            alt={exp.company.name}
                            width={36}
                            height={36}
                            className="object-contain"
                          />
                        ) : (
                          <div className="text-xs text-gray-400">Logo</div>
                        )}
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {exp.company.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {exp.company.location}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={scrollToContact}
                      className="text-sm font-semibold text-[#ed501f] hover:underline"
                    >
                      Get in touch
                    </button>
                  </footer>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
