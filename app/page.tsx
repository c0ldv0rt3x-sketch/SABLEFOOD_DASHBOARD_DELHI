"use client";

import { useEffect, useState, useCallback } from "react";
import Sidebar from "@/components/Sidebar";
import TopStatsRow from "@/components/TopStatsRow";
import HeroGaugeRow from "@/components/HeroGaugeRow";
import AnalyticsRow from "@/components/AnalyticsRow";
import DataTableTimelineRow from "@/components/DataTableTimelineRow";
import MapWrapper from "@/components/map/MapWrapper";
import EmergencyModal from "@/components/EmergencyModal";
import { DELHI_METRICS, RiskStatus } from "@/lib/config/delhiConfig";
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Clock,
  RefreshCw,
  ExternalLink,
  Layers,
  Radio,
  PhoneCall
} from "lucide-react";

interface FloodStatusResponse {
  success: boolean;
  timestamp: string;
  istTimestamp: string;
  riskStatus: RiskStatus;
  yamunaGauge: {
    currentLevelM: number;
    warningLevelM: number;
    dangerLevelM: number;
    recordLevelM: number;
    trend: string;
  };
  hathnikundBarrage: {
    dischargeCusecs: number;
    warningFlowCusecs: number;
    criticalFlowCusecs: number;
    travelTimeToDelhiHours: number;
  };
  weather: {
    temperatureC: number;
    humidityPercent: number;
    pressureHpa: number;
    windSpeedKmH: number;
    rainIntensityMmH: number;
    aggregate24hRainMm: number;
  };
  shelters: {
    activeCount: number;
    totalCapacity: number;
    currentOccupancy: number;
  };
  hotspots: Array<any>;
  hourlyForecast: Array<{
    time: string;
    hour: string;
    temp: number;
    precipitationMm: number;
    precipProbability: number;
    weatherCode: number;
    condition: string;
  }>;
}

