"use client";

import { useEffect } from "react";
import { DELHI_METRICS } from "@/lib/config/delhiConfig";
import { AlertTriangle, PhoneCall, X, Shield, Radio, CheckCircle2, Copy } from "lucide-react";
import { useState } from "react";

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EmergencyModal({ isOpen, onClose }: EmergencyModalProps) {
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = (phone: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(phone);
    setTimeout(() => setCopiedPhone(null), 2000);
  };

  const emergencyHelplines = [
    {
      agency: "Delhi Central Flood Control Room",
      number: "1077",
      description: "24x7 Direct Emergency Evacuation & Rescue Desk",
      priority: "CRITICAL"
    },
    {
      agency: "Delhi State Disaster Management Authority (DDMA)",
      number: "011-22421656",
      description: "Disaster Management & Heavy Equipment Deployment",
      priority: "CRITICAL"
    },
    {
      agency: "National Disaster Response Force (NDRF) Control Room",
      number: "011-24363260",
      description: "Flood Relief & Water Rescue Motorboat Squads",
      priority: "HIGH"
    },
    {
      agency: "Delhi Police Emergency Services",
      number: "112",
      description: "Traffic Diversions, Barrier Inundations & Search Operations",
      priority: "HIGH"
    },
    {
      agency: "Delhi Fire Services Command",
      number: "101",
      description: "Water Pumping Operations & Heavy Submersible Extractors",
      priority: "MEDIUM"
    }
  ];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden">
        {/* Top Header Bar */}
        <div className="bg-gradient-to-r from-red-600 via-red-600 to-amber-600 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white tracking-wide uppercase">
                EMERGENCY RESPONSE PROTOCOL (SOS)
              </h3>
              <p className="text-xs text-red-100 font-medium">
                Sable AI — Delhi Disaster Management Dispatch
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-black/10 hover:bg-black/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 max-h-[80vh] overflow-y-auto space-y-6">
          {/* Critical Advisory Banner */}
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs flex gap-3 items-start shadow-sm">
            <Radio className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5 animate-pulse" />
            <div>
              <span className="font-bold text-red-900 uppercase block mb-1">
                Active Operational Directive:
              </span>
              If Yamuna river water level breaches 205.33m (Danger Mark) or underpasses experience &gt; 50cm waterlogging, contact Delhi Central Control Room immediately or dispatch local relief teams.
            </div>
          </div>

          {/* Emergency Helplines List */}
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-600" />
              Direct Emergency Helplines & Rescue Desks
            </h4>

            <div className="space-y-3">
              {emergencyHelplines.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 hover:border-red-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{item.agency}</span>
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${
                          item.priority === "CRITICAL"
                            ? "bg-red-50 text-red-600 border border-red-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {item.priority}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">{item.description}</p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <a
                      href={`tel:${item.number}`}
                      className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-mono font-bold text-sm flex items-center gap-1.5 shadow-sm shadow-red-500/20 transition-all"
                    >
                      <PhoneCall className="w-4 h-4" />
                      {item.number}
                    </a>
                    <button
                      onClick={() => handleCopy(item.number)}
                      title="Copy Number"
                      className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors shadow-sm"
                    >
                      {copiedPhone === item.number ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Evacuation Protocol Checklist */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Evacuation & First Responder Protocol Checklist
            </h5>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">1.</span>
                <span>Issue early flood warning sirens for Yamuna Bazar, Monastery Market, and Mayur Vihar Khadar settlements.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">2.</span>
                <span>Deploy high-capacity dewatering pumps to Minto Bridge and ITO Ring Road underpasses.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">3.</span>
                <span>Reroute traffic along Vikas Marg and GT Road if water level exceeds Warning Mark (204.50m).</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">
            Sable Flood AI • Delhi Operations Center
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-colors shadow-sm"
          >
            Close Dialog
          </button>
        </div>
      </div>
    </div>
  );
}
