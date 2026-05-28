"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, MapPin, ChevronRight } from "lucide-react";

const schedule = [
  { name: "JLYCC Main Service", desc: "Our main worship gathering", times: "10:00 AM – 12:00 PM", note: "Main" },
  { name: "KingdomKids", desc: "Fun and faith for children · Age: 4–13", times: "10:00 AM – 12:00 PM", note: "Kids" },
  { name: "Leadtakers Youth", desc: "Vibrant community for youth · Age: 14–21", times: "2:00 PM – 4:00 PM", note: "Youth" },
  { name: "Leadtakers Pro", desc: "Leadership for young adults · Age: 22+", times: "2:00 PM – 4:00 PM", note: "Pro" },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="services" className="py-24 relative overflow-hidden" aria-labelledby="services-heading">
      <div className="container-section" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="section-label">Join Us Live</span>
          <div className="flex justify-center"><div className="section-divider" /></div>
          <h2 id="services-heading" className="section-title mt-2">
            SUNDAY <span className="text-teal-500 dark:text-teal-400">SERVICE</span>
          </h2>
          <p className="text-white/70 text-lg mt-5 max-w-xl mx-auto">
            Experience our latest message and join us every Sunday for live worship and teaching.
          </p>
          <p className="text-white/50 text-sm mt-1">JLYMI Central Sunday Service</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Video */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-video bg-dark">
              <iframe
                src="https://www.youtube.com/embed?listType=user_uploads&list=jlymicentral233"
                title="JLYCC Live Stream"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="mt-4 flex gap-3">
              <a
                href="https://www.youtube.com/@jlymicentral233/streams"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex-1 justify-center text-sm"
              >
                Watch Live Streams
              </a>
              <a href="/sermon-archive" className="btn-outline flex-1 justify-center text-sm">
                Sermon Archive
              </a>
            </div>
          </motion.div>

          {/* Schedule */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-4"
          >
            {/* Location */}
            <div className="card-light p-5 rounded-2xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-teal-50 dark:bg-teal-900/30 rounded-xl flex items-center justify-center">
                  <MapPin size={18} className="text-teal-500 dark:text-teal-400" />
                </div>
                <div>
                  <div className="font-heading font-bold text-dark dark:text-white text-sm">Main Campus</div>
                  <div className="text-dark/50 dark:text-white/50 text-xs">40 Mayon St, Mandaluyong City, Metro Manila</div>
                </div>
              </div>
              <a href="https://maps.app.goo.gl/rFzpPBUutEK7pqXg6" target="_blank" rel="noopener noreferrer"
                className="text-teal-500 dark:text-teal-400 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                Get Directions <ChevronRight size={14} />
              </a>
            </div>

            {/* Service cards */}
            {schedule.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                className="card-light p-5 rounded-2xl hover:-translate-y-0.5 transition-transform"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-teal-50 dark:bg-teal-900/30 rounded-lg flex items-center justify-center">
                      <Clock size={13} className="text-teal-500 dark:text-teal-400" />
                    </div>
                    <span className="font-heading font-black text-dark dark:text-white text-sm">{item.name}</span>
                  </div>
                  <span className="text-xs text-teal-600 dark:text-teal-300 font-bold bg-teal-50 dark:bg-teal-900/30 px-2.5 py-0.5 rounded-full">{item.note}</span>
                </div>
                <p className="text-white/50 text-xs pl-9">{item.desc}</p>
                <p className="text-dark/70 dark:text-white/70 text-sm pl-9 font-semibold mt-0.5">{item.times}</p>
              </motion.div>
            ))}

            <a href="https://maps.app.goo.gl/rFzpPBUutEK7pqXg6" target="_blank" rel="noopener noreferrer"
              className="btn-primary w-full justify-center text-sm">
              Plan My First Visit <ChevronRight size={16} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
