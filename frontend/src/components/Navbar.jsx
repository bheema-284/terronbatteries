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
    <header className="sticky top-0 z-40 bg-[#111E31]/95 backdrop-blur-md border-b border-[#233d62]/80 transition-all">
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
              onClick={() => scrollTo('compare')}
              className="hover:text-sky-400 transition-colors"
            >
              Compare & Finance
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
              href="tel:+919121646777"
              className="flex items-center space-x-1.5 text-xs text-[#CBD5E1] hover:text-[#EAB308] bg-[#15243C] border border-[#1E3352] px-3.5 py-2 rounded-xl transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-[#EAB308] fill-current" />
              <span className="font-semibold">+91 91216 46777</span>
            </a>

            <button
              onClick={() => {
                triggerHaptic(30);
                onOpenTestRide('CLASSIC SPORTS');
              }}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-gradient-to-r from-[#EAB308] to-[#F59E0B] hover:from-[#FBBF24] hover:to-[#EAB308] text-slate-950 transition-all shadow-md shadow-[#EAB308]/20"
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
          <div className="md:hidden py-4 border-t border-[#1E3352] space-y-2 text-sm font-medium animate-fadeIn bg-[#111E31]">
            <button
              onClick={() => scrollTo('models')}
              className="block w-full text-left px-3 py-2 rounded-lg text-slate-200 hover:bg-[#15243C]"
            >
              The 4 EV Bikes (CLASSIC SPORTS, NEXA, SPORTS, TERRON+)
            </button>
            <button
              onClick={() => scrollTo('technology')}
              className="block w-full text-left px-3 py-2 rounded-lg text-slate-200 hover:bg-[#15243C]"
            >
              Smart Technology & BMS
            </button>
            <button
              onClick={() => scrollTo('compare')}
              className="block w-full text-left px-3 py-2 rounded-lg text-slate-200 hover:bg-[#15243C]"
            >
              Compare & Finance
            </button>
            <button
              onClick={() => scrollTo('founder')}
              className="block w-full text-left px-3 py-2 rounded-lg text-slate-200 hover:bg-[#15243C]"
            >
              Founder's Message (Sridevi Kadiyala)
            </button>
            <button
              onClick={() => scrollTo('ordering')}
              className="block w-full text-left px-3 py-2 rounded-lg text-slate-200 hover:bg-[#15243C]"
            >
              Configuration & Ordering Guide
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="block w-full text-left px-3 py-2 rounded-lg text-slate-200 hover:bg-[#15243C]"
            >
              Corporate Office & Dealership
            </button>
            <div className="pt-2 border-t border-[#1E3352]">
              <a
                href="tel:+919121646777"
                className="flex items-center space-x-2 text-[#EAB308] font-bold px-3 py-2"
              >
                <Phone className="w-4 h-4 fill-current" />
                <span>Call Hyderabad Desk: +91 91216 46777</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
