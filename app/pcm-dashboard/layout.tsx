import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PCM Dashboard — JLYCC",
};

export default function PCMLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-950 text-white antialiased font-sans">
      {children}
    </div>
  );
}
