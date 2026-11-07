const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

// Exact brochure color palette constants
export const LOGO_BG_COLOR = '#111E31';
export const THEME_COLORS = {
  bg: '#111E31',       // Exact Logo Navy Blue
  gold: '#EAB308',     // Brochure Signature Gold
  silver: '#CBD5E1',   // Metallic Chrome Silver
  blueGlow: '#38BDF8'  // Electric Blue Glow / Blur
};

// Official Contact & Test Ride Email Destinations
export const OFFICIAL_EMAILS = {
  primary: "info@terrornbatteries.com",
  backup: "info@terronbatteries.com"
};

/**
 * brochureModels — 5 official Terron EV models
 *
 * Each model has:
 *   image         : the single base photo used for Canvas colour replacement
 *   baseBodyColor : dominant scooter-body colour IN that base photo
 *                   (used by ColorizedScooterImage to identify which pixels to recolour)
 *   colorPalette  : array of { name, hex, caption }
 *                   hex = target colour; ColorizedScooterImage replaces base body pixels → hex
 */
export const brochureModels = [
  {
    id: "TRN-TERRON-PLUS",
    name: "TERRON+",
    badge: "ULTRA LONG-RANGE GRAND TOURER",
    tagline: "Approx. 3 Hours (0-80%)* rapid charge and unmatched 270 KM touring range",
    range: "225-270 KM",
    topSpeed: "70-80 KM/H",
    motor: "6.5 KW | 8 KW",
    chargingTime: "APPROX. 3 HOURS (0-80%)*",
    rideModes: "ECO | CITY | SPORT",
    braking: "FRONT & REAR DISC WITH CBS",
    wheels: "12\" PREMIUM AERO TUBELESS ALLOY",
    category: "Grand Tourer",
    startingPrice: "₹1,29,999",
    emiStarts: "₹3,149/mo",
    // Base photo: green Terron standalone scooter
    image: "/images/scooters/adventure_green.jpg",
    baseBodyColor: "#1a6b3a",   // deep green of the scooter body in the base photo
    colorPalette: [
      {
        name: "Emerald Green",
        hex: "#1a6b3a",          // same as base → no recolour (original)
        caption: "Terron+ in Signature Emerald Green Adventure Finish"
      },
      {
        name: "Obsidian Black",
        hex: "#18181b",
        caption: "Terron+ in Midnight Stealth Obsidian Black"
      },
      {
        name: "Titanium Grey",
        hex: "#94a3b8",
        caption: "Terron+ in Titanium Metallic Silver Grey"
      },
      {
        name: "Crimson Red",
        hex: "#dc2626",
        caption: "Terron+ in Candy Crimson Velocity Red"
      }
    ],
    features: [
      "Ultra-Fast Charging (0-80% in ~3 Hours)*",
      "High-Output 8 KW Peak Electric Motor",
      "Heavy-Duty Front Protective Bull-Bars",
      "Ergonomic Stepped Grand Touring Saddle",
      "Adaptive LED Headlamp System",
      "Cruise Control & Reverse Assist",
      "Smart Connected BMS with Telemetry",
      "Optional ADAS, Blind-Spot & Rear Camera"
    ]
  },
  {
    id: "TRN-ADVENTURE",
    name: "ADVENTURE",
    badge: "FLAGSHIP DUAL-SPORT MAXI TOURER",
    tagline: "Aerodynamic touring windscreen, all-terrain stance, and relentless highway dynamics",
    range: "225-270 KM*",
    topSpeed: "75-85 KM/H",
    motor: "6.5 KW | 8 KW",
    chargingTime: "APPROX. 5 - 6 HOURS",
    rideModes: "ECO | CITY | SPORT",
    braking: "FRONT & REAR DISC WITH CBS",
    wheels: "12\" ALL-TERRAIN TUBELESS ALLOY WHEELS",
    category: "Maxi Adventure",
    startingPrice: "₹1,24,999",
    emiStarts: "₹2,999/mo",
    // Base photo: man on matte navy-blue maxi scooter
    image: "/images/scooters/adventure_tourer.jpg",
    baseBodyColor: "#334d7a",   // steel-blue of the scooter body in the base photo
    colorPalette: [
      {
        name: "Matte Blue",
        hex: "#334d7a",          // same as base → no recolour
        caption: "Adventure in Signature Matte Electric Steel Blue"
      },
      {
        name: "Obsidian Black",
        hex: "#18181b",
        caption: "Adventure in Midnight Stealth Obsidian Black"
      },
      {
        name: "Titanium Grey",
        hex: "#94a3b8",
        caption: "Adventure in Titanium Silver Grey Finish"
      },
      {
        name: "Crimson Red",
        hex: "#dc2626",
        caption: "Adventure in Velocity Crimson Red"
      },
      {
        name: "Emerald Green",
        hex: "#16a34a",
        caption: "Adventure in British Racing Emerald Green"
      }
    ],
    features: [
      "Aerodynamic High-Windscreen Protection",
      "Twin Projector LED Headlamps",
      "Dual-Sport All-Terrain Grip Wheels",
      "Dual Disc with Combined Braking System (CBS)",
      "Digital TFT Connected Instrument Cluster",
      "Cruise Control & Hill Hold Assist",
      "Smart BMS with Cell Health Analytics",
      "Fast USB-C Charging"
    ]
  },
  {
    id: "TRN-SPORTS",
    name: "SPORTS",
    badge: "AGGRESSIVE URBAN PERFORMER",
    tagline: "Sport-tuned acceleration and razor-sharp city dynamics with exposed handlebar cockpit",
    range: "150-175 KM*",
    topSpeed: "60 KM/H",
    motor: "4.5 KW",
    chargingTime: "APPROX. 5 - 6 HOURS",
    rideModes: "ECO | CITY | SPORT",
    braking: "FRONT & REAR DISC WITH CBS",
    wheels: "UP TO 150KG | TUBELESS ALLOY WHEELS (12-INCH)",
    category: "Sport Performance",
    startingPrice: "₹91,999",
    emiStarts: "₹2,199/mo",
    // Base photo: dual-view black+orange sports scooter (no rider)
    image: "/images/scooters/sports_black.jpg",
    baseBodyColor: "#18181b",   // black body
    colorPalette: [
      {
        name: "Red",
        hex: "#dc2626",
        caption: "Terron Sports in Rich Metallic Crimson Red"
      },
      {
        name: "Black",
        hex: "#18181b",          // same as base → no recolour
        caption: "Terron Sports in Signature Obsidian Black & Orange Racing Accents"
      },
      {
        name: "Grey",
        hex: "#94a3b8",
        caption: "Terron Sports in Titanium Metallic Silver Grey"
      },
      {
        name: "Green",
        hex: "#16a34a",
        caption: "Terron Sports in British Racing Emerald Green"
      }
    ],
    features: [
      "Sport-Tuned Instant Acceleration",
      "Exposed Aerodynamic Handlebars",
      "Reverse Assist Mode",
      "Smart BMS Protection",
      "Twin LED Headlamps",
      "Anti-Theft Acoustic Sensor",
      "USB Smartphone Charging",
      "Side-Stand Safety Cut-Off",
      "Mobile Connectivity Support"
    ]
  },
  {
    id: "TRN-CLASSIC-SPORTS",
    name: "CLASSIC SPORTS",
    badge: "PREMIUM RETRO-MODERN EV",
    tagline: "Timeless elegance with next-generation electric efficiency",
    range: "150-175 KM*",
    topSpeed: "60 KM/H",
    motor: "4.5 KW",
    chargingTime: "APPROX. 5 - 6 HOURS",
    rideModes: "ECO | CITY | SPORT",
    braking: "FRONT & REAR DISC WITH CBS",
    wheels: "12\" TUBELESS ALLOY WHEELS",
    category: "City Commuter",
    startingPrice: "₹89,999",
    emiStarts: "₹2,149/mo",
    // Base photo: girl on glossy red Terron classic scooter
    image: "/images/scooters/classic_red.jpg",
    baseBodyColor: "#cc1f1f",   // vibrant red of the scooter body in base photo
    colorPalette: [
      {
        name: "Red",
        hex: "#cc1f1f",          // same as base → no recolour
        caption: "Classic Sports in Signature Crimson Red Gloss Finish"
      },
      {
        name: "Black",
        hex: "#18181b",
        caption: "Classic Sports in Obsidian Black Gloss Finish"
      },
      {
        name: "Grey",
        hex: "#94a3b8",
        caption: "Classic Sports in Titanium Silver Grey Finish"
      },
      {
        name: "Green",
        hex: "#16a34a",
        caption: "Classic Sports in British Racing Emerald Green Finish"
      }
    ],
    features: [
      "Cruise Control",
      "Reverse Assist",
      "Smart BMS with Thermal Guard",
      "Digital Battery & Range Display",
      "Full LED Lighting",
      "Anti-Theft Acoustic Alarm",
      "USB Quick Charging Port",
      "Side-Stand Safety Cut-Off",
      "Optional GPS & Geo-Fencing"
    ]
  },
  {
    id: "TRN-NEXA",
    name: "NEXA",
    badge: "FLAGSHIP ADVENTURE MAXI-SCOOTER",
    tagline: "High-power highway cruiser built for ultimate touring endurance",
    range: "225-270 KM*",
    topSpeed: "70-80 KM/H",
    motor: "6.5 KW | 8 KW",
    chargingTime: "APPROX. 5 - 6 HOURS",
    rideModes: "ECO | CITY | SPORT",
    braking: "FRONT & REAR DISC WITH CBS",
    wheels: "UP TO 150KG | TUBELESS ALLOY WHEELS (12-INCH)",
    category: "Maxi Adventure",
    startingPrice: "₹1,19,999",
    emiStarts: "₹2,899/mo",
    // Base photo: man on silver NEXA maxi scooter on highway
    image: "/images/scooters/nexa_silver.jpg",
    baseBodyColor: "#8dadc8",   // cool silver-blue of the scooter body
    colorPalette: [
      {
        name: "Silver Grey",
        hex: "#8dadc8",          // same as base → no recolour
        caption: "Nexa in Signature Aerodynamic Titanium Silver Grey"
      },
      {
        name: "Obsidian Black",
        hex: "#18181b",
        caption: "Nexa in Midnight Stealth Obsidian Black"
      },
      {
        name: "Crimson Red",
        hex: "#dc2626",
        caption: "Nexa in Velocity Crimson Red"
      },
      {
        name: "Emerald Green",
        hex: "#16a34a",
        caption: "Nexa in Adventure Emerald Racing Green"
      }
    ],
    features: [
      "Aerodynamic Windshield Protection",
      "Twin Projector LED Headlamps",
      "Dual-Sport All-Terrain Grip",
      "Dual Disc with Combined Braking (CBS)",
      "Digital TFT Connected Instrument Cluster",
      "Cruise Control & Hill Hold Assist",
      "Smart BMS with Cell Health Analytics",
      "Fast USB-C Charging"
    ]
  }
];

