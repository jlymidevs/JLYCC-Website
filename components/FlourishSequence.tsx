"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useSpring, useTransform, motion, MotionValue } from "framer-motion";

const FRAME_COUNT = 16;
const FRAME_PATH = (i: number) => `/sequence/frame_${i}.jpg`;

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

export default function FlourishSequence() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const [loadProgress, setLoadProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const { scrollYProgress } = useScroll({ target: wrapperRef });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Beat A: 0–20%
  const beatAOpacity = useTransform(smoothProgress, [0, 0.04, 0.16, 0.2], [0, 1, 1, 0]);
  const beatAY = useTransform(smoothProgress, [0, 0.04, 0.16, 0.2], [20, 0, 0, -20]);

  // Beat B: 25–45%
  const beatBOpacity = useTransform(smoothProgress, [0.25, 0.29, 0.41, 0.45], [0, 1, 1, 0]);
  const beatBY = useTransform(smoothProgress, [0.25, 0.29, 0.41, 0.45], [20, 0, 0, -20]);

  // Beat C: 50–70%
  const beatCOpacity = useTransform(smoothProgress, [0.5, 0.54, 0.66, 0.7], [0, 1, 1, 0]);
  const beatCY = useTransform(smoothProgress, [0.5, 0.54, 0.66, 0.7], [20, 0, 0, -20]);

  // Beat D: 75–95%
  const beatDOpacity = useTransform(smoothProgress, [0.75, 0.79, 0.91, 0.95], [0, 1, 1, 0]);
  const beatDY = useTransform(smoothProgress, [0.75, 0.79, 0.91, 0.95], [20, 0, 0, -20]);

  // "Scroll to Explore" fades out by 10%
  const scrollHintOpacity = useTransform(smoothProgress, [0, 0.05, 0.1], [1, 1, 0]);

  // Preload frames
  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = Array.from({ length: FRAME_COUNT }, (_, i) => {
      const img = new window.Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        loaded++;
        setLoadProgress(Math.round((loaded / FRAME_COUNT) * 100));
        if (loaded === FRAME_COUNT) setLoaded(true);
      };
      img.onerror = () => {
        loaded++;
        setLoadProgress(Math.round((loaded / FRAME_COUNT) * 100));
        if (loaded === FRAME_COUNT) setLoaded(true);
      };
      return img;
    });
    framesRef.current = images;
    return () => {
      framesRef.current = [];
    };
  }, []);

  // Draw frame on canvas
  useEffect(() => {
    if (!loaded) return;

    function drawFrame(index: number) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const img = framesRef.current[index];
      if (!img || !img.complete) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      // "contain" fit — preserve aspect ratio, fill canvas
      const scale = Math.max(cw / iw, ch / ih);
      const sw = iw * scale;
      const sh = ih * scale;
      const ox = (cw - sw) / 2;
      const oy = (ch - sh) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, ox, oy, sw, sh);
    }

    function resize() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(currentFrameRef.current);
    }

    window.addEventListener("resize", resize);
    resize();

    const unsubscribe = smoothProgress.on("change", (v) => {
      const index = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.floor(v * FRAME_COUNT))
      );
      if (index !== currentFrameRef.current) {
        currentFrameRef.current = index;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => drawFrame(index));
      }
    });

    // Draw first frame
    drawFrame(0);

    return () => {
      window.removeEventListener("resize", resize);
      unsubscribe();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
  }, [loaded, smoothProgress]);

  return (
    <>
      {/* Loading screen */}
      {!loaded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]">
          <div className="w-48 h-px bg-white/10 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-white/80 transition-all duration-300 rounded-full"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <p className="text-white/30 text-xs tracking-[0.3em] uppercase font-light">
            {loadProgress}%
          </p>
        </div>
      )}

      {/* Scroll wrapper — 400vh gives the scroll duration */}
      <div ref={wrapperRef} style={{ height: "400vh" }} className="relative">
        {/* Sticky canvas stage */}
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#050505]">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.6s ease" }}
          />

          {/* Beat A — JESUS LOVES YOU / CITY CHURCH centered hero */}
          <TextBeat opacity={beatAOpacity} y={beatAY}>
            <h1
              className="text-white/90 font-black tracking-tighter text-center leading-none"
              style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)" }}
            >
              JESUS LOVES YOU
              <br />
              CITY CHURCH
            </h1>
            <p className="text-white/50 text-base md:text-xl mt-6 tracking-widest uppercase font-light text-center">
              A gathering that changes everything
            </p>
          </TextBeat>

          {/* Beat B — WORSHIP left aligned */}
          <TextBeat opacity={beatBOpacity} y={beatBY} className="!items-start !justify-center">
            <div className="pl-[8vw]">
              <span className="text-teal-400/80 text-xs tracking-[0.4em] uppercase font-semibold block mb-3">
                Wind Network
              </span>
              <h2
                className="text-white/90 font-black tracking-tighter leading-none"
                style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
              >
                WORSHIP
              </h2>
              <p className="text-white/45 text-sm md:text-lg mt-4 max-w-xs font-light leading-relaxed">
                Come before God in reverence.<br />Loving Him deepens into wonder.
              </p>
            </div>
          </TextBeat>

          {/* Beat C — DISCIPLESHIP right aligned */}
          <TextBeat opacity={beatCOpacity} y={beatCY} className="!items-end !justify-center">
            <div className="pr-[8vw] text-right">
              <span className="text-teal-400/80 text-xs tracking-[0.4em] uppercase font-semibold block mb-3">
                Eagles Network
              </span>
              <h2
                className="text-white/90 font-black tracking-tighter leading-none"
                style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
              >
                DISCIPLE
              </h2>
              <p className="text-white/45 text-sm md:text-lg mt-4 max-w-xs ml-auto font-light leading-relaxed">
                Raising the next generation.<br />HeartLink, ISU, Children's.
              </p>
            </div>
          </TextBeat>

          {/* Beat D — REGISTER centered CTA */}
          <TextBeat opacity={beatDOpacity} y={beatDY}>
            <span className="text-teal-400/80 text-xs tracking-[0.4em] uppercase font-semibold block mb-5 text-center">
              Jesus Loves You City Church
            </span>
            <h2
              className="text-white/90 font-black tracking-tighter text-center leading-none"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
            >
              BE PART OF IT
            </h2>
            <p className="text-white/45 text-sm md:text-lg mt-4 text-center font-light">
              Join us. Come as you are. Leave transformed.
            </p>
            <a
              href="#stay-updated"
              className="mt-8 pointer-events-auto inline-flex items-center gap-3 border border-white/20 hover:border-white/50 text-white/70 hover:text-white text-sm tracking-[0.25em] uppercase px-8 py-3.5 transition-all duration-300 hover:bg-white/5"
            >
              Register Now
            </a>
          </TextBeat>

          {/* Scroll hint */}
          <motion.div
            style={{ opacity: scrollHintOpacity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
          >
            <span className="text-white/30 text-[10px] tracking-[0.35em] uppercase">
              Scroll to explore
            </span>
            <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
          </motion.div>
        </div>
      </div>
    </>
  );
}
