import React, { useState } from 'react';
import { Check, ArrowRight, Calculator, IndianRupee, Sparkles, ShieldCheck } from 'lucide-react';
import { brochureModels } from '../services/api';
import { triggerHaptic } from '../services/mobileService';

export default function CompareSection({ onOpenTestRide }) {
  // Financing EMI Calculator State
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
    <section id="compare" className="py-20 bg-[#111E31] relative border-t border-[#233d62]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[11px] font-bold uppercase tracking-widest text-sky-400 bg-sky-500/10 border border-sky-500/20 px-3.5 py-1 rounded-full">
            SMART COMPARISON & FINANCING
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mt-3 tracking-tight">
            COMPARE THE LINEUP
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Side-by-side engineering specifications and instant EV green loan financing options.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto bg-[#0a162b] border border-slate-800 rounded-3xl p-6 shadow-2xl scrollbar-none mb-16">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[11px]">
                <th className="py-4 px-4 font-bold">Model</th>
                <th className="py-4 px-4 font-bold">Certified Range</th>
                <th className="py-4 px-4 font-bold">Top Speed</th>
                <th className="py-4 px-4 font-bold">Motor Output</th>
                <th className="py-4 px-4 font-bold">Fast Charging</th>
                <th className="py-4 px-4 font-bold">Braking & Wheels</th>
                <th className="py-4 px-4 font-bold text-right">Price Starts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {brochureModels.map((m) => (
                <tr key={m.id} className="hover:bg-slate-900/60 transition-colors">
                  <td className="py-4 px-4 font-black text-white flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-sky-400" />
                    <span>{m.name.toUpperCase()}</span>
                  </td>
                  <td className="py-4 px-4 font-extrabold text-sky-400">{m.range}</td>
                  <td className="py-4 px-4 font-semibold">{m.topSpeed}</td>
                  <td className="py-4 px-4 font-semibold">{m.motor}</td>
                  <td className="py-4 px-4 font-semibold text-amber-300">{m.chargingTime}</td>
                  <td className="py-4 px-4 text-slate-400">{m.wheels.split('|')[0]}</td>
                  <td className="py-4 px-4 text-right">
                    <span className="font-black text-white text-sm block">{m.startingPrice}*</span>
                    <button
                      onClick={() => {
                        triggerHaptic(20);
                        onOpenTestRide(m.name);
                      }}
                      className="text-[10px] text-sky-400 font-bold hover:underline"
                    >
                      Book Ride →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Royal Enfield / EV Style EMI Financing Calculator */}
        <div className="bg-gradient-to-r from-[#0c1d38] via-[#0b1b36] to-[#0c1d38] border border-sky-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Calculator Controls */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl border border-emerald-500/20">
                  <Calculator className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    EV Green Finance Calculator
                  </h3>
                  <p className="text-xs text-slate-400">
                    Low 8.9% interest rates with zero prepayment penalty
                  </p>
                </div>
              </div>

              {/* Scooter Model Selection for Calculator */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-2">Select Vehicle Model</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
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
                            ? 'bg-sky-500/20 border-sky-400 text-white font-bold'
                            : 'bg-[#060e1c] border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <span className="block truncate">{m.name}</span>
                        <span className="text-[10px] text-sky-400 font-semibold">{m.startingPrice}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Down Payment Slider */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Down Payment</span>
                  <span className="font-extrabold text-white">₹{downPayment.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="50000"
                  step="2500"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full accent-sky-400 cursor-pointer"
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
                          ? 'bg-sky-500 text-slate-950 border-sky-400'
                          : 'bg-[#060e1c] text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      {m} Months
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculated Output Box */}
            <div className="lg:col-span-5 bg-[#060e1c] border border-slate-800 rounded-3xl p-6 text-center space-y-4 shadow-xl">
              <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest block">
                Estimated Monthly Repayment
              </span>

              <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">
                ₹{emi.toLocaleString('en-IN')}
                <span className="text-sm font-bold text-slate-400"> / month</span>
              </div>

              <div className="text-xs text-slate-400 space-y-1.5 pt-2 border-t border-slate-800">
                <div className="flex justify-between">
                  <span>Loan Principal:</span>
                  <span className="font-bold text-white">₹{loanAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tenure:</span>
                  <span className="font-bold text-white">{tenureMonths} Months</span>
                </div>
                <div className="flex justify-between">
                  <span>Subsidies Available:</span>
                  <span className="font-bold text-emerald-400">State EV Subsidy Eligible</span>
                </div>
              </div>

              <button
                onClick={() => {
                  triggerHaptic(30);
                  onOpenTestRide('Classic Sport');
                }}
                className="w-full py-3 bg-gradient-to-r from-sky-400 to-blue-600 hover:from-sky-300 hover:to-blue-500 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-sky-500/25 mt-3"
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
