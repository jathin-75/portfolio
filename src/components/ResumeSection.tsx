"use client";

import { FileText, Download, ArrowUpRight } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export default function ResumeSection() {
  return (
    <section className="py-14 bg-[#080808] border-t border-white/5 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 bg-[#111111] border border-white/10 p-6 sm:p-8 rounded-2xl">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-[#7A1F2B]/20 text-[#9E2A3A] border border-[#7A1F2B]/40 shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Curriculum Vitae</h3>
            <p className="text-xs text-[#A8A8A8] mt-0.5">
              Software engineering background, architecture highlights, and research achievements.
            </p>
          </div>
        </div>

        <a
          href={PORTFOLIO_DATA.personal.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#7A1F2B] hover:bg-[#9E2A3A] text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#7A1F2B]/20 border border-[#9E2A3A]/40 shrink-0 min-h-[44px] cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Download Resume (PDF)</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
}
