// Terron Batteries in-memory data store with realistic battery models and telemetry

const initialBatteries = [
  {
    id: "TB-LFP-48V",
    name: "Terron Ultra LFP 48V 100Ah",
    category: "Solar Storage",
    chemistry: "LiFePO4 (Lithium Iron Phosphate)",
    nominalVoltage: "51.2 V",
    capacity: "100 Ah (5.12 kWh)",
    cycleLife: "6000+ Cycles @ 80% DoD",
    warrantyYears: 10,
    price: 1299,
    inStock: true,
    rating: 4.9,
    description: "Premium wall-mounted home energy storage battery with integrated Smart BMS and CAN/RS485 communication.",
    specs: {
      maxChargeCurrent: "50 A",
      maxDischargeCurrent: "100 A",
      operatingTemp: "-10°C to 55°C",
      weight: "44 kg",
      dimensions: "650 x 440 x 180 mm",
      efficiency: "98.5%"
    }
  },
  {
    id: "TB-EV-72V",
    name: "Terron VoltMax EV 72V 60Ah",
    category: "Electric Vehicles (2W/3W)",
    chemistry: "NMC (Nickel Manganese Cobalt)",
    nominalVoltage: "72.0 V",
    capacity: "60 Ah (4.32 kWh)",
    cycleLife: "2500+ Cycles @ 90% DoD",
    warrantyYears: 5,
    price: 899,
    inStock: true,
    rating: 4.8,
    description: "High energy-density powerpack engineered for electric scooters, motorbikes, and commercial 3-wheelers.",
    specs: {
      maxChargeCurrent: "30 A",
      maxDischargeCurrent: "90 A",
      operatingTemp: "-20°C to 60°C",
      weight: "22 kg",
      dimensions: "380 x 220 x 170 mm",
      efficiency: "97.2%"
    }
  },
  {
    id: "TB-INV-12V",
    name: "Terron Prime HeavyDuty Inverter 12V 200Ah",
    category: "Inverter & UPS",
    chemistry: "Tubular Deep Cycle Gel",
    nominalVoltage: "12.0 V",
    capacity: "200 Ah (2.4 kWh)",
    cycleLife: "1800+ Cycles",
    warrantyYears: 3,
    price: 349,
    inStock: true,
    rating: 4.7,
    description: "Heavy-duty low maintenance tubular inverter battery built to endure extreme power outages and high ambient temperatures.",
    specs: {
      maxChargeCurrent: "20 A",
      maxDischargeCurrent: "50 A",
      operatingTemp: "0°C to 50°C",
      weight: "58 kg",
      dimensions: "505 x 190 x 410 mm",
      efficiency: "92.0%"
    }
  },
  {
    id: "TB-IND-96V",
    name: "Terron Industrial PowerCore 96V 250Ah",
    category: "Industrial & Telecom",
    chemistry: "Advanced LiFePO4",
    nominalVoltage: "96.0 V",
    capacity: "250 Ah (24.0 kWh)",
    cycleLife: "8000+ Cycles",
    warrantyYears: 10,
    price: 5499,
    inStock: true,
    rating: 5.0,
    description: "Modular high-voltage energy storage cabinet for telecom base stations, data centers, and microgrids.",
    specs: {
      maxChargeCurrent: "125 A",
      maxDischargeCurrent: "200 A",
      operatingTemp: "-25°C to 65°C",
      weight: "210 kg",
      dimensions: "1200 x 800 x 600 mm",
      efficiency: "99.1%"
    }
  }
];

// Active Telemetry state (simulating real-time BMS data)
let activeTelemetry = {
  deviceId: "TRN-BMS-88914",
  modelName: "Terron Ultra LFP 48V 100Ah",
  connected: true,
  soc: 84.5, // State of Charge %
  soh: 98.2, // State of Health %
  voltage: 52.8, // Volts
  current: -14.2, // Amperes (negative = discharging, positive = charging)
  power: 749.76, // Watts
  temperature: 28.4, // Celsius
  cellVoltages: [3.30, 3.31, 3.30, 3.29, 3.30, 3.31, 3.30, 3.30, 3.30, 3.31, 3.29, 3.30, 3.30, 3.31, 3.30, 3.30],
  cycleCount: 142,
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

// Registered warranties
const warranties = [
  {
    serialNumber: "TRN-2026-99014",
    customerName: "Jane Doe",
    customerEmail: "jane.doe@example.com",
    batteryId: "TB-LFP-48V",
    purchaseDate: "2026-01-15",
    warrantyExpiry: "2036-01-15",
    status: "Active"
  },
  {
    serialNumber: "TRN-2025-41288",
    customerName: "Alex Rivera",
    customerEmail: "alex.r@example.com",
    batteryId: "TB-EV-72V",
    purchaseDate: "2025-06-10",
    warrantyExpiry: "2030-06-10",
    status: "Active"
  }
];

module.exports = {
  batteries: initialBatteries,
  getTelemetry: () => {
    // Add small realistic jitter to telemetry simulation
    const jitterV = (Math.random() - 0.5) * 0.2;
    const jitterA = (Math.random() - 0.5) * 0.6;
    const jitterT = (Math.random() - 0.5) * 0.1;
    
    activeTelemetry.voltage = Number((52.8 + jitterV).toFixed(2));
    activeTelemetry.current = Number((-14.2 + jitterA).toFixed(2));
    activeTelemetry.temperature = Number((28.4 + jitterT).toFixed(1));
    activeTelemetry.power = Number((activeTelemetry.voltage * Math.abs(activeTelemetry.current)).toFixed(1));
    activeTelemetry.lastUpdated = new Date().toISOString();
    return activeTelemetry;
  },
  updateTelemetrySettings: (updates) => {
    activeTelemetry = { ...activeTelemetry, ...updates, lastUpdated: new Date().toISOString() };
    return activeTelemetry;
  },
  warranties
};

