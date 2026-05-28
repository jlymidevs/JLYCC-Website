"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, Clock } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Content */}
      <div className="relative z-10 container-section pt-32 pb-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="flex items-center gap-2 text-white/60 text-sm font-semibold">
              <MapPin size={14} className="text-teal-400" />
              <span>WELCOME TO JLYCC</span>
            </div>
            <span className="w-px h-4 bg-white/20" />
            <div className="flex items-center gap-2 text-white/60 text-sm font-semibold">
              <Clock size={14} className="text-teal-400" />
              <span>Sunday 10:00 AM</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-none text-shadow-lg mb-6"
          >
            <span className="text-white">JESUS LOVES YOU </span><span className="text-teal-400">CITY </span><span className="text-white">CHURCH</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-white/70 text-lg md:text-xl max-w-xl leading-relaxed mb-10"
          >
            A welcoming Christ-centered community helping people grow in faith, purpose, and service.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-wrap gap-4"
          >
            <a href="#stay-updated" className="btn-primary-dark text-base px-8 py-4 group">
              GET OUR APP!
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a href="https://www.youtube.com/@jlymicentral233/streams" target="_blank" rel="noopener noreferrer" className="btn-outline-dark text-base px-8 py-4">
              WATCH LIVE
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="mt-16 flex flex-wrap gap-8"
          >
            {[
              { value: "Open", label: "to everyone" },
              { value: "Family", label: "friendly" },
              { value: "Weekly", label: "gatherings" },
              { value: "1983", label: "established" },
            ].map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <div className="font-heading text-3xl font-black text-teal-400">{stat.value}</div>
                <div className="text-white/50 text-sm font-semibold mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        aria-hidden="true"
      >
        <span className="text-white/40 text-xs font-semibold tracking-widest uppercase">Scroll</span>
        <motion.div
          className="w-5 h-9 border-2 border-white/20 rounded-full flex justify-center pt-1.5"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 bg-teal-400 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
