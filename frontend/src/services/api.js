const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Exact logo background color sampled from logo.png
export const LOGO_BG_COLOR = '#111E31'; // RGB(17, 30, 49)

export const brochureModels = [
  {
    id: "TRN-CLASSIC",
    name: "Classic",
    badge: "Premium Electric Scooter",
    tagline: "Timeless elegance with next-generation electric efficiency",
    range: "150-175 KM*",
    topSpeed: "60 KM/H",
    motor: "4.5 KW",
    chargingTime: "Approx. 5 - 6 Hours",
    rideModes: "ECO | CITY | SPORT",
    braking: "Front & Rear Disc with CBS",
    wheels: "12\" Tubeless Alloy Wheels",
    category: "City Commuter",
    startingPrice: "₹89,999",
    emiStarts: "₹2,149/mo",
    image: "/images/scooters/classic_red.jpg",
    colorPalette: [
      { 
        name: "Crimson Red", 
        hex: "#dc2626", 
        image: "/images/scooters/classic_red.jpg",
        caption: "Classic in Crimson Metallic Red with Chrome Accents",
        isRider: true
      },
      { 
        name: "Obsidian Black", 
        hex: "#18181b", 
        image: "/images/scooters/classic_black.jpg",
        caption: "Classic in Obsidian Black Dual Studio Edition",
        isRider: false
      },
      { 
        name: "Emerald Green", 
        hex: "#047857", 
        image: "/images/scooters/adventure_green.jpg",
        caption: "Adventure Styling in British Racing Emerald Green",
        isRider: false
      },
      { 
        name: "Titanium Silver", 
        hex: "#94a3b8", 
        image: "/images/scooters/nexa_silver.jpg",
        caption: "Nexa Styling in Titanium Metallic Silver",
        isRider: true
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
    id: "TRN-ADVENTURE",
    name: "Adventure",
    badge: "Rugged All-Terrain Utility",
    tagline: "Engineered for tough gradients, cargo utility, and off-road freedom",
    range: "150-175 KM*",
    topSpeed: "60 KM/H",
    motor: "4.5 KW",
    chargingTime: "Approx. 5 - 6 Hours",
    rideModes: "ECO | CITY | SPORT",
    braking: "Front & Rear Disc with CBS",
    wheels: "12\" Heavy-Duty All-Terrain Wheels",
    category: "Utility & Off-Road",
    startingPrice: "₹94,999",
    emiStarts: "₹2,299/mo",
    image: "/images/scooters/adventure_green.jpg",
    colorPalette: [
      { 
        name: "Emerald Green", 
        hex: "#047857", 
        image: "/images/scooters/adventure_green.jpg",
        caption: "Adventure Bike in Rugged Emerald Green with Bull-Bars",
        isRider: false
      },
      { 
        name: "Ranger Black", 
        hex: "#09090b", 
        image: "/images/scooters/classic_black.jpg",
        caption: "Adventure in Heavy-Duty Ranger Black",
        isRider: false
      },
      { 
        name: "Crimson Red", 
        hex: "#dc2626", 
        image: "/images/scooters/classic_red.jpg",
        caption: "Adventure in Crimson Red Metallic",
        isRider: true
      },
      { 
        name: "Silver Dune", 
        hex: "#94a3b8", 
        image: "/images/scooters/nexa_silver.jpg",
        caption: "Adventure in Dune Titanium Silver",
        isRider: true
      }
    ],
    features: [
      "Reinforced Rear Cargo / Luggage Carrier",
      "Protective Front Apron Bull Bars",
      "High Ground Clearance Underbody",
      "Reverse Assist Function",
      "High-Contrast Digital Gauge Display",
      "IP67 Waterproof Smart BMS Housing",
      "Side-Stand Engine Cut-Off"
    ]
  },
  {
    id: "TRN-NEXA",
    name: "Nexa",
    badge: "Maxi Touring Adventure",
    tagline: "High-power highway cruiser built for ultimate touring endurance",
    range: "225-270 KM*",
    topSpeed: "70-80 KM/H",
    motor: "6.5 KW | 8 KW",
    chargingTime: "Approx. 5 - 6 Hours",
    rideModes: "ECO | CITY | SPORT",
    braking: "Front & Rear Disc with CBS",
    wheels: "Up to 150KG | Tubeless Alloy (12-inch)",
    category: "Maxi Adventure",
    startingPrice: "₹1,19,999",
    emiStarts: "₹2,899/mo",
    image: "/images/scooters/nexa_silver.jpg",
    colorPalette: [
      { 
        name: "Titanium Silver", 
        hex: "#94a3b8", 
        image: "/images/scooters/nexa_silver.jpg",
        caption: "Nexa in Aerodynamic Titanium Silver with Touring Windshield",
        isRider: true
      },
      { 
        name: "Stealth Black", 
        hex: "#18181b", 
        image: "/images/scooters/classic_black.jpg",
        caption: "Nexa in Stealth Obsidian Dark Finish",
        isRider: false
      },
      { 
        name: "Crimson Red", 
        hex: "#dc2626", 
        image: "/images/scooters/classic_red.jpg",
        caption: "Nexa in Crimson Touring Red",
        isRider: true
      },
      { 
        name: "Emerald Green", 
        hex: "#047857", 
        image: "/images/scooters/adventure_green.jpg",
        caption: "Nexa Adventure Pack in Emerald Green",
        isRider: false
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
  },
  {
    id: "TRN-SPORTS",
    name: "Sports",
    badge: "Aggressive Urban Performer",
    tagline: "Sport-tuned acceleration and razor-sharp city dynamics",
    range: "150-175 KM*",
    topSpeed: "60 KM/H",
    motor: "4.5 KW",
    chargingTime: "Approx. 5 - 6 Hours",
    rideModes: "ECO | CITY | SPORT",
    braking: "Front & Rear Disc with CBS",
    wheels: "Up to 150KG | Tubeless Alloy (12-inch)",
    category: "Sport Performance",
    startingPrice: "₹91,999",
    emiStarts: "₹2,199/mo",
    image: "/images/scooters/classic_black.jpg",
    colorPalette: [
      { 
        name: "Obsidian Black", 
        hex: "#18181b", 
        image: "/images/scooters/classic_black.jpg",
        caption: "Sports in Obsidian Matte Black with Orange Decals",
        isRider: false
      },
      { 
        name: "Track Red", 
        hex: "#dc2626", 
        image: "/images/scooters/classic_red.jpg",
        caption: "Sports in Trackside Crimson Red",
        isRider: true
      },
      { 
        name: "Emerald Green", 
        hex: "#047857", 
        image: "/images/scooters/adventure_green.jpg",
        caption: "Sports in Emerald Racing Green",
        isRider: false
      },
      { 
        name: "Titanium Silver", 
        hex: "#94a3b8", 
        image: "/images/scooters/nexa_silver.jpg",
        caption: "Sports in Aerodynamic Titanium Silver",
        isRider: true
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
    id: "TRN-TERRON-PLUS",
    name: "Terron+",
    badge: "Flagship Ultra Long-Range Grand Tourer",
    tagline: "3-Hour rapid charge and unmatched 270 KM touring range",
    range: "225-270 KM",
    topSpeed: "70-80 KM/H",
    motor: "6.5 KW | 8 KW",
    chargingTime: "Approx. 3 Hours (0-80%)*",
    rideModes: "ECO | CITY | SPORT",
    braking: "Front & Rear Disc with CBS",
    wheels: "12\" Premium Aero Tubeless Alloy",
    category: "Grand Tourer",
    startingPrice: "₹1,29,999",
    emiStarts: "₹3,149/mo",
    image: "/images/scooters/nexa_silver.jpg",
    colorPalette: [
      { 
        name: "Titanium Silver", 
        hex: "#94a3b8", 
        image: "/images/scooters/nexa_silver.jpg",
        caption: "Terron+ in Titanium Metallic with Long-Range Pack",
        isRider: true
      },
      { 
        name: "Emerald Green", 
        hex: "#047857", 
        image: "/images/scooters/adventure_green.jpg",
        caption: "Terron+ in Emerald Green Grand Tourer",
        isRider: false
      },
      { 
        name: "Crimson Red", 
        hex: "#dc2626", 
        image: "/images/scooters/classic_red.jpg",
        caption: "Terron+ in Crimson Velocity",
        isRider: true
      },
      { 
        name: "Obsidian Black", 
        hex: "#18181b", 
        image: "/images/scooters/classic_black.jpg",
        caption: "Terron+ in Midnight Stealth Edition",
        isRider: false
      }
    ],
    features: [
      "Ultra-Fast Charging (0-80% in ~3 Hours)*",
      "High-Output 8 KW Peak Electric Motor",
      "Ergonomic Stepped Grand Touring Saddle",
      "Adaptive LED Headlamp System",
      "Cruise Control & Reverse Assist",
      "Smart Connected BMS with Telemetry",
      "Optional ADAS, Blind-Spot & Rear Camera"
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
        deviceId: "TRN-BMS-88914 (Live)",
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
