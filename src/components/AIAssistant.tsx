"use client";

import { useState, useEffect } from "react";
import { Sparkles, Command, Search, X, Bot, ArrowRight, Calendar, FileText, Code2, Send } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenScheduleModal: () => void;
}

export default function AIAssistant({ isOpen, onClose, onOpenScheduleModal }: AIAssistantProps) {
  const [query, setQuery] = useState("");
  const [activeResponse, setActiveResponse] = useState<React.ReactNode | null>(null);

  // Global Keyboard Listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent or modal toggle
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickPrompts = [
    "Summarize Jathin's engineering background",
    "What models were used in SonicSense AI?",
    "What are his core backend skills?",
    "How do I schedule a technical meeting?",
    "Where is Jathin located?"
  ];

  const handleQuerySubmit = (userQuery: string) => {
    const q = userQuery.toLowerCase().trim();
    setQuery(userQuery);

    if (q.includes("background") || q.includes("who") || q.includes("summary") || q.includes("role")) {
      setActiveResponse(
        <div className="space-y-3 text-xs sm:text-sm text-[#A8A8A8]">
          <p className="text-white font-semibold">Kurapati Venkata Sai Jathin</p>
          <p>Software Engineering Intern at <strong className="text-white">Klinn AI</strong> based in Hyderabad, India.</p>
          <p>Specializes in high-throughput backend architecture, sound event AI classification, and distributed systems using FastAPI, Next.js, Redis, and PostgreSQL.</p>
        </div>
      );
    } else if (q.includes("sonicsense") || q.includes("model") || q.includes("ai") || q.includes("sound")) {
      setActiveResponse(
        <div className="space-y-3 text-xs sm:text-sm text-[#A8A8A8]">
          <p className="text-white font-semibold">SonicSense AI Neural Pipeline:</p>
          <p>Uses <strong className="text-white">YAMNet</strong> deep neural audio embeddings served via a low-latency <strong className="text-white">FastAPI</strong> microservice and Web Audio API streaming with sub-80ms classification latency.</p>
        </div>
      );
    } else if (q.includes("skill") || q.includes("backend") || q.includes("database") || q.includes("stack")) {
      setActiveResponse(
        <div className="space-y-2 text-xs sm:text-sm text-[#A8A8A8]">
          <p className="text-white font-semibold">Core Stack Competencies:</p>
          <p>• <strong>Languages:</strong> TypeScript, Python, C/C++, SQL</p>
          <p>• <strong>Backend:</strong> FastAPI, Node.js, Express, Redis, BullMQ</p>
          <p>• <strong>Databases:</strong> PostgreSQL, MongoDB, MySQL, Prisma, SQLAlchemy</p>
          <p>• <strong>DevOps:</strong> Docker, AWS, Git, Linux, GitHub Actions</p>
        </div>
      );
    } else if (q.includes("schedule") || q.includes("meet") || q.includes("interview") || q.includes("contact")) {
      setActiveResponse(
        <div className="space-y-3 text-xs sm:text-sm text-[#A8A8A8]">
          <p className="text-white font-semibold">Ready to Schedule?</p>
          <p>You can directly reserve a 30-minute Google Meet session with Jathin for Technical, Career, or Project discussions.</p>
          <button
            onClick={() => {
              onClose();
              onOpenScheduleModal();
            }}
            className="px-4 py-2 rounded-lg bg-[#7A1F2B] text-white font-mono text-xs font-semibold flex items-center gap-2"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Open Scheduler Modal</span>
          </button>
        </div>
      );
    } else {
      setActiveResponse(
        <div className="space-y-2 text-xs text-[#A8A8A8]">
          <p className="text-white font-semibold">Engineering Profile Overview:</p>
          <p>Kurapati Venkata Sai Jathin is a Computer Science Engineer focusing on backend microservices, real-time sound detection AI, and high-concurrency cloud systems.</p>
        </div>
      );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 modal-overlay bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#111111] border border-white/10 rounded-2xl w-full max-w-xl max-h-[85vh] overflow-hidden shadow-2xl modal-content flex flex-col relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-[#141414]">
          <Bot className="w-5 h-5 text-[#7A1F2B] shrink-0" />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (query.trim()) handleQuerySubmit(query);
            }}
            className="flex-1 flex items-center gap-2"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask AI Copilot about Jathin's background, AI projects, stack..."
              className="w-full bg-transparent text-sm font-mono text-white placeholder-[#666666] focus:outline-none"
              autoFocus
            />
            <button type="submit" aria-label="Submit prompt" className="text-[#666666] hover:text-white">
              <Send className="w-4 h-4" />
            </button>
          </form>

          <button
            onClick={onClose}
            className="p-1 rounded text-[#666666] hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-6 max-h-[420px]">
          {/* Quick Prompts */}
          <div>
            <span className="block text-[11px] font-mono text-[#666666] uppercase mb-2">Suggested Queries:</span>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuerySubmit(p)}
                  className="px-3 py-1.5 rounded-lg bg-[#141414] hover:bg-[#7A1F2B]/30 hover:text-white border border-white/5 text-xs font-mono text-[#A8A8A8] transition-colors text-left"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Active Response Display */}
          {activeResponse && (
            <div className="bg-[#141414] border border-[#7A1F2B]/40 rounded-xl p-4 space-y-2 animate-in fade-in duration-150">
              <div className="flex items-center gap-2 text-xs font-mono text-[#7A1F2B]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Copilot Response:</span>
              </div>
              {activeResponse}
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-[#080808]/80 border-t border-white/5 px-5 flex items-center justify-between text-[11px] font-mono text-[#666666]">
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-white">ESC</span>
            <span>to close</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#A8A8A8]">Powered by Portfolio Telemetry</span>
          </div>
        </div>
      </div>
    </div>
  );
}
