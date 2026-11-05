import React from 'react';
import { Quote, Award, Sparkles, Building2 } from 'lucide-react';

export default function FoundersMessage() {
  return (
    <section id="founder" className="py-20 bg-gradient-to-b from-[#081326] via-[#0c1b33] to-[#081326] relative overflow-hidden">
      {/* Decorative ambient curves */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,500 C300,200 700,800 1000,500" stroke="#38bdf8" strokeWidth="2" fill="none" />
          <path d="M0,550 C300,250 700,850 1000,550" stroke="#38bdf8" strokeWidth="1.5" fill="none" />
          <path d="M0,600 C300,300 700,900 1000,600" stroke="#38bdf8" strokeWidth="1" fill="none" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-widest mb-6">
          <Building2 className="w-3.5 h-3.5" />
          <span>Leadership Vision</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-slate-400 mb-8">
          FOUNDER’S MESSAGE
        </h2>

        {/* Message Card */}
        <div className="bg-[#0b1b36]/90 border border-slate-800/90 rounded-3xl p-8 sm:p-12 shadow-2xl relative">
          <Quote className="w-12 h-12 text-sky-500/20 absolute top-6 left-6 pointer-events-none" />

          <p className="text-lg sm:text-2xl text-slate-100 font-medium leading-relaxed italic max-w-2xl mx-auto">
            “In an era of electrifying transformation, we are not merely manufacturing batteries; we are empowering a new era of mobility. Through pioneering battery technology, uncompromising quality, and sustainable innovation, we aspire to accelerate the EV revolution and redefine the future of energy.”
          </p>

          <p className="mt-6 text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-200 to-sky-300">
            “Powering Mobility. Energizing Progress. Driving the Future.”
          </p>

          {/* Founder Signature & Credentials */}
          <div className="mt-10 pt-6 border-t border-slate-800/80">
            <h3 className="text-xl font-black text-white tracking-wide">
              SRIDEVI KADIYALA
            </h3>
            <p className="text-xs font-semibold text-sky-400 mt-1 uppercase tracking-wider">
              Founder & Managing Director
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              SRIDEWI ENERGIES PRIVATE LIMITED
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

