"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ArrowRight, ChevronRight } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

const contactInfo = [
  { icon: MapPin, label: "Address", value: "40 Mayon St, Mandaluyong City", sub: "Metro Manila, Philippines", href: "https://maps.app.goo.gl/rFzpPBUutEK7pqXg6" },
  { icon: Phone, label: "Phone", value: "77-000-5669", sub: "Mon–Fri, 9AM – 5PM", href: "tel:770005669" },
  { icon: Mail, label: "Email", value: "jlymi.central@gmail.com", sub: "We respond within 24 hours", href: "mailto:jlymi.central@gmail.com" },
  { icon: Clock, label: "Office Hours", value: "Mon–Fri: 9AM – 5PM", sub: "Sat–Sun: 8AM – 2PM", href: null },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden" aria-labelledby="contact-heading">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-crimson-500/5 rounded-full blur-3xl -translate-x-1/2" />
      </div>

      <div className="container-section">

        <ScrollReveal direction="up" blur offset={["start 0.9", "start 0.5"]}>
          <div className="text-center mb-14">
            <span className="section-label">Come Visit Us</span>
            <div className="flex justify-center"><div className="section-divider" /></div>
            <h2 id="contact-heading" className="section-title text-white mt-2">
              Ready to Rise as{" "}
              <span className="text-crimson-400">a Leader?</span>
            </h2>
            <p className="text-white/60 text-lg mt-5 max-w-2xl mx-auto">
              We&apos;d love to meet you. Come as you are. Leave transformed. Reach out to us today and take your next step.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-10">

          <ScrollReveal direction="left" distance={50} blur>
            <div className="space-y-5">
              {contactInfo.map(({ icon: Icon, label, value, sub, href }) => (
                <div key={label} className="card-glass rounded-xl p-5 flex items-start gap-4 group">
                  <div className="w-11 h-11 bg-crimson-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-crimson-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-0.5">{label}</div>
                    {href ? (
                      <a href={href} className="text-white font-semibold hover:text-crimson-400 transition-colors block"
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        aria-label={`${label}: ${value}`}>
                        {value}
                      </a>
                    ) : (
                      <div className="text-white font-semibold">{value}</div>
                    )}
                    <div className="text-white/50 text-sm mt-0.5">{sub}</div>
                  </div>
                </div>
              ))}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a href="tel:770005669" className="btn-primary flex-1 justify-center text-sm">
                  Call Us Now <ChevronRight size={15} />
                </a>
                <a href="mailto:jlymi.central@gmail.com" className="btn-outline flex-1 justify-center text-sm">
                  Send Email <ArrowRight size={15} />
                </a>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" distance={50} blur scale>
            <div className="rounded-2xl overflow-hidden h-full min-h-[400px] relative border border-white/10">
              <div className="w-full h-full bg-navy-800 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`, backgroundSize: "40px 40px" }} aria-hidden="true" />
                <div className="absolute inset-0" aria-hidden="true">
                  <div className="absolute top-1/3 left-0 right-0 h-8 bg-white/5" />
                  <div className="absolute top-2/3 left-0 right-0 h-5 bg-white/[0.03]" />
                  <div className="absolute left-1/3 top-0 bottom-0 w-8 bg-white/5" />
                  <div className="absolute left-2/3 top-0 bottom-0 w-5 bg-white/[0.03]" />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-crimson-500 rounded-full flex items-center justify-center shadow-2xl shadow-crimson-500/50">
                      <MapPin size={28} fill="white" className="text-white" />
                    </div>
                    <div className="w-3 h-3 bg-crimson-500 rounded-full mt-1 shadow-lg shadow-crimson-500/50" />
                  </motion.div>
                  <div className="mt-4 bg-navy-900/95 backdrop-blur-sm border border-white/15 rounded-xl px-5 py-3 text-center shadow-xl">
                    <div className="font-heading font-bold text-white text-sm">JLYCC Main Campus</div>
                    <div className="text-white/50 text-xs mt-0.5">40 Mayon St, Mandaluyong City</div>
                  </div>
                </div>
                <div className="absolute bottom-5 right-5">
                  <a href="https://maps.app.goo.gl/rFzpPBUutEK7pqXg6" target="_blank" rel="noopener noreferrer" className="btn-primary text-sm px-5 py-2.5">
                    Open in Maps <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
