"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function ScrollButton({ href = "#about" }: { href?: string }) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center shadow-lg"
      aria-label="Scroll down"
    >
      <ChevronDown size={22} />
    </motion.a>
  );
}
