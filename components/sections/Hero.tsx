"use client";

import { useRef } from "react";
import { useScroll, useSpring, useTransform, motion, MotionValue } from "framer-motion";

function TextBeat({
  children,
  opacity,
  y,
  className = "",
}: {
  children: React.ReactNode;
  opacity: MotionValue<number>;
  y: MotionValue<number>;
  className?: string;
}) {
  return (
    <motion.div
      style={{ opacity, y }}
      className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: wrapperRef });
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const aOp = useTransform(smooth, [0, 0.04, 0.16, 0.2], [0, 1, 1, 0]);
  const aY  = useTransform(smooth, [0, 0.04, 0.16, 0.2], [20, 0, 0, -20]);

  const bOp = useTransform(smooth, [0.25, 0.29, 0.41, 0.45], [0, 1, 1, 0]);
  const bY  = useTransform(smooth, [0.25, 0.29, 0.41, 0.45], [20, 0, 0, -20]);

  const cOp = useTransform(smooth, [0.5, 0.54, 0.66, 0.7], [0, 1, 1, 0]);
  const cY  = useTransform(smooth, [0.5, 0.54, 0.66, 0.7], [20, 0, 0, -20]);

  const dOp = useTransform(smooth, [0.75, 0.79, 0.91, 0.95], [0, 1, 1, 0]);
  const dY  = useTransform(smooth, [0.75, 0.79, 0.91, 0.95], [20, 0, 0, -20]);

  const hintOp = useTransform(smooth, [0, 0.05, 0.1], [1, 1, 0]);

  return (
    <section id="home" aria-label="Hero section">
      <div ref={wrapperRef} style={{ height: "400vh" }} className="relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <TextBeat opacity={aOp} y={aY}>
            <h1
              className="text-white/90 font-black tracking-tighter text-center leading-none drop-shadow-2xl"
              style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)" }}
            >
              FLOURISH
              <br />
              <span className="text-white/40" style={{ fontSize: "0.45em", letterSpacing: "0.4em" }}>
                2026
              </span>
            </h1>
            <p className="text-white/60 text-base md:text-xl mt-6 tracking-widest uppercase font-light text-center drop-shadow-lg">
              A gathering that changes everything
            </p>
          </TextBeat>

          <TextBeat opacity={bOp} y={bY} className="!items-start !justify-center">
            <div className="pl-[8vw]">
              <span className="text-teal-400/90 text-xs tracking-[0.4em] uppercase font-semibold block mb-3 drop-shadow">
                Wind Network
              </span>
              <h2
                className="text-white/90 font-black tracking-tighter leading-none drop-shadow-2xl"
                style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
              >
                WORSHIP
              </h2>
              <p className="text-white/60 text-sm md:text-lg mt-4 max-w-xs font-light leading-relaxed drop-shadow">
                Come before God in reverence.<br />Loving Him deepens into wonder.
              </p>
            </div>
          </TextBeat>

          <TextBeat opacity={cOp} y={cY} className="!items-end !justify-center">
            <div className="pr-[8vw] text-right">
              <span className="text-teal-400/90 text-xs tracking-[0.4em] uppercase font-semibold block mb-3 drop-shadow">
                Eagles Network
              </span>
              <h2
                className="text-white/90 font-black tracking-tighter leading-none drop-shadow-2xl"
                style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
              >
                DISCIPLE
              </h2>
              <p className="text-white/60 text-sm md:text-lg mt-4 max-w-xs ml-auto font-light leading-relaxed drop-shadow">
                Raising the next generation.<br />HeartLink, ISU, Children&apos;s.
              </p>
            </div>
          </TextBeat>

          <TextBeat opacity={dOp} y={dY}>
            <span className="text-teal-400/90 text-xs tracking-[0.4em] uppercase font-semibold block mb-3 text-center drop-shadow">
              AMEN / Leadtakers
            </span>
            <h2
              className="text-white/90 font-black tracking-tighter text-center leading-none drop-shadow-2xl"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
            >
              MISSION
            </h2>
            <p className="text-white/60 text-base md:text-xl mt-3 text-center tracking-widest uppercase font-light drop-shadow">
              Be Part of It
            </p>
            <p className="text-white/50 text-sm md:text-lg mt-3 text-center font-light drop-shadow">
              Join us. Come as you are. Leave transformed.
            </p>
            <a
              href="#stay-updated"
              className="mt-8 pointer-events-auto inline-flex items-center gap-3 border border-white/30 hover:border-white/60 text-white/80 hover:text-white text-sm tracking-[0.25em] uppercase px-8 py-3.5 transition-all duration-300 hover:bg-white/10 backdrop-blur-sm"
            >
              Register Now
            </a>
          </TextBeat>

          <motion.div
            style={{ opacity: hintOp }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
          >
            <span className="text-white/40 text-[10px] tracking-[0.35em] uppercase drop-shadow">
              Scroll to explore
            </span>
            <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
