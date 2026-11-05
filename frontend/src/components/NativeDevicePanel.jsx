import React, { useState, useEffect } from 'react';
import { 
  Smartphone, 
  Wifi, 
  Vibrate, 
  Battery, 
  Terminal, 
  Layers, 
  CheckCircle, 
  Play, 
  RefreshCw,
  ExternalLink,
  Apple,
  Bot
} from 'lucide-react';
import { 
  getNativeDeviceInfo, 
  getNetworkStatus, 
  triggerHaptic, 
  getPlatform, 
  isNativePlatform 
} from '../services/capacitorService';

export default function NativeDevicePanel() {
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [networkInfo, setNetworkInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hapticCount, setHapticCount] = useState(0);

  const refreshHardwareData = async () => {
    setLoading(true);
    const [dev, net] = await Promise.all([
      getNativeDeviceInfo(),
      getNetworkStatus()
    ]);
    setDeviceInfo(dev);
    setNetworkInfo(net);
    setLoading(false);
  };

  useEffect(() => {
    refreshHardwareData();
  }, []);

  const handleTestHaptic = async () => {
    await triggerHaptic();
    setHapticCount(prev => prev + 1);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Overview Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-volt-500/10 text-volt-400 rounded-xl border border-volt-500/20">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Capacitor Mobile Integration</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Unified cross-platform runtime for Android, iOS, and Modern Web
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={refreshHardwareData}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Native Stats</span>
            </button>
          </div>
        </div>
      </div>

      {/* Live Capacitor Hardware Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Platform Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5">
          <span className="text-xs font-semibold text-slate-400 block mb-1">Capacitor Platform</span>
          <div className="flex items-center space-x-2 mt-2">
            <span className="text-2xl font-black uppercase text-terron-400">
              {deviceInfo?.platform || getPlatform()}
            </span>
            <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold border ${
              deviceInfo?.isNative 
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' 
                : 'bg-slate-800 text-slate-300 border-slate-700'
            }`}>
              {deviceInfo?.isNative ? 'Native Shell' : 'Web / Hybrid View'}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-3">
            Target OS: <span className="text-white font-medium">{deviceInfo?.operatingSystem} {deviceInfo?.osVersion}</span>
          </p>
        </div>

        {/* Network Status Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5">
          <span className="text-xs font-semibold text-slate-400 block mb-1">Network & Connectivity</span>
          <div className="flex items-center space-x-2 mt-2">
            <Wifi className={`w-6 h-6 ${networkInfo?.connected ? 'text-emerald-400' : 'text-red-400'}`} />
            <span className="text-2xl font-bold text-white">
              {networkInfo?.connected ? 'Online' : 'Offline'}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-3">
            Connection Mode: <span className="text-white font-medium capitalize">{networkInfo?.connectionType || 'Broadband'}</span>
          </p>
        </div>

        {/* Haptics & Vibration Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 block mb-1">Capacitor Haptics API</span>
            <div className="flex items-center space-x-2 mt-1">
              <Vibrate className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-bold text-white">Haptic Pulses: {hapticCount}</span>
            </div>
          </div>
          <button
            onClick={handleTestHaptic}
            className="mt-4 w-full py-2 bg-slate-800 hover:bg-terron-600 hover:text-white text-slate-200 text-xs font-bold rounded-xl transition-all shadow-sm"
          >
            Trigger Haptic Vibration
          </button>
        </div>
      </div>

      {/* Capacitor Mobile Setup & Commands */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <Terminal className="w-5 h-5 text-terron-400" />
            <span>Capacitor Mobile Workflow (Android & iOS)</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            This project is pre-configured with Capacitor 6. Follow the commands below to compile and launch on real devices or emulators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Android Box */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold">
              <Bot className="w-5 h-5" />
              <span className="text-sm">Android Development</span>
            </div>
            <p className="text-slate-400">
              Build web assets, sync Capacitor, and open the native Gradle project in Android Studio:
            </p>
            <div className="bg-slate-900 p-3 rounded-lg font-mono text-[11px] text-slate-200 space-y-1">
              <div>cd frontend</div>
              <div className="text-terron-400">npm run build</div>
              <div className="text-terron-400">npx cap sync</div>
              <div className="text-terron-400">npx cap open android</div>
            </div>
            <span className="text-[11px] text-slate-400 block">
              Package ID: <code className="text-white">com.terronbatteries.app</code>
            </span>
          </div>

          {/* iOS Box */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center space-x-2 text-slate-100 font-bold">
              <Apple className="w-5 h-5" />
              <span className="text-sm">iOS Development</span>
            </div>
            <p className="text-slate-400">
              Sync Capacitor assets and open the Xcode workspace on macOS:
            </p>
            <div className="bg-slate-900 p-3 rounded-lg font-mono text-[11px] text-slate-200 space-y-1">
              <div>cd frontend</div>
              <div className="text-terron-400">npm run build</div>
              <div className="text-terron-400">npx cap sync</div>
              <div className="text-terron-400">npx cap open ios</div>
            </div>
            <span className="text-[11px] text-slate-400 block">
              Requires: macOS with Xcode & CocoaPods
            </span>
          </div>
        </div>

        {/* Live Capacitor Live Reload tip */}
        <div className="bg-terron-950/40 border border-terron-500/20 rounded-xl p-4 text-xs text-terron-300">
          <p className="font-bold flex items-center space-x-1.5 mb-1 text-white">
            <Play className="w-4 h-4 text-terron-400" />
            <span>Pro-Tip: Instant Mobile Live-Reloading</span>
          </p>
          <p className="text-slate-400">
            For rapid mobile development without recompiling, run <code className="text-terron-300 bg-slate-900 px-1 py-0.5 rounded">npm run dev -- --host</code> in the frontend and set your local machine IP in <code className="text-terron-300 bg-slate-900 px-1 py-0.5 rounded">capacitor.config.json</code> under <code className="text-terron-300 bg-slate-900 px-1 py-0.5 rounded">server.url</code>.
          </p>
        </div>
      </div>
    </div>
  );
}

