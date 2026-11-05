import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  ShieldCheck, 
  Sliders, 
  RotateCcw, 
  BatteryCharging, 
  Eye, 
  Camera, 
  Activity, 
  Compass, 
  Wifi, 
  Zap,
  Gauge,
  Thermometer
} from 'lucide-react';
import { fetchLiveTelemetry } from '../services/api';

export default function TechnologySection() {
  const [telemetry, setTelemetry] = useState(null);

  useEffect(() => {
    fetchLiveTelemetry().then(res => setTelemetry(res.data));
    const interval = setInterval(() => {
      fetchLiveTelemetry().then(res => setTelemetry(res.data));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="technology" className="py-20 bg-[#081326] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-400 bg-sky-500/10 border border-sky-500/20 px-3 py-1 rounded-full">
            Engineering & Innovation
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mt-3">
            Everyday Convenience. Premium Technology.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Packed with rider assistance, smart BMS monitoring, and enterprise grade safety systems to ensure every commute is smooth and protected.
          </p>
        </div>

        {/* 2 Core Feature Pillars from Page 8 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Pillar 1: Everyday Convenience */}
          <div className="bg-[#0b1b36] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-sky-500/10 text-sky-400 rounded-xl border border-sky-500/20">
                <Sliders className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                  Everyday Convenience
                </h3>
                <p className="text-xs text-sky-400 font-medium">Standard & City Proposals</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              City models propose riding modes, cruise control, reverse assistance, a digital display, LED lighting, USB charging, smart BMS protection, and side-stand cut-off. GPS and mobile features are optional.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-[#060e1c] p-3 rounded-xl border border-slate-800/80 flex items-center space-x-2.5">
                <Gauge className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="text-slate-200">3 Riding Modes (Eco/City/Sport)</span>
              </div>
              <div className="bg-[#060e1c] p-3 rounded-xl border border-slate-800/80 flex items-center space-x-2.5">
                <Activity className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="text-slate-200">Cruise Control System</span>
              </div>
              <div className="bg-[#060e1c] p-3 rounded-xl border border-slate-800/80 flex items-center space-x-2.5">
                <RotateCcw className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="text-slate-200">Electric Reverse Assistance</span>
              </div>
              <div className="bg-[#060e1c] p-3 rounded-xl border border-slate-800/80 flex items-center space-x-2.5">
                <BatteryCharging className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="text-slate-200">Digital Battery & Range Cluster</span>
              </div>
              <div className="bg-[#060e1c] p-3 rounded-xl border border-slate-800/80 flex items-center space-x-2.5">
                <Zap className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="text-slate-200">USB Mobile Quick Charging</span>
              </div>
              <div className="bg-[#060e1c] p-3 rounded-xl border border-slate-800/80 flex items-center space-x-2.5">
                <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="text-slate-200">Side-Stand Safety Cut-Off</span>
              </div>
            </div>
          </div>

          {/* Pillar 2: Premium Technology */}
          <div className="bg-[#0b1b36] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                  Premium Technology
                </h3>
                <p className="text-xs text-blue-400 font-medium">Advanced Connected Proposals</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              Premium proposals include dual-channel ABS, traction control, hill hold, TPMS, blind-spot alerts, rear camera, ADAS warnings, TFT display and connected functions. Installation and availability require supplier confirmation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-[#060e1c] p-3 rounded-xl border border-slate-800/80 flex items-center space-x-2.5">
                <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-slate-200">Dual-Channel ABS & Traction</span>
              </div>
              <div className="bg-[#060e1c] p-3 rounded-xl border border-slate-800/80 flex items-center space-x-2.5">
                <Compass className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-slate-200">Hill Hold Gradient Assist</span>
              </div>
              <div className="bg-[#060e1c] p-3 rounded-xl border border-slate-800/80 flex items-center space-x-2.5">
                <Eye className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-slate-200">Blind-Spot & ADAS Warnings</span>
              </div>
              <div className="bg-[#060e1c] p-3 rounded-xl border border-slate-800/80 flex items-center space-x-2.5">
                <Camera className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-slate-200">Rear Parking Camera Support</span>
              </div>
              <div className="bg-[#060e1c] p-3 rounded-xl border border-slate-800/80 flex items-center space-x-2.5">
                <Activity className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-slate-200">TPMS Tyre Pressure Monitoring</span>
              </div>
              <div className="bg-[#060e1c] p-3 rounded-xl border border-slate-800/80 flex items-center space-x-2.5">
                <Wifi className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-slate-200">Full TFT Connected Cluster</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live BMS Telemetry Card */}
        <div className="bg-[#060e1c] border border-slate-800 rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <h4 className="text-lg font-bold text-white">Smart BMS Live Telemetry System</h4>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Real-time battery management protection with individual 16-cell balancing & thermal safeguards
              </p>
            </div>
            <span className="text-xs px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg self-start sm:self-auto font-semibold">
              BMS: {telemetry?.bmsStatus || 'Optimal'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            <div className="bg-[#0b1b36] p-4 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">State of Charge (SoC)</span>
              <span className="text-2xl font-black text-white">{telemetry?.soc || 88}%</span>
              <span className="text-[11px] text-emerald-400 block mt-1">Health: {telemetry?.soh || 99}% SoH</span>
            </div>
            <div className="bg-[#0b1b36] p-4 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Pack Voltage</span>
              <span className="text-2xl font-black text-white">{telemetry?.voltage || 74.2} V</span>
              <span className="text-[11px] text-slate-400 block mt-1">Nominal High Voltage</span>
            </div>
            <div className="bg-[#0b1b36] p-4 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Pack Temperature</span>
              <span className="text-2xl font-black text-white">{telemetry?.temperature || 29.2} °C</span>
              <span className="text-[11px] text-emerald-400 block mt-1">Active Thermal Cooling</span>
            </div>
            <div className="bg-[#0b1b36] p-4 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Cycle Counts</span>
              <span className="text-2xl font-black text-white">{telemetry?.cycleCount || 84}</span>
              <span className="text-[11px] text-sky-400 block mt-1">Long-life Chemistry</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

