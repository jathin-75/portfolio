"use client";

import { useState } from "react";
import { Terminal as TerminalIcon, CornerDownLeft, Sparkles, Copy, Check } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

interface TerminalProps {
  onOpenScheduleModal?: () => void;
}

export default function Terminal({ onOpenScheduleModal }: TerminalProps) {
  const [inputVal, setInputVal] = useState("");
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<Array<{ cmd: string; output: React.ReactNode }>>([
    {
      cmd: "whoami",
      output: (
        <div className="space-y-1 text-xs sm:text-sm text-[#A8A8A8]">
          <p className="text-[#F5F5F5] font-semibold">Kurapati Venkata Sai Jathin</p>
          <p>➜ Role: <span className="text-[#9E2A3A] font-medium">{PORTFOLIO_DATA.personal.role}</span></p>
          <p>➜ Focus: Backend Architecture • Distributed Systems • AI Solutions</p>
          <p>➜ Location: {PORTFOLIO_DATA.personal.location}</p>
        </div>
      )
    }
  ]);

  const handleCommand = (commandStr: string) => {
    const trimmed = commandStr.trim().toLowerCase();
    let responseOutput: React.ReactNode = null;

    switch (trimmed) {
      case "whoami":
        responseOutput = (
          <div className="space-y-1 text-xs sm:text-sm text-[#A8A8A8]">
            <p className="text-[#F5F5F5] font-semibold">Kurapati Venkata Sai Jathin</p>
            <p>➜ Role: <span className="text-[#9E2A3A] font-medium">{PORTFOLIO_DATA.personal.role}</span></p>
            <p>➜ Focus: High-Throughput Systems • Microservices • Sound AI</p>
          </div>
        );
        break;
      case "projects":
        responseOutput = (
          <div className="space-y-1 text-xs text-[#A8A8A8]">
            <p className="text-[#F5F5F5]">Featured Projects:</p>
            {PORTFOLIO_DATA.projects.map((p) => (
              <p key={p.id}>
                • <span className="text-white font-mono">{p.title}</span> ({p.category}) — {p.description}
              </p>
            ))}
          </div>
        );
        break;
      case "skills":
        responseOutput = (
          <div className="text-xs text-[#A8A8A8] space-y-1">
            <p className="text-white">Core Technologies:</p>
            <p>TypeScript, Python, C/C++, Next.js, FastAPI, Node.js, PostgreSQL, Redis, BullMQ, Docker, AWS</p>
          </div>
        );
        break;
      case "schedule":
        onOpenScheduleModal?.();
        responseOutput = <p className="text-xs text-[#9E2A3A]">Opening interactive scheduling modal...</p>;
        break;
      case "contact":
        responseOutput = (
          <div className="text-xs text-[#A8A8A8]">
            <p>Email: <a href={PORTFOLIO_DATA.personal.socials.email} target="_blank" rel="noopener noreferrer" className="text-white underline">{PORTFOLIO_DATA.personal.socials.directEmail}</a></p>
            <p>GitHub: <a href={PORTFOLIO_DATA.personal.socials.github} target="_blank" className="text-white underline">{PORTFOLIO_DATA.personal.socials.github}</a></p>
          </div>
        );
        break;
      case "clear":
        setHistory([]);
        setInputVal("");
        return;
      case "help":
      default:
        responseOutput = (
          <div className="text-xs text-[#666666] space-y-1 font-mono">
            <p className="text-[#A8A8A8]">Available commands:</p>
            <p><span className="text-white font-bold">whoami</span> - Display background summary</p>
            <p><span className="text-white font-bold">projects</span> - List top engineered projects</p>
            <p><span className="text-white font-bold">skills</span> - Inspect technical stack</p>
            <p><span className="text-white font-bold">schedule</span> - Open Google Meet scheduler</p>
            <p><span className="text-white font-bold">contact</span> - Show direct email & links</p>
            <p><span className="text-white font-bold">clear</span> - Reset terminal screen</p>
          </div>
        );
        break;
    }

    setHistory((prev) => [...prev, { cmd: commandStr, output: responseOutput }]);
    setInputVal("");
  };

  const handleCopyCommand = () => {
    navigator.clipboard.writeText("npx jathin-kurapati");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#111111] border border-white/10 rounded-xl overflow-hidden shadow-2xl shadow-black/80 font-mono text-xs sm:text-sm">
      {/* Header bar */}
      <div className="bg-[#141414] px-4 py-2.5 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#5A0F1B]/80 border border-[#7A1F2B]" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
          <span className="ml-2 text-[11px] text-[#A8A8A8] font-mono flex items-center gap-1.5">
            <TerminalIcon className="w-3.5 h-3.5 text-[#7A1F2B]" /> jathin@klinn-ai:~
          </span>
        </div>

        <button
          onClick={handleCopyCommand}
          className="text-[11px] text-[#666666] hover:text-white flex items-center gap-1 transition-colors px-2 py-0.5 rounded bg-white/5 hover:bg-white/10"
          title="Copy command"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>npx jathin</span>
            </>
          )}
        </button>
      </div>

      {/* Terminal Content */}
      <div className="p-4 sm:p-5 space-y-4 max-h-[320px] overflow-y-auto font-mono text-xs sm:text-sm">
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="flex items-center gap-2 text-[#7A1F2B] font-semibold">
              <span>$</span>
              <span className="text-[#F5F5F5]">{item.cmd}</span>
            </div>
            <div className="pl-4 border-l border-white/10">{item.output}</div>
          </div>
        ))}

        {/* Input prompt */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (inputVal.trim()) handleCommand(inputVal);
          }}
          className="flex items-center gap-2 pt-1"
        >
          <span className="text-[#7A1F2B] font-bold">$</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help' or 'schedule'..."
            className="flex-1 bg-transparent text-[#F5F5F5] placeholder-[#666666] focus:outline-none text-xs sm:text-sm font-mono caret-[#7A1F2B]"
          />
          <button type="submit" aria-label="Run command" className="text-[#666666] hover:text-white">
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* Quick Click Badges */}
      <div className="px-4 py-2 bg-[#080808]/60 border-t border-white/5 flex flex-wrap items-center gap-1.5 text-[11px] text-[#666666]">
        <span>Try:</span>
        {["whoami", "projects", "skills", "schedule", "help"].map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleCommand(cmd)}
            className="px-2 py-0.5 rounded bg-white/5 hover:bg-[#7A1F2B]/30 hover:text-white text-[#A8A8A8] transition-colors border border-white/5"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}
