"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

type Direction = "up" | "down" | "left" | "right" | "none";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: Direction;
  distance?: number;
  blur?: boolean;
  scale?: boolean;
  className?: string;
  /** offset: [enter, exit] as viewport fractions, default ["start 0.88", "start 0.2"] */
  offset?: [string, string];
}

export function ScrollReveal({
  children,
  direction = "up",
  distance = 48,
  blur = false,
  scale = false,
  className,
  offset = ["start 0.88", "start 0.2"],
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset });

  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  const xInit = direction === "left" ? -distance : direction === "right" ? distance : 0;
  const yInit = direction === "up" ? distance : direction === "down" ? -distance : 0;

  const x = useTransform(scrollYProgress, [0, 0.6], [xInit, 0]);
  const y = useTransform(scrollYProgress, [0, 0.6], [yInit, 0]);
  const scaleV = useTransform(scrollYProgress, [0, 0.6], scale ? [0.94, 1] : [1, 1]);
  const filterV = useTransform(scrollYProgress, [0, 0.6], blur ? ["blur(10px)", "blur(0px)"] : ["blur(0px)", "blur(0px)"]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, x, y, scale: scaleV, filter: filterV } as Record<string, MotionValue>}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Staggered list: wraps each child in its own ScrollReveal */
export function ScrollRevealList({
  children,
  direction = "up",
  distance = 40,
  blur = false,
  stagger = 0.08,
  className,
}: {
  children: React.ReactNode[];
  direction?: Direction;
  distance?: number;
  blur?: boolean;
  stagger?: number;
  className?: string;
}) {
  return (
    <>
      {children.map((child, i) => (
        <ScrollReveal
          key={i}
          direction={direction}
          distance={distance}
          blur={blur}
          offset={[`start ${0.88 - i * stagger}`, "start 0.2"]}
          className={className}
        >
          {child}
        </ScrollReveal>
      ))}
    </>
  );
}
