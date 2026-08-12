"use client";

import { useState } from "react";
import { Play, Volume2, Activity, Cpu, Zap, RefreshCw, CheckCircle2 } from "lucide-react";

interface SoundSample {
  id: string;
  name: string;
  category: string;
  confidence: number;
  latencyMs: number;
  waveformPattern: number[];
}

export default function SoundSimulator() {
  const samples: SoundSample[] = [
    {
      id: "siren",
      name: "Emergency Siren",
      category: "Warning System",
      confidence: 99.2,
      latencyMs: 42,
      waveformPattern: [40, 85, 30, 95, 60, 100, 45, 90, 35, 80, 50, 95]
    },
    {
      id: "glass",
      name: "Glass Breakage",
      category: "Acoustic Security",
      confidence: 97.8,
      latencyMs: 38,
      waveformPattern: [90, 20, 100, 15, 85, 30, 95, 10, 75, 40, 90, 25]
    },
    {
      id: "speech",
      name: "Human Voice Stream",
      category: "Speech Telemetry",
      confidence: 96.5,
      latencyMs: 54,
      waveformPattern: [20, 45, 60, 40, 70, 50, 65, 35, 55, 40, 30, 20]
    },
    {
      id: "machinery",
      name: "Industrial Engine",
      category: "Equipment Health",
      confidence: 98.4,
      latencyMs: 46,
      waveformPattern: [70, 75, 80, 72, 78, 85, 76, 82, 74, 79, 81, 77]
    }
  ];

  const [activeSample, setActiveSample] = useState<SoundSample>(samples[0]);
  const [analyzing, setAnalyzing] = useState<boolean>(false);

  const runAnalysis = (sample: SoundSample) => {
    setActiveSample(sample);
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
    }, 400);
  };

  return (
    <div className="bg-[#111111] border border-[#7A1F2B]/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#7A1F2B]/10 blur-3xl rounded-full pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#7A1F2B] font-bold uppercase tracking-wider">
            <Activity className="w-4 h-4" /> Live Acoustic Model Simulator
          </div>
          <h3 className="text-xl font-bold text-white mt-1">SonicSense AI Inference Engine</h3>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono text-[#A8A8A8] bg-[#141414] px-3 py-1.5 rounded-lg border border-white/5 w-fit">
          <Cpu className="w-3.5 h-3.5 text-emerald-400" />
          <span>YAMNet Deep Neural Network</span>
        </div>
      </div>

      {/* Interactive Sound Trigger Badges */}
      <div>
        <label className="block text-xs font-mono text-[#666666] mb-2 uppercase">Select Input Stream:</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {samples.map((s) => {
            const isSelected = activeSample.id === s.id;
            return (
              <button
                key={s.id}
                onClick={() => runAnalysis(s)}
                className={`p-3 rounded-xl border text-xs font-mono transition-all flex flex-col items-start gap-1 cursor-pointer min-h-[54px] ${
                  isSelected
                    ? "bg-[#7A1F2B]/20 border-[#7A1F2B] text-white shadow-lg shadow-[#7A1F2B]/10 font-bold"
                    : "bg-[#141414] border-white/5 text-[#A8A8A8] hover:text-white hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="truncate">{s.name}</span>
                  <Play className={`w-3 h-3 ${isSelected ? "text-[#9E2A3A]" : "text-[#666666]"}`} />
                </div>
                <span className="text-[10px] text-[#666666] font-normal">{s.category}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Waveform & Output Visualization */}
      <div className="bg-[#141414] border border-white/5 rounded-xl p-5 space-y-4">
        {/* Waveform Bars */}
        <div className="flex items-center justify-between gap-1.5 h-16 px-4 bg-[#080808] rounded-lg border border-white/5">
          {activeSample.waveformPattern.map((val, idx) => (
            <div
              key={idx}
              className={`flex-1 rounded-full transition-all duration-300 ${
                analyzing ? "bg-[#9E2A3A] animate-pulse" : "bg-[#7A1F2B]"
              }`}
              style={{ height: `${analyzing ? Math.min(val + 15, 100) : val}%` }}
            />
          ))}
        </div>

        {/* Real-time Telemetry Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 font-mono text-xs">
          <div className="bg-[#080808] p-3 rounded-lg border border-white/5 space-y-1">
            <span className="text-[#666666] text-[10px] uppercase">Detected Classification</span>
            <p className="text-white font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{activeSample.name}</span>
            </p>
          </div>

          <div className="bg-[#080808] p-3 rounded-lg border border-white/5 space-y-1">
            <span className="text-[#666666] text-[10px] uppercase">Confidence Score</span>
            <p className="text-emerald-400 font-bold">{activeSample.confidence}% Match</p>
          </div>

          <div className="bg-[#080808] p-3 rounded-lg border border-white/5 space-y-1">
            <span className="text-[#666666] text-[10px] uppercase">Inference Latency</span>
            <p className="text-[#F5F5F5] font-bold flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-[#7A1F2B]" />
              <span>{activeSample.latencyMs} ms</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
