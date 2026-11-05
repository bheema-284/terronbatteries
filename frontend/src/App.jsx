import React, { useState, useEffect } from 'react';
import Banner from './components/Banner';
import Navbar from './components/Navbar';
import TelemetryMonitor from './components/TelemetryMonitor';
import ProductsCatalog from './components/ProductsCatalog';
import WarrantyLookup from './components/WarrantyLookup';
import NativeDevicePanel from './components/NativeDevicePanel';
import { checkBackendHealth } from './services/api';
import { triggerHaptic, setupStatusBar } from './services/capacitorService';

export default function App() {
  const [activeTab, setActiveTab] = useState('telemetry');
  const [backendStatus, setBackendStatus] = useState({ online: false, data: null });

  useEffect(() => {
    setupStatusBar();
    
    // Check backend connection
    const verifyHealth = async () => {
      const health = await checkBackendHealth();
      setBackendStatus(health);
    };

    verifyHealth();
    const interval = setInterval(verifyHealth, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleHapticFeedback = () => {
    triggerHaptic();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-terron-500 selection:text-white">
      {/* Coming Soon Announcement Banner */}
      <Banner onTriggerHaptic={handleHapticFeedback} />

      {/* Top Header & Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        backendStatus={backendStatus}
        onTriggerHaptic={handleHapticFeedback}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'telemetry' && (
          <TelemetryMonitor onTriggerHaptic={handleHapticFeedback} />
        )}
        {activeTab === 'products' && (
          <ProductsCatalog onTriggerHaptic={handleHapticFeedback} />
        )}
        {activeTab === 'warranty' && (
          <WarrantyLookup onTriggerHaptic={handleHapticFeedback} />
        )}
        {activeTab === 'native' && (
          <NativeDevicePanel onTriggerHaptic={handleHapticFeedback} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800/80 py-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-white tracking-wider">TERRON BATTERIES</span>
            <span>• Next-Gen Energy Storage & BMS</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Stack: Node.js • Express • React • Tailwind • Capacitor</span>
            <span>© 2026 Terron</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

