"use client";

import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  Circle,
  Tooltip
} from "react-leaflet";
import L from "leaflet";
import {
  DELHI_METRICS,
  YAMUNA_FLOODPLAIN_POLYGON,
  EVACUATION_SHELTERS,
  Hotspot
} from "@/lib/config/delhiConfig";
import { Layers, ShieldAlert, Home, CloudRain, MapPin, Phone, Info } from "lucide-react";

// Helper function to create dynamic Leaflet divIcons
function createCustomPin(color: string, label?: string) {
  return L.divIcon({
    className: "custom-leaflet-marker",
    html: `
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: ${color};
        border: 2px solid #FFFFFF;
        box-shadow: 0 0 14px ${color};
        color: white;
        font-weight: bold;
        font-size: 11px;
        cursor: pointer;
      ">
        ${label ? label : '<div style="width: 10px; height: 10px; border-radius: 50%; background: white;"></div>'}
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18]
  });
}

const hotspotDangerIcon = createCustomPin("#EF4444", "!");
const hotspotAdvisoryIcon = createCustomPin("#F59E0B", "!");
const hotspotSafeIcon = createCustomPin("#10B981", "✓");
const shelterActiveIcon = createCustomPin("#3B82F6", "H");

interface DelhiFloodMapProps {
  hotspots?: Hotspot[];
  overallRisk?: "SAFE" | "ADVISORY" | "DANGER";
}

export default function DelhiFloodMap({ hotspots = [], overallRisk = "ADVISORY" }: DelhiFloodMapProps) {
  // Layer toggle states per requirement 5
  const [showRadar, setShowRadar] = useState(true);
  const [showShelters, setShowShelters] = useState(true);
  const [showHotspots, setShowHotspots] = useState(true);

  // Combine default HOTSPOTS with enriched props if present
  const displayHotspots = hotspots.length > 0 ? hotspots : DELHI_METRICS.HOTSPOTS;

  return (
    <div className="relative w-full h-[520px] rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white">
      {/* Map Control Floating Toolbar */}
      <div className="absolute top-4 right-4 z-[500] bg-white/95 backdrop-blur-md border border-slate-200 p-3 rounded-xl shadow-md flex flex-col gap-2 min-w-[200px]">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">
          <Layers className="w-4 h-4 text-blue-600" />
          Map Layer Controls
        </div>

        {/* Toggle 1: Rain Radar Overlay */}
        <label className="flex items-center justify-between text-xs text-slate-700 cursor-pointer hover:text-slate-900 select-none py-1">
          <span className="flex items-center gap-2">
            <CloudRain className="w-3.5 h-3.5 text-blue-600" />
            Rain Radar Overlay
          </span>
          <input
            type="checkbox"
            checked={showRadar}
            onChange={(e) => setShowRadar(e.target.checked)}
            className="w-4 h-4 rounded border-slate-300 bg-white text-blue-600 focus:ring-blue-500 cursor-pointer"
          />
        </label>

        {/* Toggle 2: Evacuation Shelters */}
        <label className="flex items-center justify-between text-xs text-slate-700 cursor-pointer hover:text-slate-900 select-none py-1">
          <span className="flex items-center gap-2">
            <Home className="w-3.5 h-3.5 text-emerald-600" />
            Evacuation Shelters
          </span>
          <input
            type="checkbox"
            checked={showShelters}
            onChange={(e) => setShowShelters(e.target.checked)}
            className="w-4 h-4 rounded border-slate-300 bg-white text-emerald-600 focus:ring-emerald-500 cursor-pointer"
          />
        </label>

        {/* Toggle 3: Waterlogging Hotspots */}
        <label className="flex items-center justify-between text-xs text-slate-700 cursor-pointer hover:text-slate-900 select-none py-1">
          <span className="flex items-center gap-2">
            <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
            Waterlogging Hotspots
          </span>
          <input
            type="checkbox"
            checked={showHotspots}
            onChange={(e) => setShowHotspots(e.target.checked)}
            className="w-4 h-4 rounded border-slate-300 bg-white text-red-600 focus:ring-red-500 cursor-pointer"
          />
        </label>
      </div>

      {/* Map Legend (Bottom Left) */}
      <div className="absolute bottom-4 left-4 z-[500] bg-white/95 backdrop-blur-md border border-slate-200 p-3 rounded-xl text-xs text-slate-600 flex flex-col gap-1.5 shadow-md">
        <div className="font-bold text-slate-800 mb-0.5">Map Legend</div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500 border border-red-300"></span>
          <span>Yamuna Floodplain (Inundation Risk)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-amber-500 border border-amber-300"></span>
          <span>Waterlogging Hotspots</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-500 border border-blue-300"></span>
          <span>Active Relief Shelters</span>
        </div>
      </div>

      {/* Leaflet Map */}
      <MapContainer
        center={[DELHI_METRICS.COORDINATES.lat, DELHI_METRICS.COORDINATES.lng]}
        zoom={12}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        {/* Standard OpenStreetMap Tile Layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />

        {/* Yamuna River Floodplain Semi-Transparent Crimson Polygon */}
        <Polygon
          positions={YAMUNA_FLOODPLAIN_POLYGON}
          pathOptions={{
            color: "#EF4444",
            fillColor: "#DC2626",
            fillOpacity: 0.25,
            weight: 2,
            dashArray: "6,6"
          }}
        >
          <Tooltip sticky>Yamuna River Active Inundation Floodplain (Wazirabad to Okhla)</Tooltip>
        </Polygon>

        {/* Rain Radar Simulated Dynamic Overlay Layer */}
        {showRadar && (
          <>
            <Circle
              center={[28.6400, 77.2400]}
              radius={7000}
              pathOptions={{
                color: "#3B82F6",
                fillColor: "#60A5FA",
                fillOpacity: 0.22,
                weight: 1,
                className: "radar-overlay-pulse"
              }}
            />
            <Circle
              center={[28.6650, 77.2300]}
              radius={4500}
              pathOptions={{
                color: "#0284C7",
                fillColor: "#38BDF8",
                fillOpacity: 0.3,
                weight: 1,
                className: "radar-overlay-pulse"
              }}
            />
          </>
        )}

        {/* Hotspot Markers */}
        {showHotspots &&
          displayHotspots.map((hotspot, idx) => {
            const risk = hotspot.riskLevel || (idx === 0 || idx === 1 ? "DANGER" : "ADVISORY");
            let icon = hotspotAdvisoryIcon;
            if (risk === "DANGER") icon = hotspotDangerIcon;
            if (risk === "SAFE") icon = hotspotSafeIcon;

            return (
              <Marker
                key={`hotspot-${idx}-${hotspot.name}`}
                position={[hotspot.lat, hotspot.lng]}
                icon={icon}
              >
                <Popup>
                  <div className="p-1 min-w-[220px]">
                    <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2 mb-2">
                      <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-amber-600" />
                        {hotspot.name}
                      </h4>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          risk === "DANGER"
                            ? "bg-red-50 text-red-600 border border-red-200"
                            : risk === "ADVISORY"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        }`}
                      >
                        {risk}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-600">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Operational Zone:</span>
                        <span className="font-semibold text-slate-800">{hotspot.zone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Ground Elevation:</span>
                        <span className="font-mono text-slate-800 font-medium">
                          {hotspot.elevationMeters ? `${hotspot.elevationMeters}m MSL` : "204.2m MSL"}
                        </span>
                      </div>
                      {hotspot.advisory && (
                        <div className="mt-2 text-[11px] p-2 rounded bg-amber-50 text-amber-800 border border-amber-200 flex gap-1.5 items-start">
                          <Info className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                          <span>{hotspot.advisory}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}

        {/* Evacuation Shelter Markers */}
        {showShelters &&
          EVACUATION_SHELTERS.map((shelter) => (
            <Marker
              key={shelter.id}
              position={[shelter.lat, shelter.lng]}
              icon={shelterActiveIcon}
            >
              <Popup>
                <div className="p-1 min-w-[230px]">
                  <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2 mb-2">
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                      <Home className="w-4 h-4 text-blue-600" />
                      {shelter.name}
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      {shelter.status}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Zone:</span>
                      <span className="text-slate-800 font-medium">{shelter.zone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Occupancy:</span>
                      <span className="font-mono text-emerald-600 font-semibold">
                        {shelter.occupancy} / {shelter.capacity} evacuees
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-1 border-t border-slate-100">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Phone className="w-3 h-3 text-slate-400" /> Contact:
                      </span>
                      <a
                        href={`tel:${shelter.phone}`}
                        className="font-mono text-blue-600 underline hover:text-blue-700"
                      >
                        {shelter.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}
