"use client";

import { DELHI_METRICS } from "@/lib/config/delhiConfig";
import { MapPin, Clock, ShieldAlert, CheckCircle2, AlertTriangle, Radio } from "lucide-react";

interface DataTableTimelineRowProps {
  hotspots?: Array<{
    name: string;
    zone: string;
    lat: number;
    lng: number;
    riskLevel?: "SAFE" | "ADVISORY" | "DANGER";
    advisory?: string;
    elevationMeters?: number;
  }>;
}

export default function DataTableTimelineRow({ hotspots }: DataTableTimelineRowProps) {
  const displayHotspots = hotspots && hotspots.length > 0 ? hotspots : DELHI_METRICS.HOTSPOTS;

  const activityTimeline = [
    {
      time: "11:45 AM",
      title: "Yamuna Bazar Early Evacuation Siren",
      description: "Warning Siren Sounded at Old Railway Bridge sector.",
      type: "DANGER",
      color: "bg-red-500 shadow-[0_0_10px_#EF4444]"
    },
    {
      time: "11:20 AM",
      title: "High-Capacity Pump Deployed at ITO",
      description: "2x 500 HP Submersible Dewatering Units active.",
      type: "ADVISORY",
      color: "bg-amber-500 shadow-[0_0_10px_#F59E0B]"
    },
    {
      time: "10:50 AM",
      title: "Hathnikund Release Notification Received",
      description: "142,500 cusecs discharged from Yamunanagar barrage.",
      type: "INFO",
      color: "bg-cyan-500 shadow-[0_0_10px_#06B6D4]"
    },
    {
      time: "10:15 AM",
      title: "Mayur Vihar Relief Camp 4 Opened",
      description: "Capacity: 2,500 evacuees. Medical tent functional.",
      type: "SAFE",
      color: "bg-emerald-500 shadow-[0_0_10px_#10B981]"
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* 1. Hotspots Data Table (Left 7 Cols) */}
      <div className="lg:col-span-7 bg-white border border-slate-200/90 shadow-sm rounded-xl p-6 flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              Vulnerable Inundation Hotspots & Sectors
            </h3>
            <p className="text-xs text-slate-500">
              Live risk scores and ground elevation trackers for primary Delhi drainage basins.
            </p>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
            {displayHotspots.length} SITES
          </span>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] tracking-wider font-mono">
                <th className="pb-3 font-semibold">Location / Site</th>
                <th className="pb-3 font-semibold">Zone</th>
                <th className="pb-3 font-semibold">Risk Level</th>
                <th className="pb-3 font-semibold text-right">Elevation</th>
                <th className="pb-3 font-semibold text-center">Vulnerability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {displayHotspots.map((hotspot, idx) => {
                const risk = hotspot.riskLevel || (idx <= 1 ? "DANGER" : "ADVISORY");
                const progressVal = risk === "DANGER" ? 85 : risk === "ADVISORY" ? 55 : 20;

                return (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 font-bold text-slate-800 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                      {hotspot.name}
                    </td>
                    <td className="py-3 text-slate-500 font-mono">{hotspot.zone}</td>
                    <td className="py-3">
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${
                          risk === "DANGER"
                            ? "bg-red-50 text-red-600 border border-red-200"
                            : risk === "ADVISORY"
                            ? "bg-amber-50 text-amber-600 border border-amber-200"
                            : "bg-emerald-50 text-emerald-600 border border-emerald-200"
                        }`}
                      >
                        {risk}
                      </span>
                    </td>
                    <td className="py-3 text-right font-mono text-slate-600 font-medium">
                      {hotspot.elevationMeters ? `${hotspot.elevationMeters}m` : "204.2m"}
                    </td>
                    <td className="py-3 px-2">
                      <div className="w-24 mx-auto bg-slate-100 rounded-full h-1.5 overflow-hidden border border-slate-200">
                        <div
                          className={`h-full ${
                            risk === "DANGER"
                              ? "bg-red-500"
                              : risk === "ADVISORY"
                              ? "bg-amber-400"
                              : "bg-emerald-500"
                          }`}
                          style={{ width: `${progressVal}%` }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Activity Timeline Card (Right 5 Cols) */}
      <div className="lg:col-span-5 bg-white border border-slate-200/90 shadow-sm rounded-xl p-6 flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <h3 className="text-base font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            Operational Activity Timeline
          </h3>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100 font-semibold">
            REALTIME LOG
          </span>
        </div>

        {/* Timeline Items */}
        <div className="space-y-4 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
          {activityTimeline.map((item, idx) => (
            <div key={idx} className="relative pl-6 space-y-1 group">
              {/* Color Dot */}
              <div
                className={`absolute left-0 top-1 w-4 h-4 rounded-full border-2 border-white ${item.color} group-hover:scale-110 transition-all shadow-sm`}
              />
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">{item.title}</span>
                <span className="text-[10px] font-mono text-slate-400">{item.time}</span>
              </div>
              <p className="text-xs text-slate-500">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
