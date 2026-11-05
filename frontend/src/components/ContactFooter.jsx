import React, { useState } from 'react';
import { Phone, Mail, Globe, MapPin, Send, CheckCircle2 } from 'lucide-react';
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
    <footer id="contact" className="bg-[#0E1A2C] border-t border-[#1E3352] text-slate-300 pt-16 pb-28 md:pb-12 relative overflow-hidden">
      {/* Background electric blur glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#38BDF8]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#EAB308]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Exact Page 9 "Thank YOU" Banner */}
        <div className="text-center mb-12">
          <span className="text-4xl sm:text-7xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-[#CBD5E1] to-[#94A3B8] block">
            Thank YOU
          </span>
          <p className="text-xs sm:text-sm text-[#EAB308] font-bold tracking-[0.25em] uppercase mt-2">
            SRIDEWI ENERGIES PRIVATE LIMITED • HYDERABAD
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Company & Contact Info (Page 9) with exact brochure Gold Icons */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex flex-col items-start">
              <img
                src="/logo.png"
                alt="TERRON EV Mobility"
                className="h-12 w-auto object-contain rounded mb-1 drop-shadow-[0_2px_8px_rgba(56,189,248,0.25)]"
              />
              <span className="text-[10px] tracking-[0.45em] text-[#38BDF8] font-bold uppercase mt-1">
                EV MOBILITY
              </span>
              <span className="text-xs font-bold text-[#EAB308] mt-1">
                SRIDEWI ENERGIES PRIVATE LIMITED
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md">
              For dealership inquiries, booking allocations, and corporate fleet orders for <strong>CLASSIC SPORTS, NEXA, SPORTS, and TERRON+</strong>, connect with our headquarters in Madhapur, Hyderabad.
            </p>

            <div className="space-y-4 text-xs sm:text-sm">
              {/* Direct Phone with Gold Icon from Page 9 */}
              <a
                href="tel:+919121646777"
                className="flex items-center space-x-3 text-slate-200 hover:text-[#EAB308] transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#15243C] border border-[#1E3352] flex items-center justify-center text-[#EAB308] group-hover:border-[#EAB308]/60 transition-colors shadow-sm">
                  <Phone className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block font-semibold">Direct Phone</span>
                  <span className="font-bold text-white text-base group-hover:text-[#EAB308] transition-colors">+91 91216 46777</span>
                </div>
              </a>

              {/* Emails from Page 9 */}
              <div className="flex items-center space-x-3 text-slate-200">
                <div className="w-10 h-10 rounded-xl bg-[#15243C] border border-[#1E3352] flex items-center justify-center text-[#EAB308] shadow-sm">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block font-semibold">Official Inquiries</span>
                  <div className="flex flex-col sm:flex-row sm:space-x-3">
                    <a href="mailto:sepl2578@gmail.com" className="font-medium hover:text-[#EAB308] text-[#38BDF8]">sepl2578@gmail.com</a>
                    <span className="hidden sm:inline text-slate-600">|</span>
                    <a href="mailto:sridewi@terronbatteries.com" className="font-medium hover:text-[#EAB308] text-[#38BDF8]">sridewi@terronbatteries.com</a>
                  </div>
                </div>
              </div>

              {/* Website from Page 9 with Gold Icon */}
              <a
                href="https://www.sridewienergies.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-3 text-slate-200 hover:text-[#EAB308] transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#15243C] border border-[#1E3352] flex items-center justify-center text-[#EAB308] group-hover:border-[#EAB308]/60 transition-colors shadow-sm">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block font-semibold">Web Portal</span>
                  <span className="font-semibold text-white group-hover:text-[#EAB308] transition-colors">www.sridewienergies.com</span>
                </div>
              </a>

              {/* Address from Page 9 with Gold Pin */}
              <div className="flex items-start space-x-3 text-slate-200">
                <div className="w-10 h-10 rounded-xl bg-[#15243C] border border-[#1E3352] flex items-center justify-center text-[#EAB308] shrink-0 mt-0.5 shadow-sm">
                  <MapPin className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block font-semibold">Corporate Office</span>
                  <span className="text-xs sm:text-sm text-slate-200 leading-snug block">
                    Plot No. 1023, 1st Floor, Siddhivinayaka Nagar, Madhapur, Hyderabad, Telangana - 500081.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact / Dealership Form */}
          <div className="lg:col-span-6 bg-[#15243C] border border-[#1E3352] rounded-3xl p-6 sm:p-8 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-1">
              Connect With Our Dealership Team
            </h3>
            <p className="text-xs text-slate-400 mb-5">
              Select your interested model: <strong>CLASSIC SPORTS, NEXA, SPORTS, or TERRON+</strong>.
            </p>

            {formSent ? (
              <div className="p-6 bg-emerald-950/60 border border-emerald-500/40 rounded-2xl text-emerald-300 text-xs sm:text-sm space-y-2 text-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <p className="font-bold text-white text-base">Inquiry Dispatched Successfully!</p>
                <p className="text-slate-300">
                  Our Hyderabad team will reach out with test-ride schedule and booking details.
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
                      placeholder="e.g. Anand Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#0E1A2C] border border-[#1E3352] rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-[#EAB308]"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 91216 XXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#0E1A2C] border border-[#1E3352] rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-[#EAB308]"
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
                    className="w-full bg-[#0E1A2C] border border-[#1E3352] rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-[#EAB308]"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Interested Model</label>
                  <select
                    className="w-full bg-[#0E1A2C] border border-[#1E3352] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#EAB308]"
                  >
                    <option value="CLASSIC SPORTS">CLASSIC SPORTS (150-175 KM* | 60 KM/H | 4.5 KW)</option>
                    <option value="NEXA">NEXA (225-270 KM* | 70-80 KM/H | Maxi Adventure)</option>
                    <option value="SPORTS">SPORTS (150-175 KM* | 60 KM/H | 150KG Load)</option>
                    <option value="TERRON+">TERRON+ (225-270 KM | 3-Hour Fast Charge)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-[#EAB308] to-[#F59E0B] hover:from-[#FBBF24] hover:to-[#EAB308] text-slate-950 font-black rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-lg shadow-[#EAB308]/20"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Dealership & Purchase Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Legal Disclaimer from Page 9 */}
        <div className="mt-14 pt-8 border-t border-[#1E3352] text-[10px] sm:text-[11px] text-slate-400 space-y-1.5 text-center">
          <p className="font-bold text-[#CBD5E1]">
            SRIDEWI ENERGIES PRIVATE LIMITED
          </p>
          <p className="text-slate-500">
            PROVISIONAL SPECIFICATIONS. ACTUAL PERFORMANCE VARIES WITH RIDING CONDITIONS; SUBJECT TO VALIDATION AND APPROVAL. T & C Apply.
          </p>
          <p className="text-slate-600">
            © 2026 TERRON EV MOBILITY. All rights reserved. Registered Office: Madhapur, Hyderabad, Telangana - 500081.
          </p>
        </div>
      </div>
    </footer>
  );
}
