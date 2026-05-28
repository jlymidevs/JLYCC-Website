"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap } from "lucide-react";

export default function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(false);

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="bg-crimson-600 text-white text-sm font-semibold py-2.5 px-4 text-center relative">
            <div className="flex items-center justify-center gap-2.5 flex-wrap">
              <Zap size={14} className="text-yellow-300 flex-shrink-0" aria-hidden="true" />
              <span>
                <strong>Join Us This Sunday!</strong> — Special Easter Series:{" "}
                <em>"He Is Risen"</em> · 9AM &amp; 11AM · In-Person &amp; Online
              </span>
              <a
                href="#services"
                className="underline underline-offset-2 hover:text-yellow-200 transition-colors whitespace-nowrap font-bold"
                aria-label="Get details about our Easter service"
              >
                Learn More →
              </a>
            </div>
            <button
              onClick={() => setDismissed(true)}
              aria-label="Dismiss announcement"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-crimson-700 transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
