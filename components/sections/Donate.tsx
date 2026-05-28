"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Building2, Handshake, ArrowRight, Shield, CheckCircle } from "lucide-react";

const tiers = [
  { icon: Heart, title: "SCHOLARSHIP FUND", desc: "Sponsor a student's theological education and living expenses during their training.", color: "text-teal-600", bg: "bg-teal-50", border: "border-teal-200 hover:border-teal-400", btnClass: "bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200", highlight: false },
  { icon: Building2, title: "GLOBAL MISSIONS", desc: "Fund church planting initiatives and missionary deployments across the globe.", color: "text-teal-700", bg: "bg-teal-500", border: "border-teal-400 hover:border-teal-600", btnClass: "bg-white/20 hover:bg-white/30 text-white border border-white/30", highlight: true },
  { icon: Handshake, title: "GENERAL MINISTRY", desc: "Support the day-to-day operations and expansion of Jesus Loves You Ministries.", color: "text-teal-600", bg: "bg-teal-50", border: "border-teal-200 hover:border-teal-400", btnClass: "bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200", highlight: false },
];

export default function Donate() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="donate" className="py-24 bg-white relative overflow-hidden" aria-labelledby="donate-heading">
      <div className="container-section" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-5">
          <span className="section-label">Partner With Us</span>
          <div className="flex justify-center"><div className="section-divider" /></div>
          <h2 id="donate-heading" className="section-title mt-2">Support Our <span className="text-teal-500">Non-Profit Mission</span></h2>
          <p className="text-dark/60 text-lg mt-5 max-w-2xl mx-auto">Jesus Loves You Ministries, Inc. operates as a registered non-profit organization. We rely on the faithful partnership of believers to fund scholarships, expand our facilities, and send missionaries worldwide.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="flex flex-wrap justify-center gap-6 mb-14">
          {[{icon: Shield, label: "Secure giving"},{icon: CheckCircle, label: "SEC-registered non-profit"},{icon: CheckCircle, label: "All proceeds support ministry outreach & community care"}].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-dark/50 text-sm font-semibold"><Icon size={15} className="text-teal-500" />{label}</div>
          ))}
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {tiers.map((tier, i) => { const Icon = tier.icon; return (
            <motion.div key={tier.title} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }} className={`relative group rounded-2xl border-2 ${tier.border} p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${tier.highlight ? "bg-teal-500 text-white" : "bg-white"}`}>
              {tier.highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-teal-600 text-xs font-black px-4 py-1 rounded-full uppercase tracking-widest shadow">Most Popular</div>}
              <div className={`w-14 h-14 ${tier.highlight ? "bg-white/20" : tier.bg} rounded-2xl flex items-center justify-center mb-6`}><Icon size={26} className={tier.highlight ? "text-white" : tier.color} /></div>
              <h3 className={`font-heading text-xl font-black mb-4 ${tier.highlight ? "text-white" : "text-dark"}`}>{tier.title}</h3>
              <p className={`text-sm leading-relaxed mb-8 ${tier.highlight ? "text-white/80" : "text-dark/60"}`}>{tier.desc}</p>
              <a href="#stay-updated" className={`w-full flex items-center justify-center gap-2 font-bold text-sm py-3 px-5 rounded-xl transition-all ${tier.btnClass}`}>Give Now <ArrowRight size={14} /></a>
            </motion.div>
          ); })}
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.7 }} className="text-center">
          <a href="#stay-updated" className="btn-primary text-lg px-10 py-4 group">MAKE A DONATION <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" /></a>
          <p className="text-dark/40 text-sm mt-4">All donations directed to our SEC-registered non-profit.</p>
        </motion.div>
      </div>
    </section>
  );
}
