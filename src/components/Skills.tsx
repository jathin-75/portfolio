"use client";

import { PORTFOLIO_DATA } from "@/data/portfolio";
import { Terminal, Database, Server, Cpu, Cloud } from "lucide-react";

export default function Skills() {
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "languages":
        return <Terminal className="w-4 h-4 text-[#7A1F2B]" />;
      case "backend & systems":
        return <Server className="w-4 h-4 text-[#7A1F2B]" />;
      case "frontend":
        return <Cpu className="w-4 h-4 text-[#7A1F2B]" />;
      case "databases & storage":
        return <Database className="w-4 h-4 text-[#7A1F2B]" />;
      case "devops, cloud & tools":
      default:
        return <Cloud className="w-4 h-4 text-[#7A1F2B]" />;
    }
  };

  return (
    <section id="skills" className="py-20 bg-[#080808] border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-10">
          <span className="font-mono text-xs text-[#7A1F2B] uppercase tracking-widest font-bold">
            03 // Tech Stack & Competencies
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        </div>

        {/* Grouped Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO_DATA.skillCategories.map((group, idx) => (
            <div
              key={idx}
              className="bg-[#111111] border border-white/10 hover:border-[#7A1F2B]/40 rounded-2xl p-6 transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
                  <div className="flex items-center gap-2.5">
                    {getCategoryIcon(group.category)}
                    <h3 className="text-sm font-bold text-white tracking-wide uppercase font-mono">
                      {group.category}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-[#666666]">
                    {group.skills.length} items
                  </span>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-150 flex items-center gap-1.5 ${
                        skill.priority
                          ? "bg-[#141414] text-[#F5F5F5] border border-[#7A1F2B]/40 hover:border-[#9E2A3A] hover:bg-[#1A1A1A]"
                          : "bg-[#141414]/70 text-[#A8A8A8] border border-white/5 hover:text-white hover:bg-[#1A1A1A]"
                      }`}
                    >
                      {skill.priority && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7A1F2B]" />
                      )}
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
