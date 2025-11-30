// components/NavCharm.tsx (use in your Navbar)
"use client";
import { motion } from "framer-motion";
import React from "react";

export default function NavCharm() {
  return (
    <motion.div
      initial={{ rotate: -6 }}
      animate={{ rotate: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 12 }}
      className="ml-3 flex items-center"
      // small gentle hover swing
      whileHover={{ rotate: [0, -8, 0], transition: { duration: 0.6 } }}
    >
      {/* rope */}
      <div aria-hidden className="w-px h-4 bg-gray-200 -mb-1" />
      {/* charm: circle with initials */}
      <div className="w-8 h-8 rounded-full bg-[#ed501f] text-white flex items-center justify-center text-sm shadow">
        KJ
      </div>
    </motion.div>
  );
}
