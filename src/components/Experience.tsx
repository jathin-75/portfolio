"use client";

import { useState } from "react";
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export default function Experience() {
  const [expandedId, setExpandedId] = useState<string | null>("klinn-ai");

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="experience" className="py-20 bg-[#080808] border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-10">
          <span className="font-mono text-xs text-[#7A1F2B] uppercase tracking-widest font-bold">
            02 // Experience
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {PORTFOLIO_DATA.experience.map((exp) => {
            const isExpanded = expandedId === exp.id;
            return (
              <div
                key={exp.id}
                className="bg-[#111111] border border-white/10 hover:border-[#7A1F2B]/40 rounded-2xl p-6 sm:p-8 transition-all shadow-lg"
              >
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold bg-[#7A1F2B]/20 text-[#9E2A3A] border border-[#7A1F2B]/40">
                        Current Role
                      </span>
                      <span className="text-xs font-mono text-[#666666]">{exp.location}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                      {exp.role} <span className="text-[#7A1F2B] font-normal">@</span> {exp.company}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono text-[#A8A8A8] bg-[#141414] px-3 py-2 rounded-lg border border-white/5 w-fit">
                    <Calendar className="w-3.5 h-3.5 text-[#7A1F2B]" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Summary sentence */}
                <p className="pt-5 text-sm sm:text-base text-[#F5F5F5] font-medium leading-relaxed">
                  {exp.summary}
                </p>

                {/* Key Highlights */}
                <div className="pt-4 space-y-2.5">
                  {exp.highlights.slice(0, isExpanded ? exp.highlights.length : 2).map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#A8A8A8]">
                      <CheckCircle2 className="w-4 h-4 text-[#7A1F2B] shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="pt-5 flex flex-wrap items-center gap-2 border-t border-white/5 mt-5">
                  <span className="text-[11px] font-mono text-[#666666] mr-1">Technologies:</span>
                  {exp.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded bg-[#141414] text-xs font-mono text-[#A8A8A8] border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* View Details Toggle */}
                {exp.highlights.length > 2 && (
                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={() => toggleExpand(exp.id)}
                      className="text-xs font-mono text-[#7A1F2B] hover:text-[#9E2A3A] flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>{isExpanded ? "Show less" : "View details"}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
