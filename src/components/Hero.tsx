"use client";

import { Calendar, ArrowDown, Mail, MapPin, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import Terminal from "./Terminal";

interface HeroProps {
  onOpenScheduleModal: () => void;
}

export default function Hero({ onOpenScheduleModal }: HeroProps) {
  const scrollToProjects = () => {
    const projElem = document.getElementById("projects");
    if (projElem) {
      projElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[90vh] pt-28 pb-16 sm:pt-36 sm:pb-24 flex flex-col justify-center overflow-hidden bg-[#080808]">
      {/* Ambient background maroon glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#7A1F2B]/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[250px] h-[250px] bg-[#5A0F1B]/10 blur-[90px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Hero Text */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6 text-left">
            {/* Availability Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111111] border border-[#7A1F2B]/40 text-xs font-mono text-[#F5F5F5] shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-400 font-semibold uppercase tracking-wider text-[10px]">Active</span>
              <span className="text-[#A8A8A8] hidden sm:inline">•</span>
              <span className="text-[#A8A8A8] truncate text-[11px] sm:text-xs">
                {PORTFOLIO_DATA.personal.statusBadge}
              </span>
            </div>

            {/* Role Header */}
            <div className="space-y-2">
              <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#7A1F2B] font-bold">
                Software Engineer & System Architect
              </p>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                Kurapati Venkata <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-white via-[#F5F5F5] to-[#A8A8A8] bg-clip-text text-transparent">
                  Sai Jathin
                </span>
              </h1>
            </div>

            {/* Role Sub-Title */}
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-mono text-[#A8A8A8]">
              <span className="text-white font-medium bg-[#141414] px-2.5 py-1 rounded border border-white/10">
                {PORTFOLIO_DATA.personal.role}
              </span>
              <span className="flex items-center gap-1 text-[#666666]">
                <MapPin className="w-3.5 h-3.5 text-[#7A1F2B]" /> {PORTFOLIO_DATA.personal.location}
              </span>
            </div>

            {/* One-Line Core Positioning Statement */}
            <p className="text-base sm:text-lg text-[#A8A8A8] max-w-xl font-normal leading-relaxed">
              {PORTFOLIO_DATA.personal.tagline}
            </p>

            {/* Primary CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <button
                onClick={onOpenScheduleModal}
                className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold font-mono text-white bg-[#7A1F2B] hover:bg-[#9E2A3A] rounded-lg transition-all duration-200 shadow-xl shadow-[#7A1F2B]/30 border border-[#9E2A3A]/40 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 cursor-pointer min-h-[48px]"
              >
                <Calendar className="w-4 h-4 text-white" />
                <span>Schedule a Meeting</span>
              </button>

              <button
                onClick={scrollToProjects}
                className="w-full sm:w-auto px-6 py-3.5 text-sm font-medium font-mono text-[#F5F5F5] bg-[#141414] hover:bg-[#1A1A1A] rounded-lg transition-all duration-200 border border-white/10 hover:border-white/20 flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
              >
                <span>View Projects</span>
                <ArrowDown className="w-4 h-4 text-[#A8A8A8]" />
              </button>
            </div>

            {/* Social Proof & Links */}
            <div className="pt-4 flex items-center gap-5 text-xs text-[#666666]">
              <a
                href={PORTFOLIO_DATA.personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#A8A8A8] hover:text-white transition-colors"
              >
                <GithubIcon className="w-4 h-4 text-[#7A1F2B]" />
                <span className="font-mono">GitHub</span>
              </a>

              <span className="text-white/10">•</span>

              <a
                href={PORTFOLIO_DATA.personal.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#A8A8A8] hover:text-white transition-colors"
              >
                <LinkedinIcon className="w-4 h-4 text-[#7A1F2B]" />
                <span className="font-mono">LinkedIn</span>
              </a>

              <span className="text-white/10">•</span>

              <a
                href={PORTFOLIO_DATA.personal.socials.email}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#A8A8A8] hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-[#7A1F2B]" />
                <span className="font-mono">Email</span>
              </a>
            </div>
          </div>

          {/* Right Column: Subtle Developer Terminal Visualization */}
          <div className="lg:col-span-5 w-full">
            <Terminal onOpenScheduleModal={onOpenScheduleModal} />
          </div>
        </div>
      </div>
    </section>
  );
}
