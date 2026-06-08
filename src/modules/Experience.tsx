// modules/experience.tsx
"use client";

import { dmSerifSans } from "@/lib/fonts";
import Image from "next/image";
import React from "react";
import { motion, Variants } from "framer-motion";

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
    id: "exp-vujis",
    role: "Software Developer",
    period: "Feb 2026 – Jun 2026",
    points: [
      "Built and maintained a Node.js automation server handling 20+ inbound webhook sources across Typeform, Meta Instant Forms, LinkedIn, Calendly, and Stripe - processing thousands of leads per month with zero manual intervention.",
      "Designed a country-based lead assignment engine routing across 10 regional sales teams using round-robin and least-loaded algorithms with per-rep throttle constraints, synced to 24 SendGrid pipeline lists and Close CRM in real time.",
      "Built a Chrome Extension (Manifest V3) intercepting live DNB.com traffic with a serialised POST queue, exponential backoff retry, and persistent failed-request store via chrome.alarms - deployed to production with no user interaction required.",
      "Deployed a Python AI company matching pipeline on EC2 via PM2, integrating OpenAI and fuzzy scoring (token_sort_ratio + fuzz.ratio) to link internal records to Dun & Bradstreet - fixed scoring logic that was silently producing wrong matches.",
      "Migrated AI contact search from Perplexity to OpenAI Responses API after benchmarking 50+ runs, achieving a 3.7x cost reduction from $0.605 to $0.164 per run with improved accuracy.",
    ],
    company: {
      name: "Vujis",
      location: "Hyderabad, India",
      logo: "/VujisLogo.png",
    },
  },
  {
    id: "exp-printonia",
    role: "Full-Stack Developer Intern",
    period: "Jan 2025 – May 2025",
    points: [
      "Developed and maintained product and sales websites using React, Zustand, Tailwind CSS and REST APIs, ensuring timely updates and site reliability.",
      "Coordinated with cross-functional teams to smoothly roll out updates and launch new features.",
      "Designed and implemented 8 new features based on user research and demand, increasing engagement by 30% and retention by 15%.",
      "Used browser dev tools, Git and CI-friendly workflows to deliver stable releases and rapid fixes.",
    ],
    company: {
      name: "Printonia",
      location: "Remote",
      logo: "/PrintoniaLC.svg",
    },
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

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
      className="bg-white px-6 py-16 flex flex-col"
      aria-labelledby="experience-heading"
    >
      <motion.div
        className="max-w-4xl mx-auto w-full"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <motion.h2
          variants={itemVariants}
          id="experience-heading"
          className={`${dmSerifSans.className} text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 text-center mb-10 md:mb-12`}
        >
          Where I&apos;ve Worked
        </motion.h2>

        <div className="relative">
          {/* vertical line (desktop only) */}
          <div className="hidden md:block absolute left-4 top-0 bottom-0 w-px bg-gray-200" />
          {/* timeline dot (desktop only) */}
          <div className="hidden md:flex absolute left-4 top-4 -translate-x-1/2">
            <div className="w-4 h-4 bg-orange-500 rounded-full ring-4 ring-white shadow-md" />
          </div>

          <ol className="space-y-6 md:space-y-8">
            {experiences.map((exp) => (
              <motion.li key={exp.id} variants={itemVariants} className="md:pl-12">
                <article className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-7 hover:shadow-md transition">
                  <header className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                        {exp.role}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {exp.company.name} • {exp.company.location}
                      </p>
                    </div>
                    <span className="inline-block self-start text-xs font-medium bg-gray-100 text-gray-700 px-3 py-1 rounded-full whitespace-nowrap">
                      {exp.period}
                    </span>
                  </header>

                  <ul className="list-disc pl-4 sm:pl-5 mt-4 space-y-2.5 text-gray-700 text-sm sm:text-base">
                    {exp.points.map((p, i) => (
                      <li key={i} className="leading-relaxed">
                        {p}
                      </li>
                    ))}
                  </ul>

                  <footer className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
              </motion.li>
            ))}
          </ol>
        </div>
      </motion.div>
    </section>
  );
}
