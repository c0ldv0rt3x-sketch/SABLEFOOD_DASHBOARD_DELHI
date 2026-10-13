"use client";

import { Activity, Droplet, ShieldAlert, Home, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface TopStatsRowProps {
  yamunaLevel?: number;
  hathnikundDischarge?: number;
  activeHotspotsCount?: number;
  shelterOccupancy?: number;
  shelterCapacity?: number;
}

export default function TopStatsRow({
  yamunaLevel = 205.33,
  hathnikundDischarge = 142500,
  activeHotspotsCount = 14,
  shelterOccupancy = 3880,
  shelterCapacity = 10000
}: TopStatsRowProps) {
  const stats = [
    {
      title: "Yamuna River Level",
      value: `${yamunaLevel.toFixed(2)}m`,
      label: "Gauge: Old Railway Bridge",
      trend: "+2.4%",
      trendIsUp: true,
      trendColor: "text-red-600 bg-red-50 border-red-200",
      icon: Activity,
      iconBg: "bg-blue-50 text-blue-600 border-blue-100"
    },
    {
      title: "Hathnikund Barrage Flow",
      value: `${hathnikundDischarge.toLocaleString()}`,
      unit: "cusecs",
      label: "Upstream Reservoir Control",
      trend: "-5.2%",
      trendIsUp: false,
      trendColor: "text-emerald-600 bg-emerald-50 border-emerald-200",
      icon: Droplet,
      iconBg: "bg-cyan-50 text-cyan-600 border-cyan-100"
    },
    {
      title: "Active Flood Hotspots",
      value: `${activeHotspotsCount}`,
      unit: "Locations",
      label: "Waterlogging Vulnerabilities",
      trend: "+3 New",
      trendIsUp: true,
      trendColor: "text-amber-600 bg-amber-50 border-amber-200",
      icon: ShieldAlert,
      iconBg: "bg-amber-50 text-amber-600 border-amber-100"
    },
    {
      title: "Evacuation Readiness",
      value: `${shelterOccupancy.toLocaleString()}`,
      unit: `/ ${shelterCapacity.toLocaleString()}`,
      label: "Active Relief Shelters",
      trend: "+12.8%",
      trendIsUp: true,
      trendColor: "text-emerald-600 bg-emerald-50 border-emerald-200",
      icon: Home,
      iconBg: "bg-purple-50 text-purple-600 border-purple-100"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="bg-white border border-slate-200/90 rounded-xl p-4 flex items-center justify-between gap-3 shadow-sm hover:shadow-md transition-all relative overflow-hidden"
          >
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                {stat.title}
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-black font-mono text-slate-900 tracking-tight">
                  {stat.value}
                </span>
                {stat.unit && (
                  <span className="text-xs font-semibold text-slate-400">{stat.unit}</span>
                )}
              </div>
              <div className="flex items-center gap-2 pt-1">
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded border flex items-center gap-0.5 ${stat.trendColor}`}
                >
                  {stat.trendIsUp ? (
                    <ArrowUpRight className="w-3 h-3" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3" />
                  )}
                  {stat.trend}
                </span>
                <span className="text-[10px] text-slate-400 font-medium truncate">
                  {stat.label}
                </span>
              </div>
            </div>

            {/* Icon Container */}
            <div
              className={`w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0 ${stat.iconBg}`}
            >
              <Icon className="w-5 h-5" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
