import React, { useState } from 'react';
import { X, Calendar, User, Phone, Mail, MapPin, Zap, CheckCircle2, Send, ExternalLink } from 'lucide-react';
import { triggerHaptic } from '../services/mobileService';
import { submitTestRideBooking, OFFICIAL_EMAILS } from '../services/api';

export default function TestRideModal({ isOpen, onClose, preselectedModel = "SPORTS" }) {
  const [model, setModel] = useState(preselectedModel);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Hyderabad');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [submitting, setSubmitting] = useState(false);
  const [booked, setBooked] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  if (!isOpen) return null;

  const buildMailtoUrl = (data) => {
    const subject = encodeURIComponent(`New Test Ride Booking: Terron ${data.model} - ${data.name}`);
    const body = encodeURIComponent(
      `Hello Terron EV Mobility Team,\n\n` +
      `I would like to book an official test ride for the following vehicle:\n\n` +
      `Model: Terron ${data.model}\n` +
      `Customer Name: ${data.name}\n` +
      `Mobile Number: ${data.phone}\n` +
      `Email Address: ${data.email || 'N/A'}\n` +
      `City / Region: ${data.city}\n` +
      `Preferred Date: ${data.date}\n\n` +
      `Please confirm my test ride appointment slot.\n\n` +
      `Thank you,\n${data.name}`
    );
    return `mailto:${OFFICIAL_EMAILS.primary}?cc=${OFFICIAL_EMAILS.backup}&subject=${subject}&body=${body}`;
  };

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
      date,
      destinationEmail: OFFICIAL_EMAILS.primary,
      backupEmail: OFFICIAL_EMAILS.backup,
      createdAt: new Date().toISOString()
    };

    try {
      await submitTestRideBooking(bookingPayload);
    } catch (err) {
      console.warn("Booking submit note:", err);
    }

    setBookingDetails(bookingPayload);
    setSubmitting(false);
    setBooked(true);

    // Open user's email client automatically with pre-addressed email to info@terronbatteries.com
    try {
      const mailtoLink = buildMailtoUrl(bookingPayload);
      window.location.href = mailtoLink;
    } catch (e) {
      console.warn("Mailto launch:", e);
    }
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
          Test ride requests are sent directly to <strong className="text-[#38BDF8]">{OFFICIAL_EMAILS.primary}</strong> and our regional dealership team.
        </p>

        {booked ? (
          <div className="p-6 bg-emerald-950/60 border border-emerald-500/40 rounded-2xl text-emerald-300 space-y-4">
            <div className="text-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="text-lg font-black text-white mt-2">Test Ride Request Registered!</h4>
              <p className="text-xs text-slate-300 mt-1">
                Your request for <strong>{bookingDetails?.model}</strong> has been prepared and dispatched to <strong className="text-emerald-400">{OFFICIAL_EMAILS.primary}</strong>.
              </p>
            </div>

            <div className="bg-[#0E1A2C] p-3.5 rounded-xl border border-[#1E3352] text-xs text-slate-300 space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Recipient:</span>
                <span className="font-mono text-sky-400 font-bold">{OFFICIAL_EMAILS.primary}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Customer:</span>
                <span className="text-white font-semibold">{bookingDetails?.name} ({bookingDetails?.phone})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">City / Date:</span>
                <span className="text-white">{bookingDetails?.city} &bull; {bookingDetails?.date}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <a
                href={bookingDetails ? buildMailtoUrl(bookingDetails) : `mailto:${OFFICIAL_EMAILS.primary}`}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-[#EAB308] to-[#F59E0B] text-slate-950 text-center flex items-center justify-center space-x-1.5 shadow-lg shadow-[#EAB308]/20"
              >
                <Send className="w-4 h-4" />
                <span>Send via Email App</span>
              </a>
              <button
                onClick={onClose}
                className="py-3 px-4 rounded-xl font-bold text-xs bg-[#0E1A2C] hover:bg-[#1E3352] text-white border border-[#1E3352]"
              >
                Close Window
              </button>
            </div>
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

            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 bg-gradient-to-r from-[#EAB308] to-[#F59E0B] hover:from-[#FBBF24] hover:to-[#EAB308] text-slate-950 font-black rounded-xl text-sm transition-all shadow-lg shadow-[#EAB308]/20 uppercase tracking-wider flex items-center justify-center space-x-2 outline-none focus:outline-none"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? 'Dispatching to info@terronbatteries.com...' : 'Submit & Email Test Ride Request'}</span>
              </button>
              <span className="text-[10px] text-slate-400 text-center block mt-2">
                Sends booking directly to <strong>{OFFICIAL_EMAILS.primary}</strong>
              </span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
