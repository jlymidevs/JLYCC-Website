"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const pillars = [
  { label: "WIND NETWORK", title: "WORSHIP", quote: '"Loving God causes us to WORSHIP Him"', desc: "Worship is not a destination but a journey — deepening as we grow in our knowledge and experience of God.", features: ["Ministerial service in the temple"], color: "border-teal-300 bg-teal-50", labelColor: "text-teal-500", titleColor: "text-teal-700", icon: "🙏" },
  { label: "EAGLES NETWORK", title: "DISCIPLESHIP", quote: '"Loving the brethren causes us to DISCIPLE"', desc: "Generational Discipleship. Focused on raising up the next generation of leaders through HeartLink, ISU, and Children's ministries.", features: ["HeartLink", "ISU", "Children's ministries"], color: "border-teal-400 bg-white ring-2 ring-teal-400/30", labelColor: "text-teal-500", titleColor: "text-teal-700", icon: "🦅" },
  { label: "AMEN / LEADTAKERS", title: "MISSION", quote: '"Loving the world causes us to do MISSIONS"', desc: "Evangelism & Missions. Focused on reaching the 7 Mountains of Society and expanding our territory globally.", features: ["Reaching the 7 Mountains of Society"], color: "border-teal-300 bg-teal-50", labelColor: "text-teal-500", titleColor: "text-teal-700", icon: "🌍" },
];

export default function Pillars() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="pillars" className="py-24 bg-muted relative overflow-hidden" aria-labelledby="pillars-heading">
      <div className="container-section relative">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-16">
          <span className="section-label">Vision Summary</span>
          <div className="flex justify-center"><div className="section-divider" /></div>
          <h2 id="pillars-heading" className="section-title mt-2">Our <span className="text-teal-500">Three Pillars</span></h2>
          <p className="text-dark/60 text-lg mt-5 max-w-2xl mx-auto leading-relaxed">The Jesus Loves You City Church exists to provide a place to come before God in worship; committed to disciples who demonstrate our faith; and establish churches all over the world.</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <motion.article key={pillar.label} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.15 }} className={`rounded-2xl border-2 ${pillar.color} p-8 hover:-translate-y-2 transition-all duration-300 hover:shadow-lg`}>
              <div className="text-4xl mb-4">{pillar.icon}</div>
              <span className={`text-xs font-black tracking-widest uppercase ${pillar.labelColor} mb-2 block`}>{pillar.label}</span>
              <h3 className={`font-heading text-2xl font-black ${pillar.titleColor} mb-3`}>{pillar.title}</h3>
              <p className="text-dark/60 text-sm italic mb-3">{pillar.quote}</p>
              <p className="text-dark/60 text-sm leading-relaxed mb-5">{pillar.desc}</p>
              <ul className="space-y-1.5">{pillar.features.map((f) => (<li key={f} className="flex items-center gap-2 text-sm text-dark/70"><span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />{f}</li>))}</ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
