"use client";

import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  {
    label: "About",
    href: "#",
    children: [
      { label: "Our Church", href: "/our-church" },
      { label: "About Us", href: "/about" },
      { label: "Bible College", href: "/bible-college" },
    ],
  },
  {
    label: "Connect",
    href: "#",
    children: [
      { label: "Get Connected", href: "/connect" },
      { label: "Find a Church", href: "/find-a-church" },
    ],
  },
  {
    label: "Events",
    href: "#",
    children: [
      { label: "News & Events", href: "/newsandevents" },
      { label: "Recent Events", href: "/recent-events" },
      { label: "Sermon Archive", href: "/sermon-archive" },
    ],
  },
  { label: "Give", href: "#donate" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-dark/95 backdrop-blur-md shadow-lg py-2" : "bg-dark py-3"
      }`}
      role="banner"
    >
      <div className="container-section">
        <nav className="flex items-center justify-between" aria-label="Main navigation">
          <a href="/" className="flex items-center gap-2.5 group" aria-label="JLYCC Home">
            <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center font-heading font-black text-white text-sm transition-transform group-hover:scale-110">
              JL
            </div>
            <div className="hidden sm:block">
              <span className="block font-heading text-sm font-black text-white leading-none">JESUS LOVES YOU</span>
              <span className="block font-heading text-xs font-bold text-teal-400 tracking-widest uppercase leading-none mt-0.5">City Church</span>
            </div>
          </a>
          <ul className="hidden md:flex items-center gap-1" role="list">
            {navLinks.map((link) => (
              <li key={link.label} className="relative">
                {link.children ? (
                  <div
                    onMouseEnter={() => setOpenDropdown(link.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-all">
                      {link.label} <ChevronDown size={13} className={`transition-transform ${openDropdown === link.label ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {openDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 py-1 min-w-[180px] z-50"
                        >
                          {link.children.map((child) => (
                            <a key={child.label} href={child.href} className="block px-4 py-2.5 text-sm text-dark hover:text-teal-600 hover:bg-teal-50 transition-colors font-medium">
                              {child.label}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <a href={link.href} className="px-4 py-2 text-sm font-semibold text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-all block">
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
          <div className="hidden md:flex items-center gap-3">
            <a href="#stay-updated" className="btn-primary-dark text-sm px-5 py-2.5">CONNECT</a>
          </div>
          <button
            className="md:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-white/10 bg-dark overflow-hidden"
          >
            <nav className="container-section py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <a href={link.href} className="block px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-xl font-semibold transition-all" onClick={() => setMobileOpen(false)}>
                    {link.label}
                  </a>
                  {link.children && (
                    <div className="pl-4">
                      {link.children.map((child) => (
                        <a key={child.label} href={child.href} className="block px-4 py-2 text-white/60 hover:text-white text-sm rounded-xl transition-all" onClick={() => setMobileOpen(false)}>
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-3 pt-3 border-t border-white/10">
                <a href="#stay-updated" className="btn-primary w-full justify-center text-sm" onClick={() => setMobileOpen(false)}>CONNECT</a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
