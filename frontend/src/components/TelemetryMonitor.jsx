import React, { useState, useEffect } from 'react';
import { 
  BatteryCharging, 
  Thermometer, 
  Gauge, 
  Zap, 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle2, 
  Activity,
  Layers,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { fetchLiveTelemetry } from '../services/api';

export default function TelemetryMonitor({ onTriggerHaptic }) {
  const [telemetry, setTelemetry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiveApi, setIsLiveApi] = useState(false);
  const [simulationMode, setSimulationMode] = useState('normal'); // 'normal', 'charging', 'discharging', 'highload'

  const loadTelemetry = async () => {
    try {
      const res = await fetchLiveTelemetry();
      setIsLiveApi(res.isLive);
      let data = res.data;

      // Apply client-side simulation adjustments if selected
      if (simulationMode === 'charging') {
        data.current = 28.5;
        data.power = Number((data.voltage * 28.5).toFixed(1));
        data.soc = Math.min(100, Number((data.soc + 0.1).toFixed(1)));
      } else if (simulationMode === 'highload') {
        data.current = -45.0;
        data.power = Number((data.voltage * 45.0).toFixed(1));
        data.temperature = 38.6;
      }

      setTelemetry(data);
    } catch (err) {
      console.error('Failed to load telemetry:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTelemetry();
    const interval = setInterval(loadTelemetry, 2500);
    return () => clearInterval(interval);
  }, [simulationMode]);

  const handleSimChange = (mode) => {
    if (onTriggerHaptic) onTriggerHaptic();
    setSimulationMode(mode);
  };

  if (loading && !telemetry) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-slate-400">
        <Activity className="w-8 h-8 animate-spin text-terron-400 mb-3" />
        <p>Connecting to Battery Management System (BMS)...</p>
      </div>
    );
  }

  const isCharging = telemetry?.current > 0;
  const isHighTemp = telemetry?.temperature > 35;

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-terron-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-3">
              <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-terron-500/20 text-terron-300 border border-terron-500/30">
                Live BMS Telemetry
              </span>
              <span className="text-xs text-slate-400 flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span>Device ID: {telemetry?.deviceId}</span>
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white mt-1">
              {telemetry?.modelName || 'Terron Smart Battery'}
            </h2>
          </div>

          {/* Quick Simulation Toggles */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-950/70 p-1.5 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 px-2 font-medium">BMS Mode:</span>
            <button
              onClick={() => handleSimChange('normal')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                simulationMode === 'normal'
                  ? 'bg-terron-500 text-slate-950 shadow-md shadow-terron-500/30'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Normal
            </button>
            <button
              onClick={() => handleSimChange('charging')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-all ${
                simulationMode === 'charging'
                  ? 'bg-volt-500 text-slate-950 shadow-md shadow-volt-500/30'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>Charge (+28A)</span>
            </button>
            <button
              onClick={() => handleSimChange('highload')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-all ${
                simulationMode === 'highload'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <ArrowDownRight className="w-3.5 h-3.5" />
              <span>Heavy Load (-45A)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary Telemetry Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* State of Charge (SoC) */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-sm font-medium text-slate-400">State of Charge (SoC)</span>
            <div className="p-2 rounded-xl bg-terron-500/10 text-terron-400">
              <BatteryCharging className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline space-x-2">
            <span className="text-4xl font-extrabold text-white">{telemetry?.soc}%</span>
            <span className="text-xs text-slate-400">SoH: {telemetry?.soh}%</span>
          </div>
          {/* Progress bar */}
          <div className="mt-3 w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                telemetry?.soc > 30 ? 'bg-gradient-to-r from-terron-500 to-terron-300' : 'bg-red-500'
              }`}
              style={{ width: `${telemetry?.soc}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-slate-400 flex items-center space-x-1">
            <span>Cycle Count:</span>
            <span className="text-slate-200 font-semibold">{telemetry?.cycleCount} cycles</span>
          </p>
        </div>

        {/* Battery Voltage */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5">
          <div className="flex justify-between items-start">
            <span className="text-sm font-medium text-slate-400">Pack Voltage</span>
            <div className="p-2 rounded-xl bg-volt-500/10 text-volt-400">
              <Gauge className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline space-x-2">
            <span className="text-4xl font-extrabold text-white">{telemetry?.voltage}</span>
            <span className="text-lg font-bold text-slate-400">V</span>
          </div>
          <div className="mt-3 text-xs text-slate-400">
            Nominal: 51.2V | Max: 58.4V
          </div>
          <div className="mt-2 flex items-center text-xs text-emerald-400 space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Optimal Range</span>
          </div>
        </div>

        {/* Current & Power Flow */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5">
          <div className="flex justify-between items-start">
            <span className="text-sm font-medium text-slate-400">Current & Power</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Zap className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline space-x-2">
            <span className={`text-4xl font-extrabold ${isCharging ? 'text-emerald-400' : 'text-slate-100'}`}>
              {isCharging ? `+${telemetry?.current}` : telemetry?.current}
            </span>
            <span className="text-lg font-bold text-slate-400">A</span>
          </div>
          <div className="mt-3 text-xs text-slate-300 font-medium">
            Active Power: <span className="text-white font-bold">{telemetry?.power} W</span>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            Flow: <span className="font-semibold text-slate-200">{isCharging ? 'Charging (Input)' : 'Discharging (Load)'}</span>
          </p>
        </div>

        {/* Temperature & Thermal Status */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5">
          <div className="flex justify-between items-start">
            <span className="text-sm font-medium text-slate-400">Pack Temperature</span>
            <div className={`p-2 rounded-xl ${isHighTemp ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
              <Thermometer className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline space-x-2">
            <span className={`text-4xl font-extrabold ${isHighTemp ? 'text-amber-400' : 'text-white'}`}>
              {telemetry?.temperature}
            </span>
            <span className="text-lg font-bold text-slate-400">°C</span>
          </div>
          <div className="mt-3 text-xs text-slate-400">
            Thermal Limit: 55°C max
          </div>
          <div className={`mt-2 flex items-center text-xs space-x-1 ${isHighTemp ? 'text-amber-400' : 'text-emerald-400'}`}>
            {isHighTemp ? <AlertTriangle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
            <span>{isHighTemp ? 'Elevated Temp' : 'Normal Operating Temp'}</span>
          </div>
        </div>
      </div>

      {/* 16-Cell Balance Matrix */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800/80 gap-2">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <Layers className="w-5 h-5 text-terron-400" />
              <span>Cell Balance Status (16S LiFePO4 Array)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Individual cell monitoring with active balance delta &lt; 0.02V
            </p>
          </div>
          <div className="text-xs text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 self-start sm:self-auto">
            BMS Status: <span className="font-semibold text-emerald-400">{telemetry?.bmsStatus}</span>
          </div>
        </div>

        {/* Cells Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5 mt-5">
          {telemetry?.cellVoltages?.map((v, i) => (
            <div
              key={i}
              className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 text-center transition-all hover:border-terron-500/40 hover:bg-slate-800/40"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                C{i + 1}
              </span>
              <span className="text-sm font-extrabold text-white block">
                {v.toFixed(2)}V
              </span>
              <div className="mt-1.5 w-full bg-slate-800 rounded-full h-1">
                <div
                  className="bg-terron-400 h-full rounded-full"
                  style={{ width: `${((v - 2.8) / (3.6 - 2.8)) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

