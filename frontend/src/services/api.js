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
    heroImage: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=80",
    colorPalette: [
      { name: "Crimson Red", hex: "#dc2626" },
      { name: "Solar Yellow", hex: "#eab308" },
      { name: "Cobalt Blue", hex: "#2563eb" },
      { name: "Obsidian Black", hex: "#18181b" },
      { name: "Pearl White", hex: "#ffffff" }
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
    heroImage: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1000&q=80",
    colorPalette: [
      { name: "Blaze Red", hex: "#ef4444" },
      { name: "Cyber Orange", hex: "#f97316" },
      { name: "Stealth Black", hex: "#0f172a" },
      { name: "Ice White", hex: "#ffffff" }
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
    id: "TRN-NEXA",
    name: "Nexa",
    badge: "Maxi Touring Adventure",
    tagline: "High-power highway cruiser built for ultimate endurance",
    range: "225-270 KM*",
    topSpeed: "70-80 KM/H",
    motor: "6.5 KW | 8 KW",
    chargingTime: "Approx. 5 - 6 Hours",
    rideModes: "ECO | CITY | SPORT",
    braking: "Front & Rear Disc with CBS",
    wheels: "Up to 150KG | Tubeless Alloy (12-inch)",
    category: "Maxi Adventure",
    heroImage: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1000&q=80",
    colorPalette: [
      { name: "Titanium Silver", hex: "#94a3b8" },
      { name: "Gunmetal Grey", hex: "#475569" },
      { name: "Matte Black", hex: "#1e293b" }
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
    id: "TRN-ADVENTURE",
    name: "Adventure",
    badge: "Rugged All-Terrain Utility",
    tagline: "Built for tough gradients, cargo utility, and off-road freedom",
    range: "150-175 KM*",
    topSpeed: "60 KM/H",
    motor: "4.5 KW",
    chargingTime: "Approx. 5 - 6 Hours",
    rideModes: "ECO | CITY | SPORT",
    braking: "Front & Rear Disc with CBS",
    wheels: "12\" Heavy-Duty All-Terrain Wheels",
    category: "Utility & Off-Road",
    heroImage: "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1000&q=80",
    colorPalette: [
      { name: "Emerald Green", hex: "#047857" },
      { name: "Silver Dune", hex: "#cbd5e1" },
      { name: "Ranger Black", hex: "#09090b" }
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
    heroImage: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1000&q=80",
    colorPalette: [
      { name: "Aero Cyan Blue", hex: "#0284c7" },
      { name: "Volt Yellow", hex: "#eab308" },
      { name: "Glacier White", hex: "#ffffff" }
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

export async function fetchEvModels(category = 'All', search = '') {
  try {
    const params = new URLSearchParams();
    if (category && category !== 'All') params.append('category', category);
    if (search) params.append('search', search);

    const res = await fetch(`${API_BASE}/batteries?${params.toString()}`, { signal: AbortSignal.timeout(2500) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const body = await res.json();
    return { isLive: true, data: body.data };
  } catch {
    let filtered = [...brochureModels];
    if (category && category !== 'All') {
      filtered = filtered.filter(b => b.category.toLowerCase().includes(category.toLowerCase()));
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(b => b.name.toLowerCase().includes(q) || b.tagline.toLowerCase().includes(q));
    }
    return { isLive: false, data: filtered };
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

export async function lookupWarranty(serialNumber) {
  try {
    const res = await fetch(`${API_BASE}/warranty/lookup/${encodeURIComponent(serialNumber)}`, { signal: AbortSignal.timeout(3000) });
    return await res.json();
  } catch (err) {
    return {
      success: false,
      error: 'Backend offline. Make sure Express server is running on port 5000.'
    };
  }
}
