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
  // Model state defaults to SPORTS / TERRON+
  const [selectedId, setSelectedId] = useState(brochureModels[2]?.id || brochureModels[0].id);

  // Model-specific color selection state: isolated per bike model
  const [modelColors, setModelColors] = useState({
    'TRN-TERRON-PLUS': 0,   // Green
    'TRN-ADVENTURE': 0,     // Blue
    'TRN-SPORTS': 1,        // Black (or 0 for Red)
    'TRN-CLASSIC-SPORTS': 0,// Red
    'TRN-NEXA': 0           // Grey
  });

  const [viewMode, setViewMode] = useState('studio'); // 'studio' or 'cockpit'
  const [revving, setRevving] = useState(false);
  const [speedMeter, setSpeedMeter] = useState(0);

  const activeModel = brochureModels.find(m => m.id === selectedId) || brochureModels[0];
  const activeColorIndex = modelColors[activeModel.id] ?? 0;
  const activeColor = activeModel.colorPalette[activeColorIndex] || activeModel.colorPalette[0];

  const handleSelectModel = (id) => {
    triggerHaptic(25);
    setSelectedId(id);
  };

  const handleSelectColor = (index) => {
    triggerHaptic(20);
    // Specifically apply color ONLY to this selected bike model
    setModelColors(prev => ({
      ...prev,
      [activeModel.id]: index
    }));
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
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[160px] opacity-20 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: activeColor.hex }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#EAB308] bg-[#EAB308]/10 border border-[#EAB308]/20 px-3.5 py-1 rounded-full inline-block">
            OFFICIAL COLOUR CONFIGURATOR
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mt-3 tracking-tight">
            SELECT COLOUR & <span className="text-[#EAB308]">SPECIFICATION</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2">
            Switch between models and real factory finishes. Choosing a colour applies specifically to the selected model without altering rider or handle components.
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
                className={`px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm tracking-wider uppercase whitespace-nowrap transition-all shrink-0 outline-none focus:outline-none focus-visible:outline-none select-none ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#EAB308] to-[#F59E0B] text-slate-950 shadow-xl shadow-[#EAB308]/30 scale-105'
                    : 'bg-[#15243C] text-[#CBD5E1] border border-[#1E3352] hover:border-[#EAB308]/50'
                }`}
              >
                {m.name === 'SPORTS' ? 'TERRON SPORTS' : m.name}
              </button>
            );
          })}
        </div>

        {/* Main Studio Display Stage */}
        <div className="mt-8 bg-gradient-to-b from-[#15243C] via-[#111E31] to-[#0E1A2C] border border-[#1E3352] rounded-3xl p-6 sm:p-10 shadow-2xl relative">
          {/* Top Bar: Model Badge, Ex-showroom Price, View Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#1E3352] gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#EAB308] bg-[#EAB308]/10 px-2.5 py-0.5 rounded-md border border-[#EAB308]/20">
                  {activeModel.badge}
                </span>
                <span className="text-xs text-[#CBD5E1]">{activeModel.category}</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1 flex items-baseline space-x-2">
                <span className="text-[#CBD5E1]">TERRON</span>
                <span className="text-[#EAB308]">{activeModel.name.toUpperCase()}</span>
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
              <div className="flex bg-[#0E1A2C] p-1 rounded-xl border border-[#1E3352]">
                <button
                  onClick={() => { triggerHaptic(15); setViewMode('studio'); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 outline-none focus:outline-none focus-visible:outline-none ${
                    viewMode === 'studio' ? 'bg-[#EAB308] text-slate-950 shadow-sm' : 'text-[#CBD5E1] hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Studio</span>
                </button>
                <button
                  onClick={() => { triggerHaptic(15); setViewMode('cockpit'); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 outline-none focus:outline-none focus-visible:outline-none ${
                    viewMode === 'cockpit' ? 'bg-[#EAB308] text-slate-950 shadow-sm' : 'text-[#CBD5E1] hover:text-white'
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
            <div className="lg:col-span-8 flex flex-col items-center justify-center relative min-h-[360px] sm:min-h-[460px]">
              {/* Studio Spotlight Podium Floor Glow */}
              <div 
                className="absolute bottom-6 w-3/4 h-24 rounded-full blur-3xl opacity-50 transition-colors duration-500 pointer-events-none"
                style={{ backgroundColor: activeColor.hex }}
              />

              {viewMode === 'studio' ? (
                /* Studio Real Scooter Photo - No filter on rider, authentic colours */
                <div className="relative z-10 w-full flex flex-col items-center group">
                  <div className="relative overflow-hidden rounded-3xl bg-[#091320] border border-[#1E3352] shadow-2xl max-w-2xl w-full flex items-center justify-center p-3 sm:p-5">
                    <img
                      key={activeColor.image}
                      src={activeColor.image}
                      alt={`${activeModel.name} in ${activeColor.name}`}
                      className="w-full max-h-[360px] sm:max-h-[420px] object-contain object-center rounded-2xl select-none transition-all duration-300 pointer-events-none drop-shadow-xl"
                    />

                    {/* Color Swatch Badge on Image */}
                    <div className="absolute bottom-4 left-4 bg-[#111E31]/90 backdrop-blur-md border border-[#1E3352] px-3 py-1.5 rounded-xl flex items-center space-x-2 shadow-lg">
                      <span className="w-3.5 h-3.5 rounded-full border border-white shadow-sm" style={{ backgroundColor: activeColor.hex }} />
                      <span className="text-xs font-bold text-white capitalize">{activeColor.name}</span>
                    </div>

                    {/* Share Button */}
                    <button
                      onClick={handleShare}
                      aria-label="Share Scooter"
                      className="absolute top-4 right-4 p-2 bg-[#111E31]/80 hover:bg-[#16273f] border border-[#1E3352] rounded-xl text-slate-300 hover:text-white transition-colors outline-none focus:outline-none focus-visible:outline-none"
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
                  className={`flex items-center space-x-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-lg outline-none focus:outline-none focus-visible:outline-none ${
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
              <div className="bg-[#0E1A2C] p-5 rounded-2xl border border-[#1E3352] shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Available Colours ({activeModel.name === 'SPORTS' ? 'TERRON SPORTS' : activeModel.name})
                  </span>
                  <span className="text-xs font-bold text-[#EAB308] capitalize">
                    {activeColor.name}
                  </span>
                </div>

                {/* Color Swatch Circles with clean borders (no browser outline lines) */}
                <div className="flex items-center space-x-3.5 py-2">
                  {activeModel.colorPalette.map((col, idx) => {
                    const isColSelected = activeColorIndex === idx;
                    return (
                      <button
                        key={col.name + idx}
                        onClick={() => handleSelectColor(idx)}
                        title={`${col.name} finish`}
                        aria-label={`Select ${col.name} for ${activeModel.name}`}
                        className={`relative w-11 h-11 rounded-full transition-all outline-none focus:outline-none focus-visible:outline-none border-2 active:scale-95 ${
                          isColSelected
                            ? 'scale-110 border-white shadow-[0_0_14px_rgba(234,179,8,0.7)]'
                            : 'border-slate-600 hover:border-slate-300 hover:scale-105 opacity-80 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: col.hex }}
                      >
                        {isColSelected && (
                          <Check className="w-5 h-5 text-white absolute inset-0 m-auto stroke-[3] drop-shadow-md" />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-3.5 pt-3 border-t border-[#1E3352] text-[11px] text-[#CBD5E1] flex items-center space-x-2">
                  <Info className="w-4 h-4 text-[#EAB308] shrink-0" />
                  <span>
                    Selected colour applies strictly to <strong>{activeModel.name}</strong> scooter body without affecting handles, rider, or other models.
                  </span>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#0E1A2C] p-3.5 rounded-xl border border-[#1E3352]">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Range (Tested)</span>
                  <span className="text-xl font-black text-[#38BDF8] block mt-0.5">{activeModel.range}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Under ARAI / IDC</span>
                </div>

                <div className="bg-[#0E1A2C] p-3.5 rounded-xl border border-[#1E3352]">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Top Speed</span>
                  <span className="text-xl font-black text-white block mt-0.5">{activeModel.topSpeed}</span>
                  <span className="text-[10px] text-emerald-400 block mt-0.5">High Efficiency</span>
                </div>

                <div className="bg-[#0E1A2C] p-3.5 rounded-xl border border-[#1E3352]">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Peak Motor</span>
                  <span className="text-lg font-black text-white block mt-0.5">{activeModel.motor}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Instant Torque</span>
                </div>

                <div className="bg-[#0E1A2C] p-3.5 rounded-xl border border-[#1E3352]">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Charging</span>
                  <span className="text-xs font-black text-[#EAB308] block mt-1 truncate">{activeModel.chargingTime}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Fast Home Charging</span>
                </div>
              </div>

              {/* Key Features Accordion / Highlights */}
              <div className="bg-[#0E1A2C] p-4 rounded-2xl border border-[#1E3352] space-y-2">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                  Standard Factory Equipment
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {activeModel.features.slice(0, 6).map((feat, i) => (
                    <div key={i} className="flex items-center space-x-1.5">
                      <Check className="w-3.5 h-3.5 text-[#EAB308] shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button: Book Test Ride */}
              <button
                onClick={() => {
                  triggerHaptic(30);
                  onOpenTestRide(`${activeModel.name} (${activeColor.name})`);
                }}
                className="w-full py-4 rounded-2xl font-black text-xs uppercase tracking-wider bg-gradient-to-r from-[#EAB308] via-[#FBBF24] to-[#CA8A04] hover:from-[#FBBF24] hover:to-[#EAB308] text-slate-950 transition-all flex items-center justify-center space-x-2 shadow-xl shadow-[#EAB308]/25 active:scale-95 outline-none focus:outline-none focus-visible:outline-none"
              >
                <span>Book Test Ride in {activeColor.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
