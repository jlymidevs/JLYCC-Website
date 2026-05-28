"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const features = [
  { title: "NON-PROFIT MINISTRY", desc: "SEC Reg No: ******44", icon: "shield" },
  { title: "BIBLICAL TRUTH", desc: "Uncompromising theological depth", icon: "book" },
  { title: "GLOBAL MISSION", desc: "Training international students", icon: "globe" },
  { title: "EXCELLENCE", desc: "Military-grade spiritual discipline", icon: "medal" },
];

const iconMap: Record<string, string> = {
  shield: "🛡️",
  book: "📖",
  globe: "🌐",
  medal: "🏅",
};

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="about" className="py-24 bg-dark relative overflow-hidden" aria-labelledby="about-heading">

      <div className="container-section">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50, filter: "blur(12px)" }}
            animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: "transform, opacity, filter" }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://assets.cdn.filesafe.space/DiD7LkE8KQEe9zWMUJl5/media/6a18415e3e043d8258ebb19a.jpg"
                alt="Jesus Loves You City Church"
                className="w-full h-[480px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
              <div className="absolute bottom-6 left-6 bg-dark/80 backdrop-blur-sm rounded-xl px-5 py-4 shadow-lg border border-white/10">
                <div className="text-3xl font-heading font-black text-teal-400">1983</div>
                <div className="text-white/70 text-sm font-semibold">Established</div>
              </div>
            </div>
            <motion.div
              className="absolute -top-6 -right-6 bg-teal-500 rounded-2xl px-5 py-4 shadow-xl text-white"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              aria-hidden="true"
            >
              <div className="text-base font-heading font-black">NON-PROFIT MINISTRY</div>
              <div className="text-teal-100 text-xs font-semibold mt-0.5">SEC Registered</div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50, filter: "blur(12px)" }}
            animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: "transform, opacity, filter" }}
          >
            <span className="inline-block text-xs font-black tracking-widest uppercase text-teal-400 border border-teal-500/40 bg-teal-500/10 rounded-full px-4 py-1.5 mb-4">
              ABOUT THE MINISTRY
            </span>
            <h2 id="about-heading" className="font-heading text-4xl md:text-5xl font-black text-white leading-tight mb-6">
              A LEGACY OF<br />SPIRITUAL AUTHORITY
            </h2>
            <p className="text-white/70 text-base leading-relaxed mb-5">
              Jesus Loves You Ministries, Inc. is a registered non-stock, non-profit Christian Corporation dedicated to religious Christian activities. Since our founding on February 23, 1983, we have been committed to building a legacy of spiritual authority and leadership training for kingdom impact.
            </p>
            <p className="text-white/50 leading-relaxed mb-10">
              We emphasize rigorous spiritual formation combined with practical leadership. We don't just educate; we forge nation influencers and spiritual generals equipped to take on the darkest territories.
            </p>

            <div className="border-t border-white/10 pt-8 mb-10">
              <ul className="grid grid-cols-2 gap-5">
                {features.map(({ title, desc, icon }) => (
                  <li key={title} className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-teal-500/15 border border-teal-500/30 rounded-xl flex items-center justify-center flex-shrink-0 text-lg">
                      {iconMap[icon]}
                    </div>
                    <div>
                      <div className="font-heading font-black text-white text-sm">{title}</div>
                      <div className="text-white/40 text-xs mt-0.5">{desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <a href="https://jlyccnewsandevents.vibepreview.com" target="_blank" rel="noopener noreferrer" className="btn-primary group">
              NEWS AND EVENTS
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
