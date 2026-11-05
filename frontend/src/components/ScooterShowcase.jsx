import React, { useState } from 'react';
import { 
  Zap, 
  Gauge, 
  Clock, 
  ShieldCheck, 
  Layers, 
  Check, 
  Sparkles,
  Share2,
  Volume2,
  Sliders,
  Compass,
  ArrowRight,
  Maximize2,
  CreditCard,
  Eye,
  Info
} from 'lucide-react';
import { brochureModels, LOGO_BG_COLOR } from '../services/api';
import { triggerHaptic, shareScooter } from '../services/mobileService';
import { playMotorRev } from '../services/soundService';

export default function ScooterShowcase({ onOpenTestRide }) {
  const [selectedId, setSelectedId] = useState(brochureModels[0].id);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [viewMode, setViewMode] = useState('studio'); // 'studio' or 'cockpit'
  const [revving, setRevving] = useState(false);
  const [speedMeter, setSpeedMeter] = useState(0);

  const activeModel = brochureModels.find(m => m.id === selectedId) || brochureModels[0];
  const activeColor = activeModel.colorPalette[selectedColorIndex] || activeModel.colorPalette[0];

  const handleSelectModel = (id) => {
    triggerHaptic(25);
    setSelectedId(id);
    setSelectedColorIndex(0);
  };

  const handleSelectColor = (index) => {
    triggerHaptic(20);
    setSelectedColorIndex(index);
  };

  const handleRevMotor = () => {
    triggerHaptic(60);
    playMotorRev(1400);
    setRevving(true);
    setSpeedMeter(activeModel.topSpeed.includes('70') ? 78 : 62);
    setTimeout(() => {
      setRevving(false);
      setSpeedMeter(0);
    }, 1500);
  };

  const handleShare = () => {
    triggerHaptic(20);
    shareScooter(
      `${activeModel.name} (${activeColor.name}) - Terron EV Mobility`,
      `Explore the all-new ${activeModel.name} in ${activeColor.name} with ${activeModel.range} range!`
    );
  };

  return (
    <section id="models" className="py-16 sm:py-24 bg-[#111E31] relative overflow-hidden">
      {/* Background ambient lighting matching chosen color */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-[170px] opacity-20 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: activeColor.hex }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-[11px] font-bold uppercase tracking-widest text-sky-400 bg-sky-500/10 border border-sky-500/20 px-3.5 py-1 rounded-full">
            OFFICIAL COLOUR CONFIGURATOR
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mt-3 tracking-tight">
            SELECT COLOUR & SPECIFICATION
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Switch between models and real factory finishes. The red edition is the <strong>Classic</strong> and the Emerald Green is the rugged <strong>Adventure</strong> bike.
          </p>
        </div>

        {/* Model Selector Tabs */}
        <div className="flex items-center justify-start sm:justify-center space-x-2.5 overflow-x-auto pb-4 scrollbar-none">
          {brochureModels.map((m) => {
            const isSelected = m.id === activeModel.id;
            return (
              <button
                key={m.id}
                onClick={() => handleSelectModel(m.id)}
                className={`px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm tracking-wider uppercase whitespace-nowrap transition-all shrink-0 ${
                  isSelected
                    ? 'bg-gradient-to-r from-sky-400 to-blue-600 text-slate-950 shadow-xl shadow-sky-500/30 scale-105'
                    : 'bg-[#16273f] text-slate-300 border border-[#233d62] hover:border-sky-500/50'
                }`}
              >
                {m.name}
              </button>
            );
          })}
        </div>

        {/* Main Studio Display Stage */}
        <div className="mt-8 bg-gradient-to-b from-[#16273f] via-[#111E31] to-[#0d1828] border border-[#233d62] rounded-3xl p-6 sm:p-10 shadow-2xl relative">
          {/* Top Bar: Model Badge, Ex-showroom Price, View Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#233d62]/80 gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-widest text-sky-400 bg-sky-500/10 px-2.5 py-0.5 rounded-md border border-sky-500/20">
                  {activeModel.badge}
                </span>
                <span className="text-xs text-slate-400">{activeModel.category}</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">
                TERRON {activeModel.name.toUpperCase()}
              </h3>
            </div>

            {/* Pricing & EMI */}
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Ex-Showroom Price</span>
                <span className="text-2xl font-black text-white">{activeModel.startingPrice}*</span>
                <span className="text-[11px] text-emerald-400 font-semibold block">EMI from {activeModel.emiStarts}</span>
              </div>

              {/* View Switcher: Studio Exterior vs Cockpit */}
              <div className="flex bg-[#0b1523] p-1 rounded-xl border border-[#233d62]">
                <button
                  onClick={() => { triggerHaptic(15); setViewMode('studio'); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 ${
                    viewMode === 'studio' ? 'bg-sky-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Studio</span>
                </button>
                <button
                  onClick={() => { triggerHaptic(15); setViewMode('cockpit'); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 ${
                    viewMode === 'cockpit' ? 'bg-sky-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Gauge className="w-3.5 h-3.5" />
                  <span>TFT Cockpit</span>
                </button>
              </div>
            </div>
          </div>

          {/* Visual Showcase Stage */}
          <div className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Center Stage: The Real Scooter Picture */}
            <div className="lg:col-span-8 flex flex-col items-center justify-center relative min-h-[360px] sm:min-h-[440px]">
              {/* Studio Spotlight Podium Floor Glow */}
              <div 
                className="absolute bottom-4 w-4/5 h-20 rounded-[100%] blur-2xl opacity-60 transition-all duration-500 pointer-events-none"
                style={{ backgroundColor: activeColor.hex }}
              />
              <div className="absolute bottom-2 w-3/4 h-8 bg-black/60 rounded-[100%] blur-md pointer-events-none" />

              {viewMode === 'studio' ? (
                /* Studio Real Scooter Photo - No filter on rider, authentic colours */
                <div className="relative z-10 w-full flex flex-col items-center group">
                  <div className="relative overflow-hidden rounded-3xl border border-[#233d62] shadow-2xl bg-[#0b1523]/50 backdrop-blur-sm max-w-xl w-full">
                    <img
                      key={activeColor.image + activeColor.name}
                      src={activeColor.image}
                      alt={`${activeModel.name} in ${activeColor.name}`}
                      className="w-full h-72 sm:h-96 object-cover object-center rounded-3xl transition-transform duration-500 group-hover:scale-105"
                      style={{ filter: 'none' }}
                    />

                    {/* Color Swatch Badge on Image */}
                    <div className="absolute bottom-3 left-3 bg-[#111E31]/85 backdrop-blur-md border border-[#233d62] px-3.5 py-1.5 rounded-xl flex items-center space-x-2">
                      <span className="w-3.5 h-3.5 rounded-full border border-white shadow-sm" style={{ backgroundColor: activeColor.hex }} />
                      <span className="text-xs font-bold text-white capitalize">{activeColor.name}</span>
                    </div>

                    {/* Share Button */}
                    <button
                      onClick={handleShare}
                      aria-label="Share Scooter"
                      className="absolute top-3 right-3 p-2 bg-[#111E31]/80 hover:bg-[#16273f] border border-[#233d62] rounded-xl text-slate-300 hover:text-white transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-400 mt-3 italic text-center">
                    "{activeColor.caption}"
                  </p>
                </div>
              ) : (
                /* Cockpit Digital TFT Cluster View */
                <div className="relative z-10 w-full max-w-md bg-[#050b14] border-2 border-slate-700 rounded-3xl p-6 shadow-2xl text-center">
                  <div className="flex justify-between items-center text-[11px] text-sky-400 font-bold uppercase tracking-wider pb-3 border-b border-slate-800">
                    <span>TERRON TFT CLUSTER</span>
                    <span className="bg-sky-500/20 px-2 py-0.5 rounded text-sky-300">SPORT MODE</span>
                  </div>

                  {/* Digital Speedometer Gauge */}
                  <div className="my-6">
                    <div className="text-6xl sm:text-7xl font-black font-mono text-white tracking-tighter">
                      {revving ? speedMeter : 0}
                    </div>
                    <span className="text-xs uppercase tracking-widest text-slate-400 font-bold">KM/H SPEED</span>
                  </div>

                  {/* Cockpit Sub-Gauges */}
                  <div className="grid grid-cols-3 gap-2 text-xs bg-[#111E31] p-3 rounded-2xl border border-slate-800">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block">Est Range</span>
                      <span className="font-extrabold text-emerald-400">{activeModel.range.split(' ')[0]} KM</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block">Battery</span>
                      <span className="font-extrabold text-sky-400">92% (52.8V)</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block">Trip A</span>
                      <span className="font-extrabold text-white">42.8 KM</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 mt-4">
                    Full Bluetooth turn-by-turn navigation & geo-fencing diagnostics
                  </p>
                </div>
              )}

              {/* Sound of Electric Mobility (Throttle / Rev Simulator) */}
              <div className="mt-5 flex items-center space-x-3">
                <button
                  onClick={handleRevMotor}
                  className={`flex items-center space-x-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-lg ${
                    revving
                      ? 'bg-amber-400 text-slate-950 scale-105 shadow-amber-400/50'
                      : 'bg-[#0b1523] hover:bg-[#16273f] text-sky-400 border border-[#233d62]'
                  }`}
                >
                  <Volume2 className={`w-4 h-4 ${revving ? 'animate-bounce' : ''}`} />
                  <span>{revving ? '⚡ ACCELERATING...' : 'REV ELECTRIC MOTOR'}</span>
                </button>
              </div>
            </div>

            {/* Right Column: Color Swatches & Specifications */}
            <div className="lg:col-span-4 space-y-6">
              {/* Color Chooser Card */}
              <div className="bg-[#0b1523] p-5 rounded-2xl border border-[#233d62] shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Click Color to Apply
                  </span>
                  <span className="text-xs font-bold text-sky-400 capitalize">
                    {activeColor.name}
                  </span>
                </div>

                {/* Color Swatch Circles */}
                <div className="flex items-center space-x-3 py-1">
                  {activeModel.colorPalette.map((col, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectColor(idx)}
                      title={col.name}
                      aria-label={`Select ${col.name}`}
                      className={`relative w-10 h-10 rounded-full transition-all border-2 ${
                        selectedColorIndex === idx
                          ? 'scale-125 border-white ring-2 ring-sky-400 shadow-xl'
                          : 'border-slate-700 hover:scale-110 opacity-70 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: col.hex }}
                    >
                      {selectedColorIndex === idx && (
                        <Check className="w-4 h-4 text-white absolute inset-0 m-auto stroke-[3]" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="mt-3.5 pt-3 border-t border-[#233d62] text-[11px] text-slate-400 flex items-center space-x-2">
                  <Info className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>
                    {activeColor.name.includes('Red') && 'Crimson Red: Official Classic Scooter.'}
                    {activeColor.name.includes('Green') && 'Emerald Green: Official Adventure Bike.'}
                    {activeColor.name.includes('Black') && 'Obsidian Black: Dual Studio Finish.'}
                    {activeColor.name.includes('Silver') && 'Titanium Silver: Nexa Maxi-Tourer.'}
                  </span>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#0b1523] p-3.5 rounded-xl border border-[#233d62]">
                  <div className="flex items-center space-x-1.5 text-slate-400 text-[10px] uppercase font-bold mb-1">
                    <Compass className="w-3.5 h-3.5 text-sky-400" />
                    <span>Tested Range</span>
                  </div>
                  <span className="text-xl font-black text-white">{activeModel.range}</span>
                </div>

                <div className="bg-[#0b1523] p-3.5 rounded-xl border border-[#233d62]">
                  <div className="flex items-center space-x-1.5 text-slate-400 text-[10px] uppercase font-bold mb-1">
                    <Gauge className="w-3.5 h-3.5 text-sky-400" />
                    <span>Top Speed</span>
                  </div>
                  <span className="text-xl font-black text-white">{activeModel.topSpeed}</span>
                </div>

                <div className="bg-[#0b1523] p-3.5 rounded-xl border border-[#233d62]">
                  <div className="flex items-center space-x-1.5 text-slate-400 text-[10px] uppercase font-bold mb-1">
                    <Zap className="w-3.5 h-3.5 text-sky-400" />
                    <span>Motor Power</span>
                  </div>
                  <span className="text-lg font-black text-white">{activeModel.motor}</span>
                </div>

                <div className="bg-[#0b1523] p-3.5 rounded-xl border border-[#233d62]">
                  <div className="flex items-center space-x-1.5 text-slate-400 text-[10px] uppercase font-bold mb-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Charging</span>
                  </div>
                  <span className="text-xs font-bold text-white block mt-0.5">{activeModel.chargingTime}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={() => {
                    triggerHaptic(35);
                    onOpenTestRide(activeModel.name);
                  }}
                  className="w-full py-3.5 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 hover:from-sky-300 hover:to-blue-400 text-slate-950 transition-all flex items-center justify-center space-x-2 shadow-xl shadow-sky-500/25"
                >
                  <span>Book Free Test Ride</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    triggerHaptic(25);
                    onOpenTestRide(activeModel.name);
                  }}
                  className="w-full py-2.5 rounded-xl font-bold text-xs bg-[#0b1523] hover:bg-[#16273f] text-slate-300 border border-[#233d62] transition-all flex items-center justify-center space-x-1.5"
                >
                  <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Reserve Now for ₹999 (100% Refundable)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
