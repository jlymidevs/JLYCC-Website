"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const features = [
  { title: "NON-PROFIT MINISTRY", desc: "SEC Reg No: ******44", color: "text-teal-600 bg-teal-50" },
  { title: "BIBLICAL TRUTH", desc: "Uncompromising theological depth", color: "text-teal-600 bg-teal-50" },
  { title: "GLOBAL MISSION", desc: "Training international students", color: "text-teal-600 bg-teal-50" },
  { title: "EXCELLENCE", desc: "Military-grade spiritual discipline", color: "text-teal-600 bg-teal-50" },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden" aria-labelledby="about-heading">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-mint-100/60 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" aria-hidden="true" />
      <div className="container-section">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }} className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img src="https://images.unsplash.com/photo-1585503418537-88331351ad99?w=800&q=80" alt="Jesus Loves You City Church" className="w-full h-[480px] object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent" />
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl px-5 py-4 shadow-lg">
                <div className="text-3xl font-heading font-black text-teal-600">1983</div>
                <div className="text-dark/70 text-sm font-semibold">Established</div>
              </div>
            </div>
            <motion.div className="absolute -top-6 -right-6 bg-teal-500 rounded-2xl px-5 py-4 shadow-xl text-white" animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity }} aria-hidden="true">
              <div className="text-base font-heading font-black">NON-PROFIT MINISTRY</div>
              <div className="text-teal-100 text-xs font-semibold mt-0.5">SEC Registered</div>
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            <span className="section-label">About The Ministry</span>
            <div className="section-divider" />
            <h2 id="about-heading" className="section-title mb-6">A Legacy of <span className="text-teal-500">Spiritual Authority</span></h2>
            <p className="text-dark/70 text-lg leading-relaxed mb-5">Jesus Loves You Ministries, Inc. is a registered non-stock, non-profit Christian Corporation dedicated to religious Christian activities. Since our founding on February 23, 1983, we have been committed to building a legacy of spiritual authority and leadership training for kingdom impact.</p>
            <p className="text-dark/60 leading-relaxed mb-10">We emphasize rigorous spiritual formation combined with practical leadership. We don't just educate; we forge nation influencers and spiritual generals equipped to take on the darkest territories.</p>
            <ul className="space-y-4 mb-10">
              {features.map(({ title, desc, color }) => (
                <li key={title} className="flex items-center gap-4">
                  <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center flex-shrink-0`}><span className="text-xs font-black">✓</span></div>
                  <div><div className="font-heading font-bold text-dark text-sm">{title}</div><div className="text-dark/50 text-sm">{desc}</div></div>
                </li>
              ))}
            </ul>
            <a href="https://jlyccnewsandevents.vibepreview.com" target="_blank" rel="noopener noreferrer" className="btn-primary group">NEWS AND EVENTS <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" /></a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
