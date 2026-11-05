import React, { useState } from 'react';
import { Sparkles, ArrowRight, X, Bell, Rocket, ShieldCheck } from 'lucide-react';

export default function Banner({ onTriggerHaptic }) {
  const [visible, setVisible] = useState(true);
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  if (!visible) return null;

  const handleNotifySubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    if (onTriggerHaptic) onTriggerHaptic();
    setSubscribed(true);
    setTimeout(() => {
      setShowNotifyModal(false);
      setSubscribed(false);
      setEmail('');
    }, 2200);
  };

  return (
    <>
      {/* Top Coming Soon Announcement Banner */}
      <aside aria-label="Announcement" className="relative bg-gradient-to-r from-emerald-950 via-slate-900 to-terron-950 border-b border-terron-500/30 text-white px-4 py-2.5 text-xs sm:text-sm font-medium shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center space-x-2.5 flex-1 overflow-hidden">
            {/* Animated Coming Soon Badge */}
            <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-terron-500 text-slate-950 shadow-sm shadow-terron-500/40 shrink-0 animate-pulse">
              <Rocket className="w-3 h-3 stroke-[2.5]" />
              <span>Coming Soon</span>
            </span>

            {/* Banner Headline */}
            <p className="text-slate-200 truncate font-medium">
              <span className="font-bold text-white">Terron Batteries App:</span> Next-gen BMS telemetry & mobile apps are launching on Android & iOS!
            </p>
          </div>

          {/* Action & Dismiss Buttons */}
          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => {
                if (onTriggerHaptic) onTriggerHaptic();
                setShowNotifyModal(true);
              }}
              className="hidden sm:inline-flex items-center space-x-1 px-3 py-1 bg-terron-500/20 hover:bg-terron-500 hover:text-slate-950 text-terron-300 font-semibold rounded-lg text-xs transition-all border border-terron-500/40"
            >
              <Bell className="w-3 h-3" />
              <span>Get Notified</span>
            </button>

            <button
              onClick={() => {
                if (onTriggerHaptic) onTriggerHaptic();
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

      {/* Early Access Notification Modal */}
      {showNotifyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-terron-500/40 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowNotifyModal(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800/60"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-2.5 mb-2">
              <div className="p-2 rounded-xl bg-terron-500/20 text-terron-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-terron-400">
                Official Launch Waitlist
              </span>
            </div>

            <h3 className="text-xl font-bold text-white">Be First in Line</h3>
            <p className="text-xs text-slate-300 mt-1 mb-5">
              Get notified when the Terron Batteries mobile app goes live on Google Play & the Apple App Store, and receive exclusive early-adopter BMS features.
            </p>

            {subscribed ? (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="font-semibold">You're on the list! We'll notify you on launch day.</span>
              </div>
            ) : (
              <form onSubmit={handleNotifySubmit} className="space-y-3">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-terron-500"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-terron-500 hover:bg-terron-600 text-slate-950 font-bold rounded-xl text-sm transition-all flex items-center justify-center space-x-1.5 shadow-lg shadow-terron-500/20"
                >
                  <span>Notify Me at Launch</span>
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

