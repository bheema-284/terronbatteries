import React, { useState } from 'react';
import { Calculator, ArrowRight, CheckCircle2 } from 'lucide-react';
import { brochureModels } from '../services/api';
import { triggerHaptic } from '../services/mobileService';

export default function CompareSection({ onOpenTestRide }) {
  const [vehiclePrice, setVehiclePrice] = useState(89999);
  const [downPayment, setDownPayment] = useState(15000);
  const [tenureMonths, setTenureMonths] = useState(36);
  const interestRate = 0.089; // 8.9% EV Green Loan

  const loanAmount = Math.max(0, vehiclePrice - downPayment);
  const monthlyRate = interestRate / 12;
  const emi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1)
  );

  return (
    <section id="compare" className="py-20 bg-[#111E31] relative border-t border-[#1E3352]/80">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#38BDF8]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#EAB308]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#CBD5E1] bg-[#15243C] border border-[#1E3352] px-3.5 py-1 rounded-full">
            SMART COMPARISON & FINANCING
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mt-3 tracking-tight">
            COMPARE <span className="text-[#EAB308]">THE LINEUP</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            TERRON+, ADVENTURE, SPORTS, CLASSIC SPORTS, and NEXA side-by-side technical benchmarks and instant EV green loan financing.
          </p>
        </div>

        {/* 4 Bikes Comparison Table */}
        <div className="overflow-x-auto bg-[#15243C] border border-[#1E3352] rounded-3xl p-6 shadow-2xl scrollbar-none mb-16">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead>
              <tr className="border-b border-[#1E3352] text-[#CBD5E1] uppercase tracking-wider text-[11px]">
                <th className="py-4 px-4 font-black">Model</th>
                <th className="py-4 px-4 font-black">Certified Range</th>
                <th className="py-4 px-4 font-black">Top Speed</th>
                <th className="py-4 px-4 font-black">Motor Output</th>
                <th className="py-4 px-4 font-black">Charging Time</th>
                <th className="py-4 px-4 font-black">Braking & Wheels</th>
                <th className="py-4 px-4 font-black text-right">Price Starts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E3352]/60 text-slate-200">
              {brochureModels.map((m) => (
                <tr key={m.id} className="hover:bg-[#0E1A2C] transition-colors">
                  <td className="py-4 px-4 font-black text-white flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EAB308]" />
                    <span className="text-[#CBD5E1]">{m.name}</span>
                  </td>
                  <td className="py-4 px-4 font-extrabold text-[#38BDF8]">{m.range}</td>
                  <td className="py-4 px-4 font-semibold text-white">{m.topSpeed}</td>
                  <td className="py-4 px-4 font-semibold">{m.motor}</td>
                  <td className="py-4 px-4 font-semibold text-[#EAB308]">{m.chargingTime}</td>
                  <td className="py-4 px-4 text-slate-400">{m.wheels.split('|')[0]}</td>
                  <td className="py-4 px-4 text-right">
                    <span className="font-black text-white text-sm block">{m.startingPrice}*</span>
                    <button
                      onClick={() => {
                        triggerHaptic(20);
                        onOpenTestRide(m.name);
                      }}
                      className="text-[10px] text-[#EAB308] font-bold hover:underline"
                    >
                      Book Ride →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* EMI Financing Calculator */}
        <div className="bg-[#15243C] border border-[#1E3352] rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Calculator Controls */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-[#EAB308]/10 text-[#EAB308] rounded-2xl border border-[#EAB308]/30">
                  <Calculator className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    EV Green Loan EMI Calculator
                  </h3>
                  <p className="text-xs text-slate-400">
                    Low 8.9% interest rates with zero prepayment penalty
                  </p>
                </div>
              </div>

              {/* 4 Models Selection */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-2">Select Vehicle Model</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {brochureModels.map((m) => {
                    const priceNum = parseInt(m.startingPrice.replace(/[^0-9]/g, ''));
                    const isSelected = vehiclePrice === priceNum;
                    return (
                      <button
                        key={m.id}
                        onClick={() => {
                          triggerHaptic(15);
                          setVehiclePrice(priceNum);
                        }}
                        className={`p-2.5 rounded-xl text-left border text-xs transition-all ${
                          isSelected
                            ? 'bg-[#0E1A2C] border-[#EAB308] text-white font-bold ring-1 ring-[#EAB308]'
                            : 'bg-[#0E1A2C] border-[#1E3352] text-slate-400 hover:text-white'
                        }`}
                      >
                        <span className="block truncate font-bold">{m.name}</span>
                        <span className="text-[10px] text-[#EAB308] font-semibold">{m.startingPrice}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Down Payment Slider */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Down Payment</span>
                  <span className="font-extrabold text-[#EAB308]">₹{downPayment.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="50000"
                  step="2500"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full accent-[#EAB308] cursor-pointer"
                />
              </div>

              {/* Tenure Selection */}
              <div>
                <label className="text-xs font-bold text-slate-400 block mb-2">Repayment Tenure</label>
                <div className="flex space-x-2">
                  {[12, 24, 36, 48].map((m) => (
                    <button
                      key={m}
                      onClick={() => {
                        triggerHaptic(15);
                        setTenureMonths(m);
                      }}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all border ${
                        tenureMonths === m
                          ? 'bg-[#EAB308] text-slate-950 border-[#EAB308] font-black'
                          : 'bg-[#0E1A2C] text-slate-400 border-[#1E3352] hover:text-white'
                      }`}
                    >
                      {m} Months
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculated Output Box */}
            <div className="lg:col-span-5 bg-[#0E1A2C] border border-[#1E3352] rounded-3xl p-6 text-center space-y-4 shadow-xl">
              <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest block">
                Estimated Monthly Repayment
              </span>

              <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#EAB308] to-[#38BDF8]">
                ₹{emi.toLocaleString('en-IN')}
                <span className="text-sm font-bold text-slate-400"> / month</span>
              </div>

              <div className="text-xs text-slate-400 space-y-1.5 pt-2 border-t border-[#1E3352]">
                <div className="flex justify-between">
                  <span>Loan Principal:</span>
                  <span className="font-bold text-white">₹{loanAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tenure:</span>
                  <span className="font-bold text-white">{tenureMonths} Months</span>
                </div>
                <div className="flex justify-between">
                  <span>Government Subsidies:</span>
                  <span className="font-bold text-emerald-400">State EV Subsidy Eligible</span>
                </div>
              </div>

              <button
                onClick={() => {
                  triggerHaptic(30);
                  onOpenTestRide('CLASSIC SPORTS');
                }}
                className="w-full py-3 bg-gradient-to-r from-[#EAB308] to-[#F59E0B] hover:from-[#FBBF24] hover:to-[#EAB308] text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#EAB308]/20 mt-3"
              >
                Apply For Instant Loan Approval
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
