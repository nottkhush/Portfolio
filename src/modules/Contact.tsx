"use client";

import Link from "next/link";
import { Mail, Linkedin, Github, FileText } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";

type SocialLinkProps = {
  href: string;
  label: string;
  icon: React.ReactNode;
  external?: boolean;
  className?: string;
};

function SocialLink({
  href,
  label,
  icon,
  external = true,
  className = "",
}: SocialLinkProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={label}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-md ${className} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-300 transition`}
    >
      {icon}
      <span className="text-sm font-semibold">{label}</span>
    </a>
  );
}

// typed variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      // use a cubic-bezier array (typed) instead of a string
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Contact() {
  return (
    <section
      id="contact"
      className="h-screen flex items-center justify-center bg-white px-6 py-20"
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="w-full max-w-3xl bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center"
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 font-logo"
        >
          Let’s build something together
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-gray-600 mb-6 max-w-2xl mx-auto"
        >
          I&apos;m always open to interesting ideas, collaborations, or full-time
          opportunities. If you&apos;ve got something in mind let&apos;s talk.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-4"
        >
          <SocialLink
            href="mailto:khush6569@gmail.com"
            label="Email me"
            icon={<Mail size={16} />}
            external={false}
            className="bg-[#ed501f] text-white shadow-md hover:shadow-lg"
          />

          <SocialLink
            href="https://www.linkedin.com/in/khushal-dev"
            label="LinkedIn"
            icon={<Linkedin size={16} />}
            className="bg-white border border-gray-200 text-gray-800 shadow-sm hover:shadow-md"
          />

          <SocialLink
            href="https://github.com/nottkhush"
            label="GitHub"
            icon={<Github size={16} />}
            className="bg-white border border-gray-200 text-gray-800 shadow-sm hover:shadow-md"
          />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-gray-600"
        >
          <a
            href="/resume.pdf"
            download="Khushal-Jain-Resume.pdf"
            className="inline-flex items-center gap-2"
            aria-label="Download resume"
          >
            <Button className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white border border-gray-200 text-gray-800 shadow-sm hover:shadow-md hover:text-white">
              <FileText size={16} />
              Download resume
            </Button>
          </a>

          <span className="hidden sm:inline-block">•</span>

          <Link href="#home" className="hover:underline">
            Back to top
          </Link>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-xs text-gray-400 mt-6"
        >
          Designed & built by <strong>Khushal Jain</strong>. ©{" "}
          {new Date().getFullYear()}
        </motion.p>
      </motion.div>
    </section>
  );
}
