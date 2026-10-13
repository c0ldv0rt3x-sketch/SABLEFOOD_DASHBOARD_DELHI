"use client";

import dynamic from "next/dynamic";
import { Hotspot } from "@/lib/config/delhiConfig";
import { Loader2 } from "lucide-react";

const DelhiFloodMap = dynamic(() => import("./DelhiFloodMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[520px] rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center gap-3 text-slate-500">
      <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      <span className="text-sm font-medium text-slate-600">Initializing Interactive GIS Map & Radar Layers...</span>
    </div>
  )
});

interface MapWrapperProps {
  hotspots?: Hotspot[];
  overallRisk?: "SAFE" | "ADVISORY" | "DANGER";
}

export default function MapWrapper({ hotspots, overallRisk }: MapWrapperProps) {
  return <DelhiFloodMap hotspots={hotspots} overallRisk={overallRisk} />;
}
