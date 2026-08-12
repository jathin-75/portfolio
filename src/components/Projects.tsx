"use client";

import { useState } from "react";
import { ArrowUpRight, Cpu, Layers, Sparkles } from "lucide-react";
import { GithubIcon } from "./Icons";
import { PORTFOLIO_DATA, Project } from "@/data/portfolio";
import ProjectModal from "./ProjectModal";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20 bg-[#080808] border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-3 flex-1">
            <span className="font-mono text-xs text-[#7A1F2B] uppercase tracking-widest font-bold">
              04 // Featured Engineering
            </span>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {PORTFOLIO_DATA.projects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => setSelectedProject(proj)}
              className="bg-[#111111] border border-white/10 hover:border-[#7A1F2B]/50 rounded-2xl p-6 sm:p-7 transition-all duration-300 hover:shadow-2xl hover:shadow-[#7A1F2B]/10 hover:-translate-y-1 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#7A1F2B]/5 rounded-bl-full pointer-events-none group-hover:bg-[#7A1F2B]/15 transition-colors" />

              <div>
                {/* Header row */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded bg-[#141414] text-xs font-mono text-[#9E2A3A] border border-[#7A1F2B]/30 group-hover:border-[#7A1F2B]">
                    {proj.category}
                  </span>

                  {proj.metrics && (
                    <span className="text-[11px] font-mono text-[#666666]">
                      {proj.metrics}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white group-hover:text-[#F5F5F5] transition-colors mb-2 flex items-center justify-between">
                  <span>{proj.title}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#666666] group-hover:text-white transition-colors" />
                </h3>

                {/* Short description */}
                <p className="text-xs sm:text-sm text-[#A8A8A8] leading-relaxed mb-6">
                  {proj.description}
                </p>
              </div>

              <div>
                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {proj.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded bg-[#141414] text-[11px] font-mono text-[#A8A8A8] border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                  {proj.technologies.length > 4 && (
                    <span className="px-2 py-1 rounded bg-[#141414] text-[11px] font-mono text-[#666666]">
                      +{proj.technologies.length - 4}
                    </span>
                  )}
                </div>

                {/* Footer Link & Modal Trigger */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs font-mono">
                  <span className="text-[#7A1F2B] font-semibold group-hover:underline flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5" /> Inspect Architecture
                  </span>

                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[#666666] hover:text-white p-1 rounded hover:bg-white/5 transition-colors"
                    aria-label={`GitHub repo for ${proj.title}`}
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
