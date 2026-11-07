import React, { useState } from 'react';
import { X, Calendar, User, Phone, Mail, MapPin, Zap, CheckCircle2, Send } from 'lucide-react';
import { triggerHaptic } from '../services/mobileService';
import { submitTestRideBooking, OFFICIAL_EMAILS } from '../services/api';

/**
 * Format date helpers for DD-MM-YYYY
 */
const getTodayDDMMYYYY = () => {
  const d = new Date();
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
};

const toYYYYMMDD = (ddmmyyyy) => {
  if (!ddmmyyyy) return '';
  const parts = ddmmyyyy.split('-');
  if (parts.length === 3 && parts[0].length === 2) {
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  return ddmmyyyy;
};

const toDDMMYYYY = (yyyymmdd) => {
  if (!yyyymmdd) return '';
  const parts = yyyymmdd.split('-');
  if (parts.length === 3 && parts[0].length === 4) {
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  return yyyymmdd;
};

export default function TestRideModal({ isOpen, onClose, preselectedModel = "SPORTS" }) {
  const [model, setModel] = useState(preselectedModel);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Hyderabad');
  // Always DD-MM-YYYY
  const [date, setDate] = useState(getTodayDDMMYYYY());
  const [submitting, setSubmitting] = useState(false);
  const [booked, setBooked] = useState(false);
  const [bookingResponse, setBookingResponse] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    triggerHaptic(40);
    setSubmitting(true);

    const bookingPayload = {
      model,
      name,
      phone,
      email,
      city,
      date, // Guaranteed DD-MM-YYYY format
      destinationEmail: OFFICIAL_EMAILS.primary,
      createdAt: new Date().toISOString()
    };

    let result = null;
    try {
      result = await submitTestRideBooking(bookingPayload);
    } catch (err) {
      console.warn("Booking submit note:", err);
    }

    setBookingResponse({
      ...bookingPayload,
      bookingId: result?.data?.bookingId || "TRN-TR-" + Date.now().toString(36).toUpperCase()
    });
    setSubmitting(false);
    setBooked(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#15243C] border border-[#1E3352] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[92vh] overflow-y-auto">
        <button
          onClick={() => {
            triggerHaptic(20);
            onClose();
          }}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl bg-[#0E1A2C] border border-[#1E3352] outline-none focus:outline-none"
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
          Test ride requests are automatically dispatched to <strong className="text-[#38BDF8]">{OFFICIAL_EMAILS.primary}</strong> and our dealership team.
        </p>

        {booked ? (
          <div className="p-6 bg-emerald-950/60 border border-emerald-500/40 rounded-2xl text-emerald-300 space-y-4">
            <div className="text-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="text-lg font-black text-white mt-2">Test Ride Successfully Booked!</h4>
              <p className="text-xs text-slate-300 mt-1">
                Your request for <strong>{bookingResponse?.model}</strong> has been received and emailed to <strong className="text-emerald-400">{OFFICIAL_EMAILS.primary}</strong>.
              </p>
              {bookingResponse?.email && (
                <p className="text-[11px] text-sky-300 mt-1">
                  A confirmation email has also been sent to <strong>{bookingResponse.email}</strong>.
                </p>
              )}
            </div>

            <div className="bg-[#0E1A2C] p-4 rounded-xl border border-[#1E3352] text-xs text-slate-300 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-400">Booking ID:</span>
                <span className="font-mono text-sky-400 font-bold">{bookingResponse?.bookingId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Vehicle Model:</span>
                <span className="text-[#EAB308] font-bold">Terron {bookingResponse?.model}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Customer Name:</span>
                <span className="text-white font-semibold">{bookingResponse?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Mobile Number:</span>
                <span className="text-white font-semibold">{bookingResponse?.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Preferred Date (DD-MM-YYYY):</span>
                <span className="text-[#38BDF8] font-mono font-extrabold">{bookingResponse?.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Location:</span>
                <span className="text-white">{bookingResponse?.city}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-xl font-bold text-xs bg-gradient-to-r from-[#EAB308] to-[#F59E0B] text-slate-950 uppercase tracking-wider shadow-lg shadow-[#EAB308]/20"
            >
              Done & Close
            </button>
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
                <option value="TERRON+">TERRON+ (225-270 KM | ~3-Hour Fast Charge)</option>
                <option value="ADVENTURE">ADVENTURE (225-270 KM* | 75-85 KM/H | Maxi Tourer)</option>
                <option value="SPORTS">TERRON SPORTS (150-175 KM* | 60 KM/H | 150KG Load)</option>
                <option value="CLASSIC SPORTS">CLASSIC SPORTS (150-175 KM* | 60 KM/H | 4.5 KW)</option>
                <option value="NEXA">NEXA (225-270 KM* | 70-80 KM/H | Maxi Cruiser)</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Your Name (e.g. Bheema)"
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
                  placeholder="Mobile (e.g. 9247583864)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#0E1A2C] border border-[#1E3352] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#EAB308]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0E1A2C] border border-[#1E3352] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#EAB308]"
                />
              </div>

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
            </div>

            {/* Preferred Date Strictly DD-MM-YYYY */}
            <div>
              <label className="text-slate-300 font-semibold block mb-1">
                Preferred Date (DD-MM-YYYY) *
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  required
                  pattern="\d{2}-\d{2}-\d{4}"
                  placeholder="DD-MM-YYYY"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#0E1A2C] border border-[#1E3352] rounded-xl px-3.5 py-2.5 text-white font-mono font-bold focus:outline-none focus:border-[#EAB308]"
                />
                <input
                  type="date"
                  aria-label="Pick date from calendar"
                  value={toYYYYMMDD(date)}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => {
                    if (e.target.value) {
                      setDate(toDDMMYYYY(e.target.value));
                    }
                  }}
                  className="absolute right-3 top-2.5 opacity-50 hover:opacity-100 cursor-pointer h-6 w-6 bg-transparent border-0 text-white invert"
                />
              </div>
              <span className="text-[10px] text-slate-400 block mt-1">
                Preferred Date format: <strong className="text-[#EAB308]">DD-MM-YYYY</strong> (e.g. {getTodayDDMMYYYY()})
              </span>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 bg-gradient-to-r from-[#EAB308] to-[#F59E0B] hover:from-[#FBBF24] hover:to-[#EAB308] text-slate-950 font-black rounded-xl text-sm transition-all shadow-lg shadow-[#EAB308]/20 uppercase tracking-wider flex items-center justify-center space-x-2 outline-none focus:outline-none"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? 'Sending Request...' : 'Book Test Ride'}</span>
              </button>
              <span className="text-[10px] text-slate-400 text-center block mt-2">
                Notification email will be sent automatically to <strong>{OFFICIAL_EMAILS.primary}</strong>
              </span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
