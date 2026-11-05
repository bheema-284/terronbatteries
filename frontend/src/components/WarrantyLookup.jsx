import React, { useState } from 'react';
import { ShieldCheck, Search, PlusCircle, CheckCircle2, AlertCircle, Calendar, User, Mail, Hash } from 'lucide-react';
import { lookupWarranty, registerWarranty } from '../services/api';

export default function WarrantyLookup({ onTriggerHaptic }) {
  const [activeSubTab, setActiveSubTab] = useState('lookup'); // 'lookup' or 'register'
  
  // Lookup state
  const [serialInput, setSerialInput] = useState('TRN-2026-99014');
  const [lookupResult, setLookupResult] = useState(null);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState('');

  // Register form state
  const [formData, setFormData] = useState({
    serialNumber: '',
    customerName: '',
    customerEmail: '',
    batteryId: 'TB-LFP-48V',
    purchaseDate: new Date().toISOString().split('T')[0]
  });
  const [registerStatus, setRegisterStatus] = useState({ loading: false, success: false, message: '' });

  const handleLookup = async (e) => {
    e.preventDefault();
    if (!serialInput.trim()) return;
    if (onTriggerHaptic) onTriggerHaptic();

    setLookupLoading(true);
    setLookupError('');
    setLookupResult(null);

    const res = await lookupWarranty(serialInput.trim());
    setLookupLoading(false);

    if (res.success) {
      setLookupResult(res.data);
    } else {
      setLookupError(res.error || 'No matching warranty found');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (onTriggerHaptic) onTriggerHaptic();
    setRegisterStatus({ loading: true, success: false, message: '' });

    const res = await registerWarranty(formData);
    if (res.success) {
      setRegisterStatus({
        loading: false,
        success: true,
        message: `Success! Warranty registered for Serial: ${res.data.serialNumber}. Expiry: ${res.data.warrantyExpiry}`
      });
      setFormData({
        serialNumber: '',
        customerName: '',
        customerEmail: '',
        batteryId: 'TB-LFP-48V',
        purchaseDate: new Date().toISOString().split('T')[0]
      });
    } else {
      setRegisterStatus({
        loading: false,
        success: false,
        message: res.error || 'Failed to register warranty'
      });
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Terron Care & Warranty Service</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Verify active coverage, genuine authenticity, or register your battery warranty
              </p>
            </div>
          </div>

          {/* Subtabs */}
          <div className="flex p-1 bg-slate-950 rounded-xl border border-slate-800 self-start sm:self-auto">
            <button
              onClick={() => { if (onTriggerHaptic) onTriggerHaptic(); setActiveSubTab('lookup'); }}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSubTab === 'lookup'
                  ? 'bg-terron-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Verify Warranty
            </button>
            <button
              onClick={() => { if (onTriggerHaptic) onTriggerHaptic(); setActiveSubTab('register'); }}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSubTab === 'register'
                  ? 'bg-terron-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Register Battery
            </button>
          </div>
        </div>
      </div>

      {/* Lookup View */}
      {activeSubTab === 'lookup' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <form onSubmit={handleLookup} className="space-y-3">
            <label className="text-xs font-semibold text-slate-300 block">
              Enter Battery Serial Number / Barcode
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="e.g. TRN-2026-99014"
                  value={serialInput}
                  onChange={(e) => setSerialInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 pl-10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-terron-500 font-mono uppercase"
                />
                <Hash className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              </div>
              <button
                type="submit"
                disabled={lookupLoading}
                className="px-6 py-2.5 bg-terron-500 hover:bg-terron-600 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-sm transition-all flex items-center justify-center space-x-2"
              >
                <Search className="w-4 h-4" />
                <span>{lookupLoading ? 'Checking...' : 'Check Status'}</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              Try demo serial numbers: <code className="text-terron-400 bg-slate-950 px-1.5 py-0.5 rounded cursor-pointer" onClick={() => setSerialInput('TRN-2026-99014')}>TRN-2026-99014</code> or <code className="text-terron-400 bg-slate-950 px-1.5 py-0.5 rounded cursor-pointer" onClick={() => setSerialInput('TRN-2025-41288')}>TRN-2025-41288</code>
            </p>
          </form>

          {/* Lookup Error */}
          {lookupError && (
            <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{lookupError}</span>
            </div>
          )}

          {/* Lookup Result Card */}
          {lookupResult && (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="font-bold text-white text-base">Warranty Record Verified</span>
                </div>
                <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {lookupResult.status}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block mb-0.5">Serial Number</span>
                  <span className="font-mono text-terron-300 font-bold text-sm">{lookupResult.serialNumber}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Registered Customer</span>
                  <span className="text-white font-medium">{lookupResult.customerName} ({lookupResult.customerEmail})</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Purchase Date</span>
                  <span className="text-white font-medium">{lookupResult.purchaseDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Warranty Expiration</span>
                  <span className="text-amber-300 font-bold">{lookupResult.warrantyExpiry}</span>
                </div>
                {lookupResult.batteryDetails && (
                  <div className="sm:col-span-2 pt-2 border-t border-slate-900">
                    <span className="text-slate-400 block mb-0.5">Covered Battery Model</span>
                    <span className="text-white font-semibold">{lookupResult.batteryDetails.name} ({lookupResult.batteryDetails.capacity})</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Register View */}
      {activeSubTab === 'register' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <form onSubmit={handleRegister} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-300 block mb-1">Serial Number *</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. TRN-2026-88721"
                    value={formData.serialNumber}
                    onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 pl-9 text-white font-mono uppercase focus:outline-none focus:border-terron-500"
                  />
                  <Hash className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Battery Model *</label>
                <select
                  value={formData.batteryId}
                  onChange={(e) => setFormData({ ...formData, batteryId: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-terron-500"
                >
                  <option value="TB-LFP-48V">Terron Ultra LFP 48V (10 Yrs Warranty)</option>
                  <option value="TB-EV-72V">Terron VoltMax EV 72V (5 Yrs Warranty)</option>
                  <option value="TB-INV-12V">Terron Prime Inverter 12V (3 Yrs Warranty)</option>
                  <option value="TB-IND-96V">Terron Industrial PowerCore 96V (10 Yrs Warranty)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Customer Full Name *</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Michael Scott"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 pl-9 text-white focus:outline-none focus:border-terron-500"
                  />
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Customer Email *</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="e.g. michael@example.com"
                    value={formData.customerEmail}
                    onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 pl-9 text-white focus:outline-none focus:border-terron-500"
                  />
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="font-semibold text-slate-300 block mb-1">Date of Purchase</label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.purchaseDate}
                    onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 pl-9 text-white focus:outline-none focus:border-terron-500"
                  />
                  <Calendar className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                </div>
              </div>
            </div>

            {registerStatus.message && (
              <div
                className={`p-3 rounded-xl border text-xs flex items-center space-x-2 ${
                  registerStatus.success
                    ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                    : 'bg-red-950/40 border-red-500/30 text-red-300'
                }`}
              >
                {registerStatus.success ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                <span>{registerStatus.message}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={registerStatus.loading}
              className="w-full py-2.5 bg-terron-500 hover:bg-terron-600 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-sm transition-all flex items-center justify-center space-x-2 shadow-lg shadow-terron-500/20"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{registerStatus.loading ? 'Registering...' : 'Register Warranty Coverage'}</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

