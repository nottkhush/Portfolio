// modules/projects.tsx
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, GithubIcon } from "lucide-react";
import { dmSerifSans } from "@/lib/fonts";

type Project = {
  id: string;
  title: string;
  description: string;
  tech?: string[];
  image?: string;
  href?: string; // Live link (can be internal or external)
  github?: string; // GitHub repo (external)
};

const projects: Project[] = [
  {
    id: "p1",
    title: "Synchronous Chatting App",
    description:
      "A real-time chat application with group & personal messaging, emoji support, file sharing, and a fully responsive UI. Built for 200+ concurrent users.",
    tech: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Tailwind",
      "Zustand",
      "Socket.IO",
      "JWT",
      "Multer"
    ],
    image: "/synchat.png",
    github: "https://github.com/nottkhush/sync-chat-app",
  },
  {
    id: "p2",
    title: "Employee Management System",
    description:
      "A MERN-based employee portal used by 150+ employees with automated onboarding, live request tracking, and secure role-based authentication.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    image: "/ems.png",
    github: "https://github.com/nottkhush/Employee-management-system",
  },
  // Optional: keep or remove your previous sample projects
  // {
  //   id: "p3",
  //   title: "Taskly",
  //   description:
  //     "A tiny, fast todo app with offline support and keyboard-first UX.",
  //   tech: ["Next.js", "IndexedDB", "Tailwind"],
  //   image: "/placeholder-project.png",
  //   github: "https://github.com/nottkhush/sync-chat-app",
  // },
];


function isExternal(url?: string) {
  if (!url) return false;
  try {
    // treat hashes and relative paths as internal
    if (url.startsWith("#") || url.startsWith("/")) return false;
    // if url starts with protocol or // treat as external
    return /^(https?:)?\/\//.test(url) || url.includes("://");
  } catch {
    return false;
  }
}

function ProjectCardInner({ p }: { p: Project }) {
  return (
    <>
      <figure className="h-44 bg-gray-100 flex p-5 items-center justify-center overflow-hidden">
        {p.image ? (
          <Image
            src={p.image}
            alt={p.title + " screenshot"}
            width={800}
            height={420}
            className="object-cover rounded-md w-full h-full"
            loading="lazy"
            decoding="async"
            
          />
        ) : (
          <div className="text-gray-400">{p.title}</div>
        )}
      </figure>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900">{p.title}</h3>
        <p className="text-sm text-gray-600 mt-2">{p.description}</p>

        {p.tech && (
          <div className="mt-4 flex flex-wrap gap-2">
            {p.tech.map((t) => (
              <span
                key={t}
                className="text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-700"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-3">
            {p.href && (
              <a
                href={p.href}
                target={isExternal(p.href) ? "_blank" : undefined}
                rel={isExternal(p.href) ? "noopener noreferrer" : undefined}
                className="text-sm font-medium text-[#ed501f] hover:underline"
                aria-label={`Open live site for ${p.title}`}
              >
                Live
              </a>
            )}

            {p.github && (
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-700 hover:underline"
                aria-label={`Open GitHub repo for ${p.title}`}
              >
                <Image src={"/github.svg"} alt="GitHub" width={30} height={30} />
              </a>
            )}
          </div>

          <span className="text-gray-400" aria-hidden>
            <ChevronRight />
          </span>
        </div>
      </div>
    </>
  );
}

function ProjectCard({ p }: { p: Project }) {
  // Wrapper element classes for hover/focus effects
  const wrapperClasses =
    "block bg-white rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 focus-within:-translate-y-1 overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-300";

  // If href exists and is internal (hash or /path), use next/link for SPA nav.
  // If external, use anchor with target=_blank. If no href, render a non-clickable card.
  if (p.href) {
    if (isExternal(p.href)) {
      // external link open in new tab
      return (
        <a
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          className={wrapperClasses}
          aria-label={`Open project ${p.title} (external)`}
        >
          <ProjectCardInner p={p} />
        </a>
      );
    } else {
      // internal link (including hashes), use next/link
      return (
        <Link href={p.href} className={wrapperClasses} aria-label={`Open project ${p.title}`}>
          <ProjectCardInner p={p} />
        </Link>
      );
    }
  }

  // fallback: non-clickable card
  return (
    <article className={wrapperClasses} aria-label={p.title}>
      <ProjectCardInner p={p} />
    </article>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="h-full min-h-0 flex flex-col items-center justify-center bg-[#f7f6f2] px-6"
    >
      <div className="max-w-6xl w-full flex flex-col items-center">
        <h1 className={`${dmSerifSans.className} text-6xl font-extrabold text-gray-900 mb-10 text-center`}>
          Some Things I’ve Built
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {projects.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
