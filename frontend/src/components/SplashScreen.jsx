import React, { useState, useEffect } from 'react';
import { Sparkles, Zap } from 'lucide-react';
import { triggerHaptic } from '../services/mobileService';

export default function SplashScreen({ onFinish }) {
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress bar animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 60);

    // Fade out after ~1.8 seconds
    const timer = setTimeout(() => {
      setFading(true);
      setTimeout(() => {
        if (onFinish) onFinish();
      }, 600);
    }, 1800);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onFinish]);

  const handleSkip = () => {
    triggerHaptic(20);
    setFading(true);
    setTimeout(() => {
      if (onFinish) onFinish();
    }, 300);
  };

  return (
    <div
      onClick={handleSkip}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-8 bg-[#081326] transition-opacity duration-700 cursor-pointer ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Top subtle badge */}
      <div className="pt-6 animate-fadeIn">
        <span className="text-[10px] tracking-[0.35em] uppercase text-sky-400 font-semibold bg-sky-500/10 border border-sky-500/20 px-3.5 py-1 rounded-full">
          SRIDEWI ENERGIES PRIVATE LIMITED
        </span>
      </div>

      {/* Center Official Logo with Ambient Glow */}
      <div className="flex flex-col items-center justify-center relative w-full max-w-sm">
        {/* Ambient background glow matching navy/sky */}
        <div className="absolute w-64 h-64 bg-sky-500/15 rounded-full blur-[90px] animate-pulse pointer-events-none" />

        {/* Official Terron Chrome Logo Image */}
        <div className="relative z-10 w-full flex flex-col items-center">
          <img
            src="/splash.png"
            alt="TERRON Logo"
            className="w-72 sm:w-80 object-contain drop-shadow-[0_10px_25px_rgba(56,189,248,0.25)] animate-scaleIn"
          />

          <span className="text-xs sm:text-sm tracking-[0.55em] text-slate-300 font-semibold uppercase mt-4">
            EV MOBILITY
          </span>

          <p className="text-[11px] text-sky-400 font-medium italic mt-2 text-center max-w-xs">
            "Powering Mobility. Energizing Progress. Driving the Future."
          </p>
        </div>
      </div>

      {/* Bottom Loading Progress & Status */}
      <div className="w-full max-w-xs flex flex-col items-center pb-6 space-y-2">
        <div className="w-full bg-slate-900/80 border border-slate-800 rounded-full h-1.5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sky-400 to-blue-500 rounded-full transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between w-full text-[10px] text-slate-400">
          <span className="flex items-center space-x-1">
            <Zap className="w-3 h-3 text-sky-400" />
            <span>Initializing Smart BMS...</span>
          </span>
          <span className="font-mono text-sky-300">{progress}%</span>
        </div>

        <span className="text-[9px] text-slate-600 uppercase tracking-widest pt-2">
          Tap anywhere to skip
        </span>
      </div>
    </div>
  );
}