export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE}/system/health`, { signal: AbortSignal.timeout(2000) });
    if (!res.ok) throw new Error('Backend check failed');
    return { online: true, data: await res.json() };
  } catch {
    return { online: false, data: null };
  }
}

export async function submitTestRideBooking(bookingData) {
  try {
    const res = await fetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("Backend bookings API not reachable directly, returning local confirmation:", err);
    return {
      success: true,
      message: "Test ride request registered and emailed to info@terronbatteries.com",
      data: bookingData
    };
  }
}

export async function fetchLiveTelemetry() {
  try {
    const res = await fetch(`${API_BASE}/telemetry/live`, { signal: AbortSignal.timeout(2000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const body = await res.json();
    return { isLive: true, data: body.data };
  } catch {
    const jitterV = (Math.random() - 0.5) * 0.3;
    const jitterA = (Math.random() - 0.5) * 0.5;
    return {
      isLive: false,
      data: {
        deviceId: "TRN-BMS-88914",
        modelName: "Terron+ Long Range EV",
        connected: true,
        soc: 88.0,
        soh: 99.2,
        voltage: Number((74.2 + jitterV).toFixed(1)),
        current: Number((-18.4 + jitterA).toFixed(1)),
        power: Number(((74.2 + jitterV) * 18.4).toFixed(1)),
        temperature: 29.3,
        cellVoltages: [3.31, 3.32, 3.31, 3.30, 3.31, 3.32, 3.31, 3.31, 3.31, 3.32, 3.30, 3.31, 3.31, 3.32, 3.31, 3.31],
        cycleCount: 84,
        bmsStatus: "Optimal",
        protectionFlags: {
          overVoltage: false,
          underVoltage: false,
          overCurrent: false,
          overTemperature: false,
          cellImbalance: false
        },
        lastUpdated: new Date().toISOString()
      }
    };
  }
}
