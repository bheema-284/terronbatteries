import React, { useState } from 'react';
import { Menu, X, Phone, Zap, ArrowRight, ShieldCheck } from 'lucide-react';
import { triggerHaptic } from '../services/mobileService';

export default function Navbar({ onOpenTestRide }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id) => {
    triggerHaptic(20);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#081326]/95 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo with Official Uploaded Image */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => scrollTo('hero')}>
            <img
              src="/logo.png"
              alt="TERRON EV Mobility"
              className="h-10 sm:h-12 w-auto object-contain rounded-md drop-shadow-[0_2px_8px_rgba(56,189,248,0.2)] group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="text-[10px] sm:text-xs tracking-[0.35em] text-sky-400 font-bold uppercase">
                EV MOBILITY
              </span>
              <span className="text-[8px] sm:text-[9px] text-slate-400 uppercase tracking-wider">
                Sridewi Energies
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-300">
            <button
              onClick={() => scrollTo('models')}
              className="hover:text-sky-400 transition-colors"
            >
              EV Models
            </button>
            <button
              onClick={() => scrollTo('technology')}
              className="hover:text-sky-400 transition-colors"
            >
              Smart Technology
            </button>
            <button
              onClick={() => scrollTo('founder')}
              className="hover:text-sky-400 transition-colors"
            >
              Founder's Vision
            </button>
            <button
              onClick={() => scrollTo('ordering')}
              className="hover:text-sky-400 transition-colors"
            >
              Ordering Guide
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="hover:text-sky-400 transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Desktop Call & Test Ride CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="tel:+917416071115"
              className="flex items-center space-x-1.5 text-xs text-slate-300 hover:text-white bg-slate-900/80 border border-slate-800 px-3 py-2 rounded-xl transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-sky-400" />
              <span>+91 7416071115</span>
            </a>

            <button
              onClick={() => {
                triggerHaptic(30);
                onOpenTestRide();
              }}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-sky-400 to-blue-600 hover:from-sky-300 hover:to-blue-500 text-slate-950 transition-all shadow-md shadow-sky-500/20"
            >
              <span>Book Test Ride</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => {
                triggerHaptic(20);
                onOpenTestRide();
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-400 text-slate-950 shadow-sm"
            >
              Book Ride
            </button>
            <button
              onClick={() => {
                triggerHaptic(20);
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label="Toggle Navigation Menu"
              className="p-2 text-slate-300 hover:text-white rounded-lg bg-slate-900 border border-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800 space-y-2 text-sm font-medium animate-fadeIn">
            <button
              onClick={() => scrollTo('models')}
              className="block w-full text-left px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800"
            >
              EV Models Lineup (Classic Sport, Sport, Nexa, Adventure, Terron+)
            </button>
            <button
              onClick={() => scrollTo('technology')}
              className="block w-full text-left px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800"
            >
              Smart Technology & BMS
            </button>
            <button
              onClick={() => scrollTo('founder')}
              className="block w-full text-left px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800"
            >
              Founder's Message (Sridevi Kadiyala)
            </button>
            <button
              onClick={() => scrollTo('ordering')}
              className="block w-full text-left px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800"
            >
              Configuration & Ordering Guide
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="block w-full text-left px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800"
            >
              Dealership & Contact Info
            </button>
            <div className="pt-2 border-t border-slate-800/80">
              <a
                href="tel:+917416071115"
                className="flex items-center space-x-2 text-sky-400 font-semibold px-3 py-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call Hyderabad Desk: +91 7416071115</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
