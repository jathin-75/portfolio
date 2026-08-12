"use client";

import { Activity, Zap, Sparkles, Command, ShieldCheck } from "lucide-react";

interface LiveTelemetryProps {
  onOpenAIAssistant: () => void;
}

export default function LiveTelemetry({ onOpenAIAssistant }: LiveTelemetryProps) {
  return (
    <div className="fixed bottom-4 right-4 z-30 hidden sm:flex items-center gap-3">
      {/* Floating AI Assistant Trigger Button */}
      <button
        onClick={onOpenAIAssistant}
        className="px-3.5 py-2 rounded-full bg-[#111111]/90 backdrop-blur-md border border-[#7A1F2B]/40 hover:border-[#9E2A3A] text-xs font-mono text-[#F5F5F5] hover:text-white transition-all shadow-xl shadow-black/60 flex items-center gap-2 group cursor-pointer"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#7A1F2B] group-hover:rotate-12 transition-transform" />
        <span>AI Copilot</span>
        <span className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-[#A8A8A8] font-bold">
          ⌘K
        </span>
      </button>

      {/* Telemetry Status Strip */}
      <div className="px-3 py-1.5 rounded-full bg-[#111111]/90 backdrop-blur-md border border-white/10 text-[11px] font-mono text-[#A8A8A8] flex items-center gap-3 shadow-lg">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-white font-semibold">99.9% Operational</span>
        </div>

        <span className="text-white/10">•</span>

        <div className="flex items-center gap-1">
          <Zap className="w-3 h-3 text-[#7A1F2B]" />
          <span>12ms Latency</span>
        </div>
      </div>
    </div>
  );
}
