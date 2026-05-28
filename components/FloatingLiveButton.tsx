"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Wifi } from "lucide-react";

export default function FloatingLiveButton() {
  const pathname = usePathname();
  if (pathname.startsWith("/pcm-dashboard")) return null;
  return (
    <motion.a
      href="#services"
      aria-label="Watch our live service"
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2.5 bg-navy-900 border border-crimson-500/60 text-white text-sm font-bold px-4 py-2.5 rounded-full shadow-xl shadow-black/30 hover:bg-crimson-600 hover:border-crimson-400 transition-all duration-300 hover:scale-105 active:scale-95"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2, duration: 0.5, ease: "easeOut" }}
    >
      {/* Pulsing live dot */}
      <span className="relative flex h-2.5 w-2.5 flex-shrink-0" aria-hidden="true">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-crimson-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-crimson-500" />
      </span>
      <Wifi size={13} />
      Watch Live
    </motion.a>
  );
}
