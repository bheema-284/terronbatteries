import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Compass, 
  Gauge, 
  BatteryCharging, 
  Clock, 
  ShieldCheck, 
  IndianRupee,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import { triggerHaptic } from '../services/mobileService';

// The 4 Core Bikes for the Hero Slider requested by the user
const heroBikes = [
  {
    id: "classic-sports",
    name: "CLASSIC SPORTS",
    subtitle: "Premium Retro-Modern Electric Scooter",
    tagline: "Timeless styling engineered with modern electric agility and effortless city commuting.",
    image: "/images/scooters/classic_red.jpg",
    colorBadge: "Crimson Red (Classic)",
    badgeHex: "#dc2626",
    range: "150-175 KM*",
    topSpeed: "60 KM/H",
    motor: "4.5 KW Peak",
    charging: "Approx. 5-6 Hours",
    price: "₹89,999*",
    emi: "₹2,149/month",
    highlights: [
      "Classic Chrome Front Apron Trim",
      "Front & Rear Disc with Combined Braking (CBS)",
      "Smart BMS with 16-Cell Temperature Guard",
      "Cruise Control & Reverse Assistance"
    ]
  },
  {
    id: "nexa",
    name: "NEXA",
    subtitle: "Flagship Adventure Maxi-Scooter",
    tagline: "High-power highway cruiser with dual-sport knobby grip and aerodynamic touring screen.",
    image: "/images/scooters/nexa_silver.jpg",
    colorBadge: "Titanium Silver Metallic",
    badgeHex: "#94a3b8",
    range: "225-270 KM*",
    topSpeed: "70-80 KM/H",
    motor: "6.5 KW | 8 KW High-Output",
    charging: "Approx. 5-6 Hours",
    price: "₹1,19,999*",
    emi: "₹2,899/month",
    highlights: [
      "Aerodynamic Highway Touring Windscreen",
      "Twin Projector LED Headlamps",
      "Dual-Sport All-Terrain Grip Wheels",
      "Connected Digital TFT Instrument Cluster"
    ]
  },
  {
    id: "sports",
    name: "SPORTS",
    subtitle: "Aggressive Urban Performer",
    tagline: "Exposed sports handlebars, 150KG payload chassis, and razor-sharp acceleration.",
    image: "/images/scooters/classic_black.jpg",
    colorBadge: "Obsidian Black & Orange",
    badgeHex: "#18181b",
    range: "150-175 KM*",
    topSpeed: "60 KM/H",
    motor: "4.5 KW Peak",
    charging: "Approx. 5-6 Hours",
    price: "₹91,999*",
    emi: "₹2,199/month",
    highlights: [
      "Sport-Tuned Instant Throttle Response",
      "Dual Studio Profile with Racing Accents",
      "Robust 150KG Payload Capacity",
      "Side-Stand Safety Cut-Off & Acoustic Anti-Theft"
    ]
  },
  {
    id: "terron-plus",
    name: "TERRON+",
    subtitle: "Ultra Long-Range Grand Tourer",
    tagline: "Unmatched 270 KM touring range paired with revolutionary 3-hour fast charging technology.",
    image: "/images/scooters/adventure_green.jpg",
    colorBadge: "Emerald Green Utility",
    badgeHex: "#047857",
    range: "225-270 KM",
    topSpeed: "70-80 KM/H",
    motor: "6.5 KW | 8 KW Peak",
    charging: "⚡ ~3 Hours Fast Charge (0-80%)*",
    price: "₹1,29,999*",
    emi: "₹3,149/month",
    highlights: [
      "Rapid Charging: 0 to 80% in ~3 Hours*",
      "Heavy-Duty Cargo & Adventure Bull-Bars",
      "Ergonomic Stepped Grand Touring Saddle",
      "Optional ADAS, Blind-Spot & Rear Camera Support"
    ]
  }
];

