import { NextResponse } from "next/server";
import { DELHI_METRICS, EVACUATION_SHELTERS, computeRiskStatus } from "@/lib/config/delhiConfig";

export async function GET() {
  const currentLevelM = 205.33;
  const rainIntensityMmH = 18.5;
  const riskStatus = computeRiskStatus(currentLevelM, rainIntensityMmH);

  const totalOccupancy = EVACUATION_SHELTERS.reduce((acc, s) => acc + s.occupancy, 0);
  const totalCapacity = EVACUATION_SHELTERS.reduce((acc, s) => acc + s.capacity, 0);

  const data = {
    success: true,
    timestamp: new Date().toISOString(),
    istTimestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    riskStatus,
    yamunaGauge: {
      currentLevelM,
      warningLevelM: DELHI_METRICS.YAMUNA_GAUGE.WARNING_LEVEL_M,
      dangerLevelM: DELHI_METRICS.YAMUNA_GAUGE.DANGER_LEVEL_M,
      recordLevelM: DELHI_METRICS.YAMUNA_GAUGE.RECORD_LEVEL_M,
      trend: "RISING (+0.04m/hr)"
    },
    hathnikundBarrage: {
      dischargeCusecs: 142500,
      warningFlowCusecs: DELHI_METRICS.HATHNIKUND_BARRAGE.WARNING_FLOW_CUSECS,
      criticalFlowCusecs: DELHI_METRICS.HATHNIKUND_BARRAGE.CRITICAL_FLOW_CUSECS,
      travelTimeToDelhiHours: 36
    },
    weather: {
      temperatureC: 29.4,
      humidityPercent: 88,
      pressureHpa: 1004,
      windSpeedKmH: 18,
      rainIntensityMmH,
      aggregate24hRainMm: 64.8
    },
    shelters: {
      activeCount: EVACUATION_SHELTERS.filter((s) => s.status === "ACTIVE").length,
      totalCapacity,
      currentOccupancy: totalOccupancy
    },
    hotspots: DELHI_METRICS.HOTSPOTS,
    hourlyForecast: [
      { hour: "06:00", level: 204.2, dischargeK: 120 },
      { hour: "08:00", level: 204.6, dischargeK: 135 },
      { hour: "10:00", level: 205.1, dischargeK: 142 },
      { hour: "12:00", level: 205.33, dischargeK: 148 },
      { hour: "14:00", level: 205.25, dischargeK: 140 },
      { hour: "16:00", level: 204.9, dischargeK: 130 },
      { hour: "18:00", level: 204.5, dischargeK: 122 },
      { hour: "20:00", level: 204.1, dischargeK: 115 }
    ]
  };

  return NextResponse.json(data);
}
