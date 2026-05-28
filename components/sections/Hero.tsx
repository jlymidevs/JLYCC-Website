"use client";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      <img
        src="/flourish.webp"
        alt="Flourish 2026 - Jesus Loves You City Church"
        className="absolute inset-0 w-full h-full object-cover object-center"
        aria-hidden="true"
      />
    </section>
  );
}
