"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

export default function CallToAction() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="py-24 relative overflow-hidden" aria-labelledby="cta-heading" ref={ref}>
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-white/5 rounded-full blur-3xl" />
      </div>
      <div className="container-section relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block text-white/70 font-bold text-xs tracking-widest uppercase mb-3">The JLYCC Difference</span>
          <h2 id="cta-heading" className="font-heading text-4xl md:text-5xl font-black text-white mb-6">
            ANSWER THE CALL<br />WITH EXCELLENCE
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-4 leading-relaxed">
            We don't just impart knowledge; we forge character. Our environment is designed to strip away complacency and build spiritual generals.
          </p>
          <p className="text-white/60 text-base italic mb-10">&quot;The just shall live by faith...&quot; — Habakkuk 2:4</p>
          <a href="#stay-updated" className="inline-flex items-center gap-2 bg-white text-teal-700 font-bold px-8 py-4 rounded-full hover:bg-teal-50 transition-all hover:scale-105 active:scale-95 shadow-lg group">
            Get Involved
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
