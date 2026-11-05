const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const brochureModels = [
  {
    id: "TRN-CLASSIC-SPORT",
    name: "Classic Sport",
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
        caption: "Iconic Crimson Red Metallic with Chrome Trim",
        filter: "none"
      },
      { 
        name: "Obsidian Black", 
        hex: "#18181b", 
        image: "/images/scooters/classic_black.jpg",
        caption: "Stealth Obsidian Black with Racing Decals",
        filter: "none"
      },
      { 
        name: "Solar Yellow", 
        hex: "#eab308", 
        image: "/images/scooters/classic_red.jpg",
        caption: "Vibrant Solar Yellow Edition",
        filter: "hue-rotate(45deg) saturate(1.2)"
      },
      { 
        name: "Cobalt Blue", 
        hex: "#2563eb", 
        image: "/images/scooters/classic_red.jpg",
        caption: "Electric Cobalt Blue Edition",
        filter: "hue-rotate(185deg) saturate(1.3)"
      },
      { 
        name: "Emerald Green", 
        hex: "#047857", 
        image: "/images/scooters/adventure_green.jpg",
        caption: "British Racing Emerald Green",
        filter: "none"
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
        caption: "Rugged Emerald Green with Bull-Bars",
        filter: "none"
      },
      { 
        name: "Ranger Black", 
        hex: "#09090b", 
        image: "/images/scooters/classic_black.jpg",
        caption: "Heavy Duty Ranger Black Edition",
        filter: "none"
      },
      { 
        name: "Silver Dune", 
        hex: "#94a3b8", 
        image: "/images/scooters/nexa_silver.jpg",
        caption: "Dune Silver Matte Finish",
        filter: "none"
      },
      { 
        name: "Blaze Red", 
        hex: "#dc2626", 
        image: "/images/scooters/classic_red.jpg",
        caption: "Blaze Red Rally Pack",
        filter: "none"
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
        caption: "Aerodynamic Titanium Silver with Touring Shield",
        filter: "none"
      },
      { 
        name: "Stealth Black", 
        hex: "#1e293b", 
        image: "/images/scooters/classic_black.jpg",
        caption: "Stealth Gunmetal Dark Edition",
        filter: "none"
      },
      { 
        name: "Cobalt Blue", 
        hex: "#2563eb", 
        image: "/images/scooters/nexa_silver.jpg",
        caption: "Pacific Deep Cobalt Blue",
        filter: "hue-rotate(190deg) saturate(1.4)"
      },
      { 
        name: "Blaze Red", 
        hex: "#dc2626", 
        image: "/images/scooters/classic_red.jpg",
        caption: "Nexa Red Touring Edition",
        filter: "none"
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
    id: "TRN-SPORT",
    name: "Sport",
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
    image: "/images/scooters/classic_red.jpg",
    colorPalette: [
      { 
        name: "Blaze Red", 
        hex: "#ef4444", 
        image: "/images/scooters/classic_red.jpg",
        caption: "Trackside Blaze Red Finish",
        filter: "none"
      },
      { 
        name: "Stealth Black", 
        hex: "#0f172a", 
        image: "/images/scooters/classic_black.jpg",
        caption: "Matte Black Nightrider Edition",
        filter: "none"
      },
      { 
        name: "Cyber Orange", 
        hex: "#f97316", 
        image: "/images/scooters/classic_red.jpg",
        caption: "High-Visibility Cyber Orange",
        filter: "hue-rotate(25deg) saturate(1.3)"
      },
      { 
        name: "Ice White", 
        hex: "#f8fafc", 
        image: "/images/scooters/classic_black.jpg",
        caption: "Arctic Glacier White",
        filter: "contrast(0.9) brightness(1.2)"
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
    badge: "Flagship Ultra Long-Range",
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
        name: "Aero Cyan Blue", 
        hex: "#0284c7", 
        image: "/images/scooters/nexa_silver.jpg",
        caption: "Flagship Cyan Aero Grand Tourer",
        filter: "hue-rotate(180deg) saturate(1.4)"
      },
      { 
        name: "Crimson Red", 
        hex: "#dc2626", 
        image: "/images/scooters/classic_red.jpg",
        caption: "Crimson Velocity Edition",
        filter: "none"
      },
      { 
        name: "Volt Yellow", 
        hex: "#eab308", 
        image: "/images/scooters/nexa_silver.jpg",
        caption: "Volt Flash Highway Cruiser",
        filter: "hue-rotate(45deg) saturate(1.3)"
      },
      { 
        name: "Stealth Titanium", 
        hex: "#94a3b8", 
        image: "/images/scooters/nexa_silver.jpg",
        caption: "Brushed Titanium Metallic",
        filter: "none"
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
        deviceId: "TRN-BMS-88914 (Brochure Demo)",
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
