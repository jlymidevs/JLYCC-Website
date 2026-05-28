"use client";

import { Youtube, Facebook, Instagram, Twitter, Mail, ArrowRight } from "lucide-react";

const footerLinks = {
  "Quick Links": [
    { label: "About Us", href: "#about" },
    { label: "News and Events", href: "https://jlyccnewsandevents.vibepreview.com" },
    { label: "Vision", href: "#vision" },
    { label: "Church Directory", href: "#directories" },
    { label: "Leadership", href: "#leadership" },
  ],
  "Ministry Groups": [
    { label: "JLYCC Main", href: "https://www.facebook.com/jlymiph/" },
    { label: "Kingdom Kids", href: "https://www.facebook.com/JLYCCKingdomKids" },
    { label: "Leadtakers Youth", href: "https://www.facebook.com/leadtakersmain" },
    { label: "Leadtakers Pro", href: "https://www.facebook.com/LeadtakersWC" },
  ],
  "Legal & Support": [
    { label: "SEC Reg No: ******44", href: "#" },
    { label: "Registered Non-Profit", href: "#" },
    { label: "Contact Us", href: "#contact" },
    { label: "Donate to Mission", href: "#donate" },
  ],
};

const socials = [
  { icon: Youtube, href: "https://www.youtube.com/@jlymicentral233", label: "YouTube channel" },
  { icon: Facebook, href: "https://www.facebook.com/jlymiph/", label: "Facebook page" },
  { icon: Instagram, href: "#", label: "Instagram profile" },
  { icon: Twitter, href: "#", label: "Twitter/X profile" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 border-t border-white/10" role="contentinfo">
      {/* Newsletter Bar */}
      <div className="bg-navy-900 border-b border-white/10">
        <div className="container-section py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-heading text-xl font-black text-white">
                Stay Connected with <span className="text-crimson-400">JLYCC</span>
              </h3>
              <p className="text-white/50 text-sm mt-1">
                Get weekly devotionals, event updates, and ministry news in your inbox.
              </p>
            </div>
            <form
              className="flex gap-3 w-full md:w-auto"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Newsletter subscription form"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-crimson-500 transition-colors"
                aria-label="Email address for newsletter"
              />
              <button
                type="submit"
                className="btn-primary text-sm px-5 py-3 whitespace-nowrap group"
                aria-label="Subscribe to newsletter"
              >
                Subscribe
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-section py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a
              href="#home"
              className="flex items-center gap-3 group mb-5"
              aria-label="Jesus Loves You City Church - Home"
            >
              <img
                src="https://assets.cdn.filesafe.space/DiD7LkE8KQEe9zWMUJl5/media/6a1842398c6ee94929b286b4.png"
                alt="JLYCC Logo"
                className="h-12 w-auto transition-transform group-hover:scale-110"
              />
            </a>

            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              A community grounded in faith, driven by love, and committed to changing lives.
              All are welcome in God's house.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-crimson-500/30 hover:border-crimson-500/50 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="font-heading font-black text-white text-sm uppercase tracking-wider mb-5">
                {heading}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/50 text-sm hover:text-crimson-400 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-section py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs text-center sm:text-left">
            © {currentYear} Jesus Loves You City Church. All rights reserved. SEC Registered Non-Profit (No. 0000110444).
          </p>
          <div className="flex items-center gap-5">
            {["Privacy Policy", "Terms of Use", "Cookie Policy"].map((label) => (
              <a
                key={label}
                href="#"
                className="text-white/30 text-xs hover:text-white/60 transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
