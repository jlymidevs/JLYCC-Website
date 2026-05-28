"use client";

import { ScrollReveal } from "@/components/ScrollReveal";

const pillars = [
  {
    label: "WIND NETWORK",
    title: "WORSHIP",
    quote: '"Loving God causes us to WORSHIP Him"',
    desc: "Worship is not a destination but a journey — deepening as we grow in our knowledge and experience of God.",
    features: ["Ministerial service in the temple"],
    icon: "🙏",
  },
  {
    label: "EAGLES NETWORK",
    title: "DISCIPLESHIP",
    quote: '"Loving the brethren causes us to DISCIPLE"',
    desc: "Generational Discipleship. Focused on raising up the next generation of leaders through HeartLink, ISU, and Children's ministries.",
    features: ["HeartLink", "ISU", "Children's ministries"],
    featured: true,
    icon: "🦅",
  },
  {
    label: "AMEN / LEADTAKERS",
    title: "MISSION",
    quote: '"Loving the world causes us to do MISSIONS"',
    desc: "Evangelism & Missions. Focused on reaching the 7 Mountains of Society and expanding our territory globally.",
    features: ["Reaching the 7 Mountains of Society"],
    icon: "🌍",
  },
];

export default function Pillars() {
  return (
    <section id="pillars" className="py-24 relative overflow-hidden" aria-labelledby="pillars-heading">
      <div className="container-section relative">

        {/* Header */}
        <ScrollReveal direction="up" blur offset={["start 0.9", "start 0.5"]}>
          <div className="text-center mb-16">
            <span className="section-label">Vision Summary</span>
            <div className="flex justify-center"><div className="section-divider" /></div>
            <h2 id="pillars-heading" className="section-title mt-2">
              Our <span className="text-teal-500 dark:text-teal-400">Three Pillars</span>
            </h2>
            <p className="text-white/70 text-lg mt-5 max-w-2xl mx-auto leading-relaxed">
              The Jesus Loves You City Church exists to provide a place to come before God in worship; committed to disciples who demonstrate our faith; and establish churches all over the world.
            </p>
          </div>
        </ScrollReveal>

        {/* Cards — staggered from bottom */}
        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <ScrollReveal
              key={pillar.label}
              direction="up"
              distance={60}
              blur
              scale
              offset={[`start ${0.9 - i * 0.05}`, "start 0.2"]}
            >
              <article
                className={`rounded-2xl border-2 p-8 hover:-translate-y-2 transition-all duration-300 hover:shadow-lg h-full ${
                  pillar.featured
                    ? "border-teal-400 bg-white dark:bg-gray-800 ring-2 ring-teal-400/30"
                    : "border-teal-200 dark:border-teal-700 bg-teal-50/60 dark:bg-gray-800/60"
                }`}
              >
                <div className="text-4xl mb-4">{pillar.icon}</div>
                <span className="text-xs font-black tracking-widest uppercase text-teal-500 dark:text-teal-400 mb-2 block">
                  {pillar.label}
                </span>
                <h3 className="font-heading text-2xl font-black text-teal-700 dark:text-teal-300 mb-3">{pillar.title}</h3>
                <p className="text-white/60 text-sm italic mb-3">{pillar.quote}</p>
                <p className="text-white/70 text-sm leading-relaxed mb-5">{pillar.desc}</p>
                <ul className="space-y-1.5">
                  {pillar.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-white/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </article>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
