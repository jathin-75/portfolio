"use client";

import { Award, ShieldCheck, FileCheck2, Sparkles, CheckCircle2 } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export default function CertificationsAndPatents() {
  const { patent, certifications } = PORTFOLIO_DATA;

  return (
    <section id="achievements" className="py-20 bg-[#080808] border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-10">
          <span className="font-mono text-xs text-[#7A1F2B] uppercase tracking-widest font-bold">
            05 // Patent & Certifications
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Patent Showcase */}
          <div className="lg:col-span-7 bg-[#111111] border border-white/10 hover:border-[#7A1F2B]/40 rounded-2xl p-6 sm:p-8 relative overflow-hidden transition-all group flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#7A1F2B]/10 blur-3xl rounded-full pointer-events-none group-hover:bg-[#7A1F2B]/20 transition-colors" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider font-semibold bg-[#7A1F2B]/20 text-[#9E2A3A] border border-[#7A1F2B]/40 flex items-center gap-1.5">
                  <FileCheck2 className="w-3.5 h-3.5" /> Official Registered Patent
                </span>
                <span className="text-xs font-mono text-[#666666]">
                  Reg: {patent.registrationDate}
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight uppercase leading-snug">
                  {patent.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#A8A8A8] mt-2 leading-relaxed">
                  {patent.summary}
                </p>
              </div>
            </div>

            {/* Patent Metadata Pills */}
            <div className="pt-6 border-t border-white/5 mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#141414] p-3.5 rounded-xl border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-[#666666] uppercase">Design Number</span>
                <p className="font-mono text-sm font-bold text-white">{patent.designNumber}</p>
              </div>

              <div className="bg-[#141414] p-3.5 rounded-xl border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-[#666666] uppercase">Issuing Authority</span>
                <p className="text-xs font-semibold text-[#F5F5F5] truncate">{patent.government}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Industry Certifications */}
          <div className="lg:col-span-5 bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-7 space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
                <Award className="w-4 h-4 text-[#7A1F2B]" />
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wide">
                  Accredited Certifications
                </h3>
              </div>

              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-3.5 rounded-xl bg-[#141414] border border-white/5 hover:border-white/20 transition-all flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-4 h-4 text-[#7A1F2B] shrink-0" />
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                          {cert.title}
                        </h4>
                        <span className="text-[11px] font-mono text-[#666666]">
                          {cert.issuer}
                        </span>
                      </div>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500/80 shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 text-[11px] font-mono text-[#666666] text-center">
              Verified & Audit Compliant Standards
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
