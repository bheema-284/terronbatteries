// Terron EV Mobility & Batteries in-memory data store
// SRIDEWI ENERGIES PRIVATE LIMITED
// The 4 Official EV Bikes: CLASSIC SPORTS, NEXA, SPORTS, TERRON+

const evModels = [
  {
    id: "TRN-CLASSIC-SPORTS",
    name: "CLASSIC SPORTS",
    badge: "Premium Electric Scooter",
    tagline: "Timeless elegance meets modern electric performance",
    range: "150-175 KM*",
    topSpeed: "60 KM/H",
    motor: "4.5 KW",
    chargingTime: "Approx. 5 - 6 Hours",
    rideModes: "ECO | CITY | SPORT",
    braking: "Front & Rear Disc with CBS",
    wheels: "12\" Tubeless Alloy Wheels",
    category: "City Commuter",
    startingPrice: "₹89,999",
    colors: [
      { name: "Crimson Red (Classic)", hex: "#dc2626" },
      { name: "Obsidian Black", hex: "#18181b" },
      { name: "Emerald Green", hex: "#047857" },
      { name: "Titanium Silver", hex: "#94a3b8" }
    ],
    features: [
      "Cruise Control",
      "Reverse Assist",
      "Smart BMS with Thermal Guard",
      "Digital Battery & Range Display",
      "Full LED Lighting",
      "Anti-Theft Alarm",
      "USB Quick Charge",
      "Side-Stand Engine Cut-Off",
      "Optional GPS & Geo-Fencing"
    ]
  },
  {
    id: "TRN-NEXA",
    name: "NEXA",
    badge: "Flagship Adventure Maxi-Scooter",
    tagline: "Dominate both asphalt highways and rugged trails",
    range: "225-270 KM*",
    topSpeed: "70-80 KM/H",
    motor: "6.5 KW | 8 KW",
    chargingTime: "Approx. 5 - 6 Hours",
    rideModes: "ECO | CITY | SPORT",
    braking: "Front & Rear Disc with CBS",
    wheels: "Up to 150KG | Tubeless Alloy (12-inch)",
    category: "Maxi Adventure",
    startingPrice: "₹1,19,999",
    colors: [
      { name: "Titanium Silver (Nexa)", hex: "#94a3b8" },
      { name: "Obsidian Black", hex: "#18181b" },
      { name: "Crimson Red", hex: "#dc2626" },
      { name: "Emerald Green", hex: "#047857" }
    ],
    features: [
      "Tall Touring Aerodynamic Windshield",
      "Twin Projector LED Headlamps",
      "All-Terrain Knobby Tires",
      "Dual-Channel Braking with CBS",
      "Digital TFT Connected Cluster",
      "Cruise Control & Hill Hold",
      "Smart BMS with Remote Diagnostics",
      "USB Quick Charging"
    ]
  },
  {
    id: "TRN-SPORTS",
    name: "SPORTS",
    badge: "High-Performance Electric Scooter",
    tagline: "Aggressive styling and razor-sharp city agility",
    range: "150-175 KM*",
    topSpeed: "60 KM/H",
    motor: "4.5 KW",
    chargingTime: "Approx. 5 - 6 Hours",
    rideModes: "ECO | CITY | SPORT",
    braking: "Front & Rear Disc with CBS",
    wheels: "Up to 150KG | Tubeless Alloy (12-inch)",
    category: "Sport Performance",
    startingPrice: "₹91,999",
    colors: [
      { name: "Obsidian Black (Sports)", hex: "#18181b" },
      { name: "Crimson Red", hex: "#dc2626" },
      { name: "Emerald Green", hex: "#047857" },
      { name: "Titanium Silver", hex: "#94a3b8" }
    ],
    features: [
      "Sport-Tuned Acceleration",
      "Exposed Sport Handlebars",
      "Reverse Assist Mode",
      "Smart BMS Protection",
      "Twin LED Headlamps",
      "Anti-Theft Acoustic Alert",
      "USB Charging Port",
      "Side-Stand Safety Cut-Off",
      "Mobile App Connectivity"
    ]
  },
  {
    id: "TRN-TERRON-PLUS",
    name: "TERRON+",
    badge: "Ultra Long-Range Grand Tourer",
    tagline: "Maximum range and 3-hour rapid charging capability",
    range: "225-270 KM",
    topSpeed: "70-80 KM/H",
    motor: "6.5 KW | 8 KW",
    chargingTime: "Approx. 3 Hours (0-80%)*",
    rideModes: "ECO | CITY | SPORT",
    braking: "Front & Rear Disc with CBS",
    wheels: "12\" Premium Aero Tubeless Alloy",
    category: "Grand Tourer",
    startingPrice: "₹1,29,999",
    colors: [
      { name: "Emerald Green (Adventure)", hex: "#047857" },
      { name: "Titanium Silver", hex: "#94a3b8" },
      { name: "Crimson Red", hex: "#dc2626" },
      { name: "Obsidian Black", hex: "#18181b" }
    ],
    features: [
      "Fast Charging: 0-80% in Approx 3 Hours*",
      "High-Output 8 KW Peak Electric Powertrain",
      "Ergonomic Stepped Grand Touring Saddle",
      "Adaptive LED Lighting Matrix",
      "Cruise Control & Reverse Assist",
      "Smart Connected BMS with Thermal Dissipation",
      "Optional ADAS & Blind-Spot Alerts"
    ]
  }
];

// Active Telemetry state (simulating real-time BMS data)
let activeTelemetry = {
  deviceId: "TRN-BMS-88914",
  modelName: "Terron+ Long Range EV",
  connected: true,
  soc: 88.0, // State of Charge %
  soh: 99.1, // State of Health %
  voltage: 74.2, // Volts
  current: -18.5, // Amperes
  power: 1372.7, // Watts
  temperature: 29.2, // Celsius
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
};

// Registered warranties & bookings
const warranties = [
  {
    serialNumber: "TRN-2026-99014",
    customerName: "Sridevi Kadiyala",
    customerEmail: "sridevi@sridewienergies.com",
    batteryId: "TRN-TERRON-PLUS",
    purchaseDate: "2026-01-15",
    warrantyExpiry: "2031-01-15",
    status: "Active"
  }
];

const bookings = [];

module.exports = {
  evModels,
  getTelemetry: () => {
    const jitterV = (Math.random() - 0.5) * 0.3;
    const jitterA = (Math.random() - 0.5) * 0.6;
    activeTelemetry.voltage = Number((74.2 + jitterV).toFixed(1));
    activeTelemetry.current = Number((-18.5 + jitterA).toFixed(1));
    activeTelemetry.power = Number((activeTelemetry.voltage * Math.abs(activeTelemetry.current)).toFixed(1));
    activeTelemetry.lastUpdated = new Date().toISOString();
    return activeTelemetry;
  },
  updateTelemetrySettings: (updates) => {
    activeTelemetry = { ...activeTelemetry, ...updates, lastUpdated: new Date().toISOString() };
    return activeTelemetry;
  },
  warranties,
  bookings
};
