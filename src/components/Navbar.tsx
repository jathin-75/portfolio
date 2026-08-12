"use client";

import { useState, useEffect } from "react";
import { Menu, X, Calendar, ArrowUpRight } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

interface NavbarProps {
  onOpenScheduleModal: () => void;
}

export default function Navbar({ onOpenScheduleModal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Patent & Certs", href: "#achievements" },
    { label: "Contact", href: "#contact" }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#080808]/85 backdrop-blur-md border-b border-white/10 py-3 shadow-lg shadow-black/40"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Brand */}
          <a
            href="#"
            className="flex items-center gap-2 group font-mono text-sm sm:text-base font-bold text-[#F5F5F5] tracking-tight hover:text-white transition-colors"
          >
            <span className="text-[#7A1F2B] group-hover:text-[#9E2A3A] transition-colors font-mono font-extrabold">
              [ / &gt; ]
            </span>
            <span className="text-[#F5F5F5]">Kurapati</span>
            <span className="text-[#A8A8A8] text-xs font-normal">.dev</span>
          </a>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-xs lg:text-sm font-medium text-[#A8A8A8] hover:text-[#F5F5F5] transition-colors hover:scale-[1.02]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenScheduleModal}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium font-mono text-white bg-[#7A1F2B] hover:bg-[#9E2A3A] rounded-md transition-all duration-200 shadow-md shadow-[#7A1F2B]/20 border border-[#9E2A3A]/40 active:scale-95 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Schedule Meet</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenScheduleModal}
              aria-label="Schedule a Meeting"
              className="p-2 rounded-md bg-[#7A1F2B] text-white hover:bg-[#9E2A3A] transition-colors text-xs font-mono flex items-center gap-1.5"
            >
              <Calendar className="w-4 h-4" />
              <span className="text-[11px] font-semibold uppercase tracking-wider">Meet</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-[#A8A8A8] hover:text-white bg-[#141414] border border-white/10 hover:border-white/20 transition-all cursor-pointer"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col bg-[#080808]/98 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <a
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              className="font-mono text-base font-bold text-[#F5F5F5]"
            >
              <span className="text-[#7A1F2B]">[ / &gt; ]</span> Kurapati.dev
            </a>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-muted hover:text-white bg-[#141414] rounded-md border border-white/10"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col justify-between">
            <div className="flex flex-col gap-5">
              <span className="text-xs font-mono uppercase tracking-widest text-[#666666]">
                Navigation
              </span>
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-lg font-medium text-[#F5F5F5] hover:text-[#7A1F2B] transition-colors py-2 border-b border-white/5 flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#666666]" />
                </a>
              ))}
            </div>

            <div className="pt-8 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenScheduleModal();
                }}
                className="w-full py-3.5 px-4 text-sm font-semibold font-mono text-white bg-[#7A1F2B] hover:bg-[#9E2A3A] rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#7A1F2B]/30 border border-[#9E2A3A]/40 min-h-[48px]"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule a Meeting</span>
              </button>

              <a
                href={PORTFOLIO_DATA.personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 text-xs font-mono text-center text-[#A8A8A8] bg-[#141414] hover:bg-[#1A1A1A] rounded-lg border border-white/10 transition-colors"
              >
                Download Resume (PDF)
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
