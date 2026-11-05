import React, { useState } from 'react';
import { X, Calendar, User, Phone, MapPin, Zap, CheckCircle2 } from 'lucide-react';
import { triggerHaptic } from '../services/mobileService';

export default function TestRideModal({ isOpen, onClose, preselectedModel = "CLASSIC SPORTS" }) {
  const [model, setModel] = useState(preselectedModel);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Hyderabad');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [booked, setBooked] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    triggerHaptic(40);
    setBooked(true);
    setTimeout(() => {
      setBooked(false);
      onClose();
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#15243C] border border-[#1E3352] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[92vh] overflow-y-auto">
        <button
          onClick={() => {
            triggerHaptic(20);
            onClose();
          }}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl bg-[#0E1A2C] border border-[#1E3352]"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center space-x-2.5 mb-1">
          <div className="p-2 rounded-xl bg-[#EAB308]/10 text-[#EAB308] border border-[#EAB308]/30">
            <Zap className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#EAB308]">
            TERRON EV MOBILITY EXPERIENCE
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-white">Book Your Test Ride</h3>
        <p className="text-xs text-slate-300 mb-6">
          Experience the acceleration, comfort, and Smart BMS of our 4 official EV models.
        </p>

        {booked ? (
          <div className="p-6 bg-emerald-950/60 border border-emerald-500/40 rounded-2xl text-emerald-300 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h4 className="text-base font-bold text-white">Test Ride Scheduled!</h4>
            <p className="text-xs text-slate-300">
              Your test ride for <strong>{model}</strong> in <strong>{city}</strong> has been registered. Our Hyderabad dealership team will call you at {phone} to confirm your slot.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Select Bike Model *</label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full bg-[#0E1A2C] border border-[#1E3352] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#EAB308] font-bold"
              >
                <option value="CLASSIC SPORTS">CLASSIC SPORTS (150-175 KM* | 60 KM/H | 4.5 KW)</option>
                <option value="NEXA">NEXA (225-270 KM* | 70-80 KM/H | Maxi Adventure)</option>
                <option value="SPORTS">SPORTS (150-175 KM* | 60 KM/H | 150KG Load)</option>
                <option value="TERRON+">TERRON+ (225-270 KM | ~3-Hour Fast Charge)</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0E1A2C] border border-[#1E3352] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#EAB308]"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Mobile Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 91216 XXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#0E1A2C] border border-[#1E3352] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#EAB308]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">City / Region *</label>
                <input
                  type="text"
                  required
                  placeholder="Hyderabad / Telangana"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-[#0E1A2C] border border-[#1E3352] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#EAB308]"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Preferred Date *</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#0E1A2C] border border-[#1E3352] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#EAB308]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#EAB308] to-[#F59E0B] hover:from-[#FBBF24] hover:to-[#EAB308] text-slate-950 font-black rounded-xl text-sm transition-all shadow-lg shadow-[#EAB308]/20 mt-4 uppercase tracking-wider"
            >
              Confirm Test Ride Reservation
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
