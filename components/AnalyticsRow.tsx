"use client";

import { BarChart3, TrendingUp, Users, Cpu, Layers, ShieldCheck } from "lucide-react";

interface AnalyticsRowProps {
  forecastData?: Array<{
    hour: string;
    level: number;
    dischargeK: number;
  }>;
}

export default function AnalyticsRow({ forecastData }: AnalyticsRowProps) {
  // Mock 12-hour trend points if props not passed
  const chartPoints = forecastData || [
    { hour: "06:00", level: 204.2, dischargeK: 120 },
    { hour: "08:00", level: 204.6, dischargeK: 135 },
    { hour: "10:00", level: 205.1, dischargeK: 142 },
    { hour: "12:00", level: 205.33, dischargeK: 148 },
    { hour: "14:00", level: 205.25, dischargeK: 140 },
    { hour: "16:00", level: 204.9, dischargeK: 130 },
    { hour: "18:00", level: 204.5, dischargeK: 122 },
    { hour: "20:00", level: 204.1, dischargeK: 115 }
  ];

  // Map points to SVG coordinates (width 600, height 180)
  const svgWidth = 600;
  const svgHeight = 180;
  const minVal = 203.5;
  const maxVal = 206.0;

  const pointsString = chartPoints
    .map((pt, idx) => {
      const x = (idx / (chartPoints.length - 1)) * svgWidth;
      const y = svgHeight - ((pt.level - minVal) / (maxVal - minVal)) * (svgHeight - 30) - 15;
      return `${x},${y}`;
    })
    .join(" ");

  const areaPath = `M 0,${svgHeight} L ${pointsString} L ${svgWidth},${svgHeight} Z`;
  const linePath = `M ${pointsString}`;

  // Bar chart height values (in %)
  const barHeights = [45, 75, 90, 60, 85, 40, 95, 70, 80];

  const breakdownMetrics = [
    { label: "Pumps Active", val: "124", icon: Cpu, color: "text-cyan-400" },
    { label: "Rescue Boats", val: "38", icon: Layers, color: "text-blue-400" },
    { label: "Hotspots", val: "14", icon: BarChart3, color: "text-amber-400" },
    { label: "Shelters", val: "38", icon: ShieldCheck, color: "text-purple-400" }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* 1. Main Area Wave Chart (Left 7 Cols / ~60% width) */}
      <div className="lg:col-span-7 bg-white border border-slate-200/90 shadow-sm rounded-xl p-6 flex flex-col justify-between relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
              <TrendingUp className="w-4 h-4" />
              Hydrological Wave Analysis
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              12-Hour Yamuna Hydrograph & Discharge Trend
            </h3>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-slate-600 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span> Current Level
            </span>
            <span className="flex items-center gap-1.5 text-slate-600 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Danger Threshold (205.33m)
            </span>
          </div>
        </div>

        {/* SVG Multi-Wave Chart */}
        <div className="relative my-4 w-full overflow-hidden">
          <svg className="w-full h-44" viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="none">
            <defs>
              <linearGradient id="areaBlueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.16" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Background Grid Lines */}
            <line x1="0" y1="30" x2={svgWidth} y2="30" stroke="#F1F5F9" strokeWidth="1.5" />
            <line x1="0" y1="90" x2={svgWidth} y2="90" stroke="#F1F5F9" strokeWidth="1.5" />
            <line x1="0" y1="140" x2={svgWidth} y2="140" stroke="#F1F5F9" strokeWidth="1.5" />

            {/* Danger Line (205.33m) */}
            <line x1="0" y1="45" x2={svgWidth} y2="45" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="4 4" />

            {/* Area Fill */}
            <path d={areaPath} fill="url(#areaBlueGrad)" />

            {/* Trend Line (Royal Blue) */}
            <path d={linePath} fill="none" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />

            {/* Secondary Comparison Trend Line (Emerald Green, matching Metis reference) */}
            <path
              d={`M 0,${svgHeight - 20} Q 150,${svgHeight - 40} 300,${svgHeight - 65} T ${svgWidth},${svgHeight - 25}`}
              fill="none"
              stroke="#10B981"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.85"
            />

            {/* Data Dots */}
            {chartPoints.map((pt, idx) => {
              const x = (idx / (chartPoints.length - 1)) * svgWidth;
              const y = svgHeight - ((pt.level - minVal) / (maxVal - minVal)) * (svgHeight - 30) - 15;
              return (
                <circle
                  key={idx}
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#2563EB"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  className="hover:r-5 transition-all cursor-pointer"
                />
              );
            })}
          </svg>
        </div>

        {/* Timeline X-Axis Labels */}
        <div className="flex justify-between text-[11px] text-slate-400 font-mono pt-2 border-t border-slate-100">
          {chartPoints.map((pt, idx) => (
            <span key={idx}>{pt.hour}</span>
          ))}
        </div>
      </div>

      {/* 2. Bar Chart & Active Breakdown (Right 5 Cols / ~40% width) */}
      <div className="lg:col-span-5 bg-white border border-slate-200/90 shadow-sm rounded-xl p-6 flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Active Resource Breakdown
          </h3>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100 font-semibold">
            SECTOR DATA
          </span>
        </div>

        {/* Column Bar Chart */}
        <div className="my-4 h-36 flex items-end justify-between gap-2 px-2">
          {barHeights.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
              <div className="w-full bg-slate-100 rounded-t-md h-full relative overflow-hidden flex items-end">
                <div
                  className="w-full bg-blue-600 group-hover:bg-blue-700 rounded-t-md transition-all duration-300"
                  style={{ height: `${h}%` }}
                />
              </div>
              <span className="text-[9px] text-slate-400 font-mono">S{i + 1}</span>
            </div>
          ))}
        </div>

        {/* Bottom 4-Stat Metric Strip */}
        <div className="grid grid-cols-4 gap-2 pt-3 border-t border-slate-100">
          {breakdownMetrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div key={idx} className="p-2 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col items-center text-center">
                <Icon className={`w-3.5 h-3.5 mb-1 ${m.color}`} />
                <span className="text-sm font-bold font-mono text-slate-900">{m.val}</span>
                <span className="text-[9px] text-slate-500 truncate w-full font-medium">{m.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
