import React from 'react';
import { Zap, ShieldCheck, ArrowRight, Gauge, BatteryCharging, Sparkles, Compass } from 'lucide-react';
import { triggerHaptic } from '../services/mobileService';

export default function Hero({ onOpenTestRide }) {
  const scrollTo = (id) => {
    triggerHaptic(25);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative pt-12 pb-20 overflow-hidden bg-gradient-to-b from-[#081326] via-[#0c1b33] to-[#081326]">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[350px] h-[350px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Company eyebrow pill */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700 text-xs text-slate-300 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping inline-block" />
            <span className="font-semibold text-sky-400">SRIDEWI ENERGIES PRIVATE LIMITED</span>
            <span className="text-slate-500">•</span>
            <span className="tracking-wide">HYDERABAD, INDIA</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            POWERING MOBILITY.{' '}
            <span className="bg-gradient-to-r from-sky-400 via-blue-300 to-indigo-300 bg-clip-text text-transparent block mt-1">
              ENERGIZING PROGRESS.
            </span>
            <span className="text-slate-200 block text-2xl sm:text-4xl font-extrabold mt-2">
              DRIVING THE FUTURE.
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Welcome to <strong>TERRON EV MOBILITY</strong>. Engineered with pioneering battery technology, intelligent BMS thermal safety, and uncompromising ride quality across city, highway, and adventure terrains.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => scrollTo('models')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-sky-400 to-blue-600 hover:from-sky-300 hover:to-blue-500 text-slate-950 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-sky-500/25"
            >
              <span>Explore 5 EV Models</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                triggerHaptic(30);
                onOpenTestRide();
              }}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700 transition-all flex items-center justify-center space-x-2"
            >
              <Zap className="w-4 h-4 text-sky-400" />
              <span>Book Priority Test Ride</span>
            </button>
          </div>
        </div>

        {/* 4 Feature Key Metric Cards directly extracted from Brochure */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mt-14">
          <div className="bg-[#0b1b36]/90 border border-slate-800/90 p-4 sm:p-5 rounded-2xl shadow-xl hover:border-sky-500/40 transition-colors">
            <div className="flex items-center space-x-2 text-sky-400 mb-2">
              <Compass className="w-5 h-5" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Max Range</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">225-270 KM*</div>
            <p className="text-[11px] text-slate-400 mt-1">High-density smart battery pack</p>
          </div>

          <div className="bg-[#0b1b36]/90 border border-slate-800/90 p-4 sm:p-5 rounded-2xl shadow-xl hover:border-sky-500/40 transition-colors">
            <div className="flex items-center space-x-2 text-sky-400 mb-2">
              <Gauge className="w-5 h-5" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Top Speed</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">70-80 KM/H</div>
            <p className="text-[11px] text-slate-400 mt-1">ECO | CITY | SPORT modes</p>
          </div>

          <div className="bg-[#0b1b36]/90 border border-slate-800/90 p-4 sm:p-5 rounded-2xl shadow-xl hover:border-sky-500/40 transition-colors">
            <div className="flex items-center space-x-2 text-amber-400 mb-2">
              <BatteryCharging className="w-5 h-5" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Fast Charging</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">~3 Hours*</div>
            <p className="text-[11px] text-slate-400 mt-1">0-80% rapid charge on Terron+</p>
          </div>

          <div className="bg-[#0b1b36]/90 border border-slate-800/90 p-4 sm:p-5 rounded-2xl shadow-xl hover:border-sky-500/40 transition-colors">
            <div className="flex items-center space-x-2 text-emerald-400 mb-2">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Safety & CBS</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">Dual Disc</div>
            <p className="text-[11px] text-slate-400 mt-1">Front & rear with CBS braking</p>
          </div>
        </div>
      </div>
    </section>
  );
}

