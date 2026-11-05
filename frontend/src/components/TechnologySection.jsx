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
  Gauge
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
    <section id="technology" className="py-20 bg-[#111E31] relative overflow-hidden">
      {/* Background ambient blur in electric blue and gold */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#38BDF8]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#EAB308]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#CBD5E1] bg-[#15243C] border border-[#1E3352] px-3.5 py-1 rounded-full">
            INTELLIGENT HARDWARE & SAFETY
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mt-3 tracking-tight">
            SMART EVERYDAY & <span className="text-[#EAB308]">PREMIUM TECH</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Directly from Page 8 of the official Terron EV Mobility specification dossier.
          </p>
        </div>

        {/* 2 Core Feature Pillars from Page 8 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Pillar 1: EVERYDAY CONVENIENCE */}
          <div className="bg-[#15243C] border border-[#1E3352] rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-[#EAB308]/10 text-[#EAB308] rounded-xl border border-[#EAB308]/30">
                  <Sliders className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-[#EAB308] uppercase tracking-wide">
                    EVERYDAY CONVENIENCE
                  </h3>
                  <span className="text-[11px] text-[#CBD5E1] font-semibold">City Models & Standard Feature Suite</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium mb-6">
                City models propose riding modes, cruise control, reverse assistance, a digital display, LED lighting, USB charging, smart BMS protection and side-stand cut-off. GPS and mobile features are optional.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-[#0E1A2C] p-3 rounded-xl border border-[#1E3352] flex items-center space-x-2.5">
                  <Gauge className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span className="text-slate-200">Riding Modes (ECO | CITY | SPORT)</span>
                </div>
                <div className="bg-[#0E1A2C] p-3 rounded-xl border border-[#1E3352] flex items-center space-x-2.5">
                  <Activity className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span className="text-slate-200">Electronic Cruise Control</span>
                </div>
                <div className="bg-[#0E1A2C] p-3 rounded-xl border border-[#1E3352] flex items-center space-x-2.5">
                  <RotateCcw className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span className="text-slate-200">Reverse Assistance Assist</span>
                </div>
                <div className="bg-[#0E1A2C] p-3 rounded-xl border border-[#1E3352] flex items-center space-x-2.5">
                  <BatteryCharging className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span className="text-slate-200">Digital Battery & Range Display</span>
                </div>
                <div className="bg-[#0E1A2C] p-3 rounded-xl border border-[#1E3352] flex items-center space-x-2.5">
                  <Zap className="w-4 h-4 text-[#EAB308] shrink-0" />
                  <span className="text-slate-200">USB Smartphone Fast Charging</span>
                </div>
                <div className="bg-[#0E1A2C] p-3 rounded-xl border border-[#1E3352] flex items-center space-x-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#EAB308] shrink-0" />
                  <span className="text-slate-200">Side-Stand Safety Cut-Off</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pillar 2: PREMIUM TECHNOLOGY */}
          <div className="bg-[#15243C] border border-[#1E3352] rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-[#38BDF8]/10 text-[#38BDF8] rounded-xl border border-[#38BDF8]/30">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-[#EAB308] uppercase tracking-wide">
                    PREMIUM TECHNOLOGY
                  </h3>
                  <span className="text-[11px] text-[#CBD5E1] font-semibold">Flagship Connected Proposals</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium mb-6">
                Premium proposals include dual-channel ABS, traction control, hill hold, TPMS, blind-spot alerts, rear camera, ADAS warnings, TFT display and connected functions. Installation and availability require supplier confirmation.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-[#0E1A2C] p-3 rounded-xl border border-[#1E3352] flex items-center space-x-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span className="text-slate-200">Dual-Channel ABS & Traction</span>
                </div>
                <div className="bg-[#0E1A2C] p-3 rounded-xl border border-[#1E3352] flex items-center space-x-2.5">
                  <Compass className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span className="text-slate-200">Hill Hold Incline Assist</span>
                </div>
                <div className="bg-[#0E1A2C] p-3 rounded-xl border border-[#1E3352] flex items-center space-x-2.5">
                  <Eye className="w-4 h-4 text-[#EAB308] shrink-0" />
                  <span className="text-slate-200">Blind-Spot & ADAS Alerts</span>
                </div>
                <div className="bg-[#0E1A2C] p-3 rounded-xl border border-[#1E3352] flex items-center space-x-2.5">
                  <Camera className="w-4 h-4 text-[#EAB308] shrink-0" />
                  <span className="text-slate-200">Rear Parking Camera Support</span>
                </div>
                <div className="bg-[#0E1A2C] p-3 rounded-xl border border-[#1E3352] flex items-center space-x-2.5">
                  <Activity className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span className="text-slate-200">TPMS Tyre Pressure Monitoring</span>
                </div>
                <div className="bg-[#0E1A2C] p-3 rounded-xl border border-[#1E3352] flex items-center space-x-2.5">
                  <Wifi className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span className="text-slate-200">High-Definition TFT Connected Cluster</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live BMS Telemetry Card */}
        <div className="bg-[#0E1A2C] border border-[#1E3352] rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#1E3352] gap-2">
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <h4 className="text-lg font-bold text-white">Smart BMS Live Telemetry System</h4>
              </div>
              <p className="text-xs text-[#CBD5E1] mt-1">
                Real-time active cell balancing and multi-tier thermal guard monitoring
              </p>
            </div>
            <span className="text-xs px-3 py-1 bg-[#15243C] text-[#EAB308] border border-[#EAB308]/30 rounded-xl font-bold self-start sm:self-auto">
              BMS: {telemetry?.bmsStatus || 'Optimal'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            <div className="bg-[#15243C] p-4 rounded-2xl border border-[#1E3352]">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">State of Charge (SoC)</span>
              <span className="text-2xl font-black text-white">{telemetry?.soc || 88}%</span>
              <span className="text-[11px] text-emerald-400 block mt-1">Health: {telemetry?.soh || 99}% SoH</span>
            </div>
            <div className="bg-[#15243C] p-4 rounded-2xl border border-[#1E3352]">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Pack Voltage</span>
              <span className="text-2xl font-black text-white">{telemetry?.voltage || 74.2} V</span>
              <span className="text-[11px] text-[#38BDF8] block mt-1">High-Efficiency High-Voltage</span>
            </div>
            <div className="bg-[#15243C] p-4 rounded-2xl border border-[#1E3352]">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Pack Temperature</span>
              <span className="text-2xl font-black text-white">{telemetry?.temperature || 29.2} °C</span>
              <span className="text-[11px] text-[#EAB308] block mt-1">Optimal Thermal Dissipation</span>
            </div>
            <div className="bg-[#15243C] p-4 rounded-2xl border border-[#1E3352]">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Cycle Life</span>
              <span className="text-2xl font-black text-white">{telemetry?.cycleCount || 84}</span>
              <span className="text-[11px] text-[#CBD5E1] block mt-1">Certified Li-Ion Cells</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
