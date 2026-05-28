"use client";

export default function VideoBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <video
        src="https://assets.cdn.filesafe.space/DiD7LkE8KQEe9zWMUJl5/media/6a09f496c56db4013f8c0e5f.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ opacity: 0.95 }}
      />
    </div>
  );
}
