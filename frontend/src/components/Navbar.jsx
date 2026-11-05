import React from 'react';
import { Zap, Activity, Cpu, ShieldCheck, Smartphone, Wifi, WifiOff } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, backendStatus, onTriggerHaptic }) {
  const navItems = [
    { id: 'telemetry', label: 'BMS Telemetry', icon: Activity },
    { id: 'products', label: 'Batteries Catalog', icon: Cpu },
    { id: 'warranty', label: 'Warranty & Care', icon: ShieldCheck },
    { id: 'native', label: 'Mobile & Capacitor', icon: Smartphone }
  ];

  const handleTabClick = (id) => {
    if (onTriggerHaptic) onTriggerHaptic();
    setActiveTab(id);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleTabClick('telemetry')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-terron-600 to-terron-400 flex items-center justify-center shadow-lg shadow-terron-500/20">
              <Zap className="w-6 h-6 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-terron-300 bg-clip-text text-transparent">
                TERRON
              </span>
              <span className="text-xs ml-1 font-semibold tracking-widest text-terron-400 block -mt-1 uppercase">
                Batteries & BMS
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-terron-500/15 text-terron-400 border border-terron-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Status Badge */}
          <div className="flex items-center space-x-2">
            <div
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
                backendStatus.online
                  ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30'
                  : 'bg-amber-950/50 text-amber-300 border-amber-500/30'
              }`}
              title={backendStatus.online ? 'Backend Connected' : 'Running in Offline / Mock Mode'}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  backendStatus.online ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                }`}
              />
              <span className="hidden sm:inline">
                {backendStatus.online ? 'Backend: Connected (Port 5000)' : 'Backend: Standalone Mode'}
              </span>
              <span className="sm:hidden">
                {backendStatus.online ? 'API Live' : 'Local'}
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="md:hidden flex justify-around py-2 border-t border-slate-800/60">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`flex flex-col items-center py-1 px-2 text-xs font-medium rounded-lg transition-colors ${
                  isActive ? 'text-terron-400 font-semibold' : 'text-slate-400'
                }`}
              >
                <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'text-terron-400' : 'text-slate-400'}`} />
                <span>{item.label.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}

