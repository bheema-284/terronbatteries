import React from 'react';
import { CheckCircle2, AlertCircle, FileText, ArrowRight } from 'lucide-react';
import { triggerHaptic } from '../services/mobileService';

export default function OrderingGuide({ onOpenTestRide }) {
  return (
    <section id="ordering" className="py-20 bg-[#111E31] relative border-t border-[#1E3352]/80">
      {/* Ambient Electric Blue & Gold Glow */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-[#38BDF8]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#EAB308]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Exact Page 8 Heading & Subheading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#CBD5E1] block mb-2">
            OWNERSHIP | CONFIGURATION & ORDERING
          </span>

          <div className="inline-block border-b-2 border-[#EAB308] pb-1">
            <h2 className="text-2xl sm:text-4xl font-black text-[#EAB308] tracking-tight uppercase">
              CHOOSE WITH CLARITY. RIDE WITH CONFIDENCE.
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-400 mt-4">
            Transparent model-specific configurations, written warranty terms, and certified range benchmarks.
          </p>
        </div>

        {/* 2 Information Cards directly from Page 8 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: BEFORE YOU ORDER */}
          <div className="bg-[#15243C] border border-[#1E3352] rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-[#EAB308]/10 text-[#EAB308] rounded-xl border border-[#EAB308]/30">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-black text-[#EAB308] uppercase tracking-wide">
                  BEFORE YOU ORDER
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                Obtain the final model-specific specification, approved range and speed figures, charger details, equipment list, price, delivery schedule, service arrangements and written warranty terms.
              </p>

              <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                  <span>Model-specific certified range (175 KM / 270 KM) & speed approval</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                  <span>Factory-approved charger specifications & home AC plug compatibility</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                  <span>Transparent delivery schedule, service network & written warranty terms</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                  <span>Standard factory equipment checklist for Classic Sports, Nexa, Sports & Terron+</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-[#1E3352]">
              <button
                onClick={() => {
                  triggerHaptic(25);
                  onOpenTestRide('TERRON+');
                }}
                className="w-full py-3 bg-[#111E31] hover:bg-[#1E3352] text-[#EAB308] border border-[#EAB308]/40 font-bold rounded-xl text-xs transition-all flex items-center justify-center space-x-2 shadow-sm"
              >
                <span>Request Written Model Dossier & Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: PERFORMANCE & FEATURE INFORMATION */}
          <div className="bg-[#15243C] border border-[#1E3352] rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-[#38BDF8]/10 text-[#38BDF8] rounded-xl border border-[#38BDF8]/30">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-black text-[#EAB308] uppercase tracking-wide">
                  PERFORMANCE & FEATURE INFORMATION
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                Range and charging time vary with speed, payload, traffic, gradient, tyre pressure, temperature, battery condition and charger. Rider assistance supports attentive riding. Connected functions may depend on network coverage and subscription terms.
              </p>

              <div className="mt-6 bg-[#0E1A2C] p-4 rounded-2xl border border-[#1E3352] space-y-2 text-xs text-slate-300">
                <span className="font-bold text-[#CBD5E1] block mb-1 uppercase tracking-wider text-[11px]">
                  Real-World Dynamics:
                </span>
                <p>• <strong>Speed & Load:</strong> Cruising in Sport mode or payloads above 150KG modulates range.</p>
                <p>• <strong>Smart BMS Thermal Regulation:</strong> Active cell management maintains peak efficiency.</p>
                <p>• <strong>Fast Charge Protocol:</strong> Rapid 3-hour fast charge (0-80%) available on Terron+.</p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#1E3352] text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
              PROVISIONAL SPECIFICATIONS. ACTUAL PERFORMANCE VARIES WITH RIDING CONDITIONS; SUBJECT TO VALIDATION AND APPROVAL.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
