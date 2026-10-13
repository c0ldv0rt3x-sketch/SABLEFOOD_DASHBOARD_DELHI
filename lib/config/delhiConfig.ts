export interface Hotspot {
  id?: string;
  name: string;
  lat: number;
  lng: number;
  zone: string;
  riskLevel?: "SAFE" | "ADVISORY" | "DANGER";
  elevationMeters?: number;
  affectedPopulation?: string;
  advisory?: string;
}

export interface Shelter {
  id: string;
  name: string;
  zone: string;
  lat: number;
  lng: number;
  capacity: number;
  occupancy: number;
  contactPerson: string;
  phone: string;
  status: "ACTIVE" | "STANDBY" | "FULL";
}

export interface UnderpassSurcharge {
  name: string;
  location: string;
  surchargeIndex: number; // 0 - 100%
  waterDepthCm: number;
  pumpStatus: "OPERATIONAL" | "WARNING" | "OVERWHELMED";
  trafficStatus: "OPEN" | "RESTRICTED" | "CLOSED";
}

export const DELHI_METRICS = {
  CITY: "Delhi, India",
  COORDINATES: { lat: 28.6139, lng: 77.2090 },
  GAUGE_SITE: "Old Railway Bridge (ORB), Delhi",
  YAMUNA_GAUGE: {
    WARNING_LEVEL_M: 204.50,
    DANGER_LEVEL_M: 205.33,
    RECORD_LEVEL_M: 208.66
  },
  HATHNIKUND_BARRAGE: {
    WARNING_FLOW_CUSECS: 100000,
    CRITICAL_FLOW_CUSECS: 250000
  },
  HOTSPOTS: [
    { name: "Yamuna Bazar", lat: 28.6610, lng: 77.2340, zone: "North", riskLevel: "DANGER", elevationMeters: 203.8, advisory: "Low lying zone. Submersible pumps deployed at ghats." },
    { name: "ISBT Kashmere Gate", lat: 28.6675, lng: 77.2285, zone: "North", riskLevel: "DANGER", elevationMeters: 205.2, advisory: "Monitored for ring road backflow & underpass waterlogging." },
    { name: "ITO Ring Road", lat: 28.6291, lng: 77.2435, zone: "Central", riskLevel: "ADVISORY", elevationMeters: 206.1, advisory: "Drainage surcharge monitored at Vikas Marg intersection." },
    { name: "Mayur Vihar Khadar", lat: 28.6012, lng: 77.2910, zone: "East", riskLevel: "DANGER", elevationMeters: 204.1, advisory: "Khadar agricultural settlements evacuated to flyover camps." },
    { name: "Okhla Barrage Area", lat: 28.5440, lng: 77.3080, zone: "South East", riskLevel: "ADVISORY", elevationMeters: 205.8, advisory: "Barrage gates 1-18 opened to pass upstream surge." }
  ] as Hotspot[],
  EMERGENCY_CONTACTS: [
    { agency: "Delhi Flood Control Room", phone: "1077" },
    { agency: "State Disaster Response (DDMA)", phone: "011-22421656" }
  ]
};

// Yamuna River Floodplain Boundary Coordinates (Wazirabad to Okhla)
export const YAMUNA_FLOODPLAIN_POLYGON: [number, number][] = [
  [28.7150, 77.2300],
  [28.6850, 77.2360],
  [28.6650, 77.2420],
  [28.6400, 77.2510],
  [28.6100, 77.2750],
  [28.5850, 77.3000],
  [28.5500, 77.3180],
  [28.5380, 77.3050],
  [28.5700, 77.2880],
  [28.6050, 77.2620],
  [28.6350, 77.2420],
  [28.6600, 77.2280],
  [28.6800, 77.2210],
  [28.7100, 77.2180]
];

// Active Evacuation Shelters
export const EVACUATION_SHELTERS: Shelter[] = [
  {
    id: "SHELTER-01",
    name: "Geeta Colony Community Center",
    zone: "East Delhi",
    lat: 28.6540,
    lng: 77.2680,
    capacity: 1200,
    occupancy: 450,
    contactPerson: "Rajesh Kumar (SDM East)",
    phone: "011-22421656",
    status: "ACTIVE"
  },
  {
    id: "SHELTER-02",
    name: "Akshardham Flyover Relief Camp",
    zone: "East Delhi",
    lat: 28.6150,
    lng: 77.2820,
    capacity: 2500,
    occupancy: 1120,
    contactPerson: "Dr. Ananya Sharma (NDRF)",
    phone: "011-22019842",
    status: "ACTIVE"
  },
  {
    id: "SHELTER-03",
    name: "Kashmere Gate ISBT Transit Relief Center",
    zone: "North Delhi",
    lat: 28.6690,
    lng: 77.2290,
    capacity: 1800,
    occupancy: 890,
    contactPerson: "Inspector Sunil Verma",
    phone: "011-23860100",
    status: "ACTIVE"
  },
  {
    id: "SHELTER-04",
    name: "Mayur Vihar Phase-1 Sports Complex",
    zone: "East Delhi",
    lat: 28.6030,
    lng: 77.2950,
    capacity: 3000,
    occupancy: 1420,
    contactPerson: "Virender Tyagi",
    phone: "011-22753300",
    status: "ACTIVE"
  },
  {
    id: "SHELTER-05",
    name: "Okhla Vihar Relief Enclosure",
    zone: "South East Delhi",
    lat: 28.5480,
    lng: 77.2990,
    capacity: 1500,
    occupancy: 320,
    contactPerson: "Sunita Roy (DDMA)",
    phone: "011-26920140",
    status: "STANDBY"
  }
];

// Critical Underpass Drainage Surcharge Index
export const UNDERPASS_SURCHARGE_INDEX: UnderpassSurcharge[] = [
  {
    name: "ITO Underpass",
    location: "Ring Road / Vikas Marg",
    surchargeIndex: 68,
    waterDepthCm: 32,
    pumpStatus: "WARNING",
    trafficStatus: "RESTRICTED"
  },
  {
    name: "Minto Bridge Underpass",
    location: "Connaught Place / New Delhi Railway",
    surchargeIndex: 82,
    waterDepthCm: 55,
    pumpStatus: "OVERWHELMED",
    trafficStatus: "CLOSED"
  },
  {
    name: "Zakhira Flyover Underpass",
    location: "Rohtak Road / West Delhi",
    surchargeIndex: 45,
    waterDepthCm: 18,
    pumpStatus: "OPERATIONAL",
    trafficStatus: "OPEN"
  },
  {
    name: "Pul Prahladpur Underpass",
    location: "Mehrauli-Badarpur Road",
    surchargeIndex: 74,
    waterDepthCm: 42,
    pumpStatus: "WARNING",
    trafficStatus: "RESTRICTED"
  }
];

export type RiskStatus = "SAFE" | "ADVISORY" | "DANGER";

export function computeRiskStatus(waterLevelM: number, rainRateMmH: number): RiskStatus {
  if (waterLevelM > DELHI_METRICS.YAMUNA_GAUGE.DANGER_LEVEL_M || rainRateMmH > 40) {
    return "DANGER";
  }
  if (
    (waterLevelM >= DELHI_METRICS.YAMUNA_GAUGE.WARNING_LEVEL_M && waterLevelM <= DELHI_METRICS.YAMUNA_GAUGE.DANGER_LEVEL_M) ||
    (rainRateMmH >= 15 && rainRateMmH <= 40)
  ) {
    return "ADVISORY";
  }
  return "SAFE";
}
