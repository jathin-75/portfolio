"use client";

import { GraduationCap, MapPin, Building2, Code, User } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export default function About() {
  const { education, location, bioShort, avatarUrl, name } = PORTFOLIO_DATA.personal;

  const keyFocus = [
    {
      title: "Backend Architecture",
      desc: "High-throughput APIs using FastAPI, Node.js, and Redis queues."
    },
    {
      title: "Intelligent Systems",
      desc: "Real-time sound detection and machine learning model serving."
    },
    {
      title: "Data Pipelines",
      desc: "Relational database tuning with PostgreSQL, MySQL, and Prisma ORM."
    }
  ];

  return (
    <section id="about" className="py-20 bg-[#080808] border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-10">
          <span className="font-mono text-xs text-[#7A1F2B] uppercase tracking-widest font-bold">
            01 // About
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Statement Card */}
          <div className="lg:col-span-7 bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#7A1F2B]/10 blur-2xl rounded-full pointer-events-none" />

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-snug">
              {bioShort}
            </h2>

            <p className="text-sm text-[#A8A8A8] leading-relaxed">
              Passionate about building resilient, low-latency web platforms and high-volume backend microservices. I specialize in turning complex architectural requirements into reliable, production-ready code.
            </p>

            {/* Key Engineering Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {keyFocus.map((pillar, i) => (
                <div
                  key={i}
                  className="bg-[#141414] p-4 rounded-xl border border-white/5 hover:border-[#7A1F2B]/40 transition-colors space-y-1.5"
                >
                  <p className="font-mono text-xs text-white font-semibold flex items-center gap-1.5">
                    <Code className="w-3.5 h-3.5 text-[#7A1F2B]" />
                    {pillar.title}
                  </p>
                  <p className="text-[12px] text-[#A8A8A8] leading-tight">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Supporting Info & Avatar Column */}
          <div className="lg:col-span-5 space-y-4">
            {/* Profile Avatar Card */}
            <div className="bg-[#111111] border border-white/10 hover:border-[#7A1F2B]/40 rounded-2xl p-5 flex items-center gap-4 transition-all">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#141414] border border-[#7A1F2B]/50 shrink-0 flex items-center justify-center shadow-lg shadow-[#7A1F2B]/20">
                <img
                  src={avatarUrl}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="text-sm font-bold text-white">{name}</h3>
                <p className="text-xs font-mono text-[#7A1F2B] mt-0.5">Software Engineering Intern</p>
                <p className="text-[11px] font-mono text-[#666666] mt-0.5">Hyderabad, India</p>
              </div>
            </div>

            {/* Education Card */}
            <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all space-y-3">
              <div className="flex items-center gap-3 text-[#7A1F2B]">
                <div className="p-2 rounded-lg bg-[#7A1F2B]/10 border border-[#7A1F2B]/30">
                  <GraduationCap className="w-5 h-5 text-[#9E2A3A]" />
                </div>
                <div>
                  <span className="font-mono text-xs text-[#666666] uppercase tracking-wider">Education</span>
                  <h3 className="text-base font-bold text-white">{education.degree}</h3>
                </div>
              </div>
              <div className="pt-1 flex items-center justify-between text-xs font-mono text-[#A8A8A8]">
                <span>{education.institution}</span>
                <span className="text-[#666666]">{education.period}</span>
              </div>
            </div>

            {/* Location & Current Role Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#111111] border border-white/10 rounded-xl p-4 space-y-1">
                <span className="font-mono text-[11px] text-[#666666] uppercase">Location</span>
                <p className="text-sm font-semibold text-white flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#7A1F2B]" /> {location}
                </p>
              </div>

              <div className="bg-[#111111] border border-white/10 rounded-xl p-4 space-y-1">
                <span className="font-mono text-[11px] text-[#666666] uppercase">Current Organization</span>
                <p className="text-sm font-semibold text-white flex items-center gap-1.5 truncate">
                  <Building2 className="w-4 h-4 text-[#7A1F2B]" /> Klinn AI
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
