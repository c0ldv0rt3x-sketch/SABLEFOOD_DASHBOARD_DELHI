"use client";

import { ShieldAlert, Sparkles, ArrowRight, Activity, Zap, CheckCircle2 } from "lucide-react";

interface HeroGaugeRowProps {
  onOpenSos?: () => void;
  safetyScore?: number;
  readinessScore?: number;
}

export default function HeroGaugeRow({
  onOpenSos,
  safetyScore = 95,
  readinessScore = 9.3
}: HeroGaugeRowProps) {
  // SVG semi-circle gauge calculation (radius 55, arc length = Math.PI * 55 ≈ 172.78)
  const arcLength = 172.78;
  const strokeDashoffset = arcLength - (arcLength * safetyScore) / 100;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* 1. Hero Feature Card (Left 6 Cols / 50% width) */}
      <div className="lg:col-span-6 bg-white border border-slate-200/90 shadow-sm rounded-xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[300px]">
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-blue-600" />
              Sable AI Disaster Intelligence
            </span>
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Delhi Command</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg">
              Glad to see you again! Yamuna river inundation models and real-time CWC sensor feeds are fully calibrated. 95% of active sectors report stable flood barriers.
            </p>
          </div>
        </div>

        <div className="relative z-10 pt-4 flex flex-wrap items-center gap-4">
          <button
            onClick={onOpenSos}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm shadow-blue-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>VIEW EMERGENCY PROTOCOL</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <div className="text-xs text-slate-500 font-mono flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Hydro-Sensors Online</span>
          </div>
        </div>
      </div>

      {/* 2. Gauges & Meter Cards (Right 6 Cols / 50% width) */}
      <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Card A: Semi-Circular Radial Gauge */}
        <div className="bg-white border border-slate-200/90 shadow-sm rounded-xl p-5 flex flex-col justify-between items-center text-center relative overflow-hidden">
          <div className="w-full flex items-center justify-between border-b border-slate-100 pb-2.5">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Satisfaction / Safety Index
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100">
              REALTIME
            </span>
          </div>

          {/* SVG Semi-Circle Radial Progress Arc */}
          <div className="relative my-3 flex items-center justify-center">
            <svg className="w-44 h-28" viewBox="0 0 140 80">
              {/* Outer track */}
              <path
                d="M 15,70 A 55,55 0 0,1 125,70"
                fill="none"
                stroke="#F1F5F9"
                strokeWidth="12"
                strokeLinecap="round"
              />
              {/* Cyan Progress Arc */}
              <path
                d="M 15,70 A 55,55 0 0,1 125,70"
                fill="none"
                stroke="url(#cyanGlowGrad)"
                strokeWidth="12"
                strokeDasharray={arcLength}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="cyanGlowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2563EB" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute top-10 flex flex-col items-center">
              <span className="text-3xl font-black font-mono text-slate-900 tracking-tight">
                {safetyScore}%
              </span>
              <span className="text-[10px] text-slate-500 font-semibold uppercase">
                Safety Score
              </span>
            </div>
          </div>

          <div className="w-full pt-2 border-t border-slate-100 flex justify-between text-xs text-slate-500 font-mono">
            <span>0% (Risk)</span>
            <span className="text-blue-600 font-bold">Optimal Safety</span>
            <span>100%</span>
          </div>
        </div>

        {/* Card B: Circular Score / Radar Meter */}
        <div className="bg-white border border-slate-200/90 shadow-sm rounded-xl p-5 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Total Score / Radar
            </span>
            <Zap className="w-4 h-4 text-purple-600" />
          </div>

          <div className="my-3 flex items-center justify-center gap-4">
            {/* Circular score dial */}
            <div className="w-24 h-24 rounded-full border-4 border-purple-200 bg-purple-50 flex flex-col items-center justify-center relative">
              <span className="text-3xl font-black font-mono text-purple-700">{readinessScore}</span>
              <span className="text-[9px] text-purple-600 uppercase font-bold">Score</span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Active Teams</span>
                <span className="font-mono font-bold text-slate-900 text-sm">48 Squads</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">De-watering Pumps</span>
                <span className="font-mono font-bold text-purple-700 text-sm">124 Units</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex justify-between">
            <span>Operational Score</span>
            <span className="text-emerald-600 font-semibold">+9.3 Readiness</span>
          </div>
        </div>
      </div>
    </div>
  );
}
