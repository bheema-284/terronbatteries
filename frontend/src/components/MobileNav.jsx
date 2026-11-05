import React from 'react';
import { Compass, Cpu, Zap, Phone, ShieldCheck } from 'lucide-react';
import { triggerHaptic } from '../services/mobileService';

export default function MobileNav({ onOpenTestRide }) {
  const scrollTo = (id) => {
    triggerHaptic(20);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="md:hidden fixed bottom-3 left-3 right-3 z-40 bg-[#0b1b36]/90 backdrop-blur-lg border border-sky-500/30 rounded-2xl px-4 py-2 shadow-2xl">
      <div className="flex items-center justify-around text-[10px] font-semibold text-slate-300">
        {/* Models */}
        <button
          onClick={() => scrollTo('models')}
          className="flex flex-col items-center py-1 px-2 hover:text-sky-400 active:scale-95 transition-all"
        >
          <Compass className="w-5 h-5 mb-0.5 text-sky-400" />
          <span>Models</span>
        </button>

        {/* Technology */}
        <button
          onClick={() => scrollTo('technology')}
          className="flex flex-col items-center py-1 px-2 hover:text-sky-400 active:scale-95 transition-all"
        >
          <Cpu className="w-5 h-5 mb-0.5 text-blue-400" />
          <span>Tech</span>
        </button>

        {/* Center Primary Action: Book Test Ride */}
        <button
          onClick={() => {
            triggerHaptic(35);
            onOpenTestRide();
          }}
          className="flex flex-col items-center -mt-5 bg-gradient-to-r from-sky-400 to-blue-600 text-slate-950 p-2.5 rounded-2xl shadow-lg shadow-sky-500/40 active:scale-95 transition-transform"
        >
          <Zap className="w-5 h-5 stroke-[2.5]" />
          <span className="text-[9px] font-black uppercase mt-0.5">Test Ride</span>
        </button>

        {/* Ordering Guide */}
        <button
          onClick={() => scrollTo('ordering')}
          className="flex flex-col items-center py-1 px-2 hover:text-sky-400 active:scale-95 transition-all"
        >
          <ShieldCheck className="w-5 h-5 mb-0.5 text-emerald-400" />
          <span>Guide</span>
        </button>

        {/* Call Now */}
        <a
          href="tel:+917416071115"
          onClick={() => triggerHaptic(20)}
          className="flex flex-col items-center py-1 px-2 hover:text-sky-400 active:scale-95 transition-all text-slate-300"
        >
          <Phone className="w-5 h-5 mb-0.5 text-amber-400" />
          <span>Call</span>
        </a>
      </div>
    </div>
  );
}

