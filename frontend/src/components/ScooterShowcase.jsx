import React, { useState } from 'react';
import { 
  Zap, 
  Gauge, 
  Clock, 
  ShieldCheck, 
  Layers, 
  ChevronRight, 
  Check, 
  Sparkles,
  Sliders,
  Disc,
  Weight,
  Share2
} from 'lucide-react';
import { brochureModels } from '../services/api';
import { triggerHaptic, shareScooter } from '../services/mobileService';

export default function ScooterShowcase({ onOpenTestRide }) {
  const [selectedId, setSelectedId] = useState(brochureModels[0].id);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const activeModel = brochureModels.find(m => m.id === selectedId) || brochureModels[0];
  const activeColor = activeModel.colorPalette[selectedColorIndex] || activeModel.colorPalette[0];

  const handleSelectModel = (id) => {
    triggerHaptic(25);
    setSelectedId(id);
    setSelectedColorIndex(0);
  };

  const handleSelectColor = (index) => {
    triggerHaptic(15);
    setSelectedColorIndex(index);
  };

  const handleShare = () => {
    triggerHaptic(20);
    shareScooter(
      `${activeModel.name} - Terron EV Mobility`,
      `Check out the all-new ${activeModel.name} with ${activeModel.range} range and ${activeModel.topSpeed} speed!`
    );
  };

  return (
    <section id="models" className="py-16 bg-[#081326] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-400 bg-sky-500/10 border border-sky-500/20 px-3 py-1 rounded-full">
            The Official Lineup
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mt-3">
            Choose Your Terron Experience
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            5 purpose-engineered electric scooter models designed for city commuting, aggressive sports handling, rugged off-road utility, and long-range highway touring.
          </p>
        </div>

        {/* Model Tabs Bar */}
        <div className="flex items-center justify-start sm:justify-center space-x-2 overflow-x-auto pb-4 scrollbar-none">
          {brochureModels.map((m) => {
            const isSelected = m.id === activeModel.id;
            return (
              <button
                key={m.id}
                onClick={() => handleSelectModel(m.id)}
                className={`px-4 sm:px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all shrink-0 ${
                  isSelected
                    ? 'bg-gradient-to-r from-sky-400 to-blue-600 text-slate-950 shadow-lg shadow-sky-500/30'
                    : 'bg-[#0c1b33] text-slate-300 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {m.name.toUpperCase()}
              </button>
            );
          })}
        </div>

        {/* Active Model Showcase Card */}
        <div className="mt-6 bg-gradient-to-b from-[#0c1b33] to-[#0a162b] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Dynamic color glow based on selected color */}
          <div
            className="absolute top-10 right-10 w-80 h-80 rounded-full blur-[130px] opacity-25 pointer-events-none transition-all duration-700"
            style={{ backgroundColor: activeColor.hex }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Visual, Color Circles, and Badges */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-400 block">
                    {activeModel.badge}
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-0.5">
                    {activeModel.name.toUpperCase()}
                  </h3>
                </div>

                <button
                  onClick={handleShare}
                  aria-label="Share Scooter"
                  className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-300 hover:text-white transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 italic">
                "{activeModel.tagline}"
              </p>

              {/* Color Swatches matching the circles in the brochure */}
              <div className="bg-[#060e1c] p-4 rounded-2xl border border-slate-800/80">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Available Colorways: <strong className="text-white capitalize">{activeColor.name}</strong>
                </span>
                <div className="flex items-center space-x-3">
                  {activeModel.colorPalette.map((col, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectColor(idx)}
                      aria-label={col.name}
                      className={`w-7 h-7 rounded-full transition-transform border-2 ${
                        selectedColorIndex === idx
                          ? 'scale-125 border-white shadow-md'
                          : 'border-slate-700 hover:scale-110'
                      }`}
                      style={{ backgroundColor: col.hex }}
                    />
                  ))}
                </div>
              </div>

              {/* Key Highlights Banner */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-[#060e1c] p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Motor Power</span>
                  <span className="text-base font-extrabold text-white mt-0.5 block">{activeModel.motor}</span>
                </div>
                <div className="bg-[#060e1c] p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Tested Range</span>
                  <span className="text-base font-extrabold text-sky-400 mt-0.5 block">{activeModel.range}</span>
                </div>
                <div className="bg-[#060e1c] p-3.5 rounded-xl border border-slate-800 col-span-2 sm:col-span-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Top Speed</span>
                  <span className="text-base font-extrabold text-white mt-0.5 block">{activeModel.topSpeed}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    triggerHaptic(30);
                    onOpenTestRide(activeModel.name);
                  }}
                  className="w-full sm:w-auto px-7 py-3 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-sky-400 to-blue-600 hover:from-sky-300 hover:to-blue-500 text-slate-950 transition-all shadow-md shadow-sky-500/20"
                >
                  Book Test Ride for {activeModel.name}
                </button>
              </div>
            </div>

            {/* Right Column: Complete Specifications Matrix */}
            <div className="lg:col-span-6 bg-[#060e1c]/90 rounded-2xl p-5 sm:p-6 border border-slate-800/90 space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider pb-2 border-b border-slate-800 flex items-center justify-between">
                <span>Technical Specifications</span>
                <span className="text-[10px] text-slate-400 font-normal">Brochure Verified</span>
              </h4>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-900">
                  <span className="text-slate-400">Ride Modes:</span>
                  <span className="font-semibold text-sky-400">{activeModel.rideModes}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-900">
                  <span className="text-slate-400">Charging Time:</span>
                  <span className="font-semibold text-white">{activeModel.chargingTime}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-900">
                  <span className="text-slate-400">Braking System:</span>
                  <span className="font-semibold text-white">{activeModel.braking}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-900">
                  <span className="text-slate-400">Wheels & Tyres:</span>
                  <span className="font-semibold text-white">{activeModel.wheels}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-900">
                  <span className="text-slate-400">Chassis Category:</span>
                  <span className="font-semibold text-slate-300">{activeModel.category}</span>
                </div>
              </div>

              {/* Smart Everyday Features list from brochure */}
              <div className="pt-2">
                <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-2">
                  Smart Everyday Features:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-300">
                  {activeModel.features.map((feat, i) => (
                    <div key={i} className="flex items-center space-x-1.5">
                      <Check className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

