import React, { useState } from 'react';
import { Rocket, Bell, X, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { triggerHaptic } from '../services/mobileService';

export default function Banner() {
  const [visible, setVisible] = useState(true);
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!visible) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    triggerHaptic(40);
    setSubmitted(true);
    setTimeout(() => {
      setShowNotifyModal(false);
      setSubmitted(false);
      setEmail('');
      setPhone('');
    }, 2500);
  };

  return (
    <>
      {/* Top Coming Soon Banner */}
      <aside aria-label="Official Launch Notice" className="relative z-50 bg-gradient-to-r from-[#0c1b33] via-[#102a52] to-[#0c1b33] border-b border-sky-500/30 text-white px-3 sm:px-6 py-2.5 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center space-x-2.5 flex-1 min-w-0">
            {/* Pulsing Pill */}
            <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider bg-sky-400 text-slate-950 shadow-md shadow-sky-400/30 shrink-0 animate-pulse">
              <Rocket className="w-3 h-3 stroke-[2.5]" />
              <span>Coming Soon</span>
            </span>

            {/* Headline */}
            <p className="text-slate-200 truncate font-medium">
              <span className="font-bold text-white">TERRON EV MOBILITY:</span> The official electric scooter lineup is launching soon in Hyderabad & across India!
            </p>
          </div>

          {/* Action & Dismiss Buttons */}
          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => {
                triggerHaptic(30);
                setShowNotifyModal(true);
              }}
              className="inline-flex items-center space-x-1 px-3 py-1 bg-sky-500/20 hover:bg-sky-500 hover:text-slate-950 text-sky-300 font-semibold rounded-lg text-xs transition-all border border-sky-400/40"
            >
              <Bell className="w-3 h-3" />
              <span>Get Notified</span>
            </button>

            <button
              onClick={() => {
                triggerHaptic(20);
                setVisible(false);
              }}
              aria-label="Dismiss banner"
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Early Access Waitlist Modal */}
      {showNotifyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0b1b36] border border-sky-500/40 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowNotifyModal(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800/60"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-2 mb-2">
              <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                SRIDEWI ENERGIES PVT LTD
              </span>
            </div>

            <h3 className="text-xl font-bold text-white">Be The First To Ride</h3>
            <p className="text-xs text-slate-300 mt-1 mb-5">
              Sign up for priority test ride bookings, early-bird pricing, and delivery schedules for the Terron EV electric scooter lineup.
            </p>

            {submitted ? (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="font-semibold">Thank you! Our Hyderabad dealership team will contact you soon.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#060e1c] border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">Mobile Number (India)</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 XXXXX XXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#060e1c] border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-slate-950 font-bold rounded-xl text-sm transition-all flex items-center justify-center space-x-1.5 shadow-lg shadow-sky-500/25 mt-2"
                >
                  <span>Request Priority Access</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
