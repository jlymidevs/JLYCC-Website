"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const leaders = [
  {
    name: "BHP. REY PE BENITO",
    title: "Senior Pastor / Founder",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "PS. JOY PE BENITO",
    title: "Co-Founder",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "DR. EDNA BALURAN",
    title: "Co-Founder",
    img: "https://randomuser.me/api/portraits/women/33.jpg",
  },
];

export default function Leadership() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="leadership" className="py-24 relative overflow-hidden" aria-labelledby="leadership-heading">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-teal-50 dark:bg-teal-900/10 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="container-section" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="section-label">Board of Directors</span>
          <div className="flex justify-center"><div className="section-divider" /></div>
          <h2 id="leadership-heading" className="section-title mt-2">
            Leadership <span className="text-teal-500 dark:text-teal-400">Credibility</span>
          </h2>
          <p className="text-white/70 text-lg mt-5 max-w-2xl mx-auto">
            Guided by seasoned ministers and professionals who embody the pioneer spirit and unwavering commitment to the Great Commission.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {leaders.map((leader, i) => (
            <motion.article
              key={leader.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group card-light rounded-2xl p-7 text-center hover:-translate-y-2 transition-all duration-300"
            >
              <div className="relative mx-auto mb-5 w-fit">
                <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-teal-100 dark:ring-teal-800 group-hover:ring-teal-400 transition-all duration-300 mx-auto">
                  <img
                    src={leader.img}
                    alt={`Portrait of ${leader.name}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="absolute bottom-1 right-1 w-4 h-4 bg-teal-400 rounded-full border-2 border-white dark:border-gray-800" aria-hidden="true" />
              </div>
              <h3 className="font-heading font-bold text-dark dark:text-white text-sm leading-tight mb-1">{leader.name}</h3>
              <p className="text-teal-500 dark:text-teal-400 text-xs font-bold">{leader.title}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
