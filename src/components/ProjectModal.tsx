"use client";

import { useEffect } from "react";
import { X, ExternalLink, Cpu, CheckCircle2, Layers, AlertCircle, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "./Icons";
import { Project } from "@/data/portfolio";
import SoundSimulator from "./SoundSimulator";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 modal-overlay bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#111111] border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl modal-content flex flex-col relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header */}
        <div className="sticky top-0 bg-[#111111]/95 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-[#7A1F2B]/20 text-[#9E2A3A] text-xs font-mono border border-[#7A1F2B]/40 font-semibold">
              {project.category}
            </span>
            {project.metrics && (
              <span className="text-xs font-mono text-[#A8A8A8] hidden sm:inline">
                ⚡ {project.metrics}
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#141414] hover:bg-[#1A1A1A] text-[#A8A8A8] hover:text-white border border-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Title & Description */}
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-base text-[#A8A8A8] leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          {/* Live Simulator for SonicSense AI */}
          {project.id === "sonicsense-ai" && (
            <div className="pt-2">
              <SoundSimulator />
            </div>
          )}

          {/* Problem vs Solution Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#141414] border border-white/5 rounded-xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-semibold">
                <AlertCircle className="w-4 h-4" />
                <span>The Challenge</span>
              </div>
              <p className="text-xs sm:text-sm text-[#A8A8A8] leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="bg-[#141414] border border-[#7A1F2B]/30 rounded-xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>The Engineering Solution</span>
              </div>
              <p className="text-xs sm:text-sm text-[#A8A8A8] leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Architecture Steps */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono text-[#7A1F2B] uppercase tracking-widest font-bold flex items-center gap-2">
              <Layers className="w-4 h-4" /> System Architecture
            </h3>
            <div className="bg-[#141414] border border-white/5 rounded-xl p-4 sm:p-5 space-y-2.5">
              {project.architecture.map((archItem, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#A8A8A8]">
                  <span className="font-mono text-[#7A1F2B] font-bold text-xs shrink-0 mt-0.5">
                    0{idx + 1}.
                  </span>
                  <span>{archItem}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono text-[#7A1F2B] uppercase tracking-widest font-bold flex items-center gap-2">
              <Cpu className="w-4 h-4" /> Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg bg-[#141414] border border-white/10 text-xs font-mono text-[#F5F5F5]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Links */}
        <div className="sticky bottom-0 bg-[#111111]/95 backdrop-blur-md border-t border-white/10 px-6 py-4 flex items-center justify-between gap-4">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-lg bg-[#7A1F2B] hover:bg-[#9E2A3A] text-white font-mono text-xs font-semibold transition-colors flex items-center gap-2 shadow-lg shadow-[#7A1F2B]/20 cursor-pointer min-h-[44px]"
          >
            <GithubIcon className="w-4 h-4" />
            <span>View Source on GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-mono text-[#A8A8A8] hover:text-white transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
