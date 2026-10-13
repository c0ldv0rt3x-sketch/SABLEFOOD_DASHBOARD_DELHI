"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Map,
  ShieldAlert,
  Home,
  BarChart3,
  HelpCircle,
  Radio,
  Sparkles,
  ChevronRight,
  ExternalLink
} from "lucide-react";

interface SidebarProps {
  activeTab?: string;
  onSelectTab?: (tabId: string) => void;
  onOpenSos?: () => void;
}

export default function Sidebar({
  activeTab: controlledActiveTab,
  onSelectTab,
  onOpenSos
}: SidebarProps) {
  const [internalActiveTab, setInternalActiveTab] = useState("dashboard");
  const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab;

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, targetId: "dashboard-section" },
    { id: "map", label: "GIS Inundation Map", icon: Map, targetId: "gis-map-section" },
    { id: "analytics", label: "Hotspot Analytics", icon: BarChart3, targetId: "analytics-section" },
    { id: "shelters", label: "Relief Shelters", icon: Home, targetId: "shelters-section" },
    { id: "sos", label: "Emergency SOS", icon: ShieldAlert, isSos: true }
  ];

  const handleClick = (item: (typeof navItems)[number]) => {
    if (controlledActiveTab === undefined) {
      setInternalActiveTab(item.id);
    }
    
    if (item.isSos) {
      if (onOpenSos) onOpenSos();
    } else {
      if (onSelectTab) {
        onSelectTab(item.id);
      } else if (item.targetId) {
        const el = document.getElementById(item.targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (item.id === "dashboard") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    }
  };

  return (
    <aside className="w-64 flex-shrink-0 min-h-screen bg-white border-r border-slate-200/90 p-5 flex flex-col justify-between select-none z-30 sticky top-0 h-screen">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/20 text-white">
            <Radio className="w-5 h-5 font-bold" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-sm font-black tracking-wider text-slate-900 uppercase font-sans">
                SABLE FLOOD
              </h2>
              <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-200">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-semibold tracking-wide">
              VISION AI OPS CENTER
            </p>
          </div>
        </div>

        <div className="h-px w-full bg-slate-200/80" />

        {/* Main Navigation Links */}
        <nav className="space-y-1.5">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2">
            Operations Menu
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                id={`sidebar-btn-${item.id}`}
                onClick={() => handleClick(item)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-blue-600 text-white font-semibold shadow-sm shadow-blue-500/25"
                    : item.isSos
                    ? "text-red-600 hover:bg-red-50 hover:text-red-700"
                    : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                      isActive
                        ? "bg-white/20 text-white"
                        : item.isSos
                        ? "bg-red-50 text-red-600 border border-red-200/80"
                        : "bg-slate-100 text-slate-500 border border-slate-200/60"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4 text-white/90" />}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Callout Artwork Card */}
      <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-4 relative overflow-hidden space-y-3 mt-6 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200/80 flex items-center justify-center text-blue-600">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800">Need Guidance?</h4>
            <p className="text-[10px] text-slate-500">Sable AI Flood Protocol Docs</p>
          </div>
        </div>

        <p className="text-[11px] text-slate-600 leading-relaxed">
          Access complete hydrometric procedures, CWC warning levels, and evacuation maps.
        </p>

        <a
          href="https://sableai.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm shadow-blue-500/20 transition-all"
        >
          <span>DOCUMENTATION</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </aside>
  );
}
