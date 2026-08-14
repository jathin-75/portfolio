"use client";

import { useState } from "react";
import { Calendar, Mail, Send, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { PORTFOLIO_DATA } from "@/data/portfolio";

interface ContactSectionProps {
  onOpenScheduleModal: () => void;
}

export default function ContactSection({ onOpenScheduleModal }: ContactSectionProps) {
  const [showFormModal, setShowFormModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message })
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to dispatch message.");
      }

      setStatusMsg({ type: "success", text: json.message || "Message sent successfully!" });
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err: any) {
      setStatusMsg({ type: "error", text: err.message || "An unexpected error occurred." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#080808] border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#7A1F2B]/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        <div className="space-y-3">
          <span className="font-mono text-xs text-[#7A1F2B] uppercase tracking-widest font-bold">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Let's build something.
          </h2>
          <p className="text-sm sm:text-base text-[#A8A8A8] max-w-xl mx-auto leading-relaxed">
            Open for software engineering opportunities, high-performance system design, or engineering technical discussions.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={onOpenScheduleModal}
            className="w-full sm:w-auto px-8 py-4 text-sm font-semibold font-mono text-white bg-[#7A1F2B] hover:bg-[#9E2A3A] rounded-xl transition-all duration-200 shadow-xl shadow-[#7A1F2B]/30 border border-[#9E2A3A]/40 flex items-center justify-center gap-2.5 hover:scale-[1.02] active:scale-95 cursor-pointer min-h-[48px]"
          >
            <Calendar className="w-4 h-4 text-white" />
            <span>Schedule a Meeting</span>
          </button>

          <button
            onClick={() => setShowFormModal(true)}
            className="w-full sm:w-auto px-8 py-4 text-sm font-medium font-mono text-[#F5F5F5] bg-[#141414] hover:bg-[#1A1A1A] rounded-xl transition-all duration-200 border border-white/10 hover:border-white/20 flex items-center justify-center gap-2.5 cursor-pointer min-h-[48px]"
          >
            <Mail className="w-4 h-4 text-[#A8A8A8]" />
            <span>Send a Message</span>
          </button>
        </div>

        {/* Direct Links */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-[#666666]">
          <a
            href={PORTFOLIO_DATA.personal.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#A8A8A8] hover:text-white transition-colors"
          >
            <GithubIcon className="w-4 h-4 text-[#7A1F2B]" />
            <span>GitHub</span>
          </a>

          <span>•</span>

          <a
            href={PORTFOLIO_DATA.personal.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#A8A8A8] hover:text-white transition-colors"
          >
            <LinkedinIcon className="w-4 h-4 text-[#7A1F2B]" />
            <span>LinkedIn</span>
          </a>

          <span>•</span>

          <a
            href={PORTFOLIO_DATA.personal.socials.email}
            className="flex items-center gap-2 text-[#A8A8A8] hover:text-white transition-colors"
          >
            <Mail className="w-4 h-4 text-[#7A1F2B]" />
            <span>{PORTFOLIO_DATA.personal.socials.directEmail}</span>
          </a>
        </div>
      </div>

      {/* Send Message Compact Modal */}
      {showFormModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setShowFormModal(false)}
        >
          <div
            className="bg-[#111111] border border-white/10 rounded-2xl w-full max-w-lg p-6 sm:p-8 space-y-6 shadow-2xl modal-content relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#7A1F2B]" />
                <h3 className="text-base font-bold text-white">Send Direct Message</h3>
              </div>
              <button
                onClick={() => setShowFormModal(false)}
                className="text-[#666666] hover:text-white text-xs font-mono"
              >
                Close
              </button>
            </div>

            {statusMsg && (
              <div
                className={`p-3 rounded-xl text-xs font-mono flex items-center gap-2 ${statusMsg.type === "success"
                    ? "bg-emerald-950/40 border border-emerald-500/30 text-emerald-300"
                    : "bg-rose-950/40 border border-rose-500/30 text-rose-300"
                  }`}
              >
                {statusMsg.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
                <span>{statusMsg.text}</span>
              </div>
            )}

            <form onSubmit={handleSendMessage} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-[#A8A8A8] mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full px-3 py-2 bg-[#141414] border border-white/10 rounded-lg text-xs font-mono text-white placeholder-[#666666] focus:border-[#7A1F2B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#A8A8A8] mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full px-3 py-2 bg-[#141414] border border-white/10 rounded-lg text-xs font-mono text-white placeholder-[#666666] focus:border-[#7A1F2B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#A8A8A8] mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Inquiry / Opportunity"
                  className="w-full px-3 py-2 bg-[#141414] border border-white/10 rounded-lg text-xs font-mono text-white placeholder-[#666666] focus:border-[#7A1F2B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#A8A8A8] mb-1">Message</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message here..."
                  className="w-full px-3 py-2 bg-[#141414] border border-white/10 rounded-lg text-xs font-mono text-white placeholder-[#666666] focus:border-[#7A1F2B] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowFormModal(false)}
                  className="px-4 py-2.5 rounded-lg text-xs font-mono text-[#A8A8A8] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 rounded-lg bg-[#7A1F2B] hover:bg-[#9E2A3A] text-white font-mono text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-50 min-h-[44px]"
                >
                  {loading ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
