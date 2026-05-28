"use client";

import Script from "next/script";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function StayUpdated() {
  return (
    <section id="stay-updated" className="py-24 relative overflow-hidden" aria-labelledby="stay-updated-heading">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-crimson-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container-section">

        <ScrollReveal direction="up" blur offset={["start 0.9", "start 0.5"]}>
          <div className="text-center mb-12">
            <span className="section-label">Stay Updated</span>
            <div className="flex justify-center"><div className="section-divider" /></div>
            <h2 id="stay-updated-heading" className="section-title text-white mt-2">
              Connect <span className="text-crimson-400">With Us</span>
            </h2>
            <p className="text-white/60 text-lg mt-5 max-w-2xl mx-auto">
              Get the latest news, event updates, and spiritual encouragement delivered to your inbox.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" distance={40} blur offset={["start 0.85", "start 0.4"]}>
          <div className="max-w-2xl mx-auto">
            <iframe
              src="https://api.leadconnectorhq.com/widget/form/1uY69mpQsh3XvrDqbXzj"
              style={{ width: "100%", height: "1117px", border: "none", borderRadius: "8px" }}
              id="inline-1uY69mpQsh3XvrDqbXzj"
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="FTV"
              data-height="1117"
              data-layout-iframe-id="inline-1uY69mpQsh3XvrDqbXzj"
              data-form-id="1uY69mpQsh3XvrDqbXzj"
              title="FTV"
            />
            <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
