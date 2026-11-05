const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const fallbackBatteries = [
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

export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE}/system/health`, { signal: AbortSignal.timeout(2500) });
    if (!res.ok) throw new Error('Health check non-200');
    return { online: true, data: await res.json() };
  } catch {
    return { online: false, data: null };
  }
}

export async function fetchBatteries(category = 'All', search = '') {
  try {
    const params = new URLSearchParams();
    if (category && category !== 'All') params.append('category', category);
    if (search) params.append('search', search);

    const res = await fetch(`${API_BASE}/batteries?${params.toString()}`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const body = await res.json();
    return { isLive: true, data: body.data };
  } catch (err) {
    console.warn('API error, using local fallback:', err.message);
    let filtered = [...fallbackBatteries];
    if (category && category !== 'All') {
      filtered = filtered.filter(b => b.category.toLowerCase().includes(category.toLowerCase()));
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(b => b.name.toLowerCase().includes(q) || b.chemistry.toLowerCase().includes(q));
    }
    return { isLive: false, data: filtered };
  }
}

export async function fetchLiveTelemetry() {
  try {
    const res = await fetch(`${API_BASE}/telemetry/live`, { signal: AbortSignal.timeout(2500) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const body = await res.json();
    return { isLive: true, data: body.data };
  } catch (err) {
    // Generate synthetic BMS telemetry when backend is not actively responding
    const jitterV = (Math.random() - 0.5) * 0.2;
    const jitterA = (Math.random() - 0.5) * 0.5;
    return {
      isLive: false,
      data: {
        deviceId: "TRN-BMS-88914 (Offline Simulation)",
        modelName: "Terron Ultra LFP 48V 100Ah",
        connected: true,
        soc: 85.2,
        soh: 98.4,
        voltage: Number((52.8 + jitterV).toFixed(2)),
        current: Number((-14.1 + jitterA).toFixed(2)),
        power: Number(((52.8 + jitterV) * 14.1).toFixed(1)),
        temperature: 28.5,
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
      }
    };
  }
}

export async function lookupWarranty(serialNumber) {
  try {
    const res = await fetch(`${API_BASE}/warranty/lookup/${encodeURIComponent(serialNumber)}`, { signal: AbortSignal.timeout(3000) });
    const body = await res.json();
    return body;
  } catch (err) {
    return {
      success: false,
      error: 'Backend unreachable. Make sure Express server is running on port 5000.'
    };
  }
}

export async function registerWarranty(warrantyData) {
  try {
    const res = await fetch(`${API_BASE}/warranty/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(warrantyData),
      signal: AbortSignal.timeout(4000)
    });
    return await res.json();
  } catch (err) {
    return {
      success: false,
      error: 'Failed to connect to backend server. Make sure Express is running.'
    };
  }
}

