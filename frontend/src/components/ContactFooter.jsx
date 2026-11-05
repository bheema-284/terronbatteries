import React, { useState } from 'react';
import { Phone, Mail, Globe, MapPin, Send, CheckCircle2, Building, ShieldCheck } from 'lucide-react';
import { triggerHaptic } from '../services/mobileService';

export default function ContactFooter() {
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    triggerHaptic(40);
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 3500);
  };

  return (
    <footer id="contact" className="bg-[#050c18] border-t border-slate-800 text-slate-300 pt-16 pb-28 md:pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top "Thank YOU" Banner matching Page 9 */}
        <div className="text-center mb-12">
          <span className="text-4xl sm:text-6xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-300 to-slate-400 block">
            THANK YOU
          </span>
          <p className="text-xs sm:text-sm text-sky-400 font-semibold tracking-wider uppercase mt-1">
            Empowering the Electric Vehicle Revolution Across India
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Company & Contact Info (Page 9) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex flex-col items-start">
              <img
                src="/logo.png"
                alt="TERRON EV Mobility"
                className="h-12 w-auto object-contain rounded mb-1 drop-shadow-[0_2px_8px_rgba(56,189,248,0.2)]"
              />
              <span className="text-[10px] tracking-[0.45em] text-sky-400 font-bold uppercase mt-1">
                EV MOBILITY
              </span>
              <span className="text-xs font-bold text-slate-300 mt-1">
                SRIDEWI ENERGIES PRIVATE LIMITED
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              For dealership inquiries, fleet configurations, and retail bookings, connect with our headquarters team in Madhapur, Hyderabad.
            </p>

            <div className="space-y-4 text-xs sm:text-sm">
              <a
                href="tel:+917416071115"
                className="flex items-center space-x-3 text-slate-200 hover:text-sky-400 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-sky-400 group-hover:border-sky-500/50">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Direct Phone</span>
                  <span className="font-bold text-white text-base">+91 7416071115</span>
                </div>
              </a>

              <div className="flex items-center space-x-3 text-slate-200">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-sky-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Official Inquiries</span>
                  <div className="flex flex-col sm:flex-row sm:space-x-3">
                    <a href="mailto:sepl2578@gmail.com" className="font-medium hover:text-sky-400 text-sky-300">sepl2578@gmail.com</a>
                    <span className="hidden sm:inline text-slate-600">|</span>
                    <a href="mailto:sales@terronbatteries.com" className="font-medium hover:text-sky-400 text-sky-300">sales@terronbatteries.com</a>
                  </div>
                </div>
              </div>

              <a
                href="https://www.sridewienergies.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-3 text-slate-200 hover:text-sky-400 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-sky-400 group-hover:border-sky-500/50">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Web Portal</span>
                  <span className="font-semibold text-white">www.sridewienergies.com</span>
                </div>
              </a>

              <div className="flex items-start space-x-3 text-slate-200">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-sky-400 shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Corporate & Regional Office</span>
                  <span className="text-xs sm:text-sm text-slate-300 leading-snug block">
                    Plot No. 1023, 1st Floor, Siddhivinayaka Nagar, Madhapur, Hyderabad, Telangana - 500081.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact / Dealer Inquiry Form */}
          <div className="lg:col-span-6 bg-[#09152a] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-1">
              Connect With Our Dealership Team
            </h3>
            <p className="text-xs text-slate-400 mb-5">
              Fill in your details below for dealership, retail purchase, or fleet inquiries.
            </p>

            {formSent ? (
              <div className="p-6 bg-emerald-950/60 border border-emerald-500/40 rounded-2xl text-emerald-300 text-xs sm:text-sm space-y-2 text-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <p className="font-bold text-white text-base">Inquiry Dispatched Successfully!</p>
                <p className="text-slate-300">
                  Our regional team in Hyderabad will contact you shortly regarding the Terron EV lineup.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3.5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#060e1c] border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#060e1c] border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#060e1c] border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Message or Selected Model</label>
                  <textarea
                    rows={3}
                    placeholder="Interested in Classic Sport / Sport / Nexa / Adventure / Terron+..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#060e1c] border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-sky-400 to-blue-600 hover:from-sky-300 hover:to-blue-500 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center space-x-2 shadow-lg shadow-sky-500/25"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Dealership & Purchase Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Legal & Brochure Disclaimer from Page 3 to 9 */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 text-[10px] sm:text-[11px] text-slate-500 space-y-2">
          <p className="font-semibold text-slate-400">
            SRIDEWI ENERGIES PRIVATE LIMITED
          </p>
          <p>
            PROVISIONAL SPECIFICATIONS. ACTUAL PERFORMANCE VARIES WITH RIDING CONDITIONS; SUBJECT TO VALIDATION AND APPROVAL. T & C Apply.
          </p>
          <p>
            © 2026 TERRON EV MOBILITY. All rights reserved. Registered Office: Madhapur, Hyderabad, Telangana - 500081.
          </p>
        </div>
      </div>
    </footer>
  );
}

