import React from 'react';
import { Quote, Building2, Sparkles } from 'lucide-react';

export default function FoundersMessage() {
  return (
    <section id="founder" className="py-20 bg-[#111E31] relative overflow-hidden">
      {/* Background flowing curves matching brochure page 2 */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,500 C300,200 700,800 1000,500" stroke="#38BDF8" strokeWidth="2" fill="none" />
          <path d="M0,550 C300,250 700,850 1000,550" stroke="#EAB308" strokeWidth="1.5" strokeOpacity="0.6" fill="none" />
          <path d="M0,600 C300,300 700,900 1000,600" stroke="#38BDF8" strokeWidth="1" fill="none" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        {/* Subtle Brand Pill */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#15243C] border border-[#1E3352] text-xs font-bold uppercase tracking-widest mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#EAB308]" />
          <span className="text-[#CBD5E1]">SRIDEWI ENERGIES PRIVATE LIMITED</span>
        </div>

        {/* EXACT Brochure Gold Title from Page 2 */}
        <h2 className="text-sm sm:text-base font-black uppercase tracking-[0.35em] text-[#EAB308] mb-8">
          FOUNDER’S MESSAGE
        </h2>

        {/* Message Card */}
        <div className="bg-[#15243C] border border-[#1E3352] rounded-3xl p-8 sm:p-12 shadow-2xl relative">
          <Quote className="w-12 h-12 text-[#EAB308]/20 absolute top-6 left-6 pointer-events-none" />

          <p className="text-lg sm:text-2xl text-[#F1F5F9] font-medium leading-relaxed italic max-w-2xl mx-auto">
            “In an era of electrifying transformation, we are not merely manufacturing batteries; we are empowering a new era of mobility. Through pioneering battery technology, uncompromising quality, and sustainable innovation, we aspire to accelerate the EV revolution and redefine the future of energy.”
          </p>

          <p className="mt-6 text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#EAB308] via-[#FBBF24] to-[#CBD5E1]">
            “Powering Mobility. Energizing Progress. Driving the Future.”
          </p>

          {/* Founder Signature & Credentials */}
          <div className="mt-10 pt-6 border-t border-[#1E3352]">
            <h3 className="text-xl font-black text-[#F1F5F9] tracking-wider">
              SRIDEVI KADIYALA
            </h3>
            <p className="text-xs font-bold text-[#EAB308] mt-1 uppercase tracking-widest">
              Founder & Managing Director
            </p>
            <p className="text-xs text-[#94A3B8] mt-0.5">
              SRIDEWI ENERGIES PRIVATE LIMITED
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
