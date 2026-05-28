"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";

const ministries = [
  { name: "JLYCC", sub: "Main Church", desc: "Join our main Sunday service! Stay updated through our Facebook page.", href: "https://www.facebook.com/jlymiph/", img: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=400&q=80" },
  { name: "KINGDOM KIDS", sub: "Ages 4–13", desc: "A fun environment for children to learn about God's love. Stay updated through our Facebook page.", href: "https://www.facebook.com/JLYCCKingdomKids", img: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400&q=80" },
  { name: "LEADTAKERS YOUTH", sub: "Ages 14–21", desc: "Join our vibrant youth community! Stay updated through our Facebook page.", href: "https://www.facebook.com/leadtakersmain", img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80" },
  { name: "LEADTAKERS PRO", sub: "Ages 22+", desc: "Leadership training for young adults. Stay updated through our Facebook page.", href: "https://www.facebook.com/LeadtakersWC", img: "https://images.unsplash.com/photo-1560439514-4e9645039924?w=400&q=80" },
];

export default function Community() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="community" className="py-24 bg-muted relative overflow-hidden" aria-labelledby="community-heading">
      <div className="container-section" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-14">
          <span className="section-label">Our Ministries</span>
          <div className="flex justify-center"><div className="section-divider" /></div>
          <h2 id="community-heading" className="section-title mt-2">Follow <span className="text-teal-500">Us</span></h2>
          <p className="text-dark/60 text-lg mt-4 max-w-2xl mx-auto">Follow us on our platforms and stay plugged into the life of the church — from anywhere in the world.</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ministries.map((m, i) => (
            <motion.div key={m.name} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.1 }} className="card-light rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300 group">
              <div className="h-40 overflow-hidden"><img src={m.img} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" /></div>
              <div className="p-5">
                <h3 className="font-heading font-black text-dark text-base">{m.name}</h3>
                <p className="text-teal-500 text-xs font-bold mb-2">{m.sub}</p>
                <p className="text-dark/60 text-sm leading-relaxed mb-4">{m.desc}</p>
                <a href={m.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white text-xs font-bold px-4 py-2 rounded-full transition-colors">Facebook <ExternalLink size={11} /></a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
