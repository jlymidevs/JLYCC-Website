"use client";

import { Heart, Building2, Handshake, ArrowRight, Shield, CheckCircle } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

const tiers = [
  {
    icon: Heart,
    title: "SCHOLARSHIP FUND",
    desc: "Sponsor a student's theological education and living expenses during their training.",
    color: "text-teal-600",
    bg: "bg-teal-50",
    border: "border-teal-200 hover:border-teal-400",
    btnClass: "bg-teal-50 hover:bg-teal-100 dark:bg-teal-900/20 dark:hover:bg-teal-900/40 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-700",
    highlight: false,
  },
  {
    icon: Building2,
    title: "GLOBAL MISSIONS",
    desc: "Fund church planting initiatives and missionary deployments across the globe.",
    color: "text-teal-700",
    bg: "bg-teal-500",
    border: "border-teal-400 hover:border-teal-600",
    btnClass: "bg-white/20 hover:bg-white/30 text-white border border-white/30",
    highlight: true,
  },
  {
    icon: Handshake,
    title: "GENERAL MINISTRY",
    desc: "Support the day-to-day operations and expansion of Jesus Loves You Ministries.",
    color: "text-teal-600",
    bg: "bg-teal-50",
    border: "border-teal-200 hover:border-teal-400",
    btnClass: "bg-teal-50 hover:bg-teal-100 dark:bg-teal-900/20 dark:hover:bg-teal-900/40 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-700",
    highlight: false,
  },
];

export default function Donate() {
  return (
    <section id="donate" className="py-24 relative overflow-hidden" aria-labelledby="donate-heading">
      <div className="container-section">

        {/* Header */}
        <ScrollReveal direction="up" blur offset={["start 0.9", "start 0.5"]}>
          <div className="text-center mb-5">
            <span className="section-label">Partner With Us</span>
            <div className="flex justify-center"><div className="section-divider" /></div>
            <h2 id="donate-heading" className="section-title mt-2">
              Support Our <span className="text-teal-500 dark:text-teal-400">Non-Profit Mission</span>
            </h2>
            <p className="text-white/70 text-lg mt-5 max-w-2xl mx-auto">
              Jesus Loves You Ministries, Inc. operates as a registered non-profit organization. We rely on the faithful partnership of believers to fund scholarships, expand our facilities, and send missionaries worldwide.
            </p>
          </div>
        </ScrollReveal>

        {/* Trust badges */}
        <ScrollReveal direction="up" offset={["start 0.85", "start 0.5"]}>
          <div className="flex flex-wrap justify-center gap-6 mb-14">
            {[
              { icon: Shield, label: "Secure giving" },
              { icon: CheckCircle, label: "SEC-registered non-profit" },
              { icon: CheckCircle, label: "All proceeds support ministry outreach & community care" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-white/60 text-sm font-semibold">
                <Icon size={15} className="text-teal-500" />
                {label}
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Tier cards — staggered */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {tiers.map((tier, i) => {
            const Icon = tier.icon;
            return (
              <ScrollReveal
                key={tier.title}
                direction="up"
                distance={60}
                blur
                scale
                offset={[`start ${0.88 - i * 0.05}`, "start 0.2"]}
              >
                <div
                  className={`relative group rounded-2xl border-2 ${tier.border} p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl h-full ${
                    tier.highlight ? "bg-teal-500 text-white" : "bg-white dark:bg-gray-800"
                  }`}
                >
                  {tier.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-teal-600 text-xs font-black px-4 py-1 rounded-full uppercase tracking-widest shadow">
                      Most Popular
                    </div>
                  )}
                  <div className={`w-14 h-14 ${tier.highlight ? "bg-white/20" : tier.bg} rounded-2xl flex items-center justify-center mb-6`}>
                    <Icon size={26} className={tier.highlight ? "text-white" : tier.color} />
                  </div>
                  <h3 className={`font-heading text-xl font-black mb-4 ${tier.highlight ? "text-white" : "text-dark dark:text-white"}`}>{tier.title}</h3>
                  <p className={`text-sm leading-relaxed mb-8 ${tier.highlight ? "text-white/80" : "text-white/70"}`}>{tier.desc}</p>
                  <a
                    href="#stay-updated"
                    className={`w-full flex items-center justify-center gap-2 font-bold text-sm py-3 px-5 rounded-xl transition-all ${tier.btnClass}`}
                  >
                    Give Now <ArrowRight size={14} />
                  </a>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* CTA */}
        <ScrollReveal direction="up" offset={["start 0.85", "start 0.5"]}>
          <div className="text-center">
            <a href="#stay-updated" className="btn-primary text-lg px-10 py-4 group">
              MAKE A DONATION
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </a>
            <p className="text-white/50 text-sm mt-4">
              All donations directed to our SEC-registered non-profit.
            </p>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