export default function Hero({ onOpenTestRide }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  // Auto-sliding interval (4.5 seconds)
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroBikes.length);
      }, 4500);
    }
    return () => clearInterval(timerRef.current);
  }, [isPaused]);

  const goToSlide = (index) => {
    triggerHaptic(20);
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    triggerHaptic(25);
    setCurrentSlide((prev) => (prev + 1) % heroBikes.length);
  };

  const prevSlide = () => {
    triggerHaptic(25);
    setCurrentSlide((prev) => (prev - 1 + heroBikes.length) % heroBikes.length);
  };

  const scrollToSection = (id) => {
    triggerHaptic(25);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const activeBike = heroBikes[currentSlide];

  return (
    <section 
      id="hero"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative pt-6 pb-16 sm:pb-24 overflow-hidden bg-[#111E31]"
    >
      {/* Background ambient lighting matching active bike */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-[170px] opacity-25 pointer-events-none transition-colors duration-1000"
        style={{ backgroundColor: activeBike.badgeHex }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Header Pill with Sridewi Energies */}
        <div className="flex items-center justify-between mb-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#15243C] border border-[#1E3352] text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-[#EAB308] animate-pulse" />
            <span className="font-bold text-[#EAB308]">SRIDEWI ENERGIES PRIVATE LIMITED</span>
            <span className="text-slate-500">•</span>
            <span className="text-[#CBD5E1] hidden sm:inline">OFFICIAL EV MOBILITY SHOWROOM</span>
          </div>

          {/* Slide Indicator & Pause Status */}
          <div className="flex items-center space-x-2 text-xs text-[#CBD5E1]">
            <span className="font-mono text-[#EAB308] font-bold">{currentSlide + 1}</span>
            <span>/</span>
            <span>{heroBikes.length}</span>
            <span className="text-[10px] text-slate-400 ml-1 hidden sm:inline">
              ({isPaused ? 'Paused' : 'Auto-sliding'})
            </span>
          </div>
        </div>

        {/* The Auto-Sliding 4-Bike Carousel Card */}
        <div className="bg-gradient-to-b from-[#15243C] to-[#0E1A2C] border border-[#1E3352] rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden transition-all duration-700">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Bike Details & Specs */}
            <div className="lg:col-span-6 space-y-5 animate-fadeIn">
              {/* Badge & Model Title */}
              <div>
                <div className="flex items-center space-x-2">
                  <span 
                    className="w-2.5 h-2.5 rounded-full shadow-sm"
                    style={{ backgroundColor: activeBike.badgeHex }}
                  />
                  <span className="text-xs font-bold uppercase tracking-widest text-[#EAB308]">
                    {activeBike.subtitle}
                  </span>
                </div>

                <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight mt-1 flex items-baseline space-x-3">
                  <span className="text-[#CBD5E1]">TERRON</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EAB308] via-[#FBBF24] to-white">
                    {activeBike.name}
                  </span>
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed max-w-lg">
                  {activeBike.tagline}
                </p>
              </div>

              {/* 4 Core Performance Pillars */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                <div className="bg-[#0E1A2C] p-3 rounded-2xl border border-[#1E3352]">
                  <div className="flex items-center space-x-1 text-slate-400 text-[10px] font-bold uppercase mb-0.5">
                    <Compass className="w-3.5 h-3.5 text-[#38BDF8]" />
                    <span>Range</span>
                  </div>
                  <span className="text-base sm:text-lg font-black text-[#38BDF8] block">{activeBike.range}</span>
                </div>

                <div className="bg-[#0E1A2C] p-3 rounded-2xl border border-[#1E3352]">
                  <div className="flex items-center space-x-1 text-slate-400 text-[10px] font-bold uppercase mb-0.5">
                    <Gauge className="w-3.5 h-3.5 text-[#38BDF8]" />
                    <span>Top Speed</span>
                  </div>
                  <span className="text-base sm:text-lg font-black text-white block">{activeBike.topSpeed}</span>
                </div>

                <div className="bg-[#0E1A2C] p-3 rounded-2xl border border-[#1E3352]">
                  <div className="flex items-center space-x-1 text-slate-400 text-[10px] font-bold uppercase mb-0.5">
                    <Zap className="w-3.5 h-3.5 text-[#38BDF8]" />
                    <span>Motor</span>
                  </div>
                  <span className="text-base sm:text-lg font-black text-white block">{activeBike.motor}</span>
                </div>

                <div className="bg-[#0E1A2C] p-3 rounded-2xl border border-[#1E3352]">
                  <div className="flex items-center space-x-1 text-slate-400 text-[10px] font-bold uppercase mb-0.5">
                    <Clock className="w-3.5 h-3.5 text-[#EAB308]" />
                    <span>Charging</span>
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-[#EAB308] block truncate">{activeBike.charging}</span>
                </div>
              </div>

              {/* Engineering Highlights List */}
              <div className="bg-[#0E1A2C]/80 p-3.5 rounded-2xl border border-[#1E3352] space-y-1.5 text-xs text-slate-300">
                <span className="text-[10px] uppercase font-bold text-[#CBD5E1] tracking-wider block mb-1">
                  Standard Factory Equipment:
                </span>
                {activeBike.highlights.map((h, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                    <span className="text-slate-200">{h}</span>
                  </div>
                ))}
              </div>

              {/* Price & Primary Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                    Starting Ex-Showroom
                  </span>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl sm:text-3xl font-black text-white">{activeBike.price}</span>
                    <span className="text-xs font-semibold text-emerald-400">EMI from {activeBike.emi}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5">
                  <button
                    onClick={() => {
                      triggerHaptic(30);
                      onOpenTestRide(activeBike.name);
                    }}
                    className="flex-1 sm:flex-none px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider bg-gradient-to-r from-[#EAB308] via-[#FBBF24] to-[#CA8A04] hover:from-[#FBBF24] hover:to-[#EAB308] text-slate-950 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-[#EAB308]/25"
                  >
                    <span>Book Test Ride</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => scrollToSection('models')}
                    className="px-4 py-3 rounded-xl font-bold text-xs bg-[#0E1A2C] hover:bg-[#15243C] text-[#CBD5E1] border border-[#1E3352] hover:border-[#EAB308]/60 transition-colors"
                  >
                    Configure
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-6 relative flex flex-col items-center justify-center min-h-[300px] sm:min-h-[420px]">
              {/* Ground Reflection / Glow */}
              <div 
                className="absolute bottom-2 w-4/5 h-16 rounded-[100%] blur-2xl opacity-70 transition-all duration-700 pointer-events-none"
                style={{ backgroundColor: activeBike.badgeHex }}
              />

              {/* Real Scooter Photo with Natural Rider & Bike Presentation */}
              <div className="relative z-10 w-full overflow-hidden rounded-3xl border border-[#1E3352] shadow-2xl bg-[#0E1A2C]/60 group">
                <img
                  key={activeBike.image}
                  src={activeBike.image}
                  alt={`Terron ${activeBike.name}`}
                  className="w-full h-72 sm:h-96 object-cover object-center rounded-3xl transition-transform duration-700 group-hover:scale-105"
                />

                {/* Color Pill Tag */}
                <div className="absolute bottom-3 left-3 bg-[#111E31]/85 backdrop-blur-md border border-[#1E3352] px-3 py-1.5 rounded-xl flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full border border-white" style={{ backgroundColor: activeBike.badgeHex }} />
                  <span className="text-xs font-bold text-white">{activeBike.colorBadge}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls & Carousel Progress Indicator */}
          <div className="mt-8 pt-6 border-t border-[#1E3352] flex items-center justify-between">
            {/* 4 Interactive Bike Dots */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {heroBikes.map((bike, idx) => (
                <button
                  key={bike.id}
                  onClick={() => goToSlide(idx)}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    currentSlide === idx
                      ? 'bg-gradient-to-r from-[#EAB308] to-[#F59E0B] text-slate-950 font-black shadow-md shadow-[#EAB308]/30 scale-105'
                      : 'bg-[#0E1A2C] text-[#CBD5E1] hover:text-white border border-[#1E3352]'
                  }`}
                >
                  <span 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: bike.badgeHex }} 
                  />
                  <span>{bike.name}</span>
                </button>
              ))}
            </div>

            {/* Prev / Next Slide Arrows */}
            <div className="flex items-center space-x-2">
              <button
                onClick={prevSlide}
                aria-label="Previous Slide"
                className="p-2.5 rounded-xl bg-[#0E1A2C] hover:bg-[#15243C] border border-[#1E3352] text-[#CBD5E1] hover:text-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next Slide"
                className="p-2.5 rounded-xl bg-[#0E1A2C] hover:bg-[#15243C] border border-[#1E3352] text-[#CBD5E1] hover:text-white transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
