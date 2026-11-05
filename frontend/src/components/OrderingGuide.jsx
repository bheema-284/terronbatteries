import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, FileText, HelpCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { triggerHaptic } from '../services/mobileService';

export default function OrderingGuide({ onOpenTestRide }) {
  const [inquiryType, setInquiryType] = useState('Individual');
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="ordering" className="py-20 bg-gradient-to-b from-[#081326] via-[#0c1b33] to-[#081326] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-400 bg-sky-500/10 border border-sky-500/20 px-3 py-1 rounded-full">
            OWNERSHIP | CONFIGURATION & ORDERING
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mt-3">
            CHOOSE WITH CLARITY. RIDE WITH CONFIDENCE.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Transparent specifications, comprehensive dealer assistance, and clear warranty terms for your electric transition.
          </p>
        </div>

        {/* 2 Information Cards from Page 8 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Before You Order */}
          <div className="bg-[#0b1b36] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white uppercase tracking-tight">
                  Before You Order
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Obtain the final model-specific specification, approved range and speed figures, charger details, equipment list, price, delivery schedule, service arrangements and written warranty terms.
              </p>

              <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>Model-specific range & top speed validation document</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>Approved fast charger & home AC wall-box compatibility</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>Written multi-year battery & motor warranty agreement</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>Transparent on-road pricing with subsidy guidance</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800">
              <button
                onClick={() => {
                  triggerHaptic(25);
                  onOpenTestRide();
                }}
                className="w-full py-3 bg-sky-500/15 hover:bg-sky-500/25 text-sky-400 border border-sky-500/30 font-bold rounded-xl text-xs transition-all flex items-center justify-center space-x-2"
              >
                <span>Request Detailed Model Dossier</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: Performance & Feature Information */}
          <div className="bg-[#0b1b36] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-sky-500/10 text-sky-400 rounded-xl border border-sky-500/20">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white uppercase tracking-tight">
                  Performance & Feature Information
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Range and charging time vary with speed, payload, traffic, gradient, tyre pressure, temperature, battery condition and charger. Rider assistance supports attentive riding. Connected functions may depend on network coverage and subscription terms.
              </p>

              <div className="mt-6 bg-[#060e1c] p-4 rounded-xl border border-slate-800 space-y-2 text-xs text-slate-400">
                <span className="font-bold text-white block mb-1">Riding Factors:</span>
                <p>• <strong>Speed & Payload:</strong> High cruising speeds and loads above 150kg affect nominal range.</p>
                <p>• <strong>Thermal Range:</strong> Smart BMS automatically regulates cell temps between -10°C and 55°C.</p>
                <p>• <strong>Connected Telemetry:</strong> Optional IoT features utilize cellular SIM connectivity.</p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800 text-[11px] text-slate-500">
              PROVISIONAL SPECIFICATIONS. ACTUAL PERFORMANCE VARIES WITH RIDING CONDITIONS; SUBJECT TO VALIDATION AND APPROVAL.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