export default function OperationsDashboard() {
  const [data, setData] = useState<FloodStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [currentTimeStr, setCurrentTimeStr] = useState<string>("");
  const [isSosOpen, setIsSosOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  // Tab Selection & Smooth Scrolling Handler
  const handleTabSelect = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === "sos") {
      setIsSosOpen(true);
      return;
    }

    if (tabId === "dashboard") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (tabId === "map") {
      const el = document.getElementById("gis-map-section");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (tabId === "analytics") {
      const el = document.getElementById("analytics-section");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (tabId === "shelters") {
      const el = document.getElementById("shelters-section");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // ScrollSpy to automatically update activeTab based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: "shelters", el: document.getElementById("shelters-section") },
        { id: "map", el: document.getElementById("gis-map-section") },
        { id: "analytics", el: document.getElementById("analytics-section") },
        { id: "dashboard", el: document.getElementById("dashboard-section") }
      ];

      const scrollPos = window.scrollY + 200;

      for (const sec of sections) {
        if (sec.el && sec.el.offsetTop <= scrollPos) {
          setActiveTab(sec.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Clock Ticker
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTimeStr(
        now.toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          dateStyle: "medium",
          timeStyle: "medium"
        }) + " IST"
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch Data Function
  const fetchStatus = useCallback(async (showIndicator = false) => {
    if (showIndicator) setRefreshing(true);
    try {
      const res = await fetch("/api/delhi-flood-status");
      const json = await res.json();
      if (json.success) {
        setData(json);
      }
    } catch (e) {
      console.error("Failed to fetch operations data", e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
    // Poll every 30 seconds
    const interval = setInterval(() => fetchStatus(), 30000);
    return () => clearInterval(interval);
  }, [fetchStatus]);

  const riskStatus: RiskStatus = data?.riskStatus || "ADVISORY";
  const yamunaLevel = data?.yamunaGauge?.currentLevelM || 205.33;
  const hathnikundDischarge = data?.hathnikundBarrage?.dischargeCusecs || 142500;

  return (
    <div className="min-h-screen flex bg-[#F4F6F9] text-slate-800 font-sans selection:bg-blue-500/20 selection:text-blue-700">
      {/* 1. Left Sidebar Navigation Drawer */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={handleTabSelect}
        onOpenSos={() => setIsSosOpen(true)}
      />

      {/* 2. Main Dashboard Content Grid */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Sticky Top Bar Header */}
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-200/90 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  SECTOR: DELHI OPS
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Real-time Yamuna Hydro-Meteorological Intelligence
                </span>
              </div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight">
                Disaster Command & GIS Operations Dashboard
              </h1>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-4">
            {/* Clock Ticker */}
            <div className="hidden sm:flex flex-col items-end text-xs font-mono text-slate-600">
              <div className="flex items-center gap-1.5 text-slate-800">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span>{currentTimeStr || "Loading clock..."}</span>
              </div>
              <span className="text-[10px] text-slate-400">Auto-Refresh: 30s</span>
            </div>

            {/* Risk Status Badge */}
            <div
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-black tracking-wide uppercase transition-all ${
                riskStatus === "DANGER"
                  ? "bg-red-50 border-red-200 text-red-700"
                  : riskStatus === "ADVISORY"
                  ? "bg-amber-50 border-amber-200 text-amber-700"
                  : "bg-emerald-50 border-emerald-200 text-emerald-700"
              }`}
            >
              {riskStatus === "DANGER" && <ShieldAlert className="w-4 h-4 text-red-600 animate-bounce" />}
              {riskStatus === "ADVISORY" && <AlertTriangle className="w-4 h-4 text-amber-600" />}
              {riskStatus === "SAFE" && <ShieldCheck className="w-4 h-4 text-emerald-600" />}
              <span>STATUS: {riskStatus}</span>
            </div>

            {/* Refresh Button */}
            <button
              onClick={() => fetchStatus(true)}
              disabled={refreshing}
              className="p-2 rounded-xl bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 shadow-sm transition-colors cursor-pointer"
              title="Refresh Live Data"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin text-blue-600" : ""}`} />
            </button>

            {/* SOS Trigger Pill */}
            <button
              onClick={() => setIsSosOpen(true)}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm shadow-red-500/20 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <ShieldAlert className="w-4 h-4 animate-bounce" />
              <span>SOS DISPATCH</span>
            </button>
          </div>
        </header>

        {/* Dashboard Main Grid Area */}
        <main className="flex-1 p-6 space-y-6 max-w-[1700px] w-full mx-auto">
          {/* Section 1: Top Stats & Main Visual Hero (Dashboard) */}
          <div id="dashboard-section" className="space-y-6 scroll-mt-24">
            <TopStatsRow
              yamunaLevel={yamunaLevel}
              hathnikundDischarge={hathnikundDischarge}
              activeHotspotsCount={data?.hotspots?.length || 14}
              shelterOccupancy={data?.shelters?.currentOccupancy || 3880}
              shelterCapacity={data?.shelters?.totalCapacity || 10000}
            />

            <HeroGaugeRow
              onOpenSos={() => setIsSosOpen(true)}
              safetyScore={95}
              readinessScore={9.3}
            />
          </div>

          {/* Section 2: Data Analytics Wave Chart & Resource Bar Breakdown */}
          <div id="analytics-section" className="scroll-mt-24">
            <AnalyticsRow />
          </div>

          {/* Section 3: GIS Spatial Map Section */}
          <div id="gis-map-section" className="vision-card p-6 space-y-4 relative overflow-hidden scroll-mt-24 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 pb-3">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-5 h-5 text-blue-600" />
                  Delhi Operations GIS Inundation Map Layer
                </h3>
                <p className="text-xs text-slate-500">
                  Interactive spatial map displaying Yamuna floodplain, active waterlogging hotspots, and relief shelters.
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Yamuna Bazar
                </span>
                <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> ISBT & ITO
                </span>
                <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Relief Shelters
                </span>
              </div>
            </div>

            <MapWrapper hotspots={data?.hotspots} overallRisk={riskStatus} />
          </div>

          {/* Section 4: Hotspots Table & Operational Timeline (Shelters / Hotspots) */}
          <div id="shelters-section" className="scroll-mt-24">
            <DataTableTimelineRow hotspots={data?.hotspots} />
          </div>
        </main>

        {/* Dashboard Footer */}
        <footer className="border-t border-slate-200/80 bg-white px-6 py-4 text-center text-xs text-slate-500 space-y-1">
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-600 font-medium">
            <a href="https://sableai.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
              Sable AI Main Hub
            </a>
            <span>•</span>
            <span>Central Water Commission (CWC) API</span>
            <span>•</span>
            <span>Open-Meteo Weather API</span>
            <span>•</span>
            <span>Delhi Disaster Management Authority</span>
          </div>
          <p>© 2026 Sable AI Operations Center • Vision UI Dark Glassmorphism Edition</p>
        </footer>
      </div>

      {/* Emergency SOS Response Modal */}
      <EmergencyModal isOpen={isSosOpen} onClose={() => setIsSosOpen(false)} />
    </div>
  );
}
